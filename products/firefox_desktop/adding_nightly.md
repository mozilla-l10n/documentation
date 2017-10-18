# Adding a new locale to Nightly builds

There are a few steps to complete in order to have Nightly builds for a new locale:
* File a tracking bug and dependencies.
* Land initial content in l10n repositories.
* Set up searchplugins.
* Add new locale to build configuration.
* Add new locale to product-details.

## File a tracking bug and dependencies to add the new locale

The first step is to create [all the bugs](https://l10n.mozilla.org/bugs/new-locale) you need for this new locale. Let’s consider Lao (lo) as an example:
* Locale: `lo`.
* Language: `Lao`.
* Component: leave `Other` if there’s no component on Bugzilla yet, otherwise type in the component name in the `Mozilla Localizations` product (in this case `lo / Lao`).
* Name: first name of the locale leader. It will be used as part of the bug messages.
* Bugzilla ID: Bugzilla ID (email address) of the locale leader. It will be used to CC them to all these bugs.
* Application: leave Firefox.
* Version: leave the default.

Click the *Create Buglinks* button, and a set of links will appear at the bottom of the page. Not all of them might be needed, for example LDAP is required only for Tableau access, repositories might already exist, etc. Make sure to always start with the `shipping` link, since that’s going to be the tracker bug, with an alias used in other bugs to set dependencies (`fx-l10n-LOCALECODE`, `fx-l10n-lo` in this example).

Always double check the content of the bugs for errors or outdated content. If the information is obsolete, you can update the templates in this [Wiki page](https://wiki.mozilla.org/L10n:Bugogram) (it will require a new deployment of Elmo to production).

## Land initial content in l10n repository

With cross-channel, all builds of Firefox are generated using strings from the l10n-central repository. If a project started localizing using a BitBucket repository, it’s **fundamental** to populate l10n-central with that content when requesting the official repository creation on `https://hg.mozilla.org/l10n-central/LOCALE_CODE`.

After the first content lands in l10n-central, it’s a good idea to perform some basic checks before enabling the build:
* Check `toolkit/global/intl.properties` ([en-US version](https://hg.mozilla.org/mozilla-central/file/default/toolkit/locales/en-US/chrome/global/intl.properties)) for evident mistakes.
* Check if there’s a `region.properties` file in `browser/chrome/browser-region/region.properties`, if needed replace it with the [stock version](../searchplugins/files/desktop_region.properties).

## Set up searchplugins

Check the [Set up searchplugins](../searchplugins/setup_searchplugins.md) document for detailed instructions on how to set up searchplugins for new locales.

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

## Add new locale to product-details

Product-details, used to publish the build on mozilla.org, is generated by [Ship It](https://github.com/mozilla-releng/ship-it). Instructions are available in [this README](https://github.com/mozilla-releng/ship-it/blob/master/README-l10n.md). Note that, once reviewed and merged, the change won’t be available until the new version of *Ship It* is deployed to production.
