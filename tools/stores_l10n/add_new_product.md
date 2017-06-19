# How to add a new product to Stores

Before starting, make sure to read the [overview](overview.md) document to get a general idea of what this web app does and its structure.

This document will explain how to start tracking a new project, using Focus for Android as an example.

## Add new product to configuration

Configuration for the Stores web app is split between `app/config/product_sources.json` and the `Project` class (`app/classes/Stores/Project.php`). The first thing to do is to determine:
* How many channels are supported.
* Code name and displayed name for this product.
* If the product needs to support App Store (apple) or Play Store (google).

Let’s start with `app/config/product_sources.json`. This is a JSON file with the following structure:

```JSON
{
  "product code name": [
    {
      "channel": "name of the channel",
      "format": "format of the remote list",
      "source": "URL of the remote list"
    }
  ]
}
```

The only `format` supported at the moment is `txt`: a plain text file with one locale code per line.

If the project is tracked on [Webstatus](https://l10n.mozilla-community.org/webstatus/), you can use its [API](https://github.com/mozilla-l10n/webstatus/#available-urls) to get the list of all locales available ([example](https://l10n.mozilla-community.org/webstatus/api/?product=focus-android&txt) for Focus for Android).

This is the configuration to add to the file for Focus for Android:

```JSON
"focus_android": [
  {
    "channel": "release",
    "format": "txt",
    "source": "https://l10n.mozilla-community.org/webstatus/api/?product=focus-android&txt"
  }
]
```

If you’re not used to work with JSON files, once you have updated the configuration, you can use a [validator](https://jsonlint.com/) to ensure that the syntax is correct.

Now that `app/config/product_sources.json` contains Focus for Android, you need to run `apps/scripts/update_shipping_locales.py` to generate the list of locales shipping in this new product.
The list of locales will be stored in `app/config/shipping_locales.json`, make sure that the product and channel you’ve added are available, and spot check the list of locales generated.

At this point you need to work on `app/classes/Stores/Project.php`. This is the configuration for Focus for Android:

```PHP
private $products_data = [
...
    'focus_android' =>
        [
            'channels' => ['release'],
            'name'     => 'Focus for Android',
            'store'    => 'google',
        ],
...
];
```

The next step is to add which templates and .lang files will be used for this project. In case of Focus for Android there is:
* `template`: PHP file used to display the full information about this product.
* `listing`: .lang file containing the strings used in template (description, keywords, etc.).
* `screenshots`: .lang file used to localize screenshots. It’s distinct from the main .lang file in order to support only a subset of languages.

Since it’s the first launch for Focus for Android, a `whatsnew` entry won’t be needed, but it will be starting from the first update.

**Important**: follow the naming convention of existing products.

Here’s how the `focus_android` entry will look like:

```PHP
private $$templates = [
...
    'focus_android' => [
        'release' => [
            'template'    => 'focus_android/release/listing_mar_2017.php',
            'listing'     => 'focus_android/description_release.lang',
            'screenshots' => 'focus_android/screenshots_v1.lang',
        ],
    ],
...
];
```

## Add templates

Now that the configuration is done, you need to add the actual template file. Templates are stored in `app/templates`, and the easiest way to start is by copying an existing project. In this case you can copy templates from Focus for iOS, making sure to rename the folder to `focus_android`, and the template to `listing_mar_2017.php` (as specified in the configuration above).

This is the initial part of the template:

```PHP
<?php
namespace Stores;

// Include closure needed in template
include INC . 'utilities.php';

$app_title = function ($translations) use ($_) {
    return $_('Firefox Focus: The privacy browser');
};

$description = function ($translations) use ($_) {
    return <<<OUT
{$_('Browse like no one’s watching.')} {$_('The new Firefox Focus automatically blocks a wide range of online trackers — from the moment you launch it to the second you leave it.')} {$_('Easily erase your history, passwords and cookies, so you won’t get followed by things like unwanted ads.')}

{$_('“Private browsing” on most browsers isn’t comprehensive or easy to use.')} {$_('Focus is next-level privacy that’s free, always on and always on your side — because it’s backed by Mozilla, the non-profit that fights for your rights on the Web.')}

{$_('AUTOMATIC PRIVACY')}
• {$_('Blocks a wide range of common Web trackers without any settings to set')}
• {$_('Easily erases your history — no passwords, no cookies, no trackers')}

{$_('BROWSE FASTER')}
• {$_('By removing trackers and ads, Web pages may require less data and load faster')}

{$_('MADE BY MOZILLA')}
• {$_('We believe everyone should have control over their lives online. That’s what we’ve been fighting for since 1998.')}
OUT;
};
...
```

The first lines are common to all templates: they define the `namespace` and include a set of helper functions. Then, each section of the template is defined as a variable that returns translations for selected strings. The simplest case is:

```PHP
$app_title = function ($translations) use ($_) {
    return $_('Firefox Focus: The privacy browser');
};
```

`$app_title` is defined as a function that returns the translation, using the helper function `$_()`, for only one string.

In case there are more strings in a section, [HEREDOC](https://php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc) syntax can be used.

```PHP
$screenshots = function ($translations) use ($_) {
    return <<<OUT
{$_('Automatically block ads<br>& other Web trackers')}

{$_('Browse Faster<br>Web pages may load faster<br>by removing trackers')}
OUT;
};
```

Associating a group of strings to a variable allows to count the total number of characters for a section, and see if it’s longer than allowed.

Pay attention to the log when testing a new template that you’ve copied from another product, some functions and variables are exclusive of a specific store, for example:
* `$keywords_warning` is defined only for App Stores projects.
* `$short_desc` is defined only for Play Store projects.

## Add views

The next step is to add a view for each channel supported for this product. Views are stored in `views/product_name/channel`, in case of Focus for Android `views/focus_android/release`. There are 2 files to create:
* `locale_view.php`: used for *General view*.
* `locale_view_escaped.php`: used for *Description raw HTML*. It’s the same content as `locale_view.php`, but each element is included in `<pre <?= $direction ?> contenteditable="true"></pre>` elements.

As for templates, the easiest way to start is by copying files from an existing product.

This is how the first part of `locale_view.php` looks like:

```PHP
<h1>Focus for Android Listing Copy (<?= $request['locale'] ?>)</h1>

<h3>Title &mdash; <?= $title_warning ?></h3>
<pre <?= $direction ?>><?= $app_title($translations) ?></pre>

<h3>Short Description &mdash; <?= $short_desc_warning ?></h3>
<pre <?= $direction ?>><?= $short_desc($translations) ?></pre>
```

As you can see, it simply calls the variables created inside the template. The interesting part is that you can add more complex logic in this file:

```PHP
<?php
    /*
        Check if the file used for screenshots exists, display this section
        only in that case.
    */
    $screenshot_lang = $project->getLangFiles($request['locale'], $request['product'], $request['channel'], 'screenshots');
    if ($screenshot_lang) {
        $locale_file = LOCALES_PATH . $request['locale'] . '/' . array_shift($screenshot_lang);
        if (file_exists($locale_file)) {
            ?>
            <h3>Screenshots</h3>
            <pre <?= $direction ?> class="text-center"><?= $screenshots($translations) ?></pre>
<?php

        }
    }
?>
```

In this case, the screenshots session is displayed only if the requested locale actually has screenshots, i.e. if the file specified in the configuration is available.

`locale_view_escaped.php` is exactly the same as the default view, only using a different HTML structure to make copy and paste easier. For example, the same section displayed above becomes:

```PHP
<h1>Focus for Android Listing Copy (<?= $request['locale'] ?>)</h1>

<h3>Title &mdash; <?= $title_warning ?></h3>
<pre <?= $direction ?> contenteditable="true"><?= htmlspecialchars($app_title($translations)) ?></pre>

<h3>Short Description &mdash; <?= $short_desc_warning ?></h3>
<pre <?= $direction ?> contenteditable="true"><?= $short_desc($translations) ?></pre>
```

As for the templates, pay attention to differences between a product shipping on Play Store and one shipping on App Stores:
* For Android products there should be length warnings on title, short description, and description. For iOS, a warning should be displayed on keywords.
* There are no keywords in Android, short description is not available for iOS products.

## Tests

It’s not mandatory to add new tests, since they normally cover functionalities and not data. Adding a simple API test in `tests/functional/api.php` is highly suggested. For example:

```PHP
$paths = [
...
    ['v1/focus_android/done/release/', 200, false],
...
```

Some tests will need to be updated, for example `testGetSupportedProducts` in [tests/units/Store/Project.php](https://github.com/mozilla-l10n/stores_l10n/blob/master/tests/units/Store/Project.php). In case, unit tests are run as part of the automation when opening a pull request.

## Track .lang files in Langchecker

The Stores web app is going to use .lang files from the [appstores repository](https://github.com/mozilla-l10n/appstores). This document won’t go into much detail about these configuration files, if you’re not familiar with Langchecker you should read [this document](/tools/webdashboard/add_new_file-md) first.

In the configuration two .lang file are associated to Focus for Android:
* `focus_android/description_release.lang` for the main content.
* `focus_android/screenshots_v1.lang` for screenshots.

First you need to create a new `$focus_android_locales` array in `app/config/stores_locales.inc.php`.

```PHP
// Locales working on Focus for Android (from stores_l10n app)
$cache_id = 'focus_android_locales';
if (! $focus_android_locales = Cache::getKey($cache_id, 60 * 60)) {
    $focus_android_locales = $json_object
        ->setURI(STORES_L10N . 'focus_android/supportedlocales/release')
        ->fetchContent();
    $focus_android_locales = array_intersect($focus_android_locales, $mozilla);
    Cache::setKey($cache_id, $focus_android_locales);
}
```

This code retrieves, via API from the Stores web app, the list of locales supported for Focus for Android release. Then:

```PHP
$focus_android_store = array_intersect($focus_android_locales, $google_play_locales);
```

This intersects the list of locales shipping in Focus for Android with the list of locales supported in Play Store, and stores the resulting array in `$focus_android_store`.

Then you need to start tracking the new files in `app/config/sources.inc.php`:

```PHP
$appstores_lang = [
    'focus_android/description_release.lang' => [
        'supported_locales' => $focus_android_store,
    ],
    'focus_android/screenshots_v1.lang' => [
        'supported_locales' => [
            'es-ES', 'id', 'pt-BR', 'ru',
        ],
    ],
...
];
```

Once the configuration is complete, you’ll need to create the actual .lang files and add them to the appstores repository with `lang_update`.

## Adding a What’s new section

As already explained, you won’t need a *What’s new* section for a newly launched product. For further updates, you will need to add a `whatsnew` entry in the project configuration.

```PHP
private $$templates = [
...
    'focus_android' => [
        'release' => [
            'template'    => 'focus_android/release/listing_mar_2017.php',
            'listing'     => 'focus_android/description_release.lang',
            'screenshots' => 'focus_android/screenshots_v1.lang',
            'whatsnew'    => 'focus_android/whatsnew/focus_v2.lang',
        ],
    ],
...
];
```

Then manage this content in the template:

```PHP
$whatsnew = function ($translations) use ($_) {
    return <<<OUT
* {$_('A brand new feature')}
OUT;
```

And use this `$whatsnew` variable in all available views.

```PHP
<h3>What’s new &mdash; <?= $whatsnew_warning ?></h3>
<pre <?= $direction ?>><?= $whatsnew($translations) ?></pre>
```

## Testing

When all tools and repositories are ready, make sure to test everything locally and check PHP logs before opening a pull request. It’s strongly recommended to use a virtual machine set up following these [instructions](/config/setup_l10ndrivers_vm.md) running all needed tools.

A good way to test it is to provide a fake translation for one locale, slightly altering the translated strings, to check if all views and API calls work as expected.
