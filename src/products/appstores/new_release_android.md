# Firefox for Android - Manage a new release

When creating a new release, normally the *What’s new* section needs to be moved from Beta to Release, and there are new strings to expose for the Beta channel.

In this example:
* *What’s new* strings for the current Release is stored in `fx_android/whatsnew/android_46.lang`.
* *What’s new* strings for the current Beta is stored in `fx_android/whatsnew/android_47.lang`.

The actions to perform are:
* Create a new file `fx_android/whatsnew/android_48.lang` for the upcoming Beta version.
* Update comment references in `fx_android/whatsnew/android_47.lang`, moving from Beta to Release.
* Track the files in both Langchecker and Stores apps.

This document assumes that you have set up the system as explained in [this document](../../config/setup_l10ndrivers_vm.md), so aliases like `lang_update` are available, repositories are already cloned in `~/mozilla/repositories`, Atom is available and includes the syntax highlighter for LANG files.

**IMPORTANT:** Remember to run `gitup` before you do anything. If you run the command in the middle of the work, don’t forget to go back to the branch (it will checkout `master` for all repositories).

## Create the new .lang files for Beta and Release

For all changes you need to create branches and then open pull requests.

In this case you’re creating a branch **beta48** in the `appstores` repository, and editing in Atom the reference en-US file.

```BASH
$ cd ~/mozilla/repositories/appstores/
$ git branch beta48
$ git checkout beta48
$ atom en-US/fx_android/whatsnew/android_48.lang
```

This is the content of the new file (strings are communicated by Release Driver, about a week before the release date).

```
## NOTE: These strings are displayed on Google Play in the What’s new section for Firefox 48 beta
## NOTE: See https://l10n.mozilla-community.org/stores_l10n/locale/fx_android/beta/


;Content Notifications for infrequent websites
Content Notifications for infrequent websites


;Suggest “Add to home screen” for frequently used websites
Suggest “Add to home screen” for frequently used websites


;Migrate reading list to bookmarks
Migrate reading list to bookmarks
```

Now update the initial content of `en-US/fx_android/whatsnew/android_47.lang`, replacing references to `beta` with `release`. For example, from:

```
## NOTE: These strings are displayed on Google Play in the What’s new section for Firefox 47 beta
## NOTE: See https://l10n.mozilla-community.org/stores_l10n/locale/fx_android/beta/
```

to:

```
## NOTE: These strings are displayed on Google Play in the What’s new section for Firefox 47
## NOTE: See https://l10n.mozilla-community.org/stores_l10n/locale/fx_android/release/
```

These files will be committed later to the repository, since they’re still not tracked in Langchecker.

## Track the files in dashboards updating Langchecker

You then need to start tracking these files in Langchecker. The process is described in detail in [this document](../../tools/webdashboards/add_new_file.md).

Again, you need to create a branch in the langchecker repository.

```BASH
$ cd ~/mozilla/git/langchecker/
$ git branch beta48
$ git checkout beta48
$ atom app/config/sources.inc.php
```

At this point you’re ready to add the new files to `$appstores_lang`. The easiest way is to start by identifying the files used for the previous cycle. For example, if you’re adding 48 Beta and promoting 47 to release, identify files for 47 Beta and 46 Release:

```PHP
$appstores_lang = [
    ...
    'fx_android/whatsnew/android_46.lang' => [
        'deadline'          => '2016-04-26',
        'supported_locales' => $fx_android_store,
    ],
    'fx_android/whatsnew/android_47.lang' => [
        'supported_locales' => $fx_android_store,
    ],
```

What you’ll need to do is:
* Add the new file for 48 Beta (`fx_android/whatsnew/android_48.lang`).
* Remove the deadline from the previous release and add it to the new file.

```PHP
$appstores_lang = [
    ...
    'fx_android/whatsnew/android_46.lang' => [
        'supported_locales' => $fx_android_store,
    ],
    'fx_android/whatsnew/android_47.lang' => [
        'deadline'          => '2016-06-07',
        'supported_locales' => $fx_android_store,
    ],
    'fx_android/whatsnew/android_48.lang' => [
        'supported_locales' => $fx_android_store,
    ],
```

The previous release (46) is not obsolete yet, you can mark it as such the next time you update the file. The result would be:

```PHP
$appstores_lang = [
    ...
    'fx_android/whatsnew/android_46.lang' => [
        'flags' => [
            'obsolete' => ['all'],
        ],
        'supported_locales' => $fx_android_store,
    ],
```

As a general rule, there should be only two non obsolete release files near the end of the cycle.

Now you can commit your changes to Langchecker. Always check with `git status` to confirm that you’re only including changes to `sources.inc.php`.

```BASH
$ cd ~/mozilla/git/langchecker/
$ git add app/config/sources.inc.php
$ git commit -m "Track AppStores files for 47 and 48 beta"
$ git push origin beta48
```

## Commit .lang files to the appstores repository

Now you’re ready to copy the new files to all locales, and propagate all comment changes to `fx_android/whatsnew/android_47.lang`:

```BASH
$ lang_update all 12 all
```

Check your local installation of langchecker for errors by visiting http://localhost/langchecker/?action=errors

If there are no errors, check the status of this repository with `git status`, and the content of the new files for at least one locale, to confirm that strings were imported correctly.

```BASH
$ cd ~/mozilla/repositories/appstores/
$ git add .
$ git commit -a -m "Add new Google Play files for Firefox 47 and 48 Beta"
$ git push origin beta48
```

Note that you need to explicitly add the files with `git add`, since most of them are not tracked yet.

## Updating the list of supported locales

Before you start working on stores_l10n, remember to run the `app/scripts/update_shipping_locales.py` script in the `~/mozilla/git/stores_l10n/` directory, as this project is used to keep track of which locales ship in each version of supported apps (Firefox for Android/iOS, Focus for Android/iOS). You can use the same branch for running the script, then adding strings to templates (explained in the next section).

In fact, as a general rule, you should periodically run this script - especially before starting to work on stores_l10n. If the script changes the list of locales:
* Run `lang_update all 12 all` to add missing files in the `appstores` repository.
* Check in Pontoon if the new locales already have the [Appstores](https://pontoon.mozilla.org/projects/appstores/) project enabled. If not, you will have to add the locale in the Admin interface, but only **after files have been added** to the repository, i.e. all branches have been merged.

## Add strings to templates in stores_l10n

Now you need to use the new files and strings in stores_l10n. Again, you’re going to work on a branch.

```BASH
$ cd ~/mozilla/git/stores_l10n/
$ git branch beta48
$ git checkout beta48
$ atom app/classes/Stores/Project.php
```

The variable to update is `$template`. From:

```PHP
public $templates = [
    'fx_android' => [
        'release' => [
            'template' => 'fx_android/release/listing_apr_2016.php',
            'langfile' => 'fx_android/description_release.lang',
            'whatsnew' => 'fx_android/whatsnew/android_46.lang',
            ],
        'beta' => [
            'template' => 'fx_android/beta/listing_may_2015.php',
            'langfile' => 'fx_android/description_beta.lang',
            'whatsnew' => 'fx_android/whatsnew/android_47.lang',
            ],
    ],
```

To:

```PHP
public $templates = [
    'fx_android' => [
        'release' => [
            'template' => 'fx_android/release/listing_apr_2016.php',
            'langfile' => 'fx_android/description_release.lang',
            'whatsnew' => 'fx_android/whatsnew/android_47.lang',
            ],
        'beta' => [
            'template' => 'fx_android/beta/listing_may_2015.php',
            'langfile' => 'fx_android/description_beta.lang',
            'whatsnew' => 'fx_android/whatsnew/android_48.lang',
            ],
    ],
```

Then you need to update `app/templates/fx_android/release/listing_apr_2016.php` with the strings for Release, and `app/templates/fx_android/beta/listing_may_2015.php` with the strings for Beta.

At this point open the local installation of stores_l10n available at http://localhost/stores_l10n/ and check both Release and Beta channel. If everything looks good, you can commit and push.

```BASH
$ git commit -a -m "Add new Google Play files for Firefox 47 and 48 Beta"
$ git push origin beta48
```

Now you’re ready to open pull requests for each of the three involved repositories.

If you’re using the l10n-drivers VM, both **langchecker** and **stores_l10n** are forks, so you’ll find them in your user account, e.g. `https://github.com/flodolo/langchecker/`. **appstores**, on the other hand, is a direct clone of the mozilla-l10n repository.
