# Documentation

This repository includes several documents describing how to perform internal tasks within the [l10n-drivers team](https://wiki.mozilla.org/L10n:Mozilla_Team) at Mozilla. If you’re reading these pages on GitHub, a version with improved readability and search capabilities is available [here](https://mozilla-l10n.github.io/documentation).

Topics covered:
* Manage [Firefox for Android](products/firefox_android/README.md) and [Firefox desktop](products/firefox_desktop/README.md): setting up builds, bootstrap productization settings, and testing.
* How to [review strings](products/review/review.md) and [perform sign-offs](products/review/signoffs.md) for Firefox desktop and Firefox for Android.
* Manage [App Store and Google Play](products/appstores/README.md) content updates.
* Manage [mozilla.org](products/mozilla_org/README.md) localization.
* Technical documentation and common tasks for our [webdashboards](tools/webdashboards/README.md).
* Technical documentation for the [Stores web app](tools/stores_l10n/README.md).
* Perform common and advanced tasks on [Pontoon](tools/pontoon/README.md) like adding new locale, and creating a new project.
* Other [miscellaneous documents](misc/README.md) related to localization tasks.

## How to read these documents

You will need a Unix-like environment (Linux, macOS) to run most of the tools. Across the entire documentation, commands to run in a terminal are described like this:

```BASH
$ composer update
```

`$` is not part of the command, it just indicates the terminal prompt. The command to type or copy and paste is simply `composer update`.

In several occasions documents use aliases instead of the complete path to commands: for example `lang_update` instead of `path_to_langchecker_clone/app/scripts/lang_update`. Check [Setting up a Linux Virtual Machine for Webdashboards](config/setup_l10ndrivers_vm.md) for instructions on how to setup a virtual machine running on Linux Ubuntu with all the necessary packages and aliases.

## Updating the documentation

Simply open a pull request adding the new file or updating an existing document. Make sure to follow [these style guidelines](misc/documentation_styleguide.md), and note that all pull requests need to be reviewed before merging.

## GitBook

GitBook is built automatically via Travis, and changes pushed to the gh-pages branch.

If you want content to appear on Gitbook, it needs to be listed in [SUMMARY.md](SUMMARY.md).
