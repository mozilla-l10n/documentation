# Set up searchplugins and protocol handlers

<!-- toc -->

## Set up searchplugins

Searchplugins configuration has become too complex and it’s constantly evolving, because of that a [bug needs to be filed](https://bugzilla.mozilla.org/enter_bug.cgi?product=Firefox&component=Search) to let the Search Team set up new locales. This section is meant as an overall reference, with link to external documentation.

Given the complexity and external dependencies, it’s become common practice to set up searchplugins at a later phase, when the locale is ready to move from Nightly to Beta, and let Nightly rely on default settings.

Starting with Firefox 68, the [XML OpenSearch](https://developer.mozilla.org/en-US/docs/Web/OpenSearch) format was dropped for built-in searchplugins, switching to [WebExtensions](https://searchfox.org/mozilla-central/source/browser/components/search/extensions). Each searchplugin has its own folder, with:
* An icon, which can be either in PNG format (`favicon.png`) or ICO (`favicon.ico`).
* A WebExtension manifest (`manifest.json`). If the searchplugin supports only one locale, the manifest includes the localized name (repeated twice) and description ([leo-ende example](https://searchfox.org/mozilla-central/rev/a78233c11a6baf2c308fbed17eb16c6e57b6a2ac/browser/components/search/extensions/leo_ende_de/manifest.json)).

```JSON
{
  "name": "LEO Eng-Deu",
   "description": "Deutsch-Englisch Wörterbuch von LEO",
  [...]
  "chrome_settings_overrides": {
    "search_provider": {
      "name": "LEO Eng-Deu",
      [...]
    }
  }
}
```

* A `_locales` folder if the searchplugins supports multiple locales. In this case, the manifest will only include placeholders for name and description, and they will be localized in a subfolder for the locale itself ([Wikipedia example](https://searchfox.org/mozilla-central/rev/a78233c11a6baf2c308fbed17eb16c6e57b6a2ac/browser/components/search/extensions/wikipedia/_locales/it/messages.json)).

```JSON
  "extensionName": {
    "message": "Wikipedia (it)"
  },
  "extensionDescription": {
    "message": "Wikipedia, l'enciclopedia libera"
  },
```

As of Firefox 77, the search configuration is still stored in-tree ([list.json](https://searchfox.org/mozilla-central/rev/41c3ea3ee8eab9ce7b82932257cb80b703cbba67/browser/components/search/extensions/list.json)). More recent versions of Firefox will switch to a new configuration system (`search-config.json`), and use [Remote Settings](https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/search-config/records) to be able to update the configuration independently from the release cycle. The new system, including the schema for `search-config.json`, is documented in [Firefox Documentation - Search Service](https://firefox-source-docs.mozilla.org/toolkit/search/index.html).

When [filing a new bug](https://bugzilla.mozilla.org/enter_bug.cgi?product=Firefox&component=Search), make sure to provide the following information:
* The list of searchplugins to use for the locale.
* If a new searchplugin needs to be added: name, description, icon, search parameters. The best way to make sure all information is included is to use existing searchplugins as reference.

### Tips for icons and Wikipedia

#### Icons

These are some useful tips to deal with icons for brand new searchplugins:
* If the image is a PNG, make sure to optimize it before encoding it to `base64` (for example using [tinypng.com](https://tinypng.com/)).
* You can create an `.ico` file starting from separate 16px and 32px PNG icons. Create a 32px image in [Gimp](https://www.gimp.org/), add each icon to a separate layer, and export the file as `.ico` (make sure to select the option to compress each of the layers).
* You can use online services (like [this one](http://freeonlinetools24.com/base64-image)) to quickly encode an image to `base64`.
* You can test the image in the browser (copy and paste the data URI in the address bar). You will still have to download it to check that everything looks good, since only one image will be displayed for multilayer `.ico` files, and transparent files are displayed in a misleading way in Firefox preview.

#### Wikipedia

**URLs:** Make sure to update all URLs. If the URL for English starts with `en.wikipedia.`, for `ur` it should start with `ur.wikipedia.` (check if the domain actually exists).

**Search template:** There’s one special URL to keep in mind, in English it’s https://en.wikipedia.org/wiki/Special:Search
It’s particular because the last part changes according to the locale, just try replacing the domain first from `en.` to `ur.`: https://ur.wikipedia.org/wiki/Special:Search
You’ll notice that it redirects to `https://ur.wikipedia.org/wiki/خاص:تلاش` and that’s the URL you need to use in the webextension.

You can’t copy the full URL from the address bar since it will encode UTF-8 characters, e.g. `https://ur.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B5:%D8%AA%D9%84%D8%A7%D8%B4`, so it’s faster to just copy only part of the URL and fix the rest by hand.

**Description:** You will need localizers to provide the translation for `Wikipedia, the Free Encyclopedia`.

**Name:** In the localization file there’s an attribute called `extensionName`. For English is:

```JSON
"extensionName": {
  "message": "Wikipedia (en)"
},
```

To get the localized name, visit https://gn.wikipedia.org and press `CTRL+U` to view the source code of the page. At the beginning you will find a line looking like this:

```HTML
<link rel="search" type="application/opensearchdescription+xml" href="/w/opensearch_desc.php" title="ویکیپیڈیا (ur)"/>
```

The *Name* to use in your localization is `ویکیپیڈیا (ur)`. Copying and pasting RTL languages is particularly tricky.

## Set up protocol handlers

You will be working on l10n-central to set up protocol handlers for a new locale, and you need this locale’s Mercurial repository on your computer.

l10n repositories for Firefox live in https://hg.mozilla.org/l10n-central. In this case, let’s assume that l10n clones will be stored in `~/mozilla/mercurial/l10n`, with a subfolder for each locale. So, if the locale is `ur`, the repository will be stored in `~/mozilla/mercurial/l10n/ur`.

```BASH
$ mkdir -p ~/mozilla/mercurial/l10n
$ cd ~/mozilla/mercurial/l10n
```

The first command makes sure that the path for l10n repositories exists, the second moves into the folder.

If you don’t have a clone yet, you need to create it:

```BASH
$ hg clone ssh://hg.mozilla.org/l10n-central/ur
```

The command uses `ssh://`, which means you need an active (and [properly configured](../../tools/mercurial/setting_mercurial_environment.md)) SSH access to the repository.

Once the execution is completed, there should be a clone stored in `~/mozilla/mercurial/l10n/ur`.

If you already have a clone on your computer, always make sure to update it before doing anything:

```BASH
$ cd ~/mozilla/mercurial/l10n/ur
$ hg pull -r default -u
```

### region.properties

region.properties is stored in `/browser/chrome/browser-region` for Firefox desktop, and it contains information about protocol handlers. You can use [this region.properties model](files/desktop_region.properties) as a base.

If you’re updating an existing file, make sure to not reset the `gecko.handlerService.defaultHandlersVersion` key. If, on the other hand, you’re adding a new handler, you will have to increment the existing numeric value.

### Creating a patch for review (locale repository)

Once files are ready, follow the instructions available in [this document](../../tools/mercurial/creating_mercurial_patch.md) to create a patch, submit it for review, and land it.
