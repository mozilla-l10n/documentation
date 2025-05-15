# Reviewing strings for Android products

Usually, a new release of Mozilla’s Android products requires updates to strings. Android developers land strings in the [`mobile/android`](https://hg.mozilla.org/mozilla-central/file/tip/mobile/android) directory in `mozilla-central` throughout the release cycle, as part of patches that often include additional code changes to other files. Members of the Localization team are designated as blocking reviewers in Phabricator for patches that include string changes, using a group called [android-l10n-reviewers](https://phabricator.services.mozilla.com/tag/android-l10n-reviewers/). While you (the mobile localization EPM) are primarily responsible for reviewing, the group setup allows other members to step in and assist as needed.

This is enforced through a [Herald](https://phabricator.services.mozilla.com/H478) rule:

* The rule flags a reviewer group (`android-l10n-reviewers`).
* The group is added as a blocking reviewer to all patches touching `strings.xml` files for `mozilla-central`:
  * `android-components/components/**/values/strings.xml`
  * `fenix/**/values/strings.xml`
  * `focus-android/**/values/strings.xml`
* The group reviewer is removable (i.e. it won’t be added back automatically if removed).

You will be notified when the group reviewer is tagged (check with the Localization team to ensure you are part of the review group).

Let’s go over some of the steps needed over time in order to review strings correctly.

## Reviewing strings

### Phabricator

[This Phabricator diff](https://phabricator.services.mozilla.com/D239505) is an example where the group reviewer was automatically flagged for review. Navigate to the `strings.xml` file found under the Table of Contents on the left, and click to jump to it. You then have the option to comment on the strings and leave a review. If the strings look good, you can navigate to the bottom of the page to *Add Action* and select *Accept Revision* from the dropdown. If changes are needed, select *Request Changes* instead.

Let’s use Firefox for Android (code name `fenix` in the [mobile/android](https://hg.mozilla.org/mozilla-central/file/tip/mobile/android) directory) as an example, and this [revision](https://phabricator.services.mozilla.com/D225047).

#### Acceptable changes

The first string change only adds attributes — `moz:RemovedIn="133" tools:ignore="UnusedResources"` — to an existing string, and these are not visible to localizers. `moz:RemovedIn` is used to indicate which version of Firefox stopped using the string, so that it can be safely removed from the codebase once that version has shipped to the release channel. `tools:ignore` is used by automation to exclude the string from automated checks. More details are available in the [Android documentation](https://firefox-source-docs.mozilla.org/mobile/android/fenix/Working-with-Strings.html).

Changes to comments for existing strings are acceptable but should be reviewed for accuracy.

The review process for new strings, such as in [this patch](https://phabricator.services.mozilla.com/D240634), is similar to the review process used in other Mozilla products. Things to look out for:

* Unclear strings and missing localization comments: the best way to identify them is to translate the strings, only having the string and comment as context (not the entire file, or the associated bug). For example: is the word used both a noun and a verb in English? Is the ID clear enough to give context (e.g. `buttonLabel`)?
* Duplicated strings.
* Other general [localization issues](https://mozilla-l10n.github.io/documentation/localization/dev_best_practices.html).

A [linter](https://searchfox.org/mozilla-central/source/mobile/android/android-components/components/tooling/lint/src/main/java/mozilla/components/tooling/lint/StringLintXmlDetector.kt) runs in `mozilla-central` and catches a specific set of issues:

* Typography errors:
  * Incorrect ellipsis (3 dots instead of a single Unicode character).
  * Incorrect straight quotes (`'` instead of typographic apostrophe `’`).
  * Incorrect double quotes (`""` instead of `“”`).
* Hardcoded brand names (as defined [here](https://searchfox.org/mozilla-central/source/mobile/android/android-components/components/tooling/lint/src/main/java/mozilla/components/tooling/lint/StringLintXmlDetector.kt#106-111)).
* Comments lacking explicit references to placeables (also referred to as placeholders) like `%s` or `%1$s` when the string uses them. This is set up to enforce developers to explain what replaces these variables at run-time, providing additional context for localizers.

As mentioned before, you will notice `tools:ignore` attributes associated to some strings, e.g. `tools:ignore="UnusedResources"`. This attribute is used for strings that have been pre-landed in the codebase, but are not actually used in the code yet. Once a string is ready for use, developers will remove the `UnusedResources` value from the attribute, for example see line 1026 in the `strings.xml` file in [this Phabricator diff](https://phabricator.services.mozilla.com/D240991).

If `tools:ignore="UnusedResources"`is added to an existing string, check that the `moz:RemovedIn=”(version number)”` attribute is also added, to ensure that the string is removed as soon as possible. See for example line 1024 in the [same diff](https://phabricator.services.mozilla.com/D240991), with the string removed in Firefox 138. That means that the string can be removed from the codebase when Firefox 141 starts the cycle in `mozilla-central`, and Firefox 139 is in release.

`tools:ignore="BrandUsage"` is required when a brand name needs to be hardcoded in a string, which is typically the case for surveys or experiments due to technical constraints. It’s worth noting that, in most cases, brand names should be replaced with a placeholder, and a localization comment should explicitly call out the placeholder and specify what it will be replaced with at runtime (for example: `%1$s is replaced by the brand name (e.g. Firefox)`).

### GitHub

Once the patch lands in `mozilla-central`, a GitHub workflow is used to extract these source strings from [`mozilla-firefox/firefox`](https://github.com/mozilla-firefox/firefox), and open pull requests in the [android-l10n](https://github.com/mozilla-l10n/android-l10n) repository (a group reviewer, called `l10n-mobile`, is automatically flagged for review). These pull requests are tagged as `l10n-bot`.

Note that, although you previously reviewed the strings in Phabricator, it’s still a good idea to take a final look at the content. A linter also runs via [GitHub workflow](https://github.com/mozilla-l10n/android-l10n/blob/main/.github/workflows/reference_linter.yaml) to flag common errors. If the new string contains exceptions like `tools:ignore="BrandUsage"`, automation will update the [linter configuration](https://github.com/mozilla-l10n/android-l10n/blob/main/.github/scripts/linter_config.json) accordingly. If automation fails to import exceptions from the XML files, you can manually add an exception to the linter configuration, including the string ID displayed in the error log.

In case of issues, you can comment in the `android-l10n` pull request and CC the developer who introduced the strings. These strings will be available for localizers in Pontoon only after the pull request is merged, so it’s important to communicate promptly with developers if any fixes are needed.

## Wrapping up your work

So you’ve reviewed the strings during the cycle, and the pull request looks good — this means you can now merge the pull request and expose the strings in Pontoon.

Pontoon ([here for Firefox for Android](https://pontoon.mozilla.org/projects/firefox-for-android/) and [here for Focus for Android](https://pontoon.mozilla.org/projects/focus-for-android/)) should get the new strings automatically after a few minutes, but it’s always a good idea to double-check that the content is imported correctly. Note that `android-components` files are included and localized within the Firefox for Android project.

Remember to update the localization completion deadline under Pontoon resources for each project. For each release, the deadline falls one day before the *Release Candidate* date of the current [Beta version](https://whattrainisitnow.com/release/?version=beta). Since `android-l10n` products follow the same four-week release cycle as other Firefox browsers, these deadlines must be updated regularly. To update, navigate to the [Pontoon admin](https://pontoon.mozilla.org/admin/) page, select your project, and update the *Target date*.
