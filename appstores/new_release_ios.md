# Firefox for iOS - Manage a New Release
When creating a new release, normally there’s a new *What’s new* section for the upcoming version.

Assuming the new version is 6.0, the actions to perform are:
* Create a new file `whatsnew/whatsnew_ios_6_0.lang`.
* Track the file in both Langchecker and Stores apps.

Notes on the following instructions:
* `$` is not part of the command, it just indicates the terminal prompt.

If you’re using the l10n-drivers virtual machine:
* You should be able to run `lang_update` and other commands directly without the full path. If you’re not, you should use the full path to `langchecker/app/scripts` for your system.
* There are clones of **langchecker** and **stores_l10n** in `~/mozilla/git/`, and a clone of the l10n repository in `~/mozilla/repositories/appstores`.
* Remember to run `gitup` before you do anything. If you run the command in the middle of the work, remember to go back to the branch you previously created (it will checkout `master` for all repositories).

If you’re not using the l10n-drivers VM, you should adapt paths to your system.

## Create the .lang file for the new release
For all changes you need to create branches and then open pull requests.

In this case you’re creating a branch **ios6_0** in the `appstores` repository, and editing in Atom the reference en-US file.

```
$ cd ~/mozilla/repositories/appstores/
$ git branch ios6_0
$ git checkout ios6_0
$ atom en-US/whatsnew/whatsnew_ios_6_0.lang
```

This is the content of the new file (strings are communicated by releng).
```
## NOTE: Those strings are displayed on the App Store in the what’s new section for Firefox for iOS 6.0 release. See https://l10n.mozilla-community.org//stores_l10n/locale/fr/apple/release/

;Automatically open web links in Firefox from mail apps such as Outlook, Airmail, Mail.Ru, myMail and Spark. Also, make one of these mail services your default mail app when sending emails from Firefox.
Automatically open web links in Firefox from mail apps such as Outlook, Airmail, Mail.Ru, myMail and Spark. Also, make one of these mail services your default mail app when sending emails from Firefox.

;Fixed other bugs
Fixed other bugs


;App optimization improvements
App optimization improvements
```

This file will be committed later to the repository, since it’s still not tracked in langchecker.

## Track the new file in dashboards updating Langchecker
You then need to start tracking this file in Langchecker. The process is described in detail in [this document](../webdashboards/add_new_file.md).

Again, you need to create a branch in the langchecker repository.
```
$ cd ~/mozilla/git/langchecker/
$ git branch ios6_0
$ git checkout ios6_0
$ atom app/config/sources.inc.php
```

You need to add the new file to `$appstores_lang`. In this case changing from:
```PHP
$appstores_lang = [
    ...
    'whatsnew/whatsnew_ios_4_0.lang',
    'whatsnew/whatsnew_ios_5_0.lang',
];
```

To:
```PHP
$appstores_lang = [
    ...
    'whatsnew/whatsnew_ios_4_0.lang',
    'whatsnew/whatsnew_ios_5_0.lang',
    'whatsnew/whatsnew_ios_6_0.lang',
];
```

Then update `$lang_flags['appstores']` marking the the old file as obsolete. From:
```PHP
$lang_flags['appstores'] = [
    ...
    'whatsnew/whatsnew_ios_2_1.lang'         => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_ios_4_0.lang'         => [ 'obsolete' => ['all'] ],
];
```

To:
```PHP
$lang_flags['appstores'] = [
    ...
    'whatsnew/whatsnew_ios_2_1.lang'         => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_ios_4_0.lang'         => [ 'obsolete' => ['all'] ],
    'whatsnew/whatsnew_ios_5_0.lang'         => [ 'obsolete' => ['all'] ],
];
```

Add a deadline for the new file, removing the old one. From:
```PHP
$deadline = [
    ...
    'whatsnew/whatsnew_ios_5_0.lang'        => '2016-07-27', // appstores project
];
```

To:
```PHP
$deadline = [
    ...
    'whatsnew/whatsnew_ios_6_0.lang'        => '2016-12-20', // appstores project
];
```

Finally add the supported locales for this new file. From:
```PHP
'appstores' => [
    ...
    'whatsnew/whatsnew_ios_4_0.lang'         => $apple_store_target,
    'whatsnew/whatsnew_ios_5_0.lang'         => $apple_store_target,
],
```

To:
```PHP
'appstores' => [
    ...
    'whatsnew/whatsnew_ios_4_0.lang'         => $apple_store_target,
    'whatsnew/whatsnew_ios_5_0.lang'         => $apple_store_target,
    'whatsnew/whatsnew_ios_6_0.lang'         => $apple_store_target,
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
           'langfile' => 'apple_description_release.lang',
           'whatsnew' => 'whatsnew/whatsnew_ios_5_0.lang',
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
           'langfile' => 'apple_description_release.lang',
           'whatsnew' => 'whatsnew/whatsnew_ios_6_0.lang',
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

Now you’re ready to open pull requests for each of the three involved repositories. For example check:
* Langchecker: https://github.com/mozilla-l10n/langchecker/pull/508
* stores_l10n: https://github.com/mozilla-l10n/stores_l10n/pull/65
* appstores: https://github.com/mozilla-l10n/appstores/pull/72

If you're using the l10n-drivers VM, both **langchecker** and **stores_l10n** are forks, so you'll find them in your user account, e.g. `https://github.com/flodolo/langchecker/`. **appstores**, on the other hand, is a direct clone of the mozilla-l10n repository.
