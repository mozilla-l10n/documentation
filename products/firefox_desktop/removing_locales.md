# Removing a locale from Firefox for desktop

Removing a locale from Firefox builds should be the last step in a long series of passages. A locale is removed when:
* There’s no visible activity in Pontoon for a year.
* The translation level of Firefox is dropping, causing a good portion of the user interface to appear in English.
* Outreach to existing community and locale leaders doesn’t produce results.
* Attempts to find new localizers, via social networks and other tools (e.g. [snippets](https://github.com/mozilla-l10n/localizer-documentation/blob/master/webprojects/snippets.md)), doesn’t find any potential contributors.

## Removing a locale from Nightly

If a locale is only shipping in Nightly, it’s enough to remove the locale from build configuration.

The process is identical to the one use to [add a new locale](adding_nightly.md#add-new-locale-to-build-configuration), just removing the locale code from `browser/locales/all-locales`.

Locale also needs to be removed from [Ship It](https://github.com/mozilla-releng/ship-it/blob/master/README-l10n.md).

## Removing a locale from Beta and Release

Removing a locale already shipping in official builds (Beta, Release) is a much more complex process. These are the steps:
* [Check usage statistics](#check-usage-statistics).
* [Redirect existing users to another locale](#redirect-existing-users-to-another-locale).
* [Remove locale from Beta builds](#remove-locale-from-beta-builds).

Mercurial repositories and Bugzilla components are not removed when dropping a locale.

Given the number of teams and processes involved, a **tracking bug should be filed** ([example](https://bugzilla.mozilla.org/show_bug.cgi?id=1304743)).

### Check usage statistics

Existing users for this locale need to be moved to another language, otherwise they would remain forever on an obsolete build. The first step is to determine the current usage statistics:
* Check the number of ADIs for this locale on [Tableau](https://dataviz.mozilla.org/#/views/LocalizedFirefoxDesktopADI/LocalizedFirefoxDesktopADI).
* Check usage on Telemetry using a [query similar to this one](https://sql.telemetry.mozilla.org/queries/4237).

If the locale has a significant userbase (in the hundreds of users), you need to determine the best locale to fall back to. Possible sources of information are:
* Wikipedia page for the language to determine where it’s spoken, and if there are other languages commonly spoken in the area.
* [Tableau](https://dataviz.mozilla.org/#/views/LocalizedFirefoxDesktopADI/LocalizedFirefoxDesktopADI) for the language distribution in these countries.

You also need to verify with Business Development if there are **contractual obligations regarding search engines**.

For example, Belarusian was recently removed from builds:
* [Belarusian](https://en.wikipedia.org/wiki/Belarusian_language) is the official language of Belarus. The Wikipedia page also has information about the number of people speaking both Russian and Belarusian in the region.
* Russian is an official language of Belarus.
* Russia has a low percentage of [population speaking English](https://en.wikipedia.org/wiki/List_of_countries_by_English-speaking_population).

For these reasons, Russian was selected as the best fall back language for Belarusian. Unfortunately, sources might not always point into the same direction, in some cases en-US might be the only viable option.

### Redirect existing users to another locale

Once identified the language to fall back to, a bug needs to be [filed in Release Engineering::Releases](https://bugzilla.mozilla.org/enter_bug.cgi?product=Release%20Engineering&component=Releases) to redirect users via update snippets. An example of such bug is [available here](https://bugzilla.mozilla.org/show_bug.cgi?id=1304747).

### Remove locale from Beta builds

The process is identical to the one use to [add a new locale](adding_release.md#add-locale-to-build-configuration), just removing the locale code from `browser/locales/shipped-locales` in Beta. The change will ride the train to Release at the end of the cycle.
