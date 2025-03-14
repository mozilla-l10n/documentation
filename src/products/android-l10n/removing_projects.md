# Removing a project from android-l10n

Follow the steps below to safely remove a project from [android-l10n](https://github.com/mozilla-l10n/android-l10n).

## Remove import automation

TaskCluster is used to import translations to [`autoland`](https://hg.mozilla.org/integration/autoland/). Sync with release engineering to make sure that the automation to import strings for this project has been removed.

## Disable the project in Pontoon

In order to disable a project in Pontoon, visit the admin page for the project (e.g. [Firefox for Android](https://pontoon.mozilla.org/admin/projects/firefox-for-android/), [Focus for Android](https://pontoon.mozilla.org/admin/projects/focus-for-android/), etc.) and scroll to the bottom of the page. Click the `Disabled` checkbox on the left and then `Save Project`. The project will no longer be visible to localizers and will stop syncing to the `android-l10n` repository. After this, it’s safe to remove the project from the repository.

## Remove android-l10n files

* Remove [GitHub workflow](https://github.com/mozilla-l10n/android-l10n/tree/main/.github/workflows) associated with the project.
* If available, remove TOML files associated to the project in the root of the repository (e.g. `focus.toml` for `Focus for Android`).
* Remove the entire project folder.
