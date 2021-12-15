# Adding new locales to specific projects

These are instructions in order to add new locales to Android mobile products living within the [android-l10n project](https://github.com/mozilla-l10n/android-l10n/).

## Edit the l10n.toml file(s)

All android-l10n products live within the [android-l10n project](https://github.com/mozilla-l10n/android-l10n/). Depending on the product that requires a new locale to be added, the corresponding l10n.toml file will have to be edited by adding the new locale code in it.

The l10n.toml files live in their corresponding project folder, located here for:
* [Fenix](https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/fenix/l10n.toml)
* [Android-Components](https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/android-components/l10n.toml)
* [Focus for Android](https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/focus-android/l10n.toml)
* [Lockwise for Android](https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-lockwise/lockwise-android/l10n.toml)

Each l10n.toml file typically looks like this:

```
basepath = "."

locales = [
    "ab-CD",
    "an",
    "ar",
    "as",
    "ast",
    "az",
...
]

# Expose the following branches to localization
# Changes to this list should be announced to the l10n team ahead of time.
branches = [
    "main",
]

[env]

[[paths]]
  reference = "app/src/main/res/values/strings.xml"
  l10n = "app/src/main/res/values-{android_locale}/strings.xml"
```

Identify the `locales` section, add the desired new locale code in this  list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**.

Save your edited file, then commit and push from your branch to the android-l10n repository.

Note that all products share strings with Android Components, so you will also have to edit the Android Components l10n.toml file and add the new locale there.

## Add new locales to Pontoon

Once the patch has landed, the new locale has to be added in Pontoon as well. The steps to follow can be found in the existing [Pontoon documentation here](../../tools/pontoon/adding_new_locale.md).

Note that the next string quarantine PR coming from the `mozilla-mobile` repository will probably show these locales as removed from their corresponding mobile `l10n.toml` file (example of Fenix `l10n.toml` [here](https://github.com/mozilla-mobile/fenix/blob/main/l10n.toml), and more information about string quarantine PRs [here](review_android_strings.md)).
In fact, you will need to wait until the next l10n import to see these locales as added.
You can know the status of l10n imports by checking commit history, for example [here](https://github.com/mozilla-mobile/fenix/commits/main) for Fenix. They are usually entitled `import l10n`. Do not merge the quarantine PR until the `l10n.toml` file shows the locales as added.
