# Adding a new project to android-l10n

Follow the steps below to add new projects to [android-l10n](https://github.com/mozilla-l10n/android-l10n). You will have to coordinate with android-l10n developers throughout the process.

## Add android-l10n files

Before anything happens, check that the new project is properly localizable by following the directions in [this section](https://github.com/mozilla-l10n/documentation/blob/main/src/tools/pontoon/adding_new_project.md#adding-a-new-project-on-pontoon). Once the new project exists in its corresponding source repo and is properly localizable, you can then add it to the android-l10n repository, working via pull request.

For android-l10n, each project has its own [l10n project configuration](https://moz-l10n-config.readthedocs.io/en/latest/fileformat.html) file, e.g. `mozilla-mobile/android-components/l10n.toml` for `android-components`.

The TOML files in the root of the repository are used in Pontoon:
* `firefox.toml` maps to [Firefox for Android](https://pontoon.mozilla.org/projects/firefox-for-android/), which includes strings from both `fenix` and `android-components`.
* `focus.toml` maps to [Focus for Android](https://pontoon.mozilla.org/projects/focus-for-android/).

When adding a new project, you will therefore have to add a dedicated TOML file to the root repository, such as was done for Focus [here](https://github.com/mozilla-l10n/android-l10n/blob/main/focus.toml).

Then, create a new folder with the new project name under `mozilla-mobile/`, such as was done [here](https://github.com/mozilla-l10n/android-l10n/tree/main/mozilla-mobile).

Create a TOML file in the new project folder, such as was done for Focus [here]. This file should be edited each time a new locale is added, so that it gets picked up by Pontoon.

You can then create an `app/src/main/res` folder within this new project folder, and ask a mobile developer to populate it with the current source strings.xml file (typically in a `values` folder). Once automation is in place, it will extract daily new English strings from the code repository. It's also possible to invoke automation [manually](https://github.com/mozilla-l10n/android-l10n/actions).

## Add import automation to firefox-android

The `firefox-android` repository currently uses a [single workflow](https://github.com/mozilla-mobile/firefox-android/blob/main/.github/workflows/import-l10n.yml) (GitHub action) to import strings for all projects from `android-l10n`. Sync with mobile developers to make sure that the code to import strings for this project has been added.

## Add the project in Pontoon

Once all of this is done and merged, you can now enable the new project on Pontoon. Instructions for adding new projects can be found [here](https://github.com/mozilla-l10n/documentation/blob/main/src/tools/pontoon/adding_new_project.md#create-the-project).