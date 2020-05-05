# Documentation

This repository includes several documents describing how to perform internal tasks within the [l10n-drivers team](https://wiki.mozilla.org/L10n:Mozilla_Team) at Mozilla. If you’re reading these pages on GitHub, a version with improved readability and search capabilities is available [here](https://mozilla-l10n.github.io/documentation).

Table of content is available in [this page](src/README.md).

## How to read these documents

You will need a Unix-like environment (Linux, macOS) to run most of the tools. Across the entire documentation, commands to run in a terminal are described like this:

```BASH
$ composer update
```

`$` is not part of the command, it just indicates the terminal prompt. The command to type or copy and paste is simply `composer update`.

In several occasions documents use aliases instead of the complete path to commands: for example `lang_update` instead of `path_to_langchecker_clone/app/scripts/lang_update`. Check [Setting up a Linux Virtual Machine for Webdashboards](src/config/setup_l10ndrivers_vm.md) for instructions on how to setup a virtual machine running on Linux Ubuntu with all the necessary packages and aliases.

## Updating the documentation

Simply open a pull request adding the new file or updating an existing document. Make sure to follow [these style guidelines](src/misc/documentation_styleguide.md), and note that all pull requests need to be reviewed before merging.

You can run the following commands to make sure that files are correctly formatted (you will need to [install npm](https://www.npmjs.com/get-npm) if it’s not already available):

```
$ npm install
$ npm test
```

## GitHub Pages

To generate these pages, [mdBook](https://github.com/rust-lang/mdBook/) is used and built automatically via Travis, and changes pushed to the `gh-pages` branch. If you want to build and preview the pages locally, [install Rust and cargo](https://www.rust-lang.org/learn/get-started) and then run the following commands from the root of the repository:

```
$ cargo install --vers "^0.3" mdbook-toc
$ mdbook serve
```

[mdbook-toc](https://github.com/badboy/mdbook-toc/) is used as a preprocessor, and will install the correct version of mdBook as a dependency.

If you want a new page to be available in GitHub pages, make sure to include a link in [src/SUMMARY.md](src/SUMMARY.md).
