# Bootstrap a new locale

## Langchecker

The first thing you need to do is to add the new locale code to the `$mozilla` array in [app/config/locales.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/locales.inc.php). Note that all lists of locales are in alphabetical order.

If this new locale is going to localize only Fennec, you need to add it also to the `$fennec_locales` array. If it’s only working on mozilla.org, add it to `$mozorg_locales`. In this way desktop specific pages won’t be exposed for this language.

Example: let’s say you need to add the `ab-CD` locale. This is how the `$mozilla` array begins:

```PHP
$mozilla = [
    'ach', 'af', 'an', 'ar', 'as', 'ast', 'az', 'be', 'bg',
    'bm', 'bn-BD', 'bn-IN', 'br', 'brx', 'bs', 'ca', 'cak',
```

And how it becomes after adding the new locale:

```PHP
$mozilla = [
    'ab-CD', 'ach', 'af', 'an', 'ar', 'as', 'ast', 'az', 'be', 'bg',
    'bm', 'bn-BD', 'bn-IN', 'br', 'brx', 'bs', 'ca', 'cak',
```

## Add files to l10n repositories (mozilla.org)

At this point you need to add the files to `www.mozilla.org` by using the `lang_update` script.

Run the following commands:

```BASH
$ lang_update all 0 ab-CD
```

This will add **all** missing files to mozilla.org (ID: 0) for the **ab-CD** locale (you could also run it with the **all** parameter, but it might introduce changes not relevant for this task).

Move to the l10n repository for mozilla.org, check the status and commit (don’t forget to add the new folder). `trunkst` is available as a shortcut to move in the folder and run `git status`.

```BASH
$ trunkst
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	ab-CD/

nothing added to commit but untracked files present (use "git add" to track)

$ git add ab-CD

$ git commit -m "Bootstrap locale ab-CD on mozilla.org"

$ git push
```
