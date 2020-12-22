# Removing projects from android-l10n

Below are listed the steps to follow in order to safely remove projects from [android-l10n](https://github.com/mozilla-l10n/android-l10n).

## Contact Release Engineering

The first thing to do is to request from the Release Engineering team (“RelEng”) that they disable automation associated to the [android-l10n project](https://github.com/mozilla-l10n/android-l10n) you want to remove.
Currently, the way to make this request is to send an email directly to RelEng (“Aki” and “Mihai”).
This step will help ensure that any automation linked to this product will be discontinued, as it will remove all config/automation/localizable files and prevent future updates to release.

## RelEng files a PR

RelEng will then create a PR in the [android-l10n-tooling GitHub repository](https://github.com/mozilla-l10n/android-l10n-tooling). Make sure to wait for that PR to be merged by RelEng before continuing to the next steps, since otherwise, automation will not have been stopped.

Example PR for the removal of Firefox for Fire TV product: https://github.com/mozilla-l10n/android-l10n-tooling/pull/29

## Stop sync for the android-l10n project in Pontoon

In order to disable sync in Pontoon, log in to [the admin view of android-l10n](https://pontoon.mozilla.org/admin/projects/android-l10n/), scroll to the bottom of the page, and click on “sync disabled” on the left.
This will ensure that the project stops syncing between Pontoon and the GitHub android-l10n repository, in order to safely remove it from the repo, and avoid any possible conflicts between files.

## Remove - and update - android-l10n GitHub files
* Remove the entire project folder
* Delete pertaining project .json file contained within the [_meta folder](https://github.com/mozilla-l10n/android-l10n/tree/master/_meta)
* Remove corresponding project lines contained within the [config.toml](https://github.com/mozilla-l10n/android-l10n/blob/master/config.toml)
* Remove corresponding project lines contained within the [l10n.toml](https://github.com/mozilla-l10n/android-l10n/blob/master/l10n.toml)

Example PR that does all of this for Fire TV: https://github.com/mozilla-l10n/android-l10n/pull/289

## Remove the project tag in Pontoon
Go to the [admin view of android-l10n](https://pontoon.mozilla.org/admin/projects/android-l10n/), scroll to the bottom of the page, and remove the product under the “Tags” section.
This ensures that the project will not be listed under “Tags” along with other active android-l10n projects in Pontoon.

## Re-enable sync in Pontoon
Log in to the [admin view of android-l10n](https://pontoon.mozilla.org/admin/projects/android-l10n/), scroll to the bottom of the page, and click on “sync enabled” on the left.
