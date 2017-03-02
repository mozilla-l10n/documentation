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
],
```
The array storing all supported files is the 5th element (`$mozillaorg_lang`). With time you won’t need to check the configuration array, it will be enough to search for a similar file in the same project.

### Supported locales
Search for the definition of `$mozillaorg_lang` in `app/config/sources.inc.php` and add the new file, respecting the existing alphabetical order (snippets represent an exception to this rule). This is how the definition’s begin looks:
```PHP
$mozillaorg_lang = [
    'download_button.lang' => [
        'deadline'            => '2016-04-29',
        'priorities'          => [
            1 => ['all'],
        ],
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
    'priorities'          => [
        2 => ['all'],
    ],
    'supported_locales' => $getinvolved_locales,
],
'mozorg/contribute/signup.lang' => [
    'supported_locales' => $getinvolved_locales,
],
```

### Priority
Priorities are defined for each file as an array associated to the key `priorities`.
```PHP
'mozorg/contribute/index.lang' => [
    'priorities'          => [
        2 => ['all'],
    ],
    'supported_locales' => $getinvolved_locales,
],
```

If you don’t specify a priority, the file will fall back to the default priority specified for the project (in `$sites`). In this case the request is to set the file with priority 1, while the default for mozilla.org is 3.

To each priority (a numeric key) is associated an array of locales. `all` is a special locale to represent all supported locales for this file.

In the example above priority 2 is assigned to all locales. You could have more complex conditions, like:
```PHP
'priorities'          => [
    1 => ['de', 'fr'],
    2 => ['all'],
],
```

In this case, the request is to assign priority 1 only to French and German
```PHP
'mozorg/contribute/signup.lang' => [
    'priorities'          => [
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
    'priorities'          => [
        1 => ['de', 'fr'],
    ],
    'supported_locales' => $getinvolved_locales,
],
```

### Deadline
If a file is critical, you also want to set a deadline for it: in the last week before deadline the date will be displayed in orange on the Webdashboard, after deadline it will be displayed in red.

Flags are defined as part of the file. In this case, deadline needs to be set to May 30th, 2016 (2016-05-30 in ISO format):
```PHP
'mozorg/contribute/signup.lang' => [
    'deadline' => '2016-05-30',
    'flags'    => [
        'opt-in' => ['all'],
    ],
    'priorities'          => [
        1 => ['de', 'fr'],
    ],
    'supported_locales' => $getinvolved_locales,
],
```

## Add the files to all locales in the l10n repository
At this point you need to run `lang_update` to actually add the file to all locales.

```
lang_update mozorg/contribute/signup.lang 0 all
```
This line updates `mozorg/contribute/signup.lang`, for website 0 (mozilla.org), for **all** locales.

Move in the l10n repository, make sure to add the file and commit.
```
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
