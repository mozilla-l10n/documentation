# Importing strings from Pootle

Pootle doesn’t commit directly to the repository, periodically we need to import strings.

There are two ways to import strings:
* Directly from the online [mozilla-lang repository].
* From a local clone that needs to be configured in [app/config/settings.inc.php](app/config/settings.inc.php.ini).

The second option is a lot faster and should be preferred.

To import strings from a local clone simply run from Langchecker’s root folder.
```bash
./app/scripts/import_locamotion
```

For the full command syntax check [Langchecker’s wiki page].

Then move into the l10n repository for mozilla.org and check the diff before committing. Also don’t forget to check for [errors].
```bash
$ cd www.mozilla.org

$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	(list of all files updated)

nothing added to commit but untracked files present (use "git add" to track)

$ git commit -m "Import strings from Locamotion"
$ git push
```

[errors]: https://l10n.mozilla-community.org/langchecker/?action=errors
[mozilla-lang repository]: https://github.com/translate/mozilla-lang
[Langchecker’s wiki page]: https://github.com/mozilla-l10n/langchecker/wiki/CLI-scripts-syntax#import_locamotion
