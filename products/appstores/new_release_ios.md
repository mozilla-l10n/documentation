# Firefox for iOS - Manage a new release

<!-- toc -->

When creating a new release, normally there’s a new *What’s new* section for the upcoming version.

Assuming the new version is 6.0, the actions to perform are:
* Create a new file `fx_ios/whatsnew/ios_6_0.lang`.
* Track the file in both Langchecker and Stores apps.

This document assumes that you have set up the system as explained in [this document](../../config/setup_l10ndrivers_vm.md), so aliases like `lang_update` are available, repositories are already cloned in `~/mozilla/repositories`, Atom is available and includes the syntax highlighter for LANG files.

## Create the .lang file for the new release

For all changes you need to create branches and then open pull requests.

In this case you’re creating a branch **ios6_0** in the `appstores` repository, and editing in Atom the reference en-US file.

```BASH
$ cd ~/mozilla/repositories/appstores/
$ git branch ios6_0
$ git checkout ios6_0
$ atom en-US/fx_ios/whatsnew/ios_6_0.lang
```

This is the content of the new file (strings are communicated by releng).

```
## NOTE: These strings are displayed on App Store in the What’s new section for Firefox for iOS 6.0
## NOTE: See https://l10n.mozilla-community.org/stores_l10n/locale/fx_ios/release/

;Automatically open web links in Firefox from mail apps such as Outlook, Airmail, Mail.Ru, myMail and Spark. Also, make one of these mail services your default mail app when sending emails from Firefox.
Automatically open web links in Firefox from mail apps such as Outlook, Airmail, Mail.Ru, myMail and Spark. Also, make one of these mail services your default mail app when sending emails from Firefox.

;Fixed other bugs
Fixed other bugs


;App optimization improvements
App optimization improvements
```

This file will be committed later to the repository, since it’s still not tracked in langchecker.

## Track the new file in dashboards updating Langchecker

You then need to start tracking this file in Langchecker. The process is described in detail in [this document](../../tools/webdashboards/add_new_file.md).

Again, you need to create a branch in the langchecker repository.

```BASH
$ cd ~/mozilla/git/langchecker/
$ git branch ios6_0
$ git checkout ios6_0
$ atom app/config/sources.inc.php
```

At this point you’re ready to add the new file to `$appstores_lang`. The easiest way is to start by identifying the file used for the previous cycle. For example, if you’re adding Firefox for iOS 6.0, identify the file used for 5.0:

```PHP
$appstores_lang = [
    ...
    'fx_ios/whatsnew/ios_5_0.lang' => [
        'deadline'          => '2016-07-27',
        'supported_locales' => $fx_ios_store,
    ],
```

What you’ll need to do is:
* Add the new file for 6.0 (`fx_ios/whatsnew/ios_6_0.lang`) by copying the one used in the previous cycle and updating the version number.
* Mark the previous file as obsolete by adding to its definition:

```PHP
'flags' => [
    'obsolete' => ['all'],
],
```

* Remove the deadline from the previous file and add it to the new one.

```PHP
$appstores_lang = [
    ...
    'fx_ios/whatsnew/ios_5_0.lang' => [
        'flags' => [
            'obsolete' => ['all'],
        ],
        'supported_locales' => $fx_ios_store,
    ],
    'fx_ios/whatsnew/ios_6_0.lang' => [
        'deadline'          => '2017-12-20',
        'supported_locales' => $fx_ios_store,
    ],
```

Now you can commit your changes to Langchecker. Always check with `git status` to confirm that you’re only including changes to `sources.inc.php`.

```BASH
$ cd ~/mozilla/git/langchecker/
$ git add app/config/sources.inc.php
$ git commit -m "Track What's new page for iOS 6.0"
$ git push origin ios6_0
```

## Commit .lang files to the appstores repository

At this point you’re ready to copy the new file to all locales.

```BASH
$ lang_update all 12 all
```

Check your local installation of langchecker for errors by visiting http://localhost/langchecker/?action=errors

If there are no errors, check the status of this repository with `git status`, and the content of the new file for at least one locale.

```BASH
$ cd ~/mozilla/repositories/appstores/
$ git add .
$ git commit -a -m "Add What's new file for iOS 6.0"
$ git push origin ios6_0
```

Note that you need to explicitly add the files with `git add`, since most of them are not tracked yet.

## Updating the list of supported locales

Before you start working on stores_l10n, remember to run the `app/scripts/update_shipping_locales.py` script in the `~/mozilla/git/stores_l10n/` directory, as this project is used to keep track of which locales ship in each version of supported apps (Firefox for Android/iOS, Focus for Android/iOS). You can use the same branch for running the script, then adding strings to templates (explained in the next section).

In fact, as a general rule, you should periodically run this script - especially before starting to work on stores_l10n. If the script changes the list of locales:
* Run `lang_update all 12 all` to add missing files in the `appstores` repository.
* Check in Pontoon if the new locales already have the [Appstores](https://pontoon.mozilla.org/projects/appstores/) project enabled. If not, you will have to add the locale in the Admin interface, but only **after files have been added** to the repository, i.e. all branches have been merged.

## Add strings to templates in stores_l10n

Now you need to use the new file and strings in stores_l10n. Again, you’re going to work on a branch.

```BASH
$ cd ~/mozilla/git/stores_l10n/
$ git branch ios6_0
$ git checkout ios6_0
$ atom app/classes/Stores/Project.php
```

The variable to update is `$template`. From:

```PHP
public $templates = [
   ...
   'fx_ios' => [
       'release' => [
           'template' => 'fx_ios/release/listing_sept_2015.php',
           'langfile' => 'fx_ios/description_release.lang',
           'whatsnew' => 'fx_ios/whatsnew/ios_5_0.lang',
       ],
   ],
```

To:

```PHP
public $templates = [
   ...
   'fx_ios' => [
       'release' => [
           'template' => 'fx_ios/release/listing_sept_2015.php',
           'langfile' => 'fx_ios/description_release.lang',
           'whatsnew' => 'fx_ios/whatsnew/ios_6_0.lang',
       ],
   ],
```

Then you need to update `app/templates/fx_ios/release/listing_sept_2015.php`.
Search for the `$whatsnew` variable, and replace the old strings between straight quotes, removing or adding new lines as necessary.

```PHP
$whatsnew = function ($translations) use ($_) {
    return <<<OUT
• {$_('Automatically open web links in Firefox from mail apps such as Outlook, Airmail, Mail.Ru, myMail and Spark. Also, make one of these mail services your default mail app when sending emails from Firefox.')}
• {$_('Fixed other bugs')}
• {$_('App optimization improvements ')}
OUT;
};
```

At this point open the local installation of stores_l10n available at http://localhost/stores_l10n/ and check the Apple Appstore Release tab. If everything looks good, you can commit and push.

```BASH
$ git commit -a -m "Add What's new file for iOS 6.0"
$ git push origin ios6_0
```

Now you’re ready to open pull requests for each of the three involved repositories.

If you’re using the l10n-drivers VM, both **langchecker** and **stores_l10n** are forks, so you’ll find them in your user account, e.g. `https://github.com/flodolo/langchecker/`. **appstores**, on the other hand, is a direct clone of the mozilla-l10n repository.
