# Updating locales for specific projects

These are the instructions to update locales on iOS mobile products, currently living within the [Firefox for iOS project](https://github.com/mozilla-l10n/firefoxios-l10n), and in the [Focus for iOS project](https://github.com/mozilla-l10n/focusios-l10n).

## Prerequisites to adding a locale

First, you will have to check that the locale is available within the iOS system settings. iOS currently supports two tiers of locales, and a locale must be part of one of these two lists in order to ship on Firefox for iOS. Unlike Firefox for Android, there’s no locale switcher included in the app, so it’s possible to ship only locales that are supported by iOS.

To tell if a locale is supported or not, take a look on an actual device, under the Language Settings of the most recent iOS version available. Tier one locales are the ones listed under “iPod/iPhone/iPad Language”, and Tier 2 locales appear under “Other Language” (or “Add Language” if there are already some languages under that list). If a locale doesn’t appear in any of these lists, then it is currently not supported by iOS.

## Updating locales in Pontoon

Once you’ve determined if the locale can be added you must go to Pontoon to update the list of current locales. If the locale is not [available](https://pontoon.mozilla.org/teams/) in Pontoon yet, [consult this document](../../tools/pontoon/adding_new_locale.md) for instructions on how to add it.

In Pontoon, you can add and remove locales from the admin project page: [here](https://pontoon.mozilla.org/admin/projects/firefox-for-ios/) for Firefox for iOS, and [here](https://pontoon.mozilla.org/admin/projects/focus-for-ios/) for Focus for iOS. The project will be availble after the next [Pontoon sync](https://pontoon.mozilla.org/sync/log/).

### Adding locales

Once you have added a new locale in Pontoon, there is nothing more to do in order to get the locale into Nightly builds. This should happen automatically within 24-48 hours. To check that the locale is indeed now set up in the repository, you can check that its correspoding locale folder has been created [here](https://github.com/mozilla-l10n/firefoxios-l10n) for Firefox for iOS and [here](https://github.com/mozilla-l10n/focusios-l10n) for Focus for iOS.
The locale will then ride the trains to release. The iOS release calendar follows closely the Android and Firefox desktop calendar, which can be found [here](https://whattrainisitnow.com/release/?version=release).

### Removing locales

Once you have removed a new locale from Pontoon, the existing locale folder then needs to be removed from the l10n repository, and all files should also be removed from the code repository.

As a mozilla-l10n code owner, you should be able to delete this folder yourself from the mozilla-l10n repo.

Then, file an issue on Github ([here](https://github.com/mozilla-mobile/firefox-ios) for Firefox for iOS, and [here](https://github.com/mozilla-mobile/focus-ios) for Focus for iOS), so that the mobile team can work on removing their corresponding files. Once the issue is filed, and if you don't get any traction after a few days, you can ask for help in the #mobile-xfnl-leads Slack channel.