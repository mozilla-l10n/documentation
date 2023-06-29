# Adding a new project to android-l10n

Follow the steps below to add new projects to [android-l10n](https://github.com/mozilla-l10n/android-l10n). You will have to coordinate with android-l10n developers and a technical Localization EPM throughout the process.

## Setting up the project in source and l10n repositories

Before anything happens, check that the new project is properly localizable by following the directions in [this section](https://github.com/mozilla-l10n/documentation/blob/main/src/tools/pontoon/adding_new_project.md#adding-a-new-project-on-pontoon). Once the new project exists in its corresponding source repo and is properly localizable, it can then be added to the android-l10n repository.

An Android developer should create a TOML file in their code repository and under it's corresponding project folder (example with Focus [here](https://github.com/mozilla-mobile/firefox-android/tree/main/focus-android)), as well as as a file containing the source strings (example with Focus [here](https://github.com/mozilla-mobile/firefox-android/blob/c718159480512abf370abcfd5aaf54b1d81074d3/focus-android/app/src/main/res/values/strings.xml)). The Firefox for Android repository contains all [current android projects](https://github.com/mozilla-mobile/firefox-android/tree/main).

The `firefox-android` repository currently uses a [single workflow](https://github.com/mozilla-mobile/firefox-android/blob/main/.github/workflows/import-l10n.yml) (GitHub action) to import strings for all projects from `android-l10n`. Sync with mobile developers to make sure that the code to import strings for this project has been added.

On the android-l10n repository side, you will need to set up [import automation](https://github.com/mozilla-l10n/android-l10n/tree/main/.github/workflows) to import strings from the code repository, and the automation will create all needed files in the mozilla-l10n repos. You may need to sync up with a technical localization EPM to set this up.

Once automation is in place, it will extract daily new English strings from the code repository. It's also possible to invoke automation [manually](https://github.com/mozilla-l10n/android-l10n/actions).

## Add the project in Pontoon

Once all of this is done and merged, you can now enable the new project on Pontoon. Instructions for adding new projects can be found [here](https://github.com/mozilla-l10n/documentation/blob/main/src/tools/pontoon/adding_new_project.md#create-the-project).