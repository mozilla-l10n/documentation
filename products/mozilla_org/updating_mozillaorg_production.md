# Updating mozilla.org production

For mozilla.org there are two separate repositories:
* [www.mozilla.org] is used for **trunk** localization, it’s accessible to localizers and tools and is used to localize the [DEV server].
* [bedrock-l10n] is used for **production** localization of www.mozilla.org

l10n-drivers are in charge of manually moving files from trunk to prod after doing a technical review. On Linux [meld] is a great tool for this task: you can open both repositories, move files between them and visualize the changes between the two versions.

```
meld path/to/trunk_repository path/to/production_repository
```

If you’re using the virtual machine available to l10n-driver (VM-l10n), there are a few shortcuts:
* `trunkst` will move into the trunk folder, and check the status (`git status`).
* `prodst` will do the same for production, but will also fetch updates from trunk in case you want to cherry-pick changesets (see next section).
* `mozmeld` will open meld with trunk on the left, and production on the right. Use alt+up/down to move to the next change, use alt+right to move from trunk to production. **Don’t** move the README file, since they're different between the two repositories.
* `gitup` will update all Git repositories.

## Cherry-picking changes
Sometimes moving files manually between the two repositories in not viable, for example when updating a file in all locales. In this case it’s possible to cherry-pick a commit from trunk into production.

The first step, to do **only the first time**, is to set up the trunk repository as a *remote* from the prod repository.
```
$ cd bedrock-l10n
$ git remote add trunk https://github.com/mozilla-l10n/www.mozilla.org
```

When you commit a change to the trunk repository you will get a SHA for the changes
```
$ cd mozilla.org
$ git commit -a -m "Update translation"
[master 31c3920] Update translation
 1 file changed, 1 insertion(+)
$ git push
```
In this case the changeset is *31c3920*. From the production repository:
```
$ cd bedrock-l10n
$ git fetch trunk
$ git cherry-pick 31c3920
[master 380ebdc] Update translation
 Date: Mon May 2 17:31:06 2016 +0200
 1 file changed, 1 insertion(+)
$ git push
```
If you’re using the virtual machine available to l10n-driver (VM-l10n), you can replace the first two commands with `prodst`.

## Guidelines
There are some principles to keep in mind when updating the production repository:
1. Before moving any file, check the [Errors view], possibly on your local installation.
2. Check the diff for each file before moving it to production, to see if there are any errors.
3. In case of any doubt always check the page on your local installation of Bedrock or the [DEV server], especially for new locales.

[Errors view]: https://l10n.mozilla-community.org/langchecker/?action=errors
[bedrock-l10n]: https://github.com/mozilla-l10n/bedrock-l10n
[www.mozilla.org]: https://github.com/mozilla-l10n/www.mozilla.org
[DEV server]: https://www-dev.allizom.org/it/
[meld]: http://meldmerge.org/
