# Adding a new locale to Nightly builds

<!-- toc -->

## File a tracking bug and dependencies to add the new locale

A list of bug templates is available in this [Wiki page](https://wiki.mozilla.org/L10n:Bugogram). There is currently no automation to help filing them, although search and replace could be used on some variables across the templates.

Let’s consider `Lao (lo)` as an example:
* Locale (`%(loc)s`): `lo`.
* Language (`%(language)s`): `Lao`.
* Component: use `Mozilla Localizations :: Other` if there’s no component on Bugzilla yet, otherwise use `Mozilla Localizations :: Language Name` (in this case `Mozilla Localizations :: lo / Lao`).
* Name (`%(name)s`): first name of the locale leader.
* Bugzilla ID (`%(bugmail)s`): Bugzilla ID (email address) of the locale leader.

Make sure to always start with the `shipping` template, since that’s going to be the tracker bug, with an alias used in other bugs to set dependencies (`fx-l10n-LOCALECODE`, `fx-l10n-lo` in this example).

## Verify content in l10n repository

Before enabling the build, it’s a good idea to perform some basic checks:
* Check `toolkit/global/intl.properties` ([en-US version](https://hg.mozilla.org/mozilla-central/file/default/toolkit/locales/en-US/chrome/global/intl.properties)) for evident mistakes.
* Check if there’s a `region.properties` file in `browser/chrome/browser-region/region.properties`, if needed replace it with the [stock version](../searchplugins/files/desktop_region.properties).

## Set up searchplugins

Check the [Set up searchplugins](setup_searchplugins.md) document for detailed instructions on how to set up searchplugins for new locales. This has become an optional step for setting up Nightly builds, but it remains mandatory before allowing the locale to ride the trains to Beta and Release.

## Add new locale to build configuration

First of all make sure that your environment is [correctly set up](../../tools/mercurial/setting_mercurial_environment.md), update your local mozilla-unified clone and make sure it’s on the `central` bookmark:

```BASH
$ cd ~/mozilla/mercurial/mozilla-unified
$ hg pull -u
$ hg up central
```

The first file to modify is `browser/locales/all-locales`, open it with your text editor of choice.

```BASH
$ atom browser/locales/all-locales
```

And add the new locale to the list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**.

The second file to modify is `browser/locales/l10n.toml`. This is the beginning of the file:

```
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

basepath = "../.."

locales = [
    "ach",
    "af",
    "an",
    "ar",
    "as",
...
```

Identify the `locales` section, and add the new locale code between double quotes, followed by a comma. As before, you can use Atom to make sure the list is in alphabetical order (make sure to select only the lines with actual locale codes before pressing `F5`).

After you’ve finished editing the files, check the status of the repository, and the diff.

```BASH
$ hg status
M browser/locales/all-locales
M browser/locales/l10n.toml

$ hg diff
diff --git a/browser/locales/all-locales b/browser/locales/all-locales
--- a/browser/locales/all-locales
+++ b/browser/locales/all-locales
@@ -51,17 +51,16 @@ ja
 kn
 ko
 lij
+lo
 lt
 ltg
 lv

 diff --git a/browser/locales/l10n.toml b/browser/locales/l10n.toml
 --- a/browser/locales/l10n.toml
 +++ b/browser/locales/l10n.toml
 @@ -59,17 +59,16 @@ locales = [
      "kn",
      "ko",
      "lij",
 +    "lo",
      "lt",
      "ltg",
      "lv",
```

`M` in `hg status` indicates that the file has been modified, `+` in `hg diff` that the line has been added. Follow the instructions available in [this document](../../tools/mercurial/creating_mercurial_patch.md) to create a patch, submit it for review, and land it.

## Verify product-details configuration

Once a locale is added to Nightly builds, `product-details` will pick up automatically the new build. In order for the new build to be listed on [mozilla.org](https://www.mozilla.org/firefox/nightly/all/), the language name needs to be available in [languages.json](https://github.com/mozilla-releng/product-details/blob/production/public/1.0/languages.json). If missing:
* Open a pull request against the `production` branch of [product-details](https://github.com/mozilla-releng/product-details) ([example](https://github.com/mozilla-releng/product-details/pull/4)).
* The language name needs to use Unicode code points in the format `\uXXXX` for non ASCII characters.

The easiest way to convert the language name from UTF-8 is to use Python's JSON module. For example, to convert Tibetan (`བོད་སྐད་`):

```
$ python -c 'import json; print(json.dumps("བོད་སྐད་"))'
"\u0f56\u0f7c\u0f51\u0f0b\u0f66\u0f90\u0f51\u0f0b"
```

The final entry in `product-details` would look like this (`bo` is the locale code for Tibetan):

```
"bo": {
    "English": "Tibetan",
    "native": "\u0f56\u0f7c\u0f51\u0f0b\u0f66\u0f90\u0f51\u0f0b"
},
```

Updates to `product-details` are pushed to production every time a new Beta or Release build is released. In case of urgency, updates can be triggered manually by Release Engineering.
