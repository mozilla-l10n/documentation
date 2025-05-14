# Reviewing strings for a new release of Mozilla iOS products

Usually, a new release of our iOS products means an update to strings. Like for Android products, mobile developers will land strings in their respective code repositories throughout the [release cycle](https://whattrainisitnow.com/), and automation will export these strings to the localization repository, where they will need to be reviewed by a localization EPM before being exposed to localizers on Pontoon (see [Adding projects](adding_projects.md) for more details on the automation used).

It's also possible to manually trigger a string import (`import_strings.yml`) at any time. To do so, go to the GitHub `Actions` section of the relevant localization iOS repository and run the string import workflow.  Manual string imports are useful in cases when developers land new, time-sensitive strings (like for an upcoming release), when updates or fixes in the code need to be pulled in before the next scheduled import, or in cases where you’d like to use a different criterion (described below).

Here are more details on how the automation works ([example](https://github.com/mozilla-l10n/firefoxios-l10n/tree/main/en-US) with Firefox for iOS):

1. Strings are extracted and saved in an `en-US` XLIFF file.
2. The updated `en-US` XLIFF is used as a template. For each locale, existing translations are copied over if all these elements match:
   * `id` attribute of `trans-unit`.
   * `original` attribute of `file`.
   * `source` text.

As a consequence, the default update removes translations if:

* The source text was changed.
* The string was moved from one file to another.

This is not ideal when the change in the source text is trivial, or the string move is caused by code refactoring. For this reason it’s also possible to invoke [automation manually](https://github.com/mozilla-l10n/firefoxios-l10n/actions/workflows/import_strings.yml) and use a different matching criterion:

* `nofile` will copy translations if the ID and source text match, ignoring the file. This is useful to minimize the impact of code refactoring.
* `matchid` will ignore both file and source text, copying translations if the ID matches. This is useful for source changes that don’t require invalidating existing translations.

Once new strings have landed from the source repository, or you have manually triggered an import, the PR is reviewed by a localization staff — most often by the EPM in charge of mobile projects.

Note that there is a linter in place that checks reference strings for common errors. When opening a pull request that touches the `en-US` folder, a GitHub workflow is used to check errors such as misused quotes or ellipsis, and hard-coded brand names. It's possible to add exceptions in the corresponding JSON file (for example [here](https://github.com/mozilla-l10n/firefoxios-l10n/blob/main/.github/scripts/linter_config.json) for Firefox). The linter is also running in the [code repository](https://github.com/mozilla-mobile/firefox-ios/blob/main/.github/workflows/firefox-ios-l10n-linter.yml), for both Firefox and Focus, with their own [exceptions](https://github.com/mozilla-mobile/firefox-ios/tree/main/.github/l10n).

Let’s go over some of the steps needed over time in order to review correctly strings for a new release.

## Reviewing the PR

Let's consider Firefox for iOS as an example. As a matter of fact, the iOS release cycles follow closely the Android and Firefox desktop calendar, which can be found [here](https://whattrainisitnow.com). During the release cycle, automation will create pull requests as explained in the section above, in order to land strings for the upcoming release.

In general, you should try to check out the strings landing, and try to localize them in your head: how would you translate them? Would you be able to do it without the app? Is the localization comment clear enough? Let’s consider a past PR, [here](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192).

The first thing you’ll want to do is to check the changes to the [source string folder](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192/files#diff-6f29eb799be1b575316c0187d69a38fce3c63e27e5a22eb180b338ee177e9cae) (called `templates`).

### Acceptable changes

Changes to attributes like `tool-version` and `build-num` are expected, they happen every time the version of Xcode changes in automation. Seeing `datatype="plaintext"` move to the end of `file original` is also acceptable, such as [here](https://github.com/mozilla-l10n/firefoxios-l10n/pull/195/files#diff-6f29eb799be1b575316c0187d69a38fce3c63e27e5a22eb180b338ee177e9caeL3529).

Note that these will not appear as new strings for localizers and they will not need to retranslate them.

Changes to comments (`<note>`) are irrelevant in terms of string updates, so they’re also OK.

### Potentially problematic changes

Then you start scrolling down, checking if the new strings are clear: the first one you find is `CreditCard.DisplayCard.ExpiresLabel.v115`.

Things to look out for:

* Unclear strings and missing localization comments: the best way to identify them is to translate the strings, only having the string and comment as context (not the entire file, or the associated commit where the string landed). For example: is the word used both a noun and a verb in English? Is the ID clear enough to give context (e.g. `buttonLabel`)?
* String changes without new IDs. IDs in XLIFF files are stored in the `trans-unit` attribute; for example, the ID of [this string](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192/files#diff-6f29eb799be1b575316c0187d69a38fce3c63e27e5a22eb180b338ee177e9caeR3201) is `CreditCard.DisplayCard.ExpiresLabel.v115`.
* Other general [localization issues](https://mozilla-l10n.github.io/documentation/localization/dev_best_practices.html).

### Quickly review other locales

Once you’ve checked `templates`, you can pick at least one other locale and see what changes, as you can see [for example here](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192/files#diff-220a1dc4ddc01bbae6a176ba4122aa644042181c78a638b052f45462b758ca6f). Checking another locale helps to easily spot if there are any file removals that might be deleting entire sections of existing translations.

Any time you are unsure about deletions, pinging an iOS developer is recommended.

### How to find the commit introducing a change

You may also need to identify the commit that introduced a string in order to contact the developer who added it, so they can make the necessary fix. The following section explains how to find that commit.

Let’s consider an example of new strings for Firefox for iOS, with [this past PR](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192).

The ID is `CreditCard.DisplayCard.ExpiresLabel.v115`, the label `Expires`. Imagine there is no localization comment there, you will want to know which GitHub PR introduced this string, and who was the author.

Currently, the only strings that can not have localization comments are strings that are located in `InfoPlist.strings` and `Info.plist` \- see [Bug 1277515](https://bugzilla.mozilla.org/show_bug.cgi?id=1277515) for more details. Otherwise, strings should always have localization comments.

First open the [code repository page](https://github.com/mozilla-mobile/firefox-ios). Then use the search box at the top, searching for the [string ID (or the string)](https://github.com/search?q=repo%3Amozilla-mobile%2Ffirefox-ios%20CreditCard.DisplayCard.ExpiresLabel.v115&type=code). To the left, filter by `Pull Requests`. This should bring you to the Pull Request where the string was introduced, as well as the author of the string.

If there are no PRs associated with the string, instead click on the search results appearing to the right of the "Filter by" selector. Choose the file ending with `/Strings.swift`, to open up (in this case) [this file](https://github.com/mozilla-mobile/firefox-ios/blob/4bba2a088f0e5795dca89c10b3194dd97f3c2621/Client/Frontend/Strings.swift#L250). Then use the `Blame` [link](https://github.com/mozilla-mobile/firefox-ios/blame/4bba2a088f0e5795dca89c10b3194dd97f3c2621/Client/Frontend/Strings.swift#L250) on the top left. Then on the left, you will see the GitHub PR that introduced the string and its author.

If the search doesn't return the expected string (which is common), you can manually locate it in the `/Strings.swift` file ([example](https://github.com/mozilla-mobile/firefox-ios/blob/main/firefox-ios/Shared/Strings.swift) with Firefox for iOS), and click `Blame` on the top left.

You can then CC directly the author of the string in the new strings PR that arrived in the `mozilla-l10n` repository, and ask for a fix there.

## Wrapping up your work

So you’ve reviewed the strings, and the PR looks good — this means you can now merge the PR so the strings get exposed in Pontoon.

The Pontoon project ([here for Firefox for iOS](https://pontoon.mozilla.org/projects/firefox-for-ios/) and [here for Focus for iOS](https://pontoon.mozilla.org/projects/focus-for-ios/)) should get the new strings automatically after a few minutes, but it’s always a good idea to double-check just in case. You can also manually [force sync](https://pontoon.mozilla.org/sync/) the project.

One last thing is to not forget to update the localization completion deadline under Pontoon resources for each product.
