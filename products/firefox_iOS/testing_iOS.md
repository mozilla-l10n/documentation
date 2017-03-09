# Testing on iOS for a new release
We currently rely on screenshots for testing. These are provided on the [dev.l10n mailing list](https://lists.mozilla.org/listinfo/dev-l10n), which you should follow if you are working on l10n for any of the existing Mozilla products (otherwise you are missing crucial information and updates).

## Testing with screenshots
Screenshots are currently provided by the iOS team on dev.l10n, and the usual link where you can check out the latest versions can be found [right here](https://people-mozilla.org/~sarentz/fxios/screenshots/).

## Test builds
These are currently not set-up anymore - we are working with the iOS team to get them going again. Stay tuned!

## What to look out for
* Language quality
* Truncated words (cut-off from screen)
* Anything that appears broken on the UI
* Check out at all the main screens, UI, menus, tabs, new features, etc. Make sure these all look good, that everything is properly translated and appears as expected
* Font support

## Testing a brand new locale
When a locale is brand new, we work through Bugzilla to process sign-offs on l10n testing.

The l10n Mobile Project Manager will open up a meta bug for this and attach all needed bugs under their corresponding component. Closing the bug as resolved-fixed will signal that a locale is signing-off on testing, and good to go for release.

Details concerning all this are always announced on the [dev.l10n mailing list](https://lists.mozilla.org/listinfo/dev-l10n).
