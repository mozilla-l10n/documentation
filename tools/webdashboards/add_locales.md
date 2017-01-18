# Add locales to an existing file

Example task: add `zh-TW` to the list of supported locales for `firefox/os/index.lang`.

## Updating Langchecker sources
First you need to search for the file that you want to update in [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php). The file will appear in several portions of the configuration file:
* The array with the list of supported .lang files: in this case the array is `$mozillaorg_lang` since the website is `www.mozilla.org`. No need to update this list, since the file is already part of this website.
* The list of flags (optional).
* Deadlines (optional).
* The list of supported locale in `$langfiles_subsets['www.mozilla.org']`. That’s the part you need to update.

Always remember to **work on a fork** of the main repository, and **create a branch** in your local clone. Assuming the langchecker installation is in `~/mozilla/git/langchecker`, and that the branch name you want to create is `TESTBRANCH`, the commands to use would be:
```
$ cd ~/mozilla/git/langchecker
$ git branch TESTBRANCH
$ git checkout TESTBRANCH
```

At this point you’re ready to update the configuration file.

```PHP
'firefox/os/index.lang'                  =>
    [
        'cs', 'de', 'en-GB', 'fr', 'it', 'pt-BR', 'ru',
        'uk',
    ],
```

Adding `zh-TW` would result in:
```PHP
'firefox/os/index.lang'                  =>
    [
        'cs', 'de', 'en-GB', 'fr', 'it', 'pt-BR', 'ru',
        'uk', 'zh-TW',
    ],
```

Commit the changes and open a pull request on the [main repository](https://github.com/mozilla-l10n/langchecker).
```
$ cd ~/mozilla/git/langchecker
$ git add app/config/sources.inc.php
$ git commit -m "Add zh-TW to firefox/os/index.lang"
$ git push origin TESTBRANCH
```

## Adding the file to the repository
At this point you need to run `lang_update` to actually add the file to the repository.
```
lang_update all 0 zh-TW
```
This line updates **all** files, for website 0 (mozilla.org), for **zh-TW**.

Move in the l10n repository, make sure to add the file and commit.
```
$ trunkst
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
