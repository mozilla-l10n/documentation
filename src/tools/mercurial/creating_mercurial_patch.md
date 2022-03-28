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

## Creating a patch using Queues

### Creating a patch

Consider the following example: setting up productization for Urdu (ur) on Firefox desktop (l10n repository). The first step is to create a `region.properties` file. Move into the repository folder and check its status:

```BASH
$ cd ~/mozilla/mercurial/l10n/ur/l10n-central

$ hg status
? browser/chrome/browser-region/region.properties
```

File is brand new and needs to be added:

```BASH
$ hg add browser

$ hg status
A browser/chrome/browser-region/region.properties
```

You need to assign a name to this patch, it’s easy to use a reference to the bug number: for example, if the bug number is 123456, the file could be called `bug123456.patch` (note the added extension `.patch`).

```BASH
$ hg qnew bug123456.patch
```

At this point you will be asked to provide a commit message for your patch (in `nano` if you followed the instructions to set up the environment): write your commit message, then press `CTRL+O` to save the file, `enter` to confirm the proposed filename, and finally `CTRL+X` to exit the editor.

The commit message should be the same as the bug, for example `Bug 123456 - Set up searchplugins for "ur" and Firefox desktop`.

You are ready to *pop* the patch out of the queue. Since it’s likely that there are no other patches, you can pop them all with `-a`.

```BASH
$ hg qpop -a
popping bug123456.patch
patch queue now empty
```

The patch is stored inside the `.hg/patches` folder in the root of the repository (in the suggested setup, the full path would be `~/mozilla/mercurial/l10n-central/.hg/patches`). You can copy the file through the command line or the file explorer. For example, on macOS you can open the folder in Finder by typing:

```BASH
$ open ~/mozilla/mercurial/l10n/ur/l10n-central/.hg/patches
```

Or you can copy the file on the Desktop with

```BASH
$ cp ~/mozilla/mercurial/l10n/ur/l10n-central/.hg/patches/bug123456.patch ~/Desktop
```

Now you need to attach the file to Bugzilla and set an appropriate reviewer for it.

### Updating an existing patch

Let’s assume that the review found some issues with the patch and you need to update it. The fastest way is to import the .patch file without committing, update the files as needed, and create a new patch using the same process explained above.

Assuming the file is called `bug123456.patch` and it’s in your desktop, you can move in the repository folder and import the file like this:

```BASH
$ cd ~/mozilla/mercurial/l10n/ur/l10n-central

$ hg import --no-commit ~/Desktop/bug123456.patch
```

Don’t forget the `--no-commit` part. If you do, the patch will be added to your repository and you’ll need to clone the original repository again.

<!-- markdownlint-disable MD038 -->
**Note:** You can drag and drop the patch file on the terminal on macOS to get its full path instead of typing it. In other words, type `hg import --no-commit ` (leave an empty space at the end), then drag the icon of the patch on the Terminal’s window: its full path will appear automatically.
<!-- markdownlint-enable MD038 -->

At this point you’re ready to modify the files, and create a new patch. The only difference is that you will need to use a different filename, for example `bug123456v1.patch`.

### Landing the patch

Your patch got a `r+`, so you need to update the commit message to reference the review, import the patch and push it to the remote server.

**Note:** If the patch is for a repository where you don’t have write access, you don’t need to follow these instructions, only to set the `checkin-needed` flag in Bugzilla.

Open the .patch file in your editor, find the line with the commit message, and add `r=NICKNAME` to the commit message. For example, the last line in

```
# HG changeset patch
# User SOMENAME <SOME EMAIL>
# Parent  b45d23bc53df9227aa262acb2a5c6b0ab903b76e
Bug 123456 - Set up searchplugins for "ur" and Firefox for Android
```

Should become like this, assuming flod is the reviewer.

```
Bug 123456 - Set up searchplugins for "ur" and Firefox for Android, r=flod
```

Then you need to import the patch, this time without the `no-commit` parameter.

```BASH
$ cd ~/mozilla/mercurial/l10n/ur/l10n-central

$ hg import ~/Desktop/bug123456.patch
```

The patch has been imported and committed. If you get an error while applying the patch, check if the editor you’re using hasn’t modified other lines of the patch, for example removing trailing whitespaces. In that case, using `nano` to edit the patch is probably your faster option.

Now you’re ready to push to the remote repository

```BASH
$ hg push
```

The reply from the server will contain the URL to your changeset: copy and paste that URL in the bug. If the bug only contains a patch to region.properties, you can close the bug after landing; if it also contains a patch stored in MozReview, the bug will be automatically closed when the patch is merged to mozilla-central.
