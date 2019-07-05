# Update an existing file

This task can be split into smaller tasks:
* Add the new strings to the reference file (typically en-US).
* Update the deadline (optional).
* Update the file for all locales adding the new strings.

## Add the new strings to the reference file

Edit the reference file and add new strings as needed.

If you’re adding a string behind a tag, always remember to bind the new string to the tag and to add the tag itself to the beginning of the file. [Working with Bedrock](../../products/mozilla_org/working_bedrock.md) has more details about it.

Always check the diff after completing, to make sure you’re not introducing unwanted changes. If you’re using the l10n-drivers virtual machine, you can use `trunkst` to move to the mozilla.org trunk folder and check the status (`git status`) and diff (`git diff`).

Also double check the [Errors View](https://l10n.mozilla-community.org/langchecker/?action=errors), since it will warn if you’re introducing a duplicated string in the same file.

## Update the deadline

If the file has a deadline set, you normally need to update it (e.g. plus 2 weeks from the the update).

Search for the filename in [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php) and simply update the date associated to this file respecting the format `YEAR-MM-DD`.

## Update the file for all locales

At this point you need to run `lang_update` to propagate the update to all locales. Assuming that the file is called `mozorg/contribute/signup.lang`, run:

```BASH
$ lang_update mozorg/contribute/signup.lang 0 all
```

This line updates `mozorg/contribute/signup.lang`, for website `0` (mozilla.org), for **all** locales.

Move in the l10n repository (remember the `trunkst` shortcut) and spot check at least a couple of locales. For example, to check `fr`, run `git diff fr`. **IMPORTANT**: never run just `git diff`, otherwise you’ll get the diff for over a hundred locales.

After checking that everything looks correct, commit (notice the `-a`parameter to commit all changed files already tracked).

```BASH
$ trunkst
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	(list of all locales and files added)

nothing added to commit but untracked files present (use "git add" to track)

$ git commit -a -m "Add new strings to mozorg/contribute/signup.lang"
$ git push
```

Make sure to check the commit on GitHub after pushing, especially to verify if the commit included any unwanted change.
