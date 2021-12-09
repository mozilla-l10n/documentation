# Reviewing strings for a new release of Mozilla Android products

Usually, a new release of our Android products means an update to strings. If this is the case, pull requests will be made throughout the release cycle by the mobile team, in order to land these new strings in the [android-l10n](https://github.com/mozilla-l10n/android-l10n) repository in `mozilla-l10n`.

The PRs (also marked as `quarantine`) are reviewed by an l10n-driver - most often by the PM in charge of the project.

Let’s go over some of the steps needed over time in order to review strings correctly for a new release.

## Reviewing the PR

Let's consider Firefox for Android as an example - in fact, these apply to other Android products as well, and they also follow the same train schedule. During the [Android l10n cycle](https://docs.google.com/spreadsheets/d/1hER_w7pOsWSjeBaUqMd_9ClYCCGlwc4jaFYpcBvFE8g/edit#gid=1960046531), the Android team will make pull requests, in order to land new strings for the upcoming release.

Let’s consider a past PR [here](https://github.com/mozilla-l10n/android-l10n/pull/391/files).

The first file present is `_meta/mozilla-mobile-fenix.json`. This file is part of a [changeset](https://github.com/mozilla-mobile/fenix/commit/76c0c4ad1425cfd79c25d707921e8185620ad080) from the Fenix repository, and is used to generate the strings in export PRs. Updates to the `main` section are expected and can be ignored.

The second file - `values/strings.xml` - is the actual strings file, containing all needed updates.

### Acceptable changes

The first [string change](https://github.com/mozilla-l10n/android-l10n/pull/391/files#diff-b8d7151f11faa90ad8cfbb96437f96d05602954aa79c1145cb3232f6a5eb6d38R52) adds attributes: `string moz:removedIn="94" name="recently_bookmarked" tools:ignore="UnusedResources"`. You can ignore this kind of changes, as they will not affect localizations. They are a reminder for mobile developers that they will be safely able to delete a string once it has finished riding the Nightly/Beta/Release train, and is no longer needed in an upcoming version. More details [here](https://github.com/mozilla-mobile/fenix/wiki/Removing-strings).

Changes to comments are irrelevant in terms of string updates, so they’re also OK.

The general review of strings, such as [this one](https://github.com/mozilla-l10n/android-l10n/pull/391/files#diff-b8d7151f11faa90ad8cfbb96437f96d05602954aa79c1145cb3232f6a5eb6d38R662), remains about the same as the usual string review process for other Mozilla products.

Things to look out for:
* Unclear strings and missing localization comments: the best way to identify them is to translate the strings, only having the string and comment as context (not the entire file, or the bug). For example: is the word used both a noun and a verb in English? Is the ID clear enough to give context (e.g. `buttonLabel`)?
* String changes without new IDs. IDs in XML files are typically located right below the localization comment, and start with `<string name=`, followed by the string ID in quotes - which is then followed by the actual string. So for example [here](https://github.com/mozilla-l10n/android-l10n/pull/391/files#diff-b8d7151f11faa90ad8cfbb96437f96d05602954aa79c1145cb3232f6a5eb6d38R223), the string ID is `browser_menu_customize_home`.
* Duplicated strings.
* [Localization issues](https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_content_best_practices), like misused plural forms, unclear comments, etc.

In case of issues, you can comment and CC the developer who introduced the string(s) by checking under the corresponding `Commits` section (example [here](https://github.com/mozilla-l10n/android-l10n/pull/391/commits)). This can be done directly in the corresponding `mozilla-l10n` GitHub PR where your review has taken place.

## Wrapping up your work

So you’ve reviewed the strings during the cycle, and the PR looks good - this means you can now merge the PR so the strings get exposed in Pontoon.

Pontoon ([here for Firefox for Android](https://pontoon.mozilla.org/projects/firefox-for-android/) and [here for Focus for Android](https://pontoon.mozilla.org/projects/focus-for-android/)) should get the new strings automatically after a few minutes, but it’s always a good idea to double check just in case.

One last thing is to not forget to update the l10n completion deadline under Pontoon resources for each product.
