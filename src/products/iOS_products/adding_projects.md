# Adding a new project for iOS

We will go over the steps to set up a new iOS project, using current iOS projects as examples. You will have to coordinate with iOS developers and a technical localization EPM throughout the process.

## Setting up the project in source and l10n repositories

Before anything happens, check that the new project is properly localizable by following the directions in [this section](https://github.com/mozilla-l10n/documentation/blob/main/src/tools/pontoon/adding_new_project.md#adding-a-new-project-on-pontoon).

Note that the existing iOS projects — Firefox for iOS and Focus for iOS — share the same [source repository](https://github.com/mozilla-mobile/firefox-ios) as they have a significant amount of common code.

### Steps to set up a new project

A new repository should be created within the [mozilla-l10n](https://github.com/mozilla-l10n/) GitHub organization, and should be named according to the new iOS project. It will contain locale folders for all latest localized files in .xliff format, as well as the project’s corresponding scripts and workflows (under a `.github` folder). Here are some examples in the [Firefox for iOS](https://github.com/mozilla-l10n/firefoxios-l10n) and [Focus for iOS](https://github.com/mozilla-l10n/focusios-l10n) repositories.

The first step is to make sure we can extract and use files in an .xliff format. For this, iOS developers need to write localizable swift code in Xcode, following iOS development practices.

A GitHub workflow (see examples for [Firefox](https://github.com/mozilla-l10n/firefoxios-l10n/blob/main/.github/workflows/import_strings.yml) and [Focus](https://github.com/mozilla-l10n/focusios-l10n/blob/main/.github/workflows/import_strings.yml)) should be used to extract strings from the en-US code repository, clean up files, and expose them to all locales. In order to provide more autonomy, the workflow to extract strings should run on a regular schedule, but it should also be possible to execute it manually, like it happens for Firefox or Focus. Coordinate with a technical localization EPM to set this up.

You can now enable the new project in Pontoon (see [instructions for adding new projects](https://github.com/mozilla-l10n/documentation/blob/main/src/tools/pontoon/adding_new_project.md#create-the-project)).

Going forward, remember to update the localization completion deadline under Pontoon resources. For existing iOS projects, the deadline falls one day before the *Release Candidate* date of the current [Beta version](https://whattrainisitnow.com/release/?version=beta). They follow the same four-week release cycle as other Firefox browsers, so these deadlines must be updated regularly. When setting up a new project, confirm what type of release cycle it will follow. To update, navigate to the [Pontoon admin](https://pontoon.mozilla.org/admin/) page, select your project, and update the *Target date*.

When a new project is added and announced, you typically reach out to localizers on existing communication channels, so they can opt in for their locale (see [Updating locales](updating_locales.md) for more info).

Note that to remove existing projects, all you have to do is archive the repository under the `mozilla-l10n` organization. You will also have to remove the project from the Pontoon admin interface (example with [Firefox for iOS](https://pontoon.mozilla.org/admin/projects/firefox-for-ios/)).
