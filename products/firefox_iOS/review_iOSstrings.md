# Reviewing strings for a new release of Firefox for iOS

Usually, a new release of Firefox for iOS means an update to strings. If this is the case, a pull request will be made by the iOS team, in order to land these new strings in the [mozilla-l10n firefoxios-l10n repository](https://github.com/mozilla-l10n/firefoxios-l10n).

At this point, the PR is reviewed by an l10n-driver - most often by the PM in charge of the project.

Let’s go over some of the steps needed over time in order to review correctly strings for a new release.

## Reviewing the PR

When you’re getting close to the end of the [Firefox for iOS l10n cycle](https://wiki.mozilla.org/Firefox_for_iOS_Train_Schedule), the iOS team will make a pull request in order to land new strings for the upcoming release.

Let’s consider a past PR, which was done for v6.0:
https://github.com/mozilla-l10n/firefoxios-l10n/pull/19

The first thing you’ll want to do is to check the changes to the /templates folder:
https://github.com/mozilla-l10n/firefoxios-l10n/pull/19/commits/8a8ecbcb748b0f023557d6c1b07e6208a2e953ea

This folder is used by Pootle, and it’s the easiest point to start from, because it doesn’t have translations to make the diff larger and harder to read.

### Acceptable changes

Changes to attributes like tool-version and build-num are expected, they happen every time you change the version of Xcode.

Same for the utf-8 -> UTF-8 at the beginning, and version number bumping to 6.0. Note that these should now be automatically translated (so will not appear as new strings for localizers and they will not need to touch them).

Changes to comments (<note>) are irrelevant in terms of string updates, so they’re also OK.

Remember also that the script converts Unicode literals into UTF-8 characters. Example: https://github.com/mozilla-l10n/firefoxios-l10n/pull/19/commits/713def82602224556d797b46e3f6d611297ee3e3#diff-42d28e544c7a30099950b7a09a69f2caL2289

As you can see, the `&#173;` was not lost - it was converted to the invisible UTF-8 character.

### Potentially problematic changes (removals)

Then you start scrolling down, checking if the new strings make sense: the first one you find is NSCameraUsageDescription.

You mostly need to pay attention to the strings removed. Double-check each time that iOS team clearly realizes that they won’t be able to release updates to v5 (or any v5.x release) once strings are exported.

For example: `Menu.NightModeAction.Title` is removed. If it’s used in v5, and the iOS team plans to release an update to v5 in the future, localizations will miss that string.

### Quickly review other locales

Once you’ve checked `templates`, you can pick at least one locale and see what changes:
https://github.com/mozilla-l10n/firefoxios-l10n/pull/19/commits/a1c041a012e6996bd8bdaec88f21f3c34fe383b0

## Reviewing strings during the cycle

It’s good to keep an eye on the strings landing during the Firefox for iOS cycle. In fact, if you wait to review strings when the PR is already opened, it’s going to be complicated to get a fix in (until [Bug 1270855](https://bugzilla.mozilla.org/show_bug.cgi?id=1270855) is resolved).

You should try to periodically check out the strings landing, and try to localize them in your head: how would you translate them? Would you be able to do it without the app? Is the localization comment clear enough?

You might also need to identify the bug that added that string, see if there are screenshots, or ask if the iOS team can provide one. The point below explains how to find that bug.

### How to find the bug that introduced a string

Let’s consider an example of new strings for Firefox for iOS, with [this past PR](https://github.com/mozilla-l10n/firefoxios-l10n/pull/19).

The ID is `NSCameraUsageDescription`, the label `This lets you take and upload photos`
It doesn’t have a localization comment, which is bad.

In fact currently, the only strings that can not have localization comments are strings that are located in `InfoPlist.strings` and `Info.plist` - see [Bug 1277515](https://bugzilla.mozilla.org/show_bug.cgi?id=1277515) for more details. Otherwise, strings should always have localization comments.

So you open the main repository page:
https://github.com/mozilla-mobile/firefox-ios

And use the search box at the top, searching for the string ID (or the string):
https://github.com/mozilla-mobile/firefox-ios/search?utf8=%E2%9C%93&q=NSCameraUsageDescription

In this case you find two occurrences. The first one is the most interesting, so you open the file:
https://github.com/mozilla-mobile/firefox-ios/blob/978bf46bb680291c61c5d21b6dc26472388a374f/Client/en.lproj/InfoPlist.strings

Then use the `Blame` link on top:
https://github.com/mozilla-mobile/firefox-ios/blame/978bf46bb680291c61c5d21b6dc26472388a374f/Client/en.lproj/InfoPlist.strings

On the left, you should (almost always) find the bug reference:
https://bugzilla.mozilla.org/show_bug.cgi?id=1312842

## Wrapping up your work

So you’ve reviewed the strings during the cycle, and the PR looks good? Wait! Don’t merge it quite yet.

You will need to announce this on [dev.l10n mailing list](https://lists.mozilla.org/listinfo/dev-l10n) as soon as you merge the PR. Prepare your email in advance. Here’s [an example](https://groups.google.com/forum/#!searchin/mozilla.dev.l10n/ios$20v7%7Csort:relevance/mozilla.dev.l10n/oR5u3MdMLgE/952I4eyADAAJ) of what it should contain.

[Pontoon](https://pontoon.mozilla.org/projects/firefox-for-ios/) and [Pootle](https://mozilla.locamotion.org/projects/ios/) should get the new strings automatically, but it’s always a good idea to double check just in case.
