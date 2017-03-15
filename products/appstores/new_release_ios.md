# Firefox for iOS - Manage a new release

When creating a new release, normally there’s a new *What’s new* section for the upcoming version.

Assuming the new version is 6.0, the actions to perform are:
* Create a new file `fx_ios/whatsnew/ios_6_0.lang`.
* Track the file in both Langchecker and Stores apps.

This document assumes that you have set up the system as explained in [this document](/config/setup_l10ndrivers_vm.md), so aliases like `lang_update` are available, repositories are already cloned in `~/mozilla/repositories`, Atom is available and includes the syntax highlighter for LANG files.

**IMPORTANT:** Remember to run `gitup` before you do anything. If you run the command in the middle of the work, don’t forget to go back to the branch (it will checkout `master` for all repositories).

## Create the .lang file for the new release
For all changes you need to create branches and then open pull requests.

In this case you’re creating a branch **ios6_0** in the `appstores` repository, and editing in Atom the reference en-US file.

```
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
You then need to start tracking this file in Langchecker. The process is described in detail in [this document](/tools/webdashboards/add_new_file.md).

Again, you need to create a branch in the langchecker repository.
```
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
```
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
```
$ cd ~/mozilla/git/langchecker/
$ git add app/config/sources.inc.php
$ git commit -m "Track What's new page for iOS 6.0"
$ git push origin ios6_0
```

## Commit .lang files to the appstores repository
At this point you’re ready to copy the new file to all locales.
```
$ lang_update all 12 all
```

Check your local installation of langchecker for errors by visiting http://localhost/langchecker/?action=errors

If there are no errors, check the status of this repository with `git status`, and the content of the new file for at least one locale.
```
$ cd ~/mozilla/repositories/appstores/
$ git add .
$ git commit -a -m "Add What's new file for iOS 6.0"
$ git push origin ios6_0
```
Note that you need to explicitly add the files with `git add`, since most of them are not tracked yet.

## Add strings to templates in stores_l10n
Now you need to use the new file and strings in stores_l10n. Again, you’re going to work on a branch.
```
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

```
$whatsnew = function ($translations) use ($_) {
    return <<<OUT
• {$_('Automatically open web links in Firefox from mail apps such as Outlook, Airmail, Mail.Ru, myMail and Spark. Also, make one of these mail services your default mail app when sending emails from Firefox.')}
• {$_('Fixed other bugs')}
• {$_('App optimization improvements ')}
OUT;
};
```

At this point open the local installation of stores_l10n available at http://localhost/stores_l10n/ and check the Apple Appstore Release tab. If everything looks good, you can commit and push.

```
$ git commit -a -m "Add What's new file for iOS 6.0"
$ git push origin ios6_0
```

Now you’re ready to open pull requests for each of the three involved repositories.

If you’re using the l10n-drivers VM, both **langchecker** and **stores_l10n** are forks, so you’ll find them in your user account, e.g. `https://github.com/flodolo/langchecker/`. **appstores**, on the other hand, is a direct clone of the mozilla-l10n repository.
