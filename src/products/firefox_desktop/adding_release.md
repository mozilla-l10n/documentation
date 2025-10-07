# Adding a new locale to Beta and Release builds

## Prerequisites

The majority of the technical work has already been completed when setting up [Nightly builds](adding_nightly.md).

There are a few important prerequisites before adding a new locale to Beta and Release.

For the localization community:
* Localization should have reached a high level of completion, especially for user facing parts of the UI:
  * All [Tags](https://mozilla-l10n.github.io/localizer-documentation/tools/pontoon/search_filters.html#tags) with high priority (4 and 5 stars) should be at 100% (or very close).
  * Lower priority Tags should be at least above 30%.
* Localization team has demonstrated a consistent effort, being able to keep up for at least a couple of cycles with the incoming flow of new strings.
  * There must be more than one active translator on the project, to ensure that the content has been peer reviewed.
* There is a relevant number of users on the Nightly channel testing the localization. This number varies based on the language, for minority languages 10-20 users is an excellent result. Also, a trend showing growth is important as well.

For the localization PM:
* Builds have been tested on different operating systems without identifying critical issues.
* [Searchplugins are set up](setup_searchplugins.md).

To track this work, you need to file a bug in Firefox::Build Config (like [this example](https://bugzilla.mozilla.org/show_bug.cgi?id=1359321)), blocking the original tracking bug for the locale (`fx-l10n-LOCALE`).

## Create a Bugzilla component

Before filing a new bug, the localization team needs to provide the translation for `%LOCALE_NAME% Localization`, as the component description includes both English and translated versions.

Once that information is available:
* File a new bug following [this template](https://mzl.la/3jzjaza). Replace `%LOCALE_NAME%` with the locale name (e.g. `Lao`), `%LOCALE_CODE%` with the locale code (e.g. `lo`), and `%LOCALIZED_DESCRIPTION%` with the translation provided by the team. For example, for Lao the whole description will result in `Lao Localization (ການແປພາສາລາວ)`.
* Once the component is available, update the [GitHub tracking issue](https://github.com/orgs/mozilla-l10n/projects/3/views/1) with the link to this bug, and move all existing bugs from `Other` to this new component.

## Set up searchplugins

Check the [Set up searchplugins](setup_searchplugins.md) document for detailed instructions on how to set up searchplugins for new locales.

## Verify language name

The language name associated to the locale code is displayed in a few places in Firefox interface (language settings for web content, contextual menu for dictionaries). The language name needs to be defined in:
* [languageNames.ftl](https://searchfox.org/mozilla-central/source/toolkit/locales/en-US/toolkit/intl/languageNames.ftl): ID with structure `language-name-LOCALECODE = (name of the language in English)`. Note that the locale code can only be a 2/3 letter code, locales like `ca-valencia` are not valid.
* [langpack_localeNames.json](https://searchfox.org/mozilla-central/source/python/mozbuild/mozbuild/action/langpack_localeNames.json): add the locale code with the `native` name, add `english` only if the English name differs from the native name. This list is used to generate language pack names and descriptions.
* [mozIntl.jsm](https://searchfox.org/mozilla-central/source/toolkit/components/mozintl/mozIntl.sys.mjs):
  * Add the locale code in the `availableLocaleDisplayNames` constant, `language` [set](https://searchfox.org/mozilla-central/rev/131338e5017bc0283d86fb73844407b9a2155c98/toolkit/components/mozintl/mozIntl.jsm#451).
  * Add the localized language name in the `nativeLocaleNames` [map](https://searchfox.org/mozilla-central/rev/b3933df6e119bd6caf5d9e5868670348ec26dee3/toolkit/components/mozintl/mozIntl.jsm#650). The localized language name should also be stored in [this repository](https://github.com/mozilla-l10n/firefox-languages/blob/master/output/languages_curated.json).
* [language.properties](https://searchfox.org/mozilla-central/source/intl/locale/language.properties): add a value in the form `LOCALECODE.accept = true`. This is needed to list the language in the language settings dialog for web content.

This is an [example of a bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1807794) created to add this information. Don’t forget to update the GitHub tracking issue for the locale with a link to this bug.

## Verify locale-specific settings

Some of the locale-specific settings are defined inline in Firefox code, and should be reviewed if they need customization for your locale:

* [intl/locale/rust/locale_service_glue/src/lib.rs](https://searchfox.org/firefox-main/source/intl/locale/rust/locale_service_glue/src/lib.rs)
  * `locale_service_ellipsis` — Define if the unicode ellipsis char "…" (default), or "..." should be used.
  * `locale_service_always_append_accesskeys` — Define if accesskeys should always be appended for the locale (false by default).
  * `locale_service_insert_separator_before_accesskeys` — Define if accesskeys should be separated from the string (true by default).
  * `locale_service_default_font_language_group` — Defines the initial setting of the language drop-down menu
    in the Fonts and Colors > Advanced preference panel.

    Takes one of the values of the menuitems in the
    ["selectLangs" menulist](https://searchfox.org/firefox-main/source/browser/components/preferences/dialogs/fonts.xhtml).
  * `locale_service_default_accept_languages` — Defines default accept language header for a locale.
    A comma-separated list of valid BCP 47 language tags.
    The default value is either `$lang, en-US, en` or
    `$lang-$region, $lang, en-US, en` if the current locale includes a region subtag.

    If customizing this, begin with the language tag of your locale.
    Next, include language tags for other languages that you expect most users of your locale to be able to speak,
    so that their browsing experience degrades gracefully if content is not available in their primary language.

    By default, `en-US, en` is appended to the end of the list, providing locales of last resort.
    If you know that users of your locale would prefer a different variety of English,
    or if they are not likely to understand English at all,
    you may opt to include a different English language tag,
    or to exclude English altogether.

* [devtools/shared/plural-form.js](https://searchfox.org/firefox-main/source/devtools/shared/plural-form.js)
  * `PluralForm.getPluralRule()` — Selects the number of plural categories and the function for selecting between them.
    The default is to use the same plural rules as English, which has "one" and "other" categories.
    This is only used for a small number of devtools messages that have a custom format;
    Fluent plurals in general rely on Unicode Common Locale Data Repository data.

## Add locale to build configuration

First of all make sure that your environment is [correctly set up](https://firefox-source-docs.mozilla.org/setup/index.html#getting-set-up-to-work-on-the-firefox-codebase), update your local `mozilla-firefox` clone and make sure it’s on the `main` bookmark:

```BASH
$ cd ~/firefox
$ git checkout main
$ git pull
```

This is an [example of a recent bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1716987) used to track the build changes.

The file to modify is in `browser/locales/shipped-locales`, open it with your text editor of choice (in this example, Visual Studio Code).

```BASH
$ code browser/locales/shipped-locales
```

And add the new locale to the list. With Visual Studio Code, you can open the *Command Palette* and select *Sort Line Ascending* to make sure that the list is in **alphabetical order**.

After you’ve finished editing the file, check the status of the repository, and the diff. Let’s consider for example the task of adding Urdu (ur).

```BASH
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   browser/locales/shipped-locales

no changes added to commit (use "git add" and/or "git commit -a")

$ git diff
--- a/browser/locales/shipped-locales
+++ b/browser/locales/shipped-locales
@@ -83,14 +84,13 @@ son
 te
 th
 tr
 uk
+ur
 uz
 vi
 xh
 zh-CN
```

`+` in `git diff` indicates that the line has been added. Add all the changes using the command below:

```BASH
$ git add .
```

Then, follow the instructions available in [this document](https://firefox-source-docs.mozilla.org/contributing/contribution_quickref.html#to-write-a-patch) to create a patch, submit it for review, and land it.

You also need to set the `relnote-firefox` flag to `?` in the bug, the suggested comment is `Suggested for release notes: "Locale added: LANGUAGE_NAME (LOCALE_CODE)"`.

## Update language pack settings on AMO

The language pack for the new locale will be uploaded automatically by release automation on *addons.mozilla.org* (starting with the Beta version). A few follow-up manual steps are needed:
* The `Mozilla` account needs to be added as author for the language pack.
* The locale needs to be defined in [this JavaScript file](https://github.com/mozilla/addons-frontend/blob/master/src/amo/languages.js).

For the first step, an email needs to be sent to AMO administrators (amo-admins(at)mozilla.com).

These steps will make the language pack available in both the [Language Tools](https://addons.mozilla.org/firefox/language-tools/) page and the API used by Firefox to add new languages from preferences.

## Close GitHub tracking issue

Once the locale ships to release:
* Create a new column for the Firefox version, e.g. `Firefox 91`, in the [GitHub project](https://github.com/orgs/mozilla-l10n/projects/3/views/1).
* Close the tracking issue and move it from `Queue - WIP` to this new column.
