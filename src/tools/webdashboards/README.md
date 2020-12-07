# Webdashboards

## Langchecker

[Langchecker](langchecker.md) is used to analyze all projects using .lang files as data sources. It also stores all configuration information needed to manage these repositories: which projects are supported, which files are in each project, which locales are supported for each project or file, metadata like critical status or deadlines.

Langchecker’s scripts are used to propagate changes to all .lang files, or add news ones, in l10n repositories. It also provides an API to retrieve translations, and information about coverage, i.e how many locales translated a specific string or a page, and what percentage of the l10n population that represents.

## Installation

See the *[Useful Links](#useful-links)* at the end of the document for links to the relevant GitHub code repositories. Follow the instructions provided in each README for system requirements and instructions.

Note that the instances on the l10n community server of all products use a GitHub’s webhook to update code automatically every time the repository is updated.

## Tools

For detailed information check the specific pages for each project:
* [Langchecker](langchecker.md).

These are detailed instructions for the most common tasks:
* [Add locales to an existing file](add_locales.md).
* [Update an existing file](update_existing_file.md).
* [Add a new file to an existing project](add_new_file.md).
* [Bootstrap a new locale](bootstrap_new_locale.md).
* [Remove obsolete files](remove_obsolete_files.md).

For documentation specific to mozilla.org, see [this page](../../products/mozilla_org/).

## Contribution Guidelines

Always work on forks of the main repository and open pull requests if you’re going to update code. Automated tests are run in automation on each pull request to check for syntax and functional errors.

## Useful Links

### Mozilla.org

* Code repository (codename bedrock): [https://github.com/mozilla/bedrock](https://github.com/mozilla/bedrock)
* Trunk localization: [https://github.com/mozilla-l10n/www.mozilla.org](https://github.com/mozilla-l10n/www.mozilla.org)
* Production localization: [https://github.com/mozilla-l10n/bedrock-l10n](https://github.com/mozilla-l10n/bedrock-l10n)

### Langchecker

* Production instance: [https://l10n.mozilla-community.org/langchecker/](https://l10n.mozilla-community.org/langchecker/)
* Code: [https://github.com/mozilla-l10n/langchecker/](https://github.com/mozilla-l10n/langchecker/)
