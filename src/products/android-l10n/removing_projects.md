# Removing projects from android-l10n

Follow the steps below to safely remove projects from [android-l10n](https://github.com/mozilla-l10n/android-l10n).

## Contact Release Engineering

First, make a request to the Release Engineering team (“RelEng”) to disable the automation associated with the [android-l10n project](https://github.com/mozilla-l10n/android-l10n) you want to remove.
Currently, the way to make this request is to send an email directly to RelEng at releng(at)mozilla(dot)com.
This step will help ensure that any automation linked to this product will be discontinued, as it will remove all config/automation/localizable files and prevent future updates to release.

## RelEng files a PR

RelEng will then create a PR in the [android-l10n-tooling GitHub repository](https://github.com/mozilla-l10n/android-l10n-tooling). Make sure to wait for that PR to be merged by RelEng before continuing to the next steps, since otherwise, automation will not have been stopped.

See [example PR](https://github.com/mozilla-l10n/android-l10n-tooling/pull/29) for the removal of Firefox for Fire TV product.

## Stop sync for the project in Pontoon

In order to disable sync in Pontoon, log in to admin view of the project (e.g. [Firefox for Android](https://pontoon.mozilla.org/admin/projects/firefox-for-android/), [Focus for Android](https://pontoon.mozilla.org/admin/projects/focus-for-android/), etc.) and scroll to the bottom of the page. Click the “Sync Disabled” checkbox on the left and then "Save Project".
This will ensure that the project stops syncing between Pontoon and the GitHub android-l10n repository, in order to safely remove it from the repo, and avoid any possible conflicts between files.

## Remove - and update - android-l10n GitHub files

* Remove the entire project folder
* Delete pertaining project .json file contained within the [_meta folder](https://github.com/mozilla-l10n/android-l10n/tree/master/_meta)
* Remove corresponding project lines contained within the [config.toml](https://github.com/mozilla-l10n/android-l10n/blob/master/config.toml)
* Remove corresponding project lines contained within the [l10n.toml](https://github.com/mozilla-l10n/android-l10n/blob/master/l10n.toml)

See [example PR](https://github.com/mozilla-l10n/android-l10n/pull/289) that does all of this for Fire TV.

## Re-enable sync in Pontoon

Log in to the admin view (e.g. [Firefox for Android](https://pontoon.mozilla.org/admin/projects/firefox-for-android/), [Focus for Android](https://pontoon.mozilla.org/admin/projects/focus-for-android/), etc.) and scroll to the bottom of the page. Click the “Sync Disabled” checkbox on the left and then "Save Project". This will re-enable sync for the project in Pontoon.
