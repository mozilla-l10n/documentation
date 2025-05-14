# Updating locales for specific projects

These are the instructions to update locales on iOS mobile products, currently living within the [Firefox for iOS](https://github.com/mozilla-l10n/firefoxios-l10n), and in the [Focus for iOS](https://github.com/mozilla-l10n/focusios-l10n) projects.

## Prerequisites to adding a locale

First, you will have to check that the locale is available within the iOS system settings. iOS currently supports two tiers of locales, and a locale must be part of one of these two lists in order to ship on Mozilla products for iOS. Unlike Mozilla products for Android, there’s no locale switcher included in the app, so it’s possible to ship only locales that are supported by iOS.

To check if a locale is supported on iOS, look directly on a device under Language Settings in the latest available iOS version. Tier 1 locales are listed under `iPhone Languages`, while Tier 2 locales appear under `Language Variants`. If a locale isn’t shown in either list, it’s currently not supported by iOS.

## Updating locales in Pontoon

Once you’ve determined if the locale can be added, you must go to Pontoon to update the list of current locales. If the locale is not [available](https://pontoon.mozilla.org/teams/) in Pontoon yet, [consult this document](../../tools/pontoon/adding_new_locale.md) for instructions on how to add it.

In Pontoon, you can add and remove locales from the admin project page: [here](https://pontoon.mozilla.org/admin/projects/firefox-for-ios/) for Firefox for iOS, and [here](https://pontoon.mozilla.org/admin/projects/focus-for-ios/) for Focus for iOS. The project will be available after the next [Pontoon sync](https://pontoon.mozilla.org/sync/).

### Adding locales

Once you have added a new locale in Pontoon, there is nothing more for you to do in order to get the locale into Nightly builds. Once a localizer starts working on Pontoon, translations should be imported back to the source repository every Monday thanks to a cron job defined in the project's corresponding `import-strings.yml` [workflow](https://github.com/mozilla-mobile/firefox-ios/tree/main/.github/workflows). Considering mobile developers then need to review, merge and build, it can take more than a week for a locale to be available in Nightly builds. To check that the locale is correctly set up in the localization repository, check that its corresponding locale folder has been created [here](https://github.com/mozilla-l10n/firefoxios-l10n) for Firefox for iOS and [here](https://github.com/mozilla-l10n/focusios-l10n) for Focus for iOS.

To check that the locale made it into the code repository, there is a script running (note that this method may not always be 100% reliable): [here](https://github.com/mozilla-l10n/firefoxios-l10n#locales-in-build) for Firefox for iOS and [here](https://github.com/mozilla-l10n/focusios-l10n#locales-in-build) for Focus for iOS. A more reliable method would be to look for the pull request that imports translations in the code repository, and verify that it created files for that new locale.

The locale will then ride the trains to release. The iOS release calendar follows closely the Android and Firefox desktop calendar, which can be found [here](https://whattrainisitnow.com/).

### Removing locales

Once you have removed a locale from Pontoon, the existing locale folder then needs to be removed from the localization repository, and all files should also be removed from the code repository.

As a repository owner, you should be able to delete this folder yourself from the `mozilla-l10n` repo. This should be done via pull request, so we can keep track of the removal, in case we'd want to reverse that action.

Then, file an issue on [GitHub](https://github.com/mozilla-mobile/firefox-ios/issues) so that the mobile team can work on removing their corresponding files. Once the issue is filed, and if you don't get any traction after a few days, you can ask for help in the `#firefox-ios-dev` Slack channel.
