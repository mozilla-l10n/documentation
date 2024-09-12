# Create a patch in Mercurial

<!-- toc -->

There are currently two different methods available to create a patch for Mercurial repositories:
* [Using **Phabricator**](#creating-a-patch-using-phabricator).
* [Using **Mercurial Queues**](#creating-a-patch-using-queues) (`mq` extension).

Phabricator is the preferred method for patches to main code repositories, like `mozilla-central`. On the other hand, Queues is the only tool available for patches to l10n repositories.

As a general rule, before creating a patch, make sure that your environment is [correctly set up](../../tools/mercurial/setting_mercurial_environment.md), and update your local clones.

## Creating a patch using Phabricator

### Creating a patch

Consider the following example: setting up productization for Urdu (ur) on Firefox desktop. After you’ve created or edited all the files you need, check the status of the repository.

```BASH
$ hg status
M browser/locales/search/list.json
? browser/locales/searchplugins/amazon-in.xml
? browser/locales/searchplugins/wikipedia-ur.xml
```

These are all status codes relevant for working with patches:
* M = modified. File was already tracked but has been modified.
* A = added. File is new and was already added with `hg add`.
* R = removed. File has been removed with `hg remove`.
* ! = missing. File has been removed from the filesystem but it’s still tracked. Use `hg remove` to stop tracking it.
* ? = not tracked. File is not tracked yet. You can start tracking it by using `hg add`.

Note that the file status will change once you commit, `hg status` only shows information about pending changes.

Now you need to add the new files. You can add them using the full path, or a parent folder, just make sure you’re not adding unnecessary files.

```BASH
$ hg add browser/locales/searchplugins
$ hg status
M browser/locales/search/list.json
A browser/locales/searchplugins/amazon-in.xml
A browser/locales/searchplugins/wikipedia-ur.xml
```

Let’s create a bookmark for this pending work, for example `bug1304757`.

```BASH
$ hg bookmark bug1304757
```

Commit the changes. In the commit message:
* Don’t forget to start with the bug number, i.e. `Bug XXXXXX -`
* At the end of the commit message, add the reviewer with the format `r=phab_user`. `phab_user` is the reviewer’s username on Phabricator, e.g. `flod`. You can add an exclamation mark at the end to set it as blocking reviewer, i.e. `r=phab_user!`.

```BASH
$ hg commit -m "Bug 1304757 - [ur] Search engine setup for Firefox for Urdu, r=flod!"
```

At this point you can check the status of the tree:

```BASH
$ hg wip
```

And you should be able to identify your work and bookmark (press `q` to leave this view):

```
@   358728:c0b04112d4e6 flod tip  bug1304757
|  Bug 1304757 - [ur] Search engine setup for Firefox for Urdu, r?flod
| o   358726:f7834b7b4050 aosmond  inbound
|/:  Bug 1299498 - Keep a main thread only pointer to the underlying nsIURI for ImageURL. r=tnikkel
| : o   358715:6f79cece26e9 ffxbld  beta
| : |  No bug, Automated blocklist update from host bld-linux64-spot-245 - a=blocklist-update
| : ~
| : o   358714:f5f73390f439 ffxbld  release
| : |  No bug, Automated blocklist update from host bld-linux64-spot-246 - a=blocklist-update
| : ~
o :   358709:f8107cf96144 cbook  central
:/   merge mozilla-inbound to mozilla-central a=merge
```

To push to Phabricator use:

```
$ moz-phab
```

You can add `-s` to only push a single commit, i.e. `moz-phab -s`.

Once published, the review request will be attached automatically to the bug, and the reviewer will be flagged. Note that you can also update information about the patch, like reviewer or bug, directly in Phrabricator after pushing with MozPhab.

### Updating an existing patch

If you need to address review comments, you can restore your branch by switching to your bookmark, and start working on it again.

```BASH
$ hg up bug1304757
```

You can check which bookmark is currently active with `hg bookmarks`:

```BASH
$ hg bookmarks
   aurora                    359014:96503957841c
   beta                      359025:34c73c520f93
 * bug1304757                359034:bde380bc54ff
   central                   358999:a69583d2dbc6
```

After addressing the review comments and editing your local files, you have two choices to save your work:
* Amend the last commit.
* Create a new commit and squash history.

#### Amend the last commit

To amend the last commit, simply execute:

```BASH
$ hg commit --amend
```

Then confirm (or edit) the commit message by saving with `CTRL+O` and exiting with `CTRL+X` (assuming the default editor is nano). Finally, update Phabricator (don’t make changes to the metadata in the commit):

```BASH
$ moz-phab
```

#### Create a new commit and squash history

If you prefer to have a separate commit, execute:

```BASH
$ hg commit -m "Address review comments"
```

Then squash the commits together by editing history:

```BASH
$ hg histedit
```

The following screen will look like this:

```
pick f6f70f6de69c 358597 Bug 123456 - [ur] Search engine setup for Firefox fo...
pick 8088fd8658fd 358598 Fix searchplugin name

# Edit history between f6f70f6de69c and 8088fd8658fd
#
# Commits are listed from least to most recent
#
# You can reorder changesets by reordering the lines
#
# Commands:
#
#  e, edit = use commit, but stop for amending
#  m, mess = edit commit message without changing commit content
#  p, pick = use commit
#  d, drop = remove commit from history
#  f, fold = use commit, but combine it with the one above
#  r, roll = like fold, but discard this commit's description
#
```

In this case you want to *roll* the second commit into the first one, so replace `pick` with `roll` (or `r`), save with `CTRL+O` and exit with `CTRL+X` (assuming the default editor is nano).

```
pick f6f70f6de69c 358597 Bug 123456 - [ur] Search engine setup for Firefox fo...
roll 8088fd8658fd 358598 Fix searchplugin name

...
```

Update Phabricator (you will need to provide a commit message):

```BASH
$ moz-phab
```

You can also use `hg histedit` to reword a commit message (set the commit line to `edit`). Just remember to complete the `histedit` after commit.

```BASH
$ hg commit -m "Some changes"
$ hg histedit --continue
```

If necessary, you can rebase against another bookmark, like `central` or `inbound`

```BASH
$ hg rebase -d central
```

More information about this workflow are available in the following pages:
* https://mozilla-version-control-tools.readthedocs.io/en/latest/hgmozilla/firefoxworkflow.html
* https://www.mercurial-scm.org/wiki/Bookmarks

### Landing the patch

Once the patch has been reviewed, you have two options:
* If you have L3 access to the repository, you can use [Lando](https://moz-conduit.readthedocs.io/en/latest/lando-user.html) to land your commit directly. If your reviewer has it, you can ask them to land.
