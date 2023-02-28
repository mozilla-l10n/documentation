# Reviewing strings for a new release of Mozilla Android products

Usually, a new release of our Android products requires updates to strings. Mobile developers will land strings in the code repository throughout the release cycle, and pull requests will be opened by GitHub automation in the [android-l10n](https://github.com/mozilla-l10n/android-l10n) repository to expose these strings for localization in Pontoon.

The pull requests, tagged as `l10n-bot`, are then reviewed by an l10n-driver - most often by the PM in charge of the project.

Let’s go over some of the steps needed over time in order to review strings correctly for a new release.

## Reviewing the PR

Let's consider Firefox for Android as an example - in fact, these apply to other Android products as well, and they also follow the same train schedule. During the [Android l10n cycle](https://docs.google.com/spreadsheets/d/1hER_w7pOsWSjeBaUqMd_9ClYCCGlwc4jaFYpcBvFE8g/edit#gid=1960046531), automation will create pull requests, in order to land new strings for the upcoming release.

Let’s consider a past PR [here](https://github.com/mozilla-l10n/android-l10n/pull/606/files). `values/strings.xml` is the file containing all needed string updates.

### Acceptable changes

The first [string change](https://github.com/mozilla-l10n/android-l10n/pull/606/files#diff-b8d7151f11faa90ad8cfbb96437f96d05602954aa79c1145cb3232f6a5eb6d38R701) adds attributes: `moz:RemovedIn="111" tools:ignore="UnusedResources"` to an existing string. You can ignore this kind of changes, as they will not affect localization. They are a reminder for mobile developers that they will be safely able to delete a string once it has finished riding the Nightly/Beta/Release train, and is no longer needed in an upcoming version. More details [here](https://github.com/mozilla-mobile/fenix/wiki/Removing-strings).

Changes to comments are irrelevant in terms of string updates, so they’re also OK.

The general review of strings, such as [this one](https://github.com/mozilla-l10n/android-l10n/pull/606/files#diff-b8d7151f11faa90ad8cfbb96437f96d05602954aa79c1145cb3232f6a5eb6d38R704), is similar to the review process used in other Mozilla products.

Things to look out for:
* Unclear strings and missing localization comments: the best way to identify them is to translate the strings, only having the string and comment as context (not the entire file, or the associated bug). For example: is the word used both a noun and a verb in English? Is the ID clear enough to give context (e.g. `buttonLabel`)?
* String changes without new IDs. IDs in XML files are stored in the `name` attribute; for example, the ID of [this string](https://github.com/mozilla-l10n/android-l10n/pull/391/files#diff-b8d7151f11faa90ad8cfbb96437f96d05602954aa79c1145cb3232f6a5eb6d38R223) is `browser_menu_customize_home`. This type of issue, together with misused characters, is reported by Checks running automatically on pull requests.
* Duplicated strings.
* Other general [localization issues](https://mozilla-l10n.github.io/documentation/localization/dev_best_practices.html).

In case of issues, you can comment and CC the developer who introduced the string(s). This can be done directly in the corresponding `mozilla-l10n` GitHub PR where your review has taken place.

## Wrapping up your work

So you’ve reviewed the strings during the cycle, and the PR looks good - this means you can now merge the PR so the strings get exposed in Pontoon.

Pontoon ([here for Firefox for Android](https://pontoon.mozilla.org/projects/firefox-for-android/) and [here for Focus for Android](https://pontoon.mozilla.org/projects/focus-for-android/)) should get the new strings automatically after a few minutes, but it’s always a good idea to double check just in case.

One last thing is to not forget to update the l10n completion deadline under Pontoon resources for each product.
