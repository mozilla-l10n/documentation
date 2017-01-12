# Set up searchplugins

## Cloning/Updating the locale’s repository
The first thing to remember is that you will be working on Aurora for a new locale, and you need this locale’s Mercurial repository on your computer.

l10n repositories for Firefox live in https://hg.mozilla.org/releases/l10n/mozilla-aurora/. In this case let’s assume that l10n clones will be stored in `~/mozilla/mercurial/l10n`, with a subfolder for each locale and each branch. So, if the locale is `ur`, the repository will be stored in `$/mozilla/mercurial/l10n/ur/mozilla-aurora`.

Note that the `$` is not part of the command, it just indicates the terminal prompt.

```
$ mkdir -p ~/mozilla/mercurial/l10n/ur
$ cd ~/mozilla/mercurial/l10n/ur
```
The first command makes sure that the path for `ur` exists, the second moves into the folder.

If you don’t have a clone yet, you need to create it.
```
$ hg clone ssh://hg.mozilla.org/releases/l10n/mozilla-aurora/ur mozilla-aurora
```

A couple of details to note in this `hg clone` command:
* The command uses `ssh://`, which means you need an active (and properly configured) SSH access to the repository.
* It doesn’t use the default folder for the local clone, but specify a `mozilla-aurora` directory. Without that it would create a `ur` folder, making it impossible to distinguish different branches.

At this point there’s a clone stored in `~/mozilla/mercurial/l10n/ur/mozilla-aurora` (remember that you already moved to `~/mozilla/mercurial/l10n/ur` before running `hg clone`).

If you already have a clone on your computer, always make sure to update it before doing anything:
```
$ cd ~/mozilla/mercurial/l10n/ur/mozilla-aurora
$ hg pull -r default -u
```

## Setting up files for mozilla-unified
First of all make sure that your environment is [correctly set up](/config/setting_mercurial_environment.md), and update your local mozilla-unified clone to be in sync with central:
```
$ cd ~/mozilla/mercurial/mozilla-central
$ hg pull -u
$ hg up central
```

### list.json
The list of searchplugins is stored in JSON format in [mozilla-central](https://hg.mozilla.org/mozilla-central/file/default/browser/locales/search/list.json) in `/browser/locales/search/list.json`.

The basic structure for each locale is fairly simple. Assuming the locale code is `ur`, it will have a `default` key, with `visibleDefaultEngines`.
```JSON
"ur": {
  "default": {
    "visibleDefaultEngines": [
      "google", "yahoo-in", "bing", "amazon-in", "ddg", "wikipedia-ur"
    ]
  }
},
```
Notes about the list:
* If the searchplugin XML file is called `google.xml`, the item to add in list.json will be only `google`, without the extension but also **respecting the case**.
* Order should reflect the actual order of searchplugins: if Google is default, Yahoo 2nd, and Bing 3rd, the list should start with `"google", "yahoo", "bing"`. The remaining searchplugins can be in alphabetical order. The actual order in the browser is currently still determined by region.properties, but at some point that file will be removed.
* If a locale is missing from list.json, it will fall back to `default`, defined at the beginning of the file.

Some locales might have a more complex definition, with searchplugins changing based on the region.
```JSON
"zh-TW": {
  "default": {
    "visibleDefaultEngines": [
      "yahoo-zh-TW", "google", "ddg", "findbook-zh-TW", "wikipedia-zh-TW", "yahoo-zh-TW-HK", "yahoo-bid-zh-TW", "yahoo-answer-zh-TW"
    ]
  },
  "TW": {
    "visibleDefaultEngines": [
      "yahoo-zh-TW", "google-nocodes", "ddg", "findbook-zh-TW", "wikipedia-zh-TW", "yahoo-zh-TW-HK", "yahoo-bid-zh-TW", "yahoo-answer-zh-TW"
    ]
  },
  "HK": {
    "visibleDefaultEngines": [
      "yahoo-zh-TW-HK", "google-nocodes", "ddg", "findbook-zh-TW", "wikipedia-zh-TW", "yahoo-zh-TW", "yahoo-bid-zh-TW", "yahoo-answer-zh-TW"
    ]
  }
}
```

To make sure you're not creating a broken JSON, you can test the final content with an online validator like [jsonlint](http://jsonlint.com/).

### XML files
Searchplugins are stored in [mozilla-central](https://hg.mozilla.org/mozilla-central/file/default/browser/locales/searchplugins) in `/browser/locales/searchplugins`.

For other searchplugins you will need to create the .xml file yourself, with some general rules to keep in mind:
* Always have a MPL2 license header at the beginning.
* Icons are currently square 16px or 32px, both embedded in a .ico file.
* Check if other locales already ship the same searchplugin, and copy their XML file to use as a base. If the searchplugin is brand new, it needs to be approved by BD and it will take some time, so it might be worth starting with a shorter list of searchplugins, and consider the new one in a follow-up bug. Icons will also be provided by the search provider after approval.

#### Wikipedia
**URLs:** If you copy the .xml file from another locale (en-US is always the best choice for Wikipedia), make sure to update all URLs. If the URL for English starts with `en.wikipedia.`, for `ur` it should start with `ur.wikipedia.` (check if the domain actually exists).

**Search template:** There’s one special URL to keep in mind, in English it’s https://en.wikipedia.org/wiki/Special:Search
It’s particular because the last part changes according to the locale, just try replacing the domain first from `en.` to `ur.`: https://ur.wikipedia.org/wiki/Special:Search
You’ll notice that it redirects to `https://ur.wikipedia.org/wiki/خاص:تلاش` and that’s the URL you need to use in the .xml file.

You can’t copy the full URL from the address bar since it will encode UTF-8 characters, e.g. `https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B5:%D8%AA%D9%84%D8%A7%D8%B4`, so it’s faster to just copy only part of the URL and fixing the rest by hand.

**Description:** You will need localizers to provide the translation for `Wikipedia, the Free Encyclopedia`.

**shortName:** In the .xml file there’s an attribute called `shortName`. For English is:
```
<ShortName>Wikipedia</ShortName>
```

When you visit a page that exposes a searchplugin, like Wikipedia, Firefox checks if you already have one installed with the same `shortName`: if you don’t, the UI will suggest you to install it by displaying a small green + sign on the magnifying glass icon in the search bar. To avoid this, the searchplugin shipping in Firefox needs to match the shortName of the searchplugin available from Wikipedia. Visit https://gn.wikipedia.org and press `CTRL+U` to view the source code of the page. At the beginning you will find a line looking like this:
```
<link rel="search" type="application/opensearchdescription+xml" href="/w/opensearch_desc.php" title="ویکیپیڈیا (ur)"/>
```

The shortName to use in your .xml file is `ویکیپیڈیا (ur)`. Copying and pasting RTL languages is particularly tricky.

#### Yahoo
Unlike Wikipedia, never copy the file from en-US, since Yahoo is the default and has different parameters.

## Creating a patch for review (mozilla-unified repository)
If you plan to create a patch instead of using mozreview, you can refer to the instructions available in the second part of the document, simply working inside your local clone of mozilla-unified as repository.

After you've created all the files you need, check the status of the repository
```
$ hg status
M browser/locales/search/list.json
? browser/locales/searchplugins/amazon-in.xml
? browser/locales/searchplugins/wikipedia-ur.xml
```

I need to add the new files.
```
$ hg add browser/locales/searchplugins
$ hg status
M browser/locales/search/list.json
A browser/locales/searchplugins/amazon-in.xml
A browser/locales/searchplugins/wikipedia-ur.xml
```

Let’s create a bookmark for this pending work, for example `bug1304757`.
```
$ hg bookmark bug1304757
```

Commit the changes with a commit message that includes the reviewer's nickname after `r?`, for example if flod is the reviewer:
```
$ hg commit -m "Bug 1304757 - [ur] Search engine setup for Firefox for Urdu, r?flod"
```

At this point you can check the status of the tree:
```
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

Push to review with:
```
$ hg push review
```

If you need to address review comments, you can restore your branch by switching to your bookmark, and start working on it again.
```
$ hg up bug1304757
```

You can check which bookmark is currently active with `hg bookmarks`:
```
$ hg bookmarks
   aurora                    359014:96503957841c
   beta                      359025:34c73c520f93
 * bug1304757                359034:bde380bc54ff
   central                   358999:a69583d2dbc6
```

Make your changes and commit them
```
$ hg commit -m "Address review comments"
```

Then squash the commit together:
```
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

In this case you want to *roll* the second commit into the first one, so replace `pick` with `roll` (or `r`), save with CTRL+O and exit with CTRL+X (assuming the default editor is nano).
```
pick f6f70f6de69c 358597 Bug 123456 - [ur] Search engine setup for Firefox fo...
roll 8088fd8658fd 358598 Fix searchplugin name

...
```

Push again to mozreview
```
$ hg push review
```

You can also use `hg histedit` to reword a commit message (set the commit line to `edit`). Just remember to complete the `histedit` after commit.
```
$ hg commit -m "Some changes"
$ hg histedit --continue
```

If necessary, you can rebase another bookmark, like `central` or `inboun`
```
$ hg rebase -d central
```

More information about this workflow are available in these pages:
http://mozilla-version-control-tools.readthedocs.io/en/latest/hgmozilla/firefoxworkflow.html
https://www.mercurial-scm.org/wiki/Bookmarks

## Setting up files for locale's repository
### region.properties
region.properties is stored in `/browser/chrome/browser-region` and it contains information about protocol handlers. You can use [this region.properties model](desktop_region.properties) as a base, making sure to remove non existing searchplugins from `search.order`.

## Creating a patch for review (locale repository)
Assuming you followed the instructions to [setup the environment](/config/setting_mercurial_environment.md), you’re ready to create the patch.

Move into the repository folder and check its status:
```
$ cd ~/mozilla/mercurial/l10n/ur/mozilla-aurora

$ hg status
? browser/chrome/browser-region/region.properties
```
The `?` indicates that these file are not tracked by Mercurial, so we need to add them. If you’re in the root of the repository, you can add the entire `mobile` folder instead of the single files:

```
$ hg add browser

$ hg status
A browser/chrome/browser-region/region.properties
```
The `A` stands for added (i.e. tracked).

You need to assign a name to this patch, it’s easy to use a reference to the bug number: for example, if the bug number is 123456, the file could be called `bug123456.patch` (note the added extension `.patch`).

```
$ hg qnew bug123456.patch
```

At this point you will be asked to provide a commit message for your patch (in `nano` if you followed the instructions to set up the environment): write your commit message, then press `CTRL+O` to save the file, `enter` to confirm the proposed filename, and finally `CTRL+X` to exit the editor.

The commit message should be the same as the bug, for example `Bug 123456 - Set up searchplugins for "ur" and Firefox desktop`.

You’ready to *pop* the patch out of the queue. Since there are no other patches, you can pop them all with `-a`.
```
$ hg qpop -a
popping bug123456.patch
patch queue now empty
```

The patch is stored inside the `.hg/patches` folder in the root of the repository (in the suggested setup, the full path would be `~/mozilla/mercurial/mozilla-aurora/.hg/patches`). You can copy the file through the command line or the file explorer. For example, on Mac you can open the folder in Finder by typing:
```
$ open ~/mozilla/mercurial/l10n/ur/mozilla-aurora/.hg/patches
```
Or you can copy the file on the Desktop with
```
$ cp ~/mozilla/mercurial/l10n/ur/mozilla-aurora/.hg/patches/bug123456.patch ~/Desktop
```

Now you need to attach the file to Bugzilla and set an appropriate reviewer for it.

## Updating the patch
Let’s assume that the review found some issues with the patch and you need to update it. The fastest way is to import the .patch file without committing, update the files as needed, and create a new patch using the same process explained above.

Assuming the file is called `bug123456.patch` and it’s in your desktop, you can move in the repository folder and import the file like this:
```
$ cd ~/mozilla/mercurial/l10n/ur/mozilla-aurora

$ hg import --no-commit ~/Desktop/bug123456.patch
```

**Note:** You can drag and drop the patch file on the terminal on Mac to get its full path instead of typing it. In other words, type `hg import --no-commit `, then drag the icon of the patch on the Terminal’s window, the path will appear automatically.

At this point you’re ready to modify the files, and create a new patch. The only different is that you will need to use a different filename, for example `bug123456v1.patch`.

## Applying the patch
Your patch got a `r+`, so you need to update the commit message to reference the review, import the patch and push it to the remote server.

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
```
$ cd ~/mozilla/mercurial/l10n/ur/mozilla-aurora

$ hg import ~/Desktop/bug123456.patch
```

The patch has been imported and committed. Now you’re ready to push to the remote repository
```
$ hg push
```

The reply from the server will contain the URL to your changeset: copy and paste that URL in the bug and close it.
