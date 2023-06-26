# Reviewing strings for a new release of Mozilla iOS products

Usually, a new release of our iOS products means an update to strings. Like for Android products, mobile developers will land strings in their respective code repositories throughout the release cycle, and pull requests will be opened by GitHub automation in the iOS repositories to expose these strings for localization in Pontoon (either under the [firefoxios-l10n](https://github.com/mozilla-l10n/firefoxios-l10n) or the [focusios-l10n](https://github.com/mozilla-l10n/focusios-l10n) repositories in `mozilla-l10n`). Automation will try to import strings twice a week (Tuesdays and Thursdays), but it's also possible to manually trigger a string import to the `mozilla-l10n` repository any time by going to the GitHub `Actions` section of the l10n repository and then importing strings again by running the string import workflow. It is always a good idea to import strings right before you review a PR, in case changes have been made in the meantime in the source repository. Example for Firefox for iOS [here](https://github.com/mozilla-l10n/firefoxios-l10n/actions/workflows/import_strings.yml).

At this point, the PR is reviewed by an l10n-driver - most often by the PM in charge of mobile projects.

Let’s go over some of the steps needed over time in order to review correctly strings for a new release.

## Reviewing the PR

Let's consider Firefox for iOS as an example. As a matter of fact, the iOS release cycles follow closely the Android and Firefox desktop calendar, which can be found [here](https://whattrainisitnow.com). During the release cycle, automation will create pull requests as explained in the section above, in order to land strings for the upcoming release.

Let’s consider a past PR, [here](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192).

The first thing you’ll want to do is to check the changes to the [/templates folder](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192/files#diff-6f29eb799be1b575316c0187d69a38fce3c63e27e5a22eb180b338ee177e9cae).

### Acceptable changes

Changes to attributes like `tool-version` and `build-num` are expected, they happen every time you change the version of Xcode. Seeing `datatype="plaintext"` move to the end of `file original` is also acceptable, such as [here](https://github.com/mozilla-l10n/firefoxios-l10n/pull/195/files#diff-6f29eb799be1b575316c0187d69a38fce3c63e27e5a22eb180b338ee177e9caeL3529).

Note that these will not appear as new strings for localizers and they will not need to touch them.

Changes to comments (`<note>`) are irrelevant in terms of string updates, so they’re also OK.

### Potentially problematic changes

Then you start scrolling down, checking if the new strings make sense: the first one you find is `CreditCard.DisplayCard.ExpiresLabel.v115`.

Things to look out for:
* Unclear strings and missing localization comments: the best way to identify them is to translate the strings, only having the string and comment as context (not the entire file, or the associated commit where the string landed). For example: is the word used both a noun and a verb in English? Is the ID clear enough to give context (e.g. `buttonLabel`)?
* String changes without new IDs. IDs in XLIFF files are stored in the `trans-unit` attribute; for example, the ID of [this string](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192/files#diff-6f29eb799be1b575316c0187d69a38fce3c63e27e5a22eb180b338ee177e9caeR3201) is `CreditCard.DisplayCard.ExpiresLabel.v115`.
* Duplicated strings.
* Other general [localization issues](https://mozilla-l10n.github.io/documentation/localization/dev_best_practices.html).

### Quickly review other locales

Once you’ve checked `templates`, you can pick at least one locale and see what changes, as you can see [for example here](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192/files#diff-220a1dc4ddc01bbae6a176ba4122aa644042181c78a638b052f45462b758ca6f).

Checking another locale helps to easily spot if there are any file removals that might be deleting entire sections of existing translations. It can also help spot instances where existing translations are accidentally removed or reverted. See for example this [past PR](https://github.com/mozilla-l10n/firefoxios-l10n/pull/124), where engineers did not import the latest localizations before exporting again strings from their code repository side.

Any time you are unsure about deletions, pinging an iOS developer is recommended.

## Reviewing strings during the cycle

You should try to check out the strings landing, and try to localize them in your head: how would you translate them? Would you be able to do it without the app? Is the localization comment clear enough? The section above explains what else to look out for and to keep in mind while your review.

You might also need to identify the commit that added that string, see if there are screenshots, or ask if the iOS team can provide one. The point below explains how to find that commit.

### How to find the code that introduced a string

Let’s consider an example of new strings for Firefox for iOS, with [this past PR](https://github.com/mozilla-l10n/firefoxios-l10n/pull/192).

The ID is `CreditCard.DisplayCard.ExpiresLabel.v115`, the label `Expires`.
Imagine there is no localization comment there, you will want to know which GitHub PR introduced this string, and who was the author.

In fact currently, the only strings that can not have localization comments are strings that are located in `InfoPlist.strings` and `Info.plist` - see [Bug 1277515](https://bugzilla.mozilla.org/show_bug.cgi?id=1277515) for more details. Otherwise, strings should always have localization comments.

So first you open the [main repository page](https://github.com/mozilla-mobile/firefox-ios).

Then you use the search box at the top, searching for the [string ID (or the string)](https://github.com/search?q=repo%3Amozilla-mobile%2Ffirefox-ios%20CreditCard.DisplayCard.ExpiresLabel.v115&type=code).

Then to the left, filter by `Pull Requests`. This should bring you to the Pull Request were the string was introduced, as well as the author of the string.

If there are no PRs associated to the string, instead click on the link to the right finishing by `/Strings.swift`, to open up (in this case) [this file](https://github.com/mozilla-mobile/firefox-ios/blob/4bba2a088f0e5795dca89c10b3194dd97f3c2621/Client/Frontend/Strings.swift#L250). Then use the `Blame` [link on top](https://github.com/mozilla-mobile/firefox-ios/blame/4bba2a088f0e5795dca89c10b3194dd97f3c2621/Client/Frontend/Strings.swift#L250). On the left, you should (almost always) find the GitHub PR that introduced the string and its author.

You can then CC directly the author of the string in the new strings PR that arrived in the `mozilla-l10n` repository, and ask for a fix there.

## Wrapping up your work

So you’ve reviewed the strings, and the PR looks good - this means you can now merge the PR so the strings get exposed in Pontoon.

Pontoon ([here for Firefox for iOS](https://pontoon.mozilla.org/projects/firefox-for-ios/) and [here for Focus for iOS](https://pontoon.mozilla.org/projects/focus-for-ios/)) should get the new strings automatically after a few minutes, but it’s always a good idea to double check just in case.

One last thing is to not forget to update the l10n completion deadline under Pontoon resources for each product.