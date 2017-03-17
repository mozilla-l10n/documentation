# Set up searchplugins

## Cloning/Updating the locale’s repository

The first thing to remember is that you will be working on Aurora for a new locale, and you need this locale’s Mercurial repository on your computer.

l10n repositories for Android live in https://hg.mozilla.org/releases/l10n/mozilla-aurora/. In this case let’s assume that l10n clones will be stored in `~/mozilla/mercurial/l10n`, with a subfolder for each locale and each branch. So, if the locale is `gn`, the repository will be stored in `$/mozilla/mercurial/l10n/gn/mozilla-aurora`.

```BASH
$ mkdir -p ~/mozilla/mercurial/l10n/gn
$ cd ~/mozilla/mercurial/l10n/gn
```

The first command makes sure that the path for `gn` exists, the second moves into the folder.

If you don’t have a clone yet, you need to create it.

```BASH
$ hg clone ssh://hg.mozilla.org/releases/l10n/mozilla-aurora/gn mozilla-aurora
```

A couple of details to note in this `hg clone` command:
* The command uses `ssh://`, which means you need an active (and properly configured) SSH access to the repository.
* It doesn’t use the default folder for the local clone, but specify a `mozilla-aurora` directory. Without that it would create a `gn` folder, making it impossible to distinguish different branches.

At this point there’s a clone stored in `~/mozilla/mercurial/l10n/gn/mozilla-aurora` (remember that you already moved to `~/mozilla/mercurial/l10n/gn` before running `hg clone`).

If you already have a clone on your computer, always make sure to update it before doing anything:

```BASH
$ cd ~/mozilla/mercurial/l10n/gn/mozilla-aurora
$ hg pull -r default -u
```

## Setting up files

### list.txt

list.txt is stored in `mobile/searchplugins/list.txt`. If the folder `mobile/searchplugins/` doesn’t exist, you need to create it first.

Things to remember about list.txt:
* It’s a flat text file.
* Order is not relevant, so it’s highly suggested to use alphabetical order (easy to obtain with Atom and Sort Lines, just press `F5`).
* Each line maps to a searchplugin: if the file for the searchplugin is called `google.xml`, the line will just say `google`, without the extension but also **respecting the case**.

### XML files

Searchplugins are stored in the `mobile/searchplugins` folder.

You need to add a new .xml file only if the searchplugin is not already shipping in English. You can see the full list of en-US searchplugins in https://hg.mozilla.org/releases/mozilla-aurora/file/default/mobile/locales/en-US/searchplugins

For example, to ship `Twitter` in a localized build, you only need to add `twitter` to `list.txt`.

For other searchplugins you will need to create the .xml file yourself, with some general rules to keep in mind:
* Always have a MPL2 license header at the beginning.
* Icons are currently 96px transparent PNG images, with rounded corners (radius 6px), preferably with a colored background since the UI is white, and a white background wouldn’t show the rounded corners. Icons on Firefox desktop are completely different (square 16px or 32px, often both embedded in a .ico file), so be aware of that if copying files from desktop.
* Check if other locales already ship the same searchplugin, and copy their XML file to use as a base. If the searchplugin is brand new, it needs to be approved by BD and it will take some time, so it might be worth starting with a shorter list of searchplugins, and consider the new one in a follow-up bug. Icons will also be provided by the search provider after approval.

#### Wikipedia

**URLs:** If you copy the .xml file from another locale (en-US is always the best choice for Wikipedia), make sure to update all URLs. If the URL for English starts with `en.wikipedia.`, for `gn` it should start with `gn.wikipedia.` (check if the domain actually exists).

**Search template:** There’s one special URL to keep in mind, in English it’s https://en.wikipedia.org/wiki/Special:Search
It’s particular because the last part changes according to the locale, just try replacing the domain first from `en.` to `gn.`: https://gn.wikipedia.org/wiki/Special:Search
You’ll notice that it redirects to https://gn.wikipedia.org/wiki/Mba'echĩchĩ:Buscar and that’s the URL you need to use in the .xml file.

You can’t copy the full URL from the address bar since it will encode UTF-8 characters, e.g. `https://gn.wikipedia.org/wiki/Mba%27ech%C4%A9ch%C4%A9:Buscar`, so it’s faster to just copy only part of the URL and fixing the rest by hand.

**shortName:** In the .xml file there’s an attribute called `shortName`. For English is:

```XML
<ShortName>Wikipedia</ShortName>
```

When you visit a page that exposes a searchplugin, like Wikipedia, Firefox checks if you already have one installed with the same `shortName`: if you don’t, the UI will suggest you to install it by displaying a small green + sign on the magnifying glass icon in the search bar. To avoid this, the searchplugin shipping in Firefox needs to match the shortName of the searchplugin available from Wikipedia. Visit https://gn.wikipedia.org and press `CTRL+U` to view the source code of the page. At the beginning you will find a line looking like this:

```HTML
<link rel="search" type="application/opensearchdescription+xml" href="/w/opensearch_desc.php" title="Vikipetã (gn)"/>
```

The shortName to use in your .xml file is `Vikipetã (gn)`.

#### Yahoo

Unlike Wikipedia, never copy the file from en-US, since Yahoo is the default and has different parameters. In this case you need to copy the file from `/mobile` in another locale, making sure that the domain is the one you want. For example there’s https://es.search.yahoo.com but also https://espanol.search.yahoo.com (es-ES versus a more generic Spanish).

### region.properties

region.properties is stored in `/mobile/chrome/region.properties` and it contains information about protocol handlers. You can use [this region.properties model](mobile_region.properties) as a base, making sure to remove non existing searchplugins from `search.order`.

## Creating a patch for review

Assuming you followed the instructions to [setup the environment](/config/setting_mercurial_environment.md), you’re ready to create the patch.

Move into the repository folder and check its status:

```BASH
$ cd ~/mozilla/mercurial/l10n/gn/mozilla-aurora

$ hg status
? mobile/chrome/region.properties
? mobile/searchplugins/list.txt
? mobile/searchplugins/wikipedia-gn.xml
? mobile/searchplugins/yahoo-espanol.xml
```

The `?` indicates that these file are not tracked by Mercurial, so they need to be added. If you’re in the root of the repository, you can add the entire `mobile` folder instead of the single files:

```BASH
$ hg add mobile

$ hg status
A mobile/chrome/region.properties
A mobile/searchplugins/list.txt
A mobile/searchplugins/wikipedia-gn.xml
A mobile/searchplugins/yahoo-espanol.xml
```

The `A` stands for added (i.e. tracked).

You need to assign a name to this patch, it’s easy to use a reference to the bug number: for example, if the bug number is 123456, the file could be called `bug123456.patch` (note the added extension `.patch`).

```BASH
$ hg qnew bug123456.patch
```

At this point you will be asked to provide a commit message for your patch (in `nano` if you followed the instructions to set up the environment): write your commit message, then press `CTRL+O` to save the file, `enter` to confirm the proposed filename, and finally `CTRL+X` to exit the editor.

The commit message should be the same as the bug, for example `Bug 123456 - Set up searchplugins for "gn" and Firefox for Android`.

You’ready to *pop* the patch out of the queue. Since there are no other patches, you can pop them all with `-a`.

```BASH
$ hg qpop -a
popping bug123456.patch
patch queue now empty
```

The patch is stored inside the `.hg/patches` folder in the root of the repository (in the suggested setup, the full path would be `~/mozilla/mercurial/mozilla-aurora/.hg/patches`). You can copy the file through the command line or the file explorer. For example, on Mac you can open the folder in Finder by typing:

```BASH
$ open ~/mozilla/mercurial/l10n/gn/mozilla-aurora/.hg/patches
```

Or you can copy the file on the Desktop with

```BASH
$ cp ~/mozilla/mercurial/l10n/gn/mozilla-aurora/.hg/patches/bug123456.patch ~/Desktop
```

Now you need to attach the file to Bugzilla and set an appropriate reviewer for it.

## Updating the patch

Let’s assume that the review found some issues with the patch and you need to update it. The fastest way is to import the .patch file without committing, update the files as needed, and create a new patch using the same process explained above.

Assuming the file is called `bug123456.patch` and it’s in your desktop, you can move in the repository folder and import the file like this:

```BASH
$ cd ~/mozilla/mercurial/l10n/gn/mozilla-aurora

$ hg import --no-commit ~/Desktop/bug123456.patch
```

**Note:** You can drag and drop the patch file on the terminal to get its full path instead of typing it. In other words, type `hg import --no-commit`, then drag the icon of the patch on the Terminal’s window, the path will appear automatically.

At this point you’re ready to modify the files, and create a new patch. The only different is that you will need to use a different filename, for example `bug123456v1.patch`.

## Applying the patch

Your patch got a `r+`, so you need to update the commit message to reference the review, import the patch and push it to the remote server.

Open the .patch file in your editor, find the line with the commit message, and add `r=NICKNAME` to the commit message. For example, the last line in

```
# HG changeset patch
# User SOMENAME <SOME EMAIL>
# Parent  b45d23bc53df9227aa262acb2a5c6b0ab903b76e
Bug 123456 - Set up searchplugins for "gn" and Firefox for Android
```

Should become like this, assuming flod is the reviewer.

```
Bug 123456 - Set up searchplugins for "gn" and Firefox for Android, r=flod
```

Then you need to import the patch, this time without the `no-commit` parameter.

```BASH
$ cd ~/mozilla/mercurial/l10n/gn/mozilla-aurora

$ hg import ~/Desktop/bug123456.patch
```

The patch has been imported and committed. Now you’re ready to push to the remote repository

```BASH
$ hg push
```

The reply from the server will contain the URL to your changeset: copy and paste that URL in the bug and close it.
