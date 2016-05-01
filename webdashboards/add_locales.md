# Add locales to an existing file

Let’s consider a practical example: we need to add the locale `zh-TW` to the file named `firefox/os/index.lang`.

First you need to search the file you need to update in [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php). The file will appear in several places:
* The array with the list of supported lang files. No need to update this, since the file is already supported. In this case the array is `$mozillaorg_lang` since the website is `www.mozilla.org`.
* The list of flags (optional).
* Deadlines (optional).
* The list of supported locale in `$langfiles_subsets['www.mozilla.org']`. That’s the part you need to update.

```PHP
'firefox/os/index.lang'                  =>
    [
        'cs', 'de', 'en-GB', 'fr', 'it', 'pt-BR', 'ru',
        'uk',
    ],
```

Adding `zh-TW` results in:
```PHP
'firefox/os/index.lang'                  =>
    [
        'cs', 'de', 'en-GB', 'fr', 'it', 'pt-BR', 'ru',
        'uk', 'zh-TW',
    ],
```

At this point you need to run `lang_update` to actually add the file.
```
./app/scripts/lang_update all 0 zh-TW
```
This line updates **all** files, for website 0 (mozilla.org), for **zh-TW**.

Move in the l10n repository, make sure to add the file and commit (`$` is not part of the command, it only indicated the command prompt).
```
$ cd www.mozilla.org

$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	zh-TW/firefox/os/index.lang

nothing added to commit but untracked files present (use "git add" to track)

$ git add zh-TW
$ git commit -m "Add firefox/ox/index.lang to zh-TW"
$ git push
```
