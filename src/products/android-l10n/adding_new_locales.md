
# Adding new locales to specific projects

These are instructions in order to add new locales to Android mobile products living within the android-l10n project.

## Edit the l10n.toml file(s)

All android-l10n products live within the [android-l10n project](https://github.com/mozilla-l10n/android-l10n/). Depending on the product that requires new locales to be added, the corresponding l10n.toml file will have to be edited by adding the new locale(s) code(s) in it.

The l10n.toml files live in their corresponding project folder, located here for:
* Fenix: https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/fenix/l10n.toml
* Android-Components: https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/android-components/l10n.toml
* Firefox for Fire TV: https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/firefox-tv/l10n.toml
* Firefox Reality: https://github.com/mozilla-l10n/android-l10n/blob/master/MozillaReality/FirefoxReality/l10n.toml
* Lockwise for Android: https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-lockwise/lockwise-android/l10n.toml

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
    "master",
]

[env]

[[paths]]
  reference = "app/src/main/res/values/strings.xml"
  l10n = "app/src/main/res/values-{android_locale}/strings.xml"
```

Identify the `locales` section, add the desired new locale(s) code(s) in this  list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**.

Save your edited file, then commit and push from your branch to the android-l10n repository.

Note that all products except Firefox for Fire TV share strings with Android Components, so you will also have to edit the Android Components l10n.toml file and add the new locale(s) there.

## Add new locales to Pontoon

Once the patch has landed, the new locale(s) have to be added in Pontoon as well. The steps to follow can be found in the existing [Pontoon documentation here](https://github.com/mozilla-l10n/documentation/blob/master/src/tools/pontoon/adding_new_locale.md).
