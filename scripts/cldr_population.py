#! /usr/bin/env python

import argparse
import json
import urllib2
import sys


def getPopulation(locale, t_name, t_data):
    # Extract population for locale from territory data
    t_population = t_data['_population']

    if ('languagePopulation' in t_data and
        locale in t_data['languagePopulation'] and
        '_populationPercent' in t_data['languagePopulation'][locale]):
            percentage = t_data['languagePopulation'][locale]['_populationPercent']
            l_population = int(round(float(percentage)/100 * int(t_population)))
            print('Adding {}: {} ({}% of {})'.format(t_name, l_population, percentage, t_population))
            return l_population
    else:
        return -1


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('locale', help='Locale code to search for')
    args = parser.parse_args()
    locale = args.locale

    # Get CLDR data
    cldr_source = 'https://raw.githubusercontent.com/unicode-cldr/cldr-core/master/supplemental/territoryInfo.json'
    cldr_data = json.load(urllib2.urlopen(cldr_source))

    # Initialize data
    population = 0
    territories = []

    # If the locale code has a region, only check that territory
    if '-' in locale:
        locale, territory = locale.split('-')
        if not territory in cldr_data['supplemental']['territoryInfo']:
            print('Region {} is not available in CLDR'.format(territory))
            sys.exit(0)
        territories.append(territory)
        population = getPopulation(locale, territory, cldr_data['supplemental']['territoryInfo'][territory])
    else:
        for territory, territory_data in cldr_data['supplemental']['territoryInfo'].iteritems():
            l_population = getPopulation(locale, territory, territory_data)
            if l_population == -1:
                # Territory is not defined
                continue
            population += l_population
            territories.append(territory)

    if territories:
        territories.sort()
        print('--------')
        print('Territories: {}'.format(', '.join(territories)))
        print('Population: {}'.format(population))
        print('--------')
    else:
        print('{} is not available in CLDR'.format(locale))

if __name__ == '__main__':
    main()
