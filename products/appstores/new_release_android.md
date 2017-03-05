# Firefox for Android - Manage a New Release
When creating a new release, normally the *What’s new* section needs to be moved from Beta to Release, and there are new strings to expose for the Beta channel.

In this example:
* *What’s new* strings for the current Release is stored in `fx_android/whatsnew/android_46.lang`.
* *What’s new* strings for the current Beta is stored in `fx_android/whatsnew/android_47_beta.lang`.

The actions to perform are:
* Create a new file `fx_android/whatsnew/android_48_beta.lang` for the Beta channel.
* Copy strings from `fx_android/whatsnew/android_47_beta.lang` to `fx_android/whatsnew/android_47.lang`.
* Track the files in both Langchecker and Stores apps.

This document assumes that you have set up the system as explained in [this document](/config/setup_l10ndrivers_vm.md), so aliases like `lang_update` are available, repositories are already cloned in `~/mozilla/repositories`, Atom is available and includes the syntax highlighter for LANG files.

**IMPORTANT:** Remember to run `gitup` before you do anything. If you run the command in the middle of the work, don’t forget to go back to the branch (it will checkout `master` for all repositories).

## Create the new .lang files for Beta and Release
For all changes you need to create branches and then open pull requests.

In this case you’re creating a branch **beta48** in the `appstores` repository, and editing in Atom the reference en-US file.

```
$ cd ~/mozilla/repositories/appstores/
$ git branch beta48
$ git checkout beta48
$ atom en-US/fx_android/whatsnew/android_48_beta.lang
```

This is the content of the new file (strings are communicated by mobile marketing).
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

Now create `en-US/fx_android/whatsnew/android_47.lang`, copying the existing beta file and adapting the initial notes.

```
$ cp en-US/fx_android/whatsnew/android_47_beta.lang en-US/fx_android/whatsnew/android_47.lang
$ atom en-US/fx_android/whatsnew/android_47.lang
```

These files will be committed later to the repository, since they’re still not tracked in Langchecker and you will also need to import existing strings.

## Track the files in dashboards updating Langchecker
You then need to start tracking these files in Langchecker. The process is described in detail in [this document](/tools/webdashboards/add_new_file.md).

Again, you need to create a branch in the langchecker repository.
```
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
        'supported_locales' => array_merge($fx_android_store, ['ar']),
    ],
    'fx_android/whatsnew/android_47_beta.lang' => [
        'supported_locales' => $fx_android_store,
    ],
```

What you’ll need to do is:
* Add the two new files for 48 Beta (`fx_android/whatsnew/android_48_beta.lang`) and 47 release (`fx_android/whatsnew/android_47.lang`) by copying the ones used in the previous cycle and updating the version number.
* Mark the previous beta as obsolete by adding to its definition:
```
'flags' => [
    'obsolete' => ['all'],
],
```
* Remove the deadline from the previous release and add it to the new one.

```PHP
$appstores_lang = [
    ...
    'fx_android/whatsnew/android_46.lang' => [
        'supported_locales' => array_merge($fx_android_store, ['ar']),
    ],
    'fx_android/whatsnew/android_47_beta.lang' => [
        'flags' => [
            'obsolete' => ['all'],
        ],
        'supported_locales' => $fx_android_store,
    ],
    'fx_android/whatsnew/android_47.lang' => [
        'deadline'          => '2016-06-07',
        'supported_locales' => array_merge($fx_android_store, ['ar']),
    ],
    'fx_android/whatsnew/android_48_beta.lang' => [
        'supported_locales' => $fx_android_store,
    ],
```

At this point the previous release (46) is not obsolete yet, you can mark it as such the next time you update the file. As a general rule, there should be only two non obsolete release files near the end of the cycle.

Now you can commit your changes to Langchecker. Always check with `git status` to confirm that you’re only including changes to `sources.inc.php`.
```
$ cd ~/mozilla/git/langchecker/
$ git add app/config/sources.inc.php
$ git commit -m "Track AppStores files for 47 and 48 beta"
$ git push origin beta48
```

## Commit .lang files to the appstores repository
At this point you’re ready to copy the new files to all locales, but you also want to import the existing strings from `fx_android/whatsnew/android_47_beta.lang`.

Edit your local copy of [app/scripts/lang_update](https://github.com/mozilla-l10n/langchecker/blob/master/app/scripts/lang_update#L105), add `fx_android/whatsnew/android_47_beta.lang` to the variable `$import_files`, and set `$import_website` to `12` (that’s the identifier for the AppStores project).
```PHP
$import_files = ['fx_android/whatsnew/android_47_beta.lang'];
$import_website = 12;
```
This will make the next run of `lang_update` importing existing strings from `fx_android/whatsnew/android_47_beta.lang`.

**Important**: make sure to not commit this last change to langchecker. You can either ignore it and it will be removed the next time you run `gitup`, or reset the repository with `git reset --hard`.

Now you can run the update, propagating updates to all locales:
```
$ lang_update all 12 all
```

Check your local installation of langchecker for errors by visiting http://localhost/langchecker/?action=errors

If there are no errors, check the status of this repository with `git status`, and the content of the new files for at least one locale, to confirm that strings were imported correctly.
```
$ cd ~/mozilla/repositories/appstores/
$ git add .
$ git commit -a -m "Add new Google Play files for Firefox 47 and 48 Beta"
$ git push origin beta48
```
Note that you need to explicitly add the files with `git add`, since most of them are not tracked yet.

## Add strings to templates in stores_l10n
Now you need to use the new files and strings in stores_l10n. Again, you’re going to work on a branch.
```
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
            'whatsnew' => 'fx_android/whatsnew/android_47_beta.lang',
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
            'whatsnew' => 'fx_android/whatsnew/android_48_beta.lang',
            ],
    ],
```

Then you need to update `app/templates/fx_android/release/listing_apr_2016.php` with the strings for Release, and `app/templates/fx_android/beta/listing_may_2015.php` with the strings for Beta.

At this point open the local installation of stores_l10n available at http://localhost/stores_l10n/ and check both Release and Beta channel. If everything looks good, you can commit and push.

```
$ git commit -a -m "Add new Google Play files for Firefox 47 and 48 Beta"
$ git push origin beta48
```

Now you’re ready to open pull requests for each of the three involved repositories. For the changes involved in this example, check:
* Langchecker: https://github.com/mozilla-l10n/langchecker/pull/501
* stores_l10n: https://github.com/mozilla-l10n/stores_l10n/pull/63
* appstores: https://github.com/mozilla-l10n/appstores/pull/70

If you’re using the l10n-drivers VM, both **langchecker** and **stores_l10n** are forks, so you’ll find them in your user account, e.g. `https://github.com/flodolo/langchecker/`. **appstores**, on the other hand, is a direct clone of the mozilla-l10n repository.
