#! /usr/bin/env python

import argparse
import json
import sys
from urllib.request import urlopen


def getPopulation(locale, t_name, t_data):
    # Extract population for locale from territory data
    t_population = t_data["_population"]

    if (
        "languagePopulation" in t_data
        and locale in t_data["languagePopulation"]
        and "_populationPercent" in t_data["languagePopulation"][locale]
    ):
        percentage = t_data["languagePopulation"][locale]["_populationPercent"]
        l_population = int(round(float(percentage) / 100 * int(t_population)))
        print(f"Adding {t_name}: {l_population} ({percentage}% of {t_population})")
        return l_population
    else:
        return "N/A"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("locale", help="Locale code to search for")
    args = parser.parse_args()
    locale = args.locale

    # Get CLDR data
    cldr_source = "https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-core/supplemental/territoryInfo.json"
    cldr_data = json.load(urlopen(cldr_source))

    # Initialize data
    population = 0
    territories = []

    # If the locale code has a region, only check that territory
    if "-" in locale:
        locale, territory = locale.split("-")
        if not territory in cldr_data["supplemental"]["territoryInfo"]:
            print(f"Region {territory} is not available in CLDR")
            sys.exit(0)
        territories.append(territory)
        population = getPopulation(
            locale, territory, cldr_data["supplemental"]["territoryInfo"][territory]
        )
    else:
        for territory, territory_data in cldr_data["supplemental"][
            "territoryInfo"
        ].items():
            l_population = getPopulation(locale, territory, territory_data)
            if l_population == "N/A":
                # Territory is not defined
                continue
            population += l_population
            territories.append(territory)

    if territories:
        territories.sort()
        print("--------")
        print("Territories: {}".format(", ".join(territories)))
        print(f"Population: {population}")
        print("--------")
    else:
        print("{locale} is not available in CLDR")


if __name__ == "__main__":
    main()
