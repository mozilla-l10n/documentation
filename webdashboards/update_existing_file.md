# Update an existing file

This task can be split into smaller tasks:
* Add the new strings to the reference file (usually en-US).
* Update the deadline (optional).
* Update the file for all locales.

## Add the new strings to the reference file
Edit the reference file and add new strings as needed.

## Update the deadline
If the file has a deadline set, you normally want to update it (e.g. plus 2 weeks from the the update).

Deadlines are stored in a flat array called `$deadlines` inside [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php).

## Update the file for all locales
At this point you need to run `lang_update` to propagate the update to all locales. Imagining that the file is called `mozorg/contribute/signup.lang`, from Langchecker’s root folder run:

```
./app/scripts/lang_update mozorg/contribute/signup.lang 0 all
```
This line updates `mozorg/contribute/signup.lang`, for website 0 (mozilla.org), for **all** locales.

Move in the l10n repository and commit (no need to add the files, they're already tracked).
```
$ cd www.mozilla.org

$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	(list of all locales and files added)

nothing added to commit but untracked files present (use "git add" to track)

$ git commit -m "Add new strings to mozorg/contribute/signup.lang"
$ git push
```
Make sure to check the commit on GitHub after pushing, especially to verify if the commit included any unwanted change.
