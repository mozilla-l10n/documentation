# Remove obsolete files from repositories

Once a file has been completely removed from [Langchecker](langchecker.md), it’s possible to remove files from the repository using a script available within the tool. Note that files are initially marked as obsolete, and only removed after a few weeks or months.

This document assumes that you have set up the system as explained in [this document](../../config/setup_l10ndrivers_vm.md), so aliases like `lang_update` are available, repositories are already cloned in `~/mozilla/repositories`, Atom is available and includes the syntax highlighter for LANG files.

Let’s assume that the file removed from Langchecker is called `firefox/australis/firefox_tour.lang` and belongs to the website *mozilla.org* (ID 0).

To check which locales still have this file, it’s enough to move into the local clone (since it’s *mozilla.org*, you can use the `trunkst` shortcut instead of `cd ~/mozilla/repositories/mozilla_org`) and run the script called `untracked_files` (full path to the script would be `~/mozilla/git/langchecker/app/scripts/untracked_files`).

```
$ trunkst
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
$ untracked_files
$
```

If the output of the command is empty, like in this case, it means that there are no untracked files in the repository.

Without additional parameters, the script checks automatically *mozilla.org*. It’s possible to examine a different repository by passing the ID of the website within Langchecker, e.g. for engagement (ID 6):

```
$ untracked_files 6
```

If there are untracked files, the output will look like this:

```
$ untracked_files
ach/firefox/australis/firefox_tour.lang
af/firefox/australis/firefox_tour.lang
am/firefox/australis/firefox_tour.lang
an/firefox/australis/firefox_tour.lang
ar/firefox/australis/firefox_tour.lang
as/firefox/australis/firefox_tour.lang
...
```

The first step to remove these files is to **create a new branch**:

```
$ git branch my_branch
$ git checkout my_branch
```

Then *pipe* the output of `untracked_files` to a command that actually removes the files from the repository (make sure to be in the repository’s folder before running the command):

```
$ untracked_files | xargs git rm $1
rm 'ach/firefox/australis/firefox_tour.lang'
rm 'af/firefox/australis/firefox_tour.lang'
rm 'am/firefox/australis/firefox_tour.lang'
rm 'an/firefox/australis/firefox_tour.lang'
rm 'ar/firefox/australis/firefox_tour.lang'
rm 'as/firefox/australis/firefox_tour.lang'
...
```

Checking `git status` will show that files are staged to be removed. You only need to commit these changes and push them to your branch:

```
$ git status
On branch test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	deleted:    ach/firefox/australis/firefox_tour.lang
	deleted:    af/firefox/australis/firefox_tour.lang
	deleted:    am/firefox/australis/firefox_tour.lang
	deleted:    an/firefox/australis/firefox_tour.lang
	deleted:    ar/firefox/australis/firefox_tour.lang
	deleted:    as/firefox/australis/firefox_tour.lang
...

$ git commit -a -m "Remove obsolete file firefox/australis/firefox_tour.lang"
$ git push origin my_branch
```

At this point create a pull request from this branch, review it to make sure it doesn’t include unnecessary changes, squash and merge it. In case of *mozilla.org*, you’ll also need to cherry-pick the merge commit to production.

One important detail to keep in mind is that **Japanese (ja) is automatically excluded from checks for mozilla.org**, since they localize several pages that are not tracked by our systems. It’s possible to check the list of untracked files in Japanese alone by running:

```
$ untracked_files 0 ja
ja/foundation/annualreport/2010/ahead.lang
ja/foundation/annualreport/2010/faq.lang
ja/foundation/annualreport/2010/index.lang
ja/foundation/annualreport/2010/opportunities.lang
ja/foundation/annualreport/2010/people.lang
ja/foundation/feed-icon-guidelines/faq.lang
ja/foundation/feed-icon-guidelines/index.lang
ja/foundation/trademarks/distribution-policy.lang
ja/foundation/trademarks/faq.lang
ja/foundation/trademarks/index.lang
ja/foundation/trademarks/l10n-website-policy.lang
ja/foundation/trademarks/list.lang
ja/foundation/trademarks/policy.lang
ja/mozorg/about/policy/lean-data.lang
```

If you want to remove a file for Japanese, you’ll need to do it manually with `git rm` before committing to the branch, i.e.

```
$ git rm ja/firefox/australis/firefox_tour.lang
```
