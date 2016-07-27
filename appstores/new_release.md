# Manage a New Release
When creating a new release, normally the *What’s new* section needs to be moved from Beta to Release, and there are new strings to expose for the Beta channel.

In this example:
* *What’s new* strings for the current Release is stored in `whatsnew/whatsnew_android_46.lang`.
* *What’s new* strings for the current Beta is stored in `whatsnew/whatsnew_android_47_beta.lang`.

The actions to perform are:
* Create a new file `whatsnew/whatsnew_android_48_beta.lang` for the Beta channel.
* Copy strings from `whatsnew/whatsnew_android_47_beta.lang` to `whatsnew/whatsnew_android_47.lang`.
* Track the files in both Langchecker and Stores apps.

Notes on the following instructions:
* `$` is not part of the command, it just indicates the terminal prompt.

If you’re using the l10n-drivers virtual machine:
* You should be able to run `lang_update` and other commands directly without the full path. If you’re not, you should use the full path to `langchecker/app/scripts` for your system.
* There are clones of **langchecker** and **stores_l10n** in `~/mozilla/git/`, and a clone of the l10n repository in `~/mozilla/repositories/appstores`.

If you’re not using the l10n-drivers VM, you should adapt paths to your system.

## Create the new .lang files for Beta and Release
For all changes you need to create branches and then open pull requests.

In this case you’re creating a branch **beta48** in the `appstores` repositories, and editing in Atom the reference en-US file.

```
$ cd ~/mozilla/repositories/appstores/
$ git branch beta48
$ git checkout beta48
$ atom en-US/whatsnew/whatsnew_android_48_beta.lang
```

This is the content of the new file (strings are communicated by releng).
```
## NOTE: Those strings are displayed on Google Play in the What’s new section for Firefox 48 beta release.
## NOTE: See https://l10n.mozilla-community.org/stores_l10n/locale/fr/google/beta/


;Content Notifications for infrequent websites
Content Notifications for infrequent websites


;Suggest “Add to home screen” for frequently used websites
Suggest “Add to home screen” for frequently used websites


;Migrate reading list to bookmarks
Migrate reading list to bookmarks
```

Now create `en-US/whatsnew/whatsnew_android_47.lang`, copying the existing beta file and adapting the initial notes.

```
$ cp en-US/whatsnew/whatsnew_android_47_beta.lang en-US/whatsnew/whatsnew_android_47.lang
$ atom en-US/whatsnew/whatsnew_android_47.lang
```

You then need to start tracking these files in Langchecker. The process is described in detail in [../webdashboards/add_new_file.md](this document).

Again, you need to create a branch in the langchecker repository.
```
$ cd ~/mozilla/git/langchecker/
$ git branch beta48
$ git checkout beta48
$ atom app/config/sources.inc.php
```

You need to add the new file to `$appstores_lang`. In this case changing from:
```PHP
$appstores_lang = [
    ...
    'whatsnew/whatsnew_android_46.lang',
    'whatsnew/whatsnew_android_47_beta.lang',
```

To:
```PHP
$appstores_lang = [
    ...
    'whatsnew/whatsnew_android_46.lang',
    'whatsnew/whatsnew_android_47_beta.lang',
    'whatsnew/whatsnew_android_47.lang',
    'whatsnew/whatsnew_android_48_beta.lang',
```

Then update `$lang_flags['appstores']` marking the the old beta file as obsolete. From:
```PHP
$lang_flags['appstores'] = [
    ...
    'whatsnew/whatsnew_android_44.lang'      => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_android_45.lang'      => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_android_46_beta.lang' => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_ios_2_1.lang'         => [ 'obsolete' => ['all'] ],
];
```

To:
```PHP
$lang_flags['appstores'] = [
    ...
    'whatsnew/whatsnew_android_44.lang'      => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_android_45.lang'      => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_android_46_beta.lang' => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_android_47_beta.lang' => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_ios_2_1.lang'         => [ 'obsolete' => ['all'] ],
];
```

Add a deadline for the new file, removing the old one. From:
```PHP
$deadline = [
    ...
    'whatsnew/whatsnew_android_46.lang'      => '2016-04-26', // appstores project
    'whatsnew/whatsnew_ios_4_0.lang'         => '2016-05-10', // appstores project
];
```

To:
```PHP
$deadline = [
    ...
    'whatsnew/whatsnew_android_47.lang'      => '2016-06-07', // appstores project
    'whatsnew/whatsnew_ios_4_0.lang'         => '2016-05-10', // appstores project
];
```

Finally add the supported locales for these new files. From:
```PHP
'appstores' => [
    ...
    'whatsnew/whatsnew_android_45.lang'      => array_merge($google_play_target, ['ar']),
    'whatsnew/whatsnew_android_46.lang'      => array_merge($google_play_target, ['ar']),
    'whatsnew/whatsnew_android_46_beta.lang' => $google_play_target,
    'whatsnew/whatsnew_android_47_beta.lang' => $google_play_target,
```

To:
```PHP
'appstores' => [
    ...
    'whatsnew/whatsnew_android_45.lang'      => array_merge($google_play_target, ['ar']),
    'whatsnew/whatsnew_android_46.lang'      => array_merge($google_play_target, ['ar']),
    'whatsnew/whatsnew_android_47.lang'      => array_merge($google_play_target, ['ar']),
    'whatsnew/whatsnew_android_46_beta.lang' => $google_play_target,
    'whatsnew/whatsnew_android_47_beta.lang' => $google_play_target,
    'whatsnew/whatsnew_android_48_beta.lang' => $google_play_target,
```

Now you can commit your changes to Langchecker. Always check with `git status` to confirm that you’re only including changes to `sources.inc.php`.
```
$ cd ~/mozilla/git/langchecker/
$ git add app/config/sources.inc.php
$ git commit -m "Track AppStores files for 47 and 48 beta"
$ git push origin beta48
```

At this point you’re ready to copy the new files to all locales, but you also want to import the existing strings from `whatsnew/whatsnew_android_47_beta.lang`.

Edit your local copy of [app/scripts/lang_update](https://github.com/mozilla-l10n/langchecker/blob/master/app/scripts/lang_update#L105), add `whatsnew/whatsnew_android_47_beta.lang` to the variable `$import_files`, and set `$import_website` to `12` (that’s the identifier for the AppStores project).
```PHP
$import_files = ['whatsnew/whatsnew_android_47_beta.lang'];
$import_website = 12;
```
This will make the next run of `lang_update` importing existing strings from `whatsnew/whatsnew_android_47_beta.lang`.

**Important**: make sure to not commit this last change to langchecker. You can either ignore it and it will be removed the next time you run `gitup`, or reset the repository with `git reset --hard`.

Now you can run the update, propagating updates to all locales:
```
$ lang_update all 12 all
```

Check your local installation of langchecker for errors by visiting http://localhost/langchecker/?action=errors
If there are no errors, check the status of this repository with `git status`, and the content of the new files for at least one locale, to confirm that strings were imported correctly.
```
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
    'google' => [
        // channel => path to template file
        'release' => [
            'template' => 'google/release/listing_apr_2016.php',
            'langfile' => 'android_release.lang',
            'whatsnew' => 'whatsnew/whatsnew_android_46.lang',
            ],
        'beta' => [
            'template' => 'google/beta/listing_may_2015.php',
            'langfile' => 'description_beta_page.lang',
            'whatsnew' => 'whatsnew/whatsnew_android_47_beta.lang',
            ],
        'next' => [
            'template' => 'google/next/listing_apr_2016.php',
            'langfile' => 'android_release.lang',
            ],
    ],
```

To:
```PHP
public $templates = [
    'google' => [
        // channel => path to template file
        'release' => [
            'template' => 'google/release/listing_apr_2016.php',
            'langfile' => 'android_release.lang',
            'whatsnew' => 'whatsnew/whatsnew_android_47.lang',
            ],
        'beta' => [
            'template' => 'google/beta/listing_may_2015.php',
            'langfile' => 'description_beta_page.lang',
            'whatsnew' => 'whatsnew/whatsnew_android_48_beta.lang',
            ],
        'next' => [
            'template' => 'google/next/listing_apr_2016.php',
            'langfile' => 'android_release.lang',
            ],
    ],
```

Then you need to update `app/templates/google/release/listing_apr_2016.php` with the strings for Release, and `app/templates/google/beta/listing_may_2015.php` with the strings for Beta.

At this point open the local installation of stores_l10n available at http://localhost/stores_l10n/ and check both Release and Beta channel. If everything looks good, you can commit and push.

```
$ git commit -a -m "Add new Google Play files for Firefox 47 and 48 Beta"
$ git push origin beta48
```

Now you’re ready to open pull requests for each of the three involved repositories. For the changes involved in this example, check:
* Langchecker: https://github.com/mozilla-l10n/langchecker/pull/501
* stores_l10n: https://github.com/mozilla-l10n/stores_l10n/pull/63
* appstores: https://github.com/mozilla-l10n/appstores/pull/70
