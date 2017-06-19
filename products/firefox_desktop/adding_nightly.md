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

## Land initial content in l10n repositories

Once all l10n repositories are available, you need to land the initial localized content in l10n-central. If the locale is working on Pootle, you need to contact them at `tech-team(at)translate.org.za` to perform the landing. For Pontoon it will happen automatically when the project is enabled.

After the first content lands in l10n-central, it’s a good idea to perform some basic checks before enabling the build:
* Check `toolkit/global/intl.properties` ([en-US version](https://hg.mozilla.org/mozilla-central/file/default/toolkit/locales/en-US/chrome/global/intl.properties)) for evident mistakes.
* Check if there’s a `region.properties` file in `browser/chrome/browser-region/region.properties`, if needed replace it with the [stock version](../searchplugins/files/desktop_region.properties).

The next step is to push the same content to mozilla-beta and mozilla-release to populate them. From within your `l10n-central` clone, run:

```BASH
$ hg push -r default ssh://hg.mozilla.org/releases/l10n/mozilla-beta/LOCALE_CODE
$ hg push -r default ssh://hg.mozilla.org/releases/l10n/mozilla-release/LOCALE_CODE
```

Each command pushes the current changesets from the `l10n-central` local folder to the corresponding remote repository. Make sure to change *LOCALE_CODE* to the locale you’re working on (`lo` in this example).

Once completed, check the history online starting from [l10n-central](https://hg.mozilla.org/l10n-central): all 3 repositories should have the same changeset as default/tip, including the HASH of the commit.

## Set up searchplugins

Check the [Set up searchplugins](../searchplugins/setup_searchplugins.md) document for detailed instructions on how to set up searchplugins for new locales.

## Add new locale to build configuration

First of all make sure that your environment is [correctly set up](/tools/mercurial/setting_mercurial_environment.md), update your local mozilla-unified clone and make sure it’s on the `central` bookmark:

```BASH
$ cd ~/mozilla/mercurial/mozilla-unified
$ hg pull -u
$ hg up central
```

The file to modify is in `browser/locales/all-locales`, open it with your text editor of choice.

```BASH
$ atom browser/locales/all-locales
```

And add the new locale to the list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**.

After you’ve finished editing the file, check the status of the repository, and the diff.

```BASH
$ hg status
M browser/locales/all-locales

$ hg diff
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
```

`M` in `hg status` indicates that the file has been modified, `+` in `hg diff` that the line has been added. At this point you’re ready to create the patch: [Set up searchplugins](../searchplugins/setup_searchplugins.md) has detailed instructions on how to do that, both using queues and mozreview. This document only includes instructions for mozreview.

Let’s create a bookmark for this pending work, for example `bug1361247`.

```BASH
$ hg bookmark bug1361247
```

Commit the changes with a commit message that includes the reviewer’s nickname after `r?`, for example if `flod` is the reviewer

```BASH
$ hg commit -m "Bug 1361247 - Add Lao (lo) to Firefox Nightly builds r?flod"
```

Push to review with:

```BASH
$ hg push review
```

Once the patch has been reviewed, you can land it directly from mozreview (if you have L3 commit level), or set the `checkin-needed` keyword in the bug.

## Add new locale to product-details

Product-details, used to publish the build on mozilla.org, is generated by [Ship It](https://github.com/mozilla-releng/ship-it). Instructions are available in [this README](https://github.com/mozilla-releng/ship-it/blob/master/README-l10n.md). Note that, once reviewed and merged, the change won’t be available until the new version of *Ship It* is deployed to production.
