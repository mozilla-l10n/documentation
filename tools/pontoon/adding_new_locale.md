# Adding a new locale on Pontoon

## Verify if the locale is already available
Access Django’s admin interface at `https://pontoon.mozilla.org/a/` (note that this is not the usual admin interface), then click `Locales`. In the next page search for the locale you want to add (safer to search for the locale code).

## Add the new locale
If the locale you need is not available, click the **ADD LOCALE+** button in the top right corner. For this example, let’s consider that the task is to add Amharic (am).

You will need to complete the following fields in the next page.

### Code
It’s the locale code, in this case `am`.

### Name
It’s the language name, in this case `Amharic`.

### Plural rule
It’s the GetText plural rule. This [document](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html) has plural rules for several languages. For example, for Amharic it would be:
```
nplurals=2; plural=(n > 1);
```

As explained in the note below the field, you only need to put the last part in the field:
```
(n > 1)
```

### CLDR Plurals
You need to find the locale on [CLDR](http://www.unicode.org/cldr/charts/dev/supplemental/language_plural_rules.html). For Amharic, there are only two **cardinal** plural forms listed: one, other.

The mapping is:
```
0 -> zero
1 -> one
2 -> two
3 -> few
4 -> many
5 -> other
```

For Amharic you will need to set the field as `1,5`, separating the available forms with a comma (no spaces).

Irish (ga-IE), for example, has all of them except for 0, so it will be `1,2,3,4,5`.

### Script
The script used by this locale. Find it in [CLDR Languages and Scripts](http://www.unicode.org/cldr/charts/latest/supplemental/languages_and_scripts.html).

### Direction
Writing direction of the script. Set to `right-to-left` if `rtl` value for the locale script is set to `YES` in [CLDR scriptMetadata.json](https://github.com/unicode-cldr/cldr-core/blob/master/scriptMetadata.json).

### Population
Number of native speakers. Find locale code in [CLDR territoryInfo.json](https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/territoryInfo.json) and multiply its `_populationPercent` with the territory `_population`. Repeat if multiple occurrences of locale code exist and sum products.

At this point click **SAVE** in the bottom right corner to save the new locale, and check if the locale’s page is available, in this case at https://pontoon.mozilla.org/am/

You should also add the Pontoon Intro project to this locale, through the [standard admin interface](https://pontoon.mozilla.org/admin/projects/pontoon-intro/).
