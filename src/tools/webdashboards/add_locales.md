# Add locales to an existing file

Example task: add `sv-SE` to the list of supported locales for `foundation/index.lang`.

## Updating Langchecker sources

First you need to search for the file that you want to update in [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php).

Always remember to **work on a fork** of the main repository, and **create a branch** in your local clone. Assuming the langchecker installation is in `~/mozilla/git/langchecker`, and that the branch name you want to create is `TESTBRANCH`, the commands to use would be:

```BASH
$ cd ~/mozilla/git/langchecker
$ git branch TESTBRANCH
$ git checkout TESTBRANCH
```

At this point you’re ready to update the configuration file.

```PHP
'foundation/index.lang' => [
    'flags' => [
        'opt-in' => ['all'],
    ],
    'supported_locales' => [
        'de', 'es-ES', 'fr', 'kab', 'pl', 'pt-BR', 'zh-TW',
    ],
],
```

Adding `sv-SE` would result in:

```PHP
'foundation/index.lang' => [
    'flags' => [
        'opt-in' => ['all'],
    ],
    'supported_locales' => [
        'de', 'es-ES', 'fr', 'kab', 'pl', 'pt-BR', 'sv-SE', 'zh-TW',
    ],
],
```

Commit the changes and open a pull request on the [main repository](https://github.com/mozilla-l10n/langchecker).

```BASH
$ cd ~/mozilla/git/langchecker
$ git add app/config/sources.inc.php
$ git commit -m "Add sv-SE to foundation/index.lang"
$ git push origin TESTBRANCH
```

## Adding the file to the repository

At this point you need to run `lang_update` to actually add the file to the repository.

```BASH
$ lang_update all 0 sv-SE
```

This line updates **all** files, for website 0 (mozilla.org), for **sv-SE**.

Move in the l10n repository, make sure to add the file and commit.

```BASH
$ trunkst
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	sv-SE/foundation/index.lang

nothing added to commit but untracked files present (use "git add" to track)

$ git add sv-SE
$ git commit -m "Add foundation/index.lang to sv-SE"
$ git push
```
