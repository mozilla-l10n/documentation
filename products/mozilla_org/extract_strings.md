# Process overview to expose mozilla.org content for localization

This document describes the tools and processes involved in converting a mozilla.org template in English to a .lang file containing localizable content and relevant information to help with localization.

## This is a brief overview of the process

* In [Bedrock](https://github.com/mozilla/bedrock), when a page is in the final coding review phase in GitHub and content is finalized, an [L10n label](https://github.com/mozilla/bedrock/pulls?q=is%3Aopen+is%3Apr+label%3AL10N) is added to the PR, signaling that it is ready for string extraction.
* Strings are extracted from the identified templates, generating a temporary .lang file. The new strings are manually added to an existing en-US .lang file, or a brand new file added to the [mozilla.org l10n repository](https://github.com/mozilla-l10n/www.mozilla.org). A pull request is opened to review the en-US initial content for issues or errors.
* Another PR is created in the [Langchecker](https://github.com/mozilla-l10n/langchecker/) repository. Langchecker is the tool used to keep track of all localizable files in the l10n repositories, and contains a set of scripts used to manage the repository.
* After both PRs are reviewed and approved, a script will be run locally to propagate the en-US content into files in other locales. That means both adding a new file, or adding new strings to existing files.
* Once merged to the master branch, files will be available on www.mozilla.org repository for localization, and the merge commit will be cherry-picked to [bedrock-l10n](https://github.com/mozilla-l10n/bedrock-l10n), the localization production repository. Within 20 minutes, Pontoon will display the status of the new or updated files for all locales.
* In some cases, an email through a mailing list will be sent out to communicate the localization request. At this point, the L10n tag is also removed from Bedrock’s PR.

## Environment

In order to run Langchecker locally, you need a recent version of PHP (ideally 7 and above):
* [Langchecker](https://github.com/mozilla-l10n/langchecker/) repository has instructions on how to [install](https://github.com/mozilla-l10n/langchecker/#installation) the tool. The [Wiki](https://github.com/mozilla-l10n/langchecker/wiki) has detailed informations on all the available scripts.
* While Apache is not needed (you can use PHP internal web server), it’s highly recommended.
* L10n-drivers use a VMWare virtual machine based on Ubuntu LTS. This VM includes a set of Bash aliases and symbolic links designed to simplify the workflow. You can find the script used to set up the VM [here](https://github.com/mozilla-l10n/vm_scripts/blob/master/setup_vm/setup_vm.sh), and the list of aliases [here](https://github.com/mozilla-l10n/vm_scripts/blob/master/.bashrc_aliases).

## Step by step details for the entire process

### Extract strings from a template in Bedrock

The process is detailed in [this document](../../products/mozilla_org/working_bedrock.md).

Note: you only use this generated .lang file as a reference. You still need to add comments and reorder strings before exposing them for localization.

### Prepare the en-US .lang file

It is very important to have a clean, error free .lang file in en-US. Once the file is approved and content is pushed into other locales, if an error is found then, it will take much more effort to correct. If localizers have already started their work, the cleanup is even messier. At that point, it is a fix in one file versus fixes in 100+ files.

Initial review should include checking the file against the page on the testing server and checking against the template. This is to ensure that there are no hard coded strings.

Note: if there is an update to an existing page, it is advised to still generate the .lang file, and copy the new string there instead of copying it from the .html file. This is to make sure, for example, that the syntax used for variable replacements is correct, and remove eventual extra white spaces between words that are not carried over to the .lang file.

### Add notes and comments to the extracted file:

Add important information at the top of the file:
* A Note (`## NOTE:`) for [demo/test URLs](https://github.com/mozilla-l10n/www.mozilla.org/blob/master/en-US/firefox/facebookcontainer/index.lang#L2).
* A Note for test instruction if necessary, for a page that is more dynamic, such as the [privacy_protection_tour.lang](https://github.com/mozilla-l10n/www.mozilla.org/blob/master/en-US/firefox/tracking-protection-tour.lang#L8).
* Make sure to add tags, if there are strings [bound to l10n tags](working_bedrock.md#l10n-tags).

Proceed to the content of the file. Add a comment to the following type of strings to provide more context:
* Page title and description. Typically, a page title string should be translated in a short or catchy way.
* If the string contains a link, to which [URL](https://github.com/mozilla-l10n/www.mozilla.org/blob/master/en-US/firefox/tracking-protection-tour.lang#L129) it points to. This gives context to localizers.
* If a string is behind a tag, make sure to add the [tag binding](https://github.com/mozilla-l10n/langchecker/wiki/.lang-files-format#string-meta-data) it.
* A new string behind a tag makes another string obsolete. Make sure to add [an obsolete comment](https://github.com/mozilla-l10n/www.mozilla.org/blob/master/en-US/firefox/tracking-protection-tour.lang#L99) to help localizers prioritize their work, and that old and new strings are next to each other. This will also make removal of old strings easier in further updates.
* A comment for an alternative to an expression that may not be culturally relevant, or to a pun that doesn’t translate well.
* Check English content for capitalization, hyphenated word to make sure they are consistent with the [Firefox style guide](https://design.firefox.com/photon/copy/word-list.html) (macOS vs. MacOS, sign in to vs. sign into).

When all is done, create a PR in the www.mozilla.org repo for review. Describe what the PR is for, add references to the Bedrock’s pull requests to add context for the review.

Check for possible [errors](https://l10n.mozilla-community.org/langchecker/?action=errors) such as duplicates or unmatched strings before requesting for review. In order to do this, you will need to run Langchecker locally, and make sure that both the l10n repository and Langchecker’s are using the branches you’re working on.

### Work with the scripts in Langchecker

Below are some of the common commands and purposes of using Lanchecker.

You use Langchecker for the following purposes:
* [app/config/sources.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/sources.inc.php): modify this file when there is a new or an updated .lang: add file name, define supported locales, deadline and flags.
* [app/config/locales.inc.php](https://github.com/mozilla-l10n/langchecker/blob/master/app/config/locales.inc.php): bootstrap a new new locale on Mozilla.org

The following commands are used for some common tasks:
* `lang_update` is to populate new and revised content in the en-US into localized files.
* `mark_active` will add an `## active ##` tag at the beginning of the file after checking that the entire file is translated and no errors are detected. The associate template will be live on production.
* `add_tags` tracks the completion of the tagged strings, and add the tag on top of the file when all are translated.

For more details, check [here](../../tools/webdashboards/langchecker.md).

This document details the process to [update production repo](updating_mozillaorg_production.md).

## Pontoon and Communication

Within 20 minutes, the content change will show up on [Pontoon project dashboard](https://pontoon.mozilla.org/projects/mozillaorg/). L10n-driver will update project deadline (high level against all other projects) and page level deadline (if applicable) when viewing the entire mozilla.org page status in a given locale.

An email communication about this localization request will be sent out soon after.
