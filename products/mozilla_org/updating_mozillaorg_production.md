# Updating mozilla.org production

For mozilla.org there are two separate repositories:
* [www.mozilla.org] is used for **trunk** localization, it’s accessible to localizers and tools and is used to localize the [DEV server].
* [bedrock-l10n] is used for **production** localization of www.mozilla.org

l10n-drivers are in charge of manually moving files from trunk to prod after doing a technical review. On Linux [meld] is a great tool for this task: you can open both repositories, move files between them and visualize the changes between the two versions.

```BASH
$ meld path/to/trunk_repository path/to/production_repository
```

If you’re using the virtual machine described in [this document](../../config/setup_l10ndrivers_vm.md), there are a few shortcuts:
* `trunkst` will move into the trunk folder, and check the status (`git status`).
* `prodst` will do the same for production, but will also fetch updates from trunk in case you want to cherry-pick changesets (see next section).
* `mozmeld` will open meld with trunk on the left, and production on the right. Use alt+up/down to move to the next change, use alt+right to move from trunk to production. **Don’t** move the README file, since they’re different between the two repositories.
* `gitup` will update all Git repositories, discard pending changing, and checkout master branch.

## Cherry-picking changes

Sometimes moving files manually between the two repositories in not viable, for example when updating a file in all locales. In this case it’s possible to cherry-pick a commit from trunk into production.

When you commit a change to the trunk repository you will get a SHA for the changes

```BASH
$ trunkst
$ git commit -a -m "Update translation"
[master 31c3920] Update translation
 1 file changed, 1 insertion(+)
$ git push
```

In this case the changeset is *31c3920*. From the production repository:

```BASH
$ prodst
$ git cherry-pick 31c3920
[master 380ebdc] Update translation
 Date: Mon May 2 17:31:06 2016 +0200
 1 file changed, 1 insertion(+)
$ git push
```

## Doing a manual push to production

If you want to do this all manually using Git, you can follow these steps:

1. Make sure the master branches for your clones of both the trunk and production repositories are up to date.
2. In your local clone of the **production** repo, add a remote that points to the **trunk** repo using `git remote add trunk https://github.com/%GITUHB-USERNAME%/www.mozilla.org.git`.
3. Run `git checkout master`.
4. Run `git fetch trunk`.
5. Now `git cherry-pick` the commit from the **trunk** repo, referencing the Git hash of the commit you wish to include (e.g. `git cherry-pick 31c3920`).
6. Push the changes to master using `git push upstream master` (assuming `upstream` is your remote that points to `https://github.com/mozilla-l10n/bedrock-l10n.git`).

## Guidelines

There are some principles to keep in mind when updating the production repository:
1. Before moving any file, check the [Errors view], possibly on your local installation.
2. Check the diff for each file before moving it to production, to see if there are any errors.
3. In case of any doubts always check the page on your local installation of Bedrock or the [DEV server], especially for new locales.

[Errors view]: https://l10n.mozilla-community.org/langchecker/?action=errors
[bedrock-l10n]: https://github.com/mozilla-l10n/bedrock-l10n
[www.mozilla.org]: https://github.com/mozilla-l10n/www.mozilla.org
[DEV server]: https://www-dev.allizom.org/it/
[meld]: http://meldmerge.org/
