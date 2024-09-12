# Adding a new locale to Pontoon

* If the locale is not [available](https://pontoon.mozilla.org/teams/) in Pontoon yet, [consult this document](../../tools/pontoon/adding_new_locale.md) for instructions on how to add it.
* Create a subfolder using the locale code (e.g. `/skr`) in ([firefox-l10n](https://github.com/mozilla-l10n/firefox-l10n)) and push at least one change to the repository, otherwise Pontoon will not pick it up during sync. The safest change is to initialize the `toolkit/chrome/global/intl.properties` file with the correct values ([example](https://github.com/mozilla-l10n/firefox-l10n/commit/a887bff12994779ea8e605f4abc1b240a287ccb9)).

Once the repository is available and contains at least one commit, the locale can be added to the Firefox project in Pontoon.
