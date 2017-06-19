# Useful Mercurial commands

## Undo changes

Let’s assume that you have staged (uncommitted) changes in your repositories but you want to go back to a clean state:
* If you only want to reset one file, you can use `hg revert FILE`. Note that this will leave a `FILE.orig` in the repository, in case you decide to change your mind. To avoid that, use the `-C` option: `hg revert -C FILE`. You can use this command also to restore a file marked as `!` (missing in the filesystem, but still tracked).
* `hg up -C` will reset all changed files to the last commit. Note that it won’t remove untracked files.
* To remove all untracked files, you can use the `purge` extension and run `hg purge`. It won't remove unstaged changes, like modified files.

## Display content of the last commit

To display the content of the last commit you can use:

```BASH
$ hg log --patch --rev tip
```

Press `space` to move to the next page, `q` to quit.
