# Adding a new locale to Beta and Release builds

The majority of the work has already been completed when setting up [Nightly builds](adding_nightly.md). There are a few prerequisites before adding a new locale to Beta and Release:
* Localization should have reached a good level of completion, especially for user facing parts of the UI.
* Localization team has demonstrated a consistent effort, being able to keep up for at least a couple of cycles with the incoming flow of new strings.
* L10n-drivers have performed testing of the builds on different operative systems without identifying critical issues.
* There is a relevant number of users on the Nightly channel. This number varies based on the language, for minority languages 10-20 users is a good result. Also, a trend showing growth is important as well.
* [Set up searchplugins](../searchplugins/setup_searchplugins.md), if configuration was not completed before enabling Nightly builds.
* Make sure that `MOZ_LANG_TITLE` in `toolkit/defines.inc` has the correct value, since it’s used to set up the language pack on AMO.

To track this work, you need to file a bug in Firefox::Build Config (like [this example](https://bugzilla.mozilla.org/show_bug.cgi?id=1359321)), blocking the original tracking bug for the locale (`fx-l10n-LOCALE`).

## Verify language name

The language name associated to the locale code is displayed in a few places in Firefox interface (language settings for web content, contextual menu for dictionaries). The language name needs to be defined in:
* [languageNames.ftl](https://searchfox.org/mozilla-central/source/toolkit/locales/en-US/toolkit/intl/languageNames.ftl).
* [mozIntl.jsm](https://searchfox.org/mozilla-central/source/toolkit/components/mozintl/mozIntl.jsm) (in the `availableLocaleDisplayNames` constant, `language` [set](https://searchfox.org/mozilla-central/rev/131338e5017bc0283d86fb73844407b9a2155c98/toolkit/components/mozintl/mozIntl.jsm#451)).

## Add locale to build configuration

First of all make sure that your environment is [correctly set up](../../tools/mercurial/setting_mercurial_environment.md), update your local mozilla-unified clone and make sure it’s on the `central` bookmark:

```BASH
$ cd ~/mozilla/mercurial/mozilla-unified
$ hg pull -u
$ hg up central
```

The file to modify is in `browser/locales/shipped-locales`, open it with your text editor of choice.

```BASH
$ atom browser/locales/shipped-locales
```

And add the new locale to the list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**.

After you’ve finished editing the file, check the status of the repository, and the diff. Let’s consider for example the task of adding Urdu (ur).

```BASH
$ hg status
M browser/locales/shipped-locales

$ hg diff
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

`M` in `hg status` indicates that the file has been modified, `+` in `hg diff` that the line has been added. Follow the instructions available in [this document](../../tools/mercurial/creating_mercurial_patch.md) to create a patch, submit it for review, and land it.

You also need to set the `relnote-firefox` flag to `?` in the bug, the suggested comment is `Suggested for release notes: "Locale added: LANGUAGE_NAME (LOCALE_CODE)"`.

## Update language pack settings on AMO

The language pack for the new locale will be uploaded automatically by release automation on *addons.mozilla.org* (starting with the Beta version). A few follow-up manual steps are needed:
* The `Mozilla` account needs to be added as author for the language pack.
* The `target_locale` field needs to be set for the language pack (via Django admin UI).
* The locale needs to be defined in [this JavaScript file](https://github.com/mozilla/addons-frontend/blob/master/src/amo/languages.js).

For the first two steps, an email needs to be sent to AMO administrators (amo-admins(at)mozilla.com).

These steps will make the language pack available in both the [Language Tools](https://addons.mozilla.org/firefox/language-tools/) page and the API used by Firefox to add new languages from preferences.
