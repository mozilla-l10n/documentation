# Langchecker

Langchecker is the main repository to update when adding or updating files. There are four different configuration files:
* [app/config/locales.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/locales.inc.php): it contains several lists of locales, like locales supported in mozilla.org, locales only working in Fennec, etc. These lists are then used in the main configuration file to determine which locales are supported for each file. Normally you would need to update this file only when bootstrapping new languages.
* [app/config/store_locales.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/store_locales.inc.php): this file is generated automatically from external data and tracks locales supported in online stores (Play Store, App Store).
* [app/config/websites.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/websites.inc.php): it contains the configuration for websites (projects) supported in Langchecker.
* [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php): it contains the configuration for all files supported in Langchecker.

Langchecker also includes several command line scripts to manage day-to-day operations on supported repositories. For example:
* [app/scripts/lang_update](https://github.com/mozilla-l10n/langchecker/blob/master/app/scripts/lang_update): reads the original en-US file, adds missing strings to requested files, reformat localized .lang files. It can also be used to import existing translations from another .lang file.
* [app/scripts/mark_active](https://github.com/mozilla-l10n/langchecker/blob/master/app/scripts/mark_active): mark complete files (all strings translated, no errors) as active.
* [app/scripts/add_tags](https://github.com/mozilla-l10n/langchecker/blob/master/app/scripts/add_tags): add l10n tags to a file. Some strings in a file can be bound to a tag, allowing to display them in production for mozilla.org only when they’re localized. This script examines if all the strings associated to a specific tag are localized, and adds tags to localized files.

[Langchecker's wiki](https://github.com/mozilla-l10n/langchecker/wiki) has a full list of the available views, API calls, and command line scripts.

## Sources Structure

Each project is internally called website, and it’s identified by a numeric index. These are the projects currently supported.

| ID | Codename | Description |
| --- | --- | --- |
| 0 | www.mozilla.org | Used to track all files for www.mozilla.org |
| 4 | about:healthreport | Used for about:healthreport. Rarely updated. |
| 6 | engagement | Used for Engagement material, typically snippets. |
| 12 | appstores | Used to localize material for AppStore (iOS) and Google Play (Android). |

Let’s consider a simple website like about:healthreport. This is how its definition looks like in the main `$sites` variable.

```PHP
4 => [
    'about:healthreport',
    $repositories['about:healthreport']['local_path'],
    '',
    $firefox_desktop_android,
    $firefoxhealthreport_lang,
    'en-US', // source locale
    $repositories['about:healthreport']['public_path'],
    2,
    'lang',
    'firefox-health-report',
],
```

The structure of each item is:

1. Name (used when displaying the website).
2. Path to local repository.
3. Folder containing locale files.
4. Array of supported locale.
5. Array of supported files with all associated data.
6. Reference locale code.
7. URL to public repo (used to create links to files).
8. Default priority, used as fallback when files don't specify one.
9. Type of files (`lang`, `raw`).
10. Project name on Pontoon (used for edit links).

For each website there is a list of supported locales, but each file might only use a subset of this list.

For about:healthreport, the list of supported files is stored in `$firefoxhealthreport_lang`.

```PHP
$firefoxhealthreport_lang = [
    'fhr.lang' => [
        'supported_locales' => array_diff($firefox_desktop_android, $mozorg_locales),
    ],
];
```

In this case there is only one file supported (`fhr.lang`).

Flags commonly used are:
* **obsolete**: the file won’t be displayed in webdashboard at all, and its strings won’t be counted in stats. It’s usually used to mark a file that will be completely deleted later but needs to remain in the repository.
* **opt-in**: the file was requested only for some locales, but others can decide to *opt-in* and request the page for translation through Bugzilla.

For more details on the structure of this file, check the [add_new_file.md](documentation to track new files).
