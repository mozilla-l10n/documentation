# Stores Application

This web application is used to maintain localized content for mobile stores (Google Play, App Store):
* Main listing (description).
* What’s new content for new releases.
* Keywords.
* Other localizable content, like screenshots.

Localization files are stored in the [appstores l10n repository](https://github.com/mozilla-l10n/appstores) (.lang format).

This app allows:
* Localizers to see the various strings assembled in one page/template, and warnings for strings exceeding length limits.
* L10n drivers to check the overall status of store localization for each product and channel. In the [main view](https://l10n.mozilla-community.org/stores_l10n/), completion cell turns green when localization is complete.
* Release Engineering to get translations through [API](https://l10n.mozilla-community.org/stores_l10n/documentation/). This is currently happening only for Android, via [mozapkpublisher](https://github.com/mozilla-releng/mozapkpublisher/), but there are plans to extend it to App Store content.
* Other users, for example designers working on screenshots, to copy and paste translation without accessing directly repositories.

Refer to the [README](https://github.com/mozilla-l10n/stores_l10n/#installation) in the code repository for instructions on how to install this app.

## Projects configuration

The entire configuration is stored inside the [Project class](https://github.com/mozilla-l10n/stores_l10n/blob/master/app/classes/Stores/Project.php).

`$products_data` stores all supported products, with the following structure for each of them:

```PHP
'fx_android' =>
    [
        'channels' => ['beta', 'release'],
        'name'     => 'Firefox for Android',
        'store'    => 'google',
    ],
```

Relevant information in this array:
* The ID of the project, used also for API calls, it’s the item’s key.
* Supported channels.
* Full name of the product, used in views and navigation.
* In which store the project lives. Currently it can be `apple` or `google`.

`$supported_locales` includes information on all locales supported for each product and channel. It’s important to note that these lists are used in [Langchecker](/tools/webdashboards/langchecker.md), to determine which locales should see specific files (product pages on mozilla.org, store content).

`$locales_mapping` includes information on mappings between Mozilla’s locale codes, and each store’s internal codes.

`$templates` determines, for each product and channel, which template is used, and which .lang files are associated to a specific part of the template (What’s new, main listing, screenshots). This array is updated every time there is a [new release](/products/appstores/README.md).

In order to add a brand new project, you would need to:
* Define the new project and supported channels in `$products_data`.
* Define the list of supported locales for each channel in `$supported_locales`.
* Define an entry in `$templates`.
* Create files in [/templates](https://github.com/mozilla-l10n/stores_l10n/tree/master/app/templates) and [/view](https://github.com/mozilla-l10n/stores_l10n/tree/master/app/views) for each supported channel.
* Track the new .lang files in Langchecker for the appstores repository.

## Template and View Structure

This is a portion of the template file used for Focus for iOS.

```PHP
$screenshots = function ($translations) use ($_) {
    return <<<OUT
{$_('Automatically block ads<br>& other Web trackers')}

{$_('Browse Faster<br>Web pages may load faster<br>by removing trackers')}

{$_('Before')}

{$_('After')}

{$_('Tracker')}

{$_('From Mozilla<br>A brand you trust')}
OUT;
};
```

Similarly to a Django template, each string is wrapped in a translation function `$_('')` (defined in [app/inc/utilities.php](https://github.com/mozilla-l10n/stores_l10n/blob/master/app/inc/utilities.php#L5)).
Strings are grouped into a variable, like `$screenshots` in this case: this allows, for example, to determine the overall length of all strings included in a section, to see if it exceeds the [limits imposed by stores](https://github.com/mozilla-l10n/stores_l10n/blob/master/app/inc/constants.php#L15-L22). It’s important to note that, since these limits are per-section and not per-string, the standard webdashboard won’t display any warnings. Also, if a string exceeds the maximum length, it won’t be exposed via API and the locale will be marked as incomplete.

These variables are then used in views, for example the variable/function `$description`:

```PHP
<h3>Description</h3>
<pre><?= $description($translations) ?></pre>
```

It’s also possible to embed more logic into these view:

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
            <pre class="text-center"><?= $screenshots($translations) ?></pre>
<?php

        };
    }
?>
```

In this specific case the Screenshots section is displayed only if locale has the associated .lang file. This allows to use only one view for all languages, even if only some locales will have the screenshots .lang file.
