# Reviewing strings for a new release of Mozilla Android products

Usually, a new release of our Android products requires updates to strings. Mobile developers land strings in the [`mobile/android`](https://hg.mozilla.org/mozilla-central/file/tip/mobile/android) directory in `mozilla-central` throughout the release cycle, as part of patches that often include additional code changes to other files. Members of the Localization team are designated as blocking reviewers in Phabricator for patches that include string changes. This group, called `android-l10n-reviewers`, ensures that localization reviews are covered. While you (the mobile localization PM) are primarily responsible for reviewing, the group setup allows other members to step in and assist when needed.

This is enforced through a [Herald](https://phabricator.services.mozilla.com/herald/) rule:

* The rule flags a reviewer group (`mobile-l10n-reviewers`).
* The group is added as a blocking reviewer to all patches touching `strings.xml` files for `mozilla-central`:
  * `android-components/components/**/values/strings.xml`
  * `fenix/**/values/strings.xml`
  * `focus-android/**/values/strings.xml`
* The group reviewer is  removable (i.e. it won’t be added back automatically if removed).

You will be notified when the group reviewer is tagged (check with the Localization team to ensure you are part of the review group).

Let’s go over some of the steps needed over time in order to review strings correctly for a new release.

## Reviewing strings

### Phabricator

[Here](https://phabricator.services.mozilla.com/D239505) is an example where the group reviewer was tagged. Navigate to the `strings.xml` file found under the Table of Contents on the left, and click to review it. When this is a new request, you will have the option to comment on the strings and leave a review. If the strings look good, you can navigate to the bottom of the page to “Add Action” and “Accept Revision”. If changes are needed, select “Request Changes”.

Let’s consider Firefox for Android (code named “fenix” in the [`mobile/android`](https://hg.mozilla.org/mozilla-central/file/tip/mobile/android) directory)  as an example — in fact, these apply to other Android products as well, and they also follow the same [train schedule](https://whattrainisitnow.com/).

Let’s consider a past revision [here](https://phabricator.services.mozilla.com/D225047). `values/strings.xml` is the file containing all needed string updates.

#### Acceptable changes

The first string change adds attributes: `moz:RemovedIn=“133” tools:ignore=“UnusedResources”` to an existing string. You can ignore this kind of changes, as they will not affect localization. They are a reminder for mobile developers that they will be safely able to delete a string once it has finished riding the Nightly/Beta/Release train, and is no longer needed in an upcoming version. More details [here](https://firefox-source-docs.mozilla.org/mobile/android/fenix/Working-with-Strings.html).

Changes to comments are irrelevant in terms of string updates, so they’re also OK.

The general review of strings, such as [this one](https://phabricator.services.mozilla.com/D240634), is similar to the review process used in other Mozilla products.

Things to look out for:

* Unclear strings and missing localization comments: the best way to identify them is to translate the strings, only having the string and comment as context (not the entire file, or the associated bug). For example: is the word used both a noun and a verb in English? Is the ID clear enough to give context (e.g. `buttonLabel`)?
* Duplicated strings.
* Other general [localization issues](https://mozilla-l10n.github.io/documentation/localization/dev_best_practices.html).

A [linter](https://searchfox.org/mozilla-central/source/mobile/android/android-components/components/tooling/lint/src/main/java/mozilla/components/tooling/lint/StringLintXmlDetector.kt) runs on mozilla-central and catches a specific set of issues to maintain consistency:

* Misused characters: incorrect ellipsis, incorrect straight quotes, incorrect double quotes.
* Hardcoded brand names (as defined [here](https://searchfox.org/mozilla-central/source/mobile/android/android-components/components/tooling/lint/src/main/java/mozilla/components/tooling/lint/StringLintXmlDetector.kt#106-111)).

You will notice in some string IDs that there are `tools:ignore` attributes:

* `tools:ignore=“UnusedResources”`

This attribute is called out in strings that have been prelanded (so, added to the mobile repository) but are not yet referenced in the code. Once a string is ready for use in a release, developers will remove the UnusedResources value from the attribute, for example see line 1026 in the strings.xml file in [this Phabricator diff](https://phabricator.services.mozilla.com/D240991).

In cases that `tools:ignore=“UnusedResources”`is added to an existing string, check that the  `moz:RemovedIn=”(version number)”` attribute has been added, to ensure the string remains throughout the release cycle until it is officially deprecated (such as in line 1024 in the [same diff](https://phabricator.services.mozilla.com/D240991), with the string removed in Firefox 138).

* `tools:ignore=“BrandUsage”`

Ensure that this attribute is applied when a brand name needs to be hardcoded in a string, which is typically due to survey or experiment constraints. However in most cases, remember that brand names should be replaced with a placeholder, and a localization comment should explicitly call out the placeholder and specify what it will be replaced with at runtime (for example: “%1$s is replaced by the brand name (e.g. Firefox”).

### GitHub

Once the patch lands in `mozilla-central`, a GitHub workflow is used to extract these source strings from [`gecko-dev`](https://github.com/mozilla/gecko-dev), and corresponding pull requests will be opened in the [android-l10n](https://github.com/mozilla-l10n/android-l10n) repository for you to merge (there is also a group reviewer in place, called `l10n-mobile`). These pull requests are tagged as `l10n-bot`.

Note that although you previously reviewed the strings in Phabricator, it’s still a good idea to take a final look at the PR. A linter also runs via [GitHub workflow](https://github.com/mozilla-l10n/android-l10n/blob/main/.github/workflows/reference_linter.yaml) to flag common errors. In some cases — particularly in experiments and surveys — brand names must be hardcoded due to engineering constraints, which can trigger linter errors. However if the new string ID contains the exception `tools:ignore=“BrandUsage”`, automation will update the [linter configuration](https://github.com/mozilla-l10n/android-l10n/blob/main/.github/scripts/linter_config.json) accordingly to add the string to the brand exception and prevent errors.

If automation fails to import exceptions from the XML files, you can manually add an exception to the  [linter\_config.json](https://github.com/mozilla-l10n/android-l10n/blob/main/.github/scripts/linter_config.json) file. To do this, include the string ID displayed in the error log.

In case of issues, you can comment and CC the developer who introduced the strings. This can be done directly in the corresponding `mozilla-l10n` GitHub PR.

These strings will be available for localizers in Pontoon only after the PR is merged, so it’s important to communicate promptly with developers if any fixes are needed.

## Wrapping up your work

So you’ve reviewed the strings during the cycle, and the PR looks good — this means you can now merge the PR so the strings get exposed in Pontoon.

Pontoon ([here for Firefox for Android](https://pontoon.mozilla.org/projects/firefox-for-android/) and [here for Focus for Android](https://pontoon.mozilla.org/projects/focus-for-android/)) should get the new strings automatically after a few minutes, but it’s always a good idea to double-check just in case. Note that `android-components` files are included and localized within the Firefox for Android project on Pontoon.

Remember to update the localization completion deadline under Pontoon resources for each project. For each release, the deadline falls one day before the “Release Candidate” date of the current [Nightly version](https://whattrainisitnow.com/release/?version=nightly). Since android-l10n products follow the same four-week release cycle as other Firefox browsers, these deadlines must be updated regularly. To update, navigate to the [Pontoon admin](https://pontoon.mozilla.org/admin/) page, select your project, and update the “Target date”.
