# Add a new file to an existing project

This task can be split into smaller tasks:
* Add the file to the list of supported files specifying:
    * List of supported locales.
    * Priority (optional).
    * Flags (optional).
    * Deadline (optional).
* Add the files to all locales in the l10n repository.

To analyze all steps, let’s consider a practical example: you need to add a file called `mozorg/contribute/signup.lang` to the project `www.mozilla.org`. The file is priority 1 only for French and German, `opt-in` for other locales, and deadline is May 30th, 2016. Note that most of the time a file will have the same priority for all locales, and won’t have any flags.

## Add the file to the list of supported files

The file you need to update is [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php).

In [app/config/websites.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/websites.inc.php) there is a global array `$sites` that defines all parameters for each project. For `www.mozilla.org` it looks like this:

```PHP
0 => [
    'www.mozilla.org',
    $repositories['www.mozilla.org']['local_path'],
    '',
    $mozillaorg,
    $mozillaorg_lang,
    'en-US', // source locale
    $repositories['www.mozilla.org']['public_path'],
    3,
    'lang',
    [],
],
```

The array storing all supported files is the 5th element (`$mozillaorg_lang`). With time you won’t need to check the configuration array, it will be enough to search for a similar file in the same project.

### Supported locales

Search for the definition of `$mozillaorg_lang` in `app/config/sources.inc.php` and add the new file, respecting the existing alphabetical order (snippets represent an exception to this rule). This is how the definition’s begin looks:

```PHP
$mozillaorg_lang = [
    'download_button.lang' => [
        'deadline'          => '2016-04-29',
        'priority '         => 1,
        'supported_locales' => $mozillaorg,
    ],
```

Supported locales are defined in each file as an array associated to the key `supported_locales`. If this key is missing, file will fall back to the list of locales supported for the website (project) it belongs to. For clarity it’s highly suggested to always specify the list of supported locales.

For the list of locales you should check the definition for existing similar files. In this case, you can use the same settings as another `contribute` pages:

```PHP
'mozorg/contribute/index.lang' => [
    'flags' => [
        'opt-in' => ['all'],
    ],
    'priority'          => 2,
    'supported_locales' => $getinvolved_locales,
],
'mozorg/contribute/signup.lang' => [
    'supported_locales' => $getinvolved_locales,
],
```

### Priority

NOTE: The *priority* field was used only by the Webdashboard. It can still be used to store a reference to the expected priority.

Priority is optional and can defined for each file. If the priority is the same for all locales, you can assign the integer value (from 1 to 5) to a `priority` key.

```PHP
'mozorg/contribute/index.lang' => [
    'priority'          => 2,
    'supported_locales' => $getinvolved_locales,
],
```

It’s also possible to define a more complex set of priorities using an associative array, where to each priority (a numeric key) is associated an array of locales. `all` is a special locale to represent all supported locales for this file. For example:

```PHP
'priorities'          => [
    1 => ['de', 'fr'],
    2 => ['all'],
],
```

If you don’t specify a priority, the file will fall back to the default priority specified for the project (in `$sites`). In this case the request is to set the file with priority 1 for French and German, while the default for mozilla.org is 3.

In this case, the request is to assign priority 1 only to French and German

```PHP
'mozorg/contribute/signup.lang' => [
    'priority'          => [
        1 => ['de', 'fr'],
    ],
    'supported_locales' => $getinvolved_locales,
],
```

### Flags

Flag are defined for each file as an array associated to the key `flags`:

```PHP
'mozorg/contribute/index.lang' => [
    'flags' => [
        'opt-in' => ['all'],
    ],
    'supported_locales' => $getinvolved_locales,
],
```

To each flag (key) is associated an array of locales. `all` is a special locale to represent all supported locales for this file. Flags currently in use are: obsolete, opt-in.

In this case, the request is to flag the file as opt-in for all locales.

```PHP
'mozorg/contribute/signup.lang' => [
    'flags'    => [
        'opt-in' => ['all'],
    ],
    'priority'          => [
        1 => ['de', 'fr'],
    ],
    'supported_locales' => $getinvolved_locales,
],
```

### Deadline

NOTE: The *deadline* field was used only by the Webdashboard. It can still be used to store a reference to the expected deadline.

If the deadline is the same for all locales, you can assign the date (as a string in ISO format YYYY-MM-DD) to a `deadline` key. In this case, deadline needs to be set to May 30th, 2016 (2016-05-30):

```PHP
'mozorg/contribute/signup.lang' => [
    'deadline' => '2016-05-30',
    'flags'    => [
        'opt-in' => ['all'],
    ],
    'priority'          => [
        1 => ['de', 'fr'],
    ],
    'supported_locales' => $getinvolved_locales,
],
```

It’s also possible to define different deadlines for locales using an associative array, where to each deadline (date in ISO format YYYY-MM-DD) is associated an array of locales. `all` is a special locale to represent all supported locales for this file. For example, a deadline for German and French, and a later date for other languages:

```PHP
'deadline' => [
    '2016-05-30' => ['de', 'fr'],
    '2016-06-15' => ['all'],
];
```

Or a deadline only for French:

```PHP
'deadline' => [
    '2016-05-30' => ['fr'],
];
```

## Add the files to all locales in the l10n repository

At this point you need to run `lang_update` to actually add the file to all locales.

```BASH
lang_update mozorg/contribute/signup.lang 0 all
```

This line updates `mozorg/contribute/signup.lang`, for website 0 (mozilla.org), for **all** locales.

Move in the l10n repository, make sure to add the file and commit.

```BASH
$ trunkst
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	(list of all locales and files added)

nothing added to commit but untracked files present (use "git add" to track)

$ git add .
$ git commit -m "Add new page mozorg/contribute/signup.lang"
$ git push
```

Note: `git add .` adds all the new files in the current repository. Make sure to check the list returner by `git status`, and to check the commit on GitHub after pushing.
