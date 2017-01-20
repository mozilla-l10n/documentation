# Bootstrap a new locale

## Langchecker
The first thing you need to do is to add the new locale code to the `$mozilla` array in [app/config/locales.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/locales.inc.php). Note that all lists of locales are in alphabetical order.

If this new locale is going to localize only Fennec, you need to add it also to the `$fennec_locales` array. In this way desktop specific pages won’t be exposed for this language. If it’s only localizing mozilla.org, add it to the `$mozorg_locales` array.


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

If this locale works on Pootle, you also need to add the locale code to the array `$locamotion_locales`, still in the same file ([app/config/locales.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/locales.inc.php)).

## Add files to l10n repositories (mozilla.org, FHR)
At this point you need to add the files to both `www.mozilla.org` and `about:healthreport` (FHR) by using the `lang_update` script. If the new locale is only working on mozilla.org, FHR (website with ID 4) won’t be needed.

Run the following commands:
```
lang_update all 0 ab-CD
lang_update all 4 ab-CD
```
The first line will add **all** missing files to mozilla.org (ID: 0) for the **ab-CD** locale (you could also run it with the **all** parameter, but it might introduce changes not relevant for this task), the second to FHR (ID: 4).

Move to each l10n repository, check the status and commit (don’t forget to add the new folder). `trunkst` is available as a shortcut for mozilla.org, for `fhr-l10n` you will need to manually move to `~/mozilla/repositories/fhr-l10n` and check `git status`.
```
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
