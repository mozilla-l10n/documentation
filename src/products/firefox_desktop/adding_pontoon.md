# Adding a new locale to Pontoon

* If the locale is not [available](https://pontoon.mozilla.org/teams/) in Pontoon yet, [consult this document](../../tools/pontoon/adding_new_locale.md) for instructions on how to add it.
* Enable the locale for Firefox from the [project admin interface](https://pontoon.mozilla.org/admin/projects/firefox/) by moving your locale from the Available column to the Localizable column.
* Initialize the `toolkit/chrome/global/intl.properties` file with the correct values: ([example](https://github.com/mozilla-l10n/firefox-l10n/commit/a887bff12994779ea8e605f4abc1b240a287ccb9)).
