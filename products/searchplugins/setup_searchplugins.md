# Set up searchplugins

## Cloning/Updating the locale’s repository

You will be working on l10n-central for a new locale, and you need this locale’s Mercurial repository on your computer.

l10n repositories for Firefox live in https://hg.mozilla.org/l10n-central/. In this case let’s assume that l10n clones will be stored in `~/mozilla/mercurial/l10n`, with a subfolder for each locale and each branch. So, if the locale is `ur`, the repository will be stored in `~/mozilla/mercurial/l10n/ur/l10n-central`.

```BASH
$ mkdir -p ~/mozilla/mercurial/l10n/ur
$ cd ~/mozilla/mercurial/l10n/ur
```

The first command makes sure that the path for `ur` exists, the second moves into the folder.

If you don’t have a clone yet, you need to create it.

```BASH
$ hg clone ssh://hg.mozilla.org/l10n-central/ur l10n-central
```

A couple of details to note in this `hg clone` command:
* The command uses `ssh://`, which means you need an active (and [properly configured](../../tools/mercurial/setting_mercurial_environment.md)) SSH access to the repository.
* It doesn’t use the default folder for the local clone, but specify a `l10n-central` directory. Without that it would create a `ur` folder, making it impossible to distinguish different branches.

At this point there’s a clone stored in `~/mozilla/mercurial/l10n/ur/l10n-central` (remember that you already moved to `~/mozilla/mercurial/l10n/ur` before running `hg clone`).

If you already have a clone on your computer, always make sure to update it before doing anything:

```BASH
$ cd ~/mozilla/mercurial/l10n/ur/l10n-central
$ hg pull -r default -u
```

## Setting up files for mozilla-unified

First of all make sure that your environment is [correctly set up](../../tools/mercurial/setting_mercurial_environment.md), and update your local mozilla-unified clone to be in sync with central:

```BASH
$ cd ~/mozilla/mercurial/mozilla-unified
$ hg pull -u
$ hg up central
```

### list.json

The list of searchplugins is stored in JSON format:
* For Firefox desktop in [/browser/locales/search/list.json](https://hg.mozilla.org/mozilla-central/file/default/browser/locales/search/list.json).
* For Firefox for Android in [/mobile/locales/search/list.json](https://hg.mozilla.org/mozilla-central/file/default/mobile/locales/search/list.json).

The basic structure for each locale is fairly simple. Assuming the locale code is `ur`, it will have a `default` key, with `visibleDefaultEngines`.

```JSON
"ur": {
  "default": {
    "visibleDefaultEngines": [
      "google", "bing", "amazon-in", "ddg", "wikipedia-ur"
    ]
  }
},
```

Notes about the list:
* If the searchplugin XML file is called `google.xml`, the item to add in list.json will be only `google`, without the extension but also **respecting the case**.
* Order should reflect the actual order of searchplugins: if Google is default, and Bing 2nd, the list should start with `"google", "bing"`. The remaining searchplugins can be in alphabetical order. The actual order in the browser is currently still determined by region.properties, but at some point that file will be removed.
* If a locale is missing from list.json, it will fall back to `default`, defined at the beginning of the file.

To make sure you’re not creating a broken JSON, you can test the final content with an online validator like [jsonlint](https://jsonlint.com/).

### XML files

Searchplugins are stored:
* For Firefox desktop in [/browser/locales/searchplugins](https://hg.mozilla.org/mozilla-central/file/default/browser/locales/searchplugins).
* For Firefox for Android in [/mobile/locales/searchplugins](https://hg.mozilla.org/mozilla-central/file/default/mobile/locales/searchplugins).

For other searchplugins you will need to create the .xml file yourself, with some general rules to keep in mind:
* Always have a MPL2 license header at the beginning.
* On desktop icons are currently square 16px and 32px, both embedded in a multilayer `.ico` file.
* On Android icons are currently 96px transparent PNG images, with rounded corners (radius 6px), preferably with a colored background since the UI is white, and a white background wouldn’t show the rounded corners.
* Check if other locales already ship the same searchplugin, and copy their XML file to use as a base. If the searchplugin is brand new, it needs to be approved by BD and it will take some time, so it might be worth starting with a shorter list of searchplugins, and consider the new one in a follow-up bug. Icons will also be provided by the search provider after approval.

#### Icons

These are some useful tips to deal with new icons for searchplugins:
* If the image is a PNG (for Android), make sure to optimize it before encoding it to base64 (for example using [tinypng.com](https://tinypng.com/)).
* You can create an `.ico` file starting from separate 16px and 32px PNG icons. Create a 32px image in [Gimp](https://www.gimp.org/), add each icon to a separate layer, and export the file as `.ico` (make sure to select the option to compress each of the layers).
* You can use online services (like [this one](http://freeonlinetools24.com/base64-image)) to quickly encode an image to base64.
* You can test the image in the browser (copy and paste the data URI in the address bar). You will still have to download it to check that everything looks good, since only one image will be displayed for multilayer `.ico` files, and transparency is quite confusing in Firefox preview.

#### Wikipedia

**URLs:** If you copy the .xml file from another locale (en-US is always the best choice for Wikipedia), make sure to update all URLs. If the URL for English starts with `en.wikipedia.`, for `ur` it should start with `ur.wikipedia.` (check if the domain actually exists).

**Search template:** There’s one special URL to keep in mind, in English it’s https://en.wikipedia.org/wiki/Special:Search
It’s particular because the last part changes according to the locale, just try replacing the domain first from `en.` to `ur.`: https://ur.wikipedia.org/wiki/Special:Search
You’ll notice that it redirects to `https://ur.wikipedia.org/wiki/خاص:تلاش` and that’s the URL you need to use in the .xml file.

You can’t copy the full URL from the address bar since it will encode UTF-8 characters, e.g. `https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B5:%D8%AA%D9%84%D8%A7%D8%B4`, so it’s faster to just copy only part of the URL and fixing the rest by hand.

**Description:** You will need localizers to provide the translation for `Wikipedia, the Free Encyclopedia`.

**shortName:** In the .xml file there’s an attribute called `shortName`. For English is:

```XML
<ShortName>Wikipedia</ShortName>
```

When you visit a page that exposes a searchplugin, like Wikipedia, Firefox checks if you already have one installed with the same `shortName`: if you don’t, the UI will suggest you to install it by displaying a small green + sign on the magnifying glass icon in the search bar. To avoid this, the searchplugin shipping in Firefox needs to match the shortName of the searchplugin available from Wikipedia. Visit https://gn.wikipedia.org and press `CTRL+U` to view the source code of the page. At the beginning you will find a line looking like this:

```HTML
<link rel="search" type="application/opensearchdescription+xml" href="/w/opensearch_desc.php" title="ویکیپیڈیا (ur)"/>
```

The shortName to use in your .xml file is `ویکیپیڈیا (ur)`. Copying and pasting RTL languages is particularly tricky.

## Creating a patch for review

Once files are ready, follow the instructions available in [this document](../../tools/mercurial/creating_mercurial_patch.md) to create a patch, submit it for review, and land it.

## Setting up files for locale’s repository

### region.properties

region.properties is stored in `/browser/chrome/browser-region` for Firefox desktop (`/mobile/chrome` for Firefox for Android), and it contains information about the default searchplugin, searchplugins order, and protocol handlers. You can use these files as a base:
* For Firefox desktop [this region.properties model](files/desktop_region.properties).
* For Firefox for Android [this region.properties model](files/mobile_region.properties).

A few tips:
* The default searchplugins is defined in `browser.search.defaultenginename`. Unlike `list.json`, here you need to specify the `shortName` attribute included in the XML file, not the filename. So, in case of Google, it will be `Google`, not `google`.
* Make sure to remove non existing searchplugins from `search.order`.
* If you’re updating an existing file, make sure to not reset the `gecko.handlerService.defaultHandlersVersion` key. If, on the other hand, you’re adding a new handler, you will have to increment the existing numeric value.

## Creating a patch for review (locale repository)

Once files are ready, follow the instructions available in [this document](../../tools/mercurial/creating_mercurial_patch.md) to create a patch, submit it for review, and land it.
