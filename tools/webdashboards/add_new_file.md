# Add a new file to an existing project

This task can be split into smaller tasks:
* Add the file to the list of supported files (mandatory).
* Set the flags for this file (optional).
* Set the deadline for this file (optional).
* Specify the list of locales supported by this file (mandatory in most occasions).
* Add the files to all locales in the l10n repository.

To analyze all steps, let’s consider a practical example: you need to add a file called `mozorg/contribute/signup.lang` to the project `www.mozilla.org`. The file is `critical` only for French and German, `opt-in` for other locales, and deadline is May 30th, 2016. Most of the time a file will be critical for all locales, or won’t have any flags.

## Add the file to the list of supported files
The file you need to update is [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php). There is a global array `$sites` that defines all parameters of each project. For `www.mozilla.org` it looks like this:
```PHP
0 => [
    'www.mozilla.org',
    $repositories['www.mozilla.org']['local_path'],
    '',
    $mozillaorg,
    $mozillaorg_lang,
    'en-US', // source locale
    $repositories['www.mozilla.org']['public_path'],
    $lang_flags['www.mozilla.org'],
    'lang',
],
```
The array storing all supported files is the 5th element (`$mozillaorg_lang`). With time you won’t need to check the configuration array, it will be enough to search for a similar file in the same project.

Search for the definition of `$mozillaorg_lang` and add the new file, remembering that files are usually in alphabetical order (snippets are an exception). This is how the definition’s begin looks:
```PHP
$mozillaorg_lang = [
    'download.lang',
    'download_button.lang',
    'esr.lang',
    'firefox/accounts.lang',
    'firefox/android/index.lang',
    ...
```

Add your new file `mozorg/contribute/signup.lang`:
```PHP
$mozillaorg_lang = [
    ...
    'mozorg/contribute/friends.lang',
    'mozorg/contribute/index.lang',
    'mozorg/contribute/signup.lang',
    'mozorg/contribute/stories.lang',
    'mozorg/home/index.lang',    
    ...
```

Now Langchecker knows that this file is supported by `www.mozilla.org`.

## Set the flags for this file
This is an optional step: if a file doesn’t have any flag associated, it will be considered *non critical* for all locales.

Flags are defined in a global array called `$lang_flags`, where a key for each project stores all flag for each file. Usually the definition of flags immedtiately follows the array with the list of supported files. In this case:
```PHP
$lang_flags['www.mozilla.org'] = [
    'download.lang'                           => [ 'critical' => ['all'] ],
    'download_button.lang'                    => [ 'critical' => ['all'] ],
    'firefox/accounts.lang'                   => [ 'critical' => ['all'] ],
    'firefox/android/index.lang'              => [
        'critical' => [$android_locales],
        'opt-in'   => ['all'],
    ],
    ...
```

You need to set this file as `critical` only for French and German, `opt-in` for other locales. Again, files are usually in alphabetical order:
```PHP
$lang_flags['www.mozilla.org'] = [
    'download.lang'                           => [ 'critical' => ['all'] ],
    'download_button.lang'                    => [ 'critical' => ['all'] ],
    ...
    'mozorg/contribute/friends.lang'          => [ 'obsolete' => ['all'] ],
    'mozorg/contribute/index.lang'            => [
        'critical' => ['all'],
    ],
    'mozorg/contribute/stories.lang'          => [
        'critical' => ['all'],
    ],    
    ...
```

What you need to add is this definition:
```PHP
'mozorg/contribute/signup.lang'          => [
    'critical' => ['de', 'fr'],
    'opt-in'   => ['all'],
],
```
You create a new array element using the filename as key, its value is another array. To each flag (key) is associated an array of locales. `all` is a special locale to represent all supported locales for this file.

## Set the deadline for this file
If a file is critical, you also want to set a deadline for it: in the last week before deadline the date will be displayed in orange on the Webdashboard, after deadline it will be displayed in red.

Deadlines are stored in a flat array called `$deadlines`:
```PHP
$deadline = [
    'ads/ios_android_apr2016.lang'           => '2016-04-22',
    'android_release.lang'                   => '2016-04-30', // appstores project
    'apple_description_release.lang'         => '2016-03-30', // appstores project
    'apple_screenshots_v3.lang'              => '2016-03-25', // appstores project
    'description_beta_page.lang'             => '2015-09-30', // appstores project
    'download_button.lang'                   => '2016-04-29',
    ...
```

Simply add the new file and its deadline, maintaining the alphabetical order.
```PHP
$deadline = [
    ...
    'mozorg/about.lang'                      => '2015-03-26',
    'mozorg/contribute/index.lang'           => '2015-08-10',
    'mozorg/contribute/signup.lang'          => '2016-05-30',
    'mozorg/contribute/stories.lang'         => '2015-08-10',
    'mozorg/home/index.lang'                 => '2016-03-15',
    ...
```

## Specify the list of locales supported by this file
If you don’t specify a list of supported locales for a file, it will fallback to the list of locales supported for the website (project) it belongs to. Even in that case it’s clearer to always specify the list of locales.

Language subsets are defined in a global array called `$langfiles_subsets`, where a key for each project stores all locales for each file. For `www.mozilla.org` the definition starts as:

```PHP
$langfiles_subsets = [
    'www.mozilla.org' =>
    [
        'download.lang'                         => $mozillaorg,
        'download_button.lang'                  => $mozillaorg,
        'esr.lang'                              => ['de', 'fr'],
```

For the list of locales you should check other similar files, for example:
```PHP
$langfiles_subsets = [
    'www.mozilla.org' =>
    [
        ...
        'mozorg/contribute.lang'                => $getinvolved_locales,
        'mozorg/contribute/friends.lang'        => ['cs', 'de', 'es-ES', 'fr', 'pt-BR'],
        'mozorg/contribute/index.lang'          => $getinvolved_locales,
        'mozorg/contribute/signup.lang'         => $getinvolved_locales,
        'mozorg/contribute/stories.lang'        => $getinvolved_locales,
        ...
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
