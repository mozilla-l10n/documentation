# Updating locales for specific projects

These are the instructions to update locales on iOS mobile products, currently living within the [Firefox for iOS project](https://github.com/mozilla-l10n/firefoxios-l10n), and in the [Focus for iOS project](https://github.com/mozilla-l10n/focusios-l10n).

## Prerequisites to adding a locale

First, you will have to check that the locale is available within the iOS system settings. iOS currently supports two tiers of locales, and a locale must be part of one of these two lists in order to ship on Firefox for iOS. Unlike Firefox for Android, there’s no locale switcher included in the app, so it’s possible to ship only locales that are supported by iOS.

To tell if a locale is supported or not, take a look on an actual device, under the Language Settings of the most recent iOS version available. Tier one locales are the ones listed under “iPod/iPhone/iPad Language”, and Tier 2 locales appear under “Other Language” (or “Add Language” if there are already some languages under that list). If a locale doesn’t appear in any of these lists, then it is currently not supported by iOS.

## Updating locales in Pontoon

Once you’ve determined if the locale can be added you must go to Pontoon to update the list of current locales. If the locale is not [available](https://pontoon.mozilla.org/teams/) in Pontoon yet, [consult this document](../../tools/pontoon/adding_new_locale.md) for instructions on how to add it.

In Pontoon, you can add and remove locales from the admin project page: [here](https://pontoon.mozilla.org/admin/projects/firefox-for-ios/) for Firefox for iOS, and [here](https://pontoon.mozilla.org/admin/projects/focus-for-ios/) for Focus for iOS. The project will be availble after the next [Pontoon sync](https://pontoon.mozilla.org/sync/log/).