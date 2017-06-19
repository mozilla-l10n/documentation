# Useful Mercurial commands

## Display log

To display the log you can use `hg log -l NUMBER`, where *NUMBER* is the number of commits. Note that Mercurial uses `l` instead of Git's `n`. Use the space bar to move to the next page if the results don't fit in the screen.

You can also browse the history by running `hg serve` within the repository folder, then opening http://localhost:8000

## Display content of the last commit

To display the content of the last commit you can use:

```BASH
$ hg log --patch --rev tip
```

Press the space bar to move to the next page, `q` to quit.

## Revert staged changes

Let’s assume that you have staged (uncommitted) changes in your repositories but you want to go back to a clean state:
* If you only want to reset one file, you can use `hg revert FILENAME`. Note that this will leave a `FILENAME.orig` in the repository, in case you decide to change your mind. To avoid that, use the `-C` option: `hg revert -C FILENAME`. You can use this command also to restore a file marked as `!` (missing in the filesystem, but still tracked).
* `hg up -C` will reset all changed files to the last commit. Note that it won’t remove untracked files.
* To remove all untracked files, you can use the `purge` extension and run `hg purge`. It won't remove staged changes, like modified files still uncommitted.

## Revert changes already committed

If you want to revert changes already committed:
* To backout a specific changeset use `hg backout -r CHANGESET`. This will prompt you directly with a request for the commit message to use in the backout.
* To revert a file to a specific changeset, use `hg revert -r CHANGESET FILENAME`. This will revert the file without committing it.
