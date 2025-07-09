# Adding a new locale to Nightly builds

<!-- toc -->

## Prerequisites

Locales will be added to Nightly builds only after reaching at least 30% overall completion in Pontoon. For details on the requirements to move to Beta/Release, see [this document](adding_release.md#prerequisites).

## Create a tracking GitHub issue and set up bugs to add the new locale

This [GitHub project](https://github.com/orgs/mozilla-l10n/projects/3/views/1) is used to track locales added to or removed from Firefox. The `Queue - WIP` column includes all locales currently in Nightly, once they move to Release a new column is added for the specific Firefox version in which they shipped (e.g. `Firefox 91`).

As a first step, file an issue using the [New Locale for Firefox Desktop template](https://github.com/mozilla-l10n/pm-projects/issues/new/choose). Replace `%LOCALE_NAME% (%LOCALE_CODE%)` with the locale name and code in the title field, e.g. `Lao (lo)`, and add the issue to the `Queue - WIP` column in the [GitHub project](https://github.com/orgs/mozilla-l10n/projects/3/views/1).

Then file a new tracking bug using this [bug template](https://mzl.la/3vwVtub). Replace `%LOCALE_NAME%` with the locale name, e.g. `Lao`, and `%LOCALE_CODE%` with the locale code, e.g. `lo`. Pay attention to update the `alias` field as well, and CC the locale manager if they already have a Bugzilla account. Once the bug is filed, update the link in the GitHub issue.

Note that the tracking bug is filed under `Mozilla Localizations :: Other`, as creating the Bugzilla component is a step that will be performed when the locale is ready to move to Beta/Release. If the component for this locale is already available, the bug should to be moved directly there.

## Verify content in l10n repository

Before enabling the build, it’s a good idea to perform some basic checks:
* Check `it/toolkit/chrome/global/intl.properties` ([it version](https://github.com/mozilla-l10n/firefox-l10n/blob/main/it/toolkit/chrome/global/intl.properties)) for evident mistakes.

## Add new locale to build configuration

First of all make sure that your environment is [correctly set up](https://firefox-source-docs.mozilla.org/setup/index.html#getting-set-up-to-work-on-the-firefox-codebase), update your local `mozilla-firefox` clone and make sure it’s on the `main` branch:

```BASH
$ cd ~/firefox
$ git checkout main
$ git pull
```

File a bug using [this template](https://mzl.la/3QcddVk), replacing the locale name and code placeholders, and update the link in the GitHub tracking issue.

The first file to modify is `browser/locales/all-locales`, open it with your text editor of choice (in this example, Visual Studio Code).

```BASH
$ code browser/locales/all-locales
```

And add the new locale to the list. With Visual Studio Code, you can open the *Command Palette* and select *Sort Line Ascending* to make sure that the list is in **alphabetical order**.

The second file to modify is `browser/locales/l10n.toml`.

```BASH
$ code browser/locales/l10n.toml
```

This is the beginning of the file:

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

Identify the `locales` section, and add the new locale code between double quotes, followed by a comma. As before, you can use the editor to make sure the list is in alphabetical order (make sure to select only the lines with actual locale codes before pressing running the command).

After you’ve finished editing the files, check the status of the repository, and the diff.

```BASH
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   browser/locales/all-locales
	modified:   browser/locales/l10n.toml

no changes added to commit (use "git add" and/or "git commit -a")

$ git diff
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

`+` in `git diff` that the line has been added. Add all the changes using the command below:

```BASH
$ git add .
```

Then, follow the instructions available in [this document](https://firefox-source-docs.mozilla.org/contributing/contribution_quickref.html#to-write-a-patch) to create a patch, submit it for review, and land it.

## Verify product-details configuration

Once a locale is added to Nightly builds, `product-details` will pick up automatically the new build. In order for the new build to be listed on [mozilla.org](https://www.mozilla.org/firefox/nightly/all/), the language name needs to be available in [languages.json](https://github.com/mozilla-releng/product-details/blob/production/public/1.0/languages.json). If missing:
* Open a pull request against the `production` branch of [product-details](https://github.com/mozilla-releng/product-details) ([example](https://github.com/mozilla-releng/product-details/pull/4)), and update the GitHub tracking issue accordingly.
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
