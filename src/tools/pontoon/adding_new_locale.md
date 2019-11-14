# Adding a new locale on Pontoon

## Verify if the locale is already available

Access Django’s admin interface at `https://pontoon.mozilla.org/a/` (note that this is not the usual admin interface), then click `Locales`. In the next page search for the locale you want to add (safer to search for the locale code).

Before moving forward:
* If the locale is going to work on mozilla.org, files need to be set up in [tools](../webdashboards/) and GitHub before enabling the project in Pontoon.
* If the locale is going to work on Firefox, and an [official Mercurial repository](https://hg.mozilla.org/l10n-central/) is not available, a repository needs to be created in the [mozilla-l10n organization on BitBucket](https://bitbucket.org/mozilla-l10n/). Currently :pike, :mathjazz and :flod have permissions to create such repository.

## Add the new locale

If the locale you need is not available, click the **ADD LOCALE+** button in the top right corner. For this example, let’s consider that the task is to add Amharic (am).

You will need to complete the following fields in the next page.

### Code

It’s the locale code, in this case `am`.

### Google Translate code

Google Translate maintains a list of supported locales in its own format. Choose one that matches the locale from [a list of supported locales](https://translate.google.com/intl/en/about/languages/) or leave it blank to disable support for Google Translate for this locale.

### MS translator code

Microsoft Translator maintains a list of supported locales in its own format. Choose one that matches the locale from [a list of supported locales](https://msdn.microsoft.com/en-us/library/hh456380.aspx) or leave it blank to disable support for Microsoft Translator for this locale.

### MS terminology code

Microsoft Terminology maintains a list of supported locales in its own format. Choose one that matches the locale from a list provided below the field or leave it blank to disable support for Microsoft Terminology for this locale.

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

This represents the number of native speakers. There are two ways to get this information from CLDR.

#### Using a script

Python needs to be available on the method to use this system: save [this file](https://raw.githubusercontent.com/mozilla-l10n/documentation/master/scripts/cldr_population.py) on your computer as `cldr_population.py` and run it as `python cldr_population.py LOCALE_CODE`.

For example, this is the output of the script when checking data for `sl`:

```
$ python scripts/cldr_population.py sl

Adding HU: 4937 (0.05% of 9874780)
Adding IT: 105412 (0.17% of 62007500)
Adding SI: 1720886 (87% of 1978030)
Adding AT: 32233 (0.37% of 8711770)
--------
Territories: AT, HU, IT, SI
Population: 1863468
--------
```

#### Manual process

Find the locale code in [CLDR territoryInfo.json](https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/territoryInfo.json) and multiply its `_populationPercent` with the territory `_population`. Repeat if multiple occurrences of locale code exist and sum products.

At this point click **SAVE** in the bottom right corner to save and create the new locale. Then, from the [standard admin interface](https://pontoon.mozilla.org/admin/), enable at least one “non system project” (i.e. not `Tutorial` or `Pontoon Intro`) and wait until Pontoon syncs for the locale dashboard to work. You can then check if the locale’s page, as well as the new project, are available - in this case at https://pontoon.mozilla.org/am/
