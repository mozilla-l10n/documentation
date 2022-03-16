# Updating locales for specific projects

These are instructions in order to update locales to Android mobile products living within the [android-l10n project](https://github.com/mozilla-l10n/android-l10n/).

## Edit the l10n.toml file(s)

All android-l10n products live within the [android-l10n project](https://github.com/mozilla-l10n/android-l10n/). Depending on the product that requires a locale to be added or removed, the corresponding `l10n.toml` file will have to be edited by updating the list of locale codes in it.

The `l10n.toml` files live in their corresponding project folder, located here for:
* [Fenix](https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/fenix/l10n.toml)
* [Android-Components](https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/android-components/l10n.toml)
* [Focus for Android](https://github.com/mozilla-l10n/android-l10n/blob/master/mozilla-mobile/focus-android/l10n.toml)

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

Identify the `locales` section, add update the desired locale code in this list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**.

Save your edited file, then commit and push from your branch to the android-l10n repository.

Note that all products share strings with Android Components, so you will also have to edit the Android Components `l10n.toml` file and update the locale there.

## Updating locales in Pontoon

Once the patch has landed, the locale has to be added - or removed - in Pontoon as well. The steps to follow can be found in the existing [Pontoon documentation here](../../tools/pontoon/adding_new_locale.md).

One thing to note is that, once you merge the pull request (PR) adding or removing locales in the l10n repository, automation will send that updated list over to the corresponding mobile repository. However use caution, as the next string quarantine PRs you receive might try to undo your changes (example of Fenix `l10n.toml` [here](https://github.com/mozilla-mobile/fenix/blob/main/l10n.toml), and more information about string quarantine PRs [here](review_android_strings.md)).

For some products, the PR needs to be manually reviewed and merged by the mobile team. In the meantime, do not merge the quarantine PRs you receive, and merge them only after they don’t include any more changes to `l10n.toml` files.

You can know the status of l10n imports by checking the commit history in the mobile repository, for example [here](https://github.com/mozilla-mobile/fenix/commits/main) for Fenix. They are usually entitled `import l10n`.
