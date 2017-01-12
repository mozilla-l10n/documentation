# Webdashboards
## Structure

There are four interdependent elements in the current webdashboard system.

### Webdashboard
[Webdashboard] is the main dashboard used by localizers. It contains information about files with missing strings, deadlines, and more. Data is also available via RSS, with information about missing strings and deadlines.

Webdashboard in itself doesn’t generate any data, it just displays information provided by Langchecker and Webstatus in JSON format.

### Langchecker
[Langchecker](langchecker.md) is used to analyze all projects using .lang files as data sources. It also stores all configuration information needed to manage these repositories: which projects we support, which files are in each project, which locales are supported for each project or file, metadata like critical status or deadlines.

Langchecker's scripts are used to propagate changes to all .lang files, or add news ones, in l10n repositories. It also provides an API to retrieve translations, and information about coverage, i.e how many locales translated a specific string or a page, and what percentage of the l10n population that represents.

### Webstatus
[Webstatus] is used to analyze external projects, currently supporting the following formats: `.po` (Gettext), `.properties`, `.xliff`, and `.ftl` (l20n). It also provides an [API](https://github.com/mozilla-l10n/webstatus/#available-urls) to get list of locales (supported, complete), in JSON or TXT format, for a specific product.

### Stores_l10n
Stores_l10n is a web application used to manage translations for Google Play Store and Apple App Store. It provides Langchecker with the list of locales supported in stores and iOS/Android products. Its API is used by release drivers in [mozapkpublisher](https://github.com/mozilla-releng/mozapkpublisher/), a tool used to publish .apk on Google Play together with Store listing and whatsnew content. Public views are used to copy and paste content on Apple Store (no automation available at the moment).


This diagram describes the relation between each of the components, including relation with external entities.

<a href="/misc/img/webdashboards/webdashboards.png"><img src="/misc/img/webdashboards/webdashboards.png" alt="Webdashboards diagram" style="width: 600px; margin: 0 auto; display: block;"/></a>

## Installation
See the *[Useful Links](#useful-links)* at the end of the document for links to the relevant GitHub code repositories. Follow the instructions provided in each README for system requirements and instructions.

Note that the instances on the l10n community server of all products use a GitHub’s webhook to update code automatically every time the repository is updated.

# Tools
For detailed information check the specific pages for each project:
* [Langchecker](langchecker.md)
* [Webdashboard](webdashboard.md)

These are detailed instructions for the most common tasks:
* [Add locales to an existing file](add_locales.md).
* [Update an existing file](update_existing_file.md).
* [Add a new file to an existing project](add_new_file.md).
* [Bootstrap a new locale](bootstrap_new_locale.md).

For documentation specific to mozilla.org, see [this page](/products/mozilla_org/README.md).

## Contribution Guidelines
Always work on forks of the main repository and open pull requests if you’re going to update code. Automated tests are run with Travis on each pull request to check for syntax and functional errors.

# Useful Links

### Mozilla.org
* Code repository (codename bedrock): https://github.com/mozilla/bedrock
* Trunk localization: https://github.com/mozilla-l10n/www.mozilla.org
* Production localization: https://github.com/mozilla-l10n/bedrock-l10n

### Webdashboard
* Production instance: https://l10n.mozilla-community.org/webdashboard/
* Code: https://github.com/mozilla-l10n/webdashboard/

### Langchecker
* Production instance:https://l10n.mozilla-community.org/langchecker/
* Code: https://github.com/mozilla-l10n/langchecker/

### Webstatus
* Production instance: https://l10n.mozilla-community.org/webstatus/
* Code: https://github.com/flodolo/webstatus

### Stores
* Production instance: https://l10n.mozilla-community.org/stores_l10n/
* Code: https://github.com/mozilla-l10n/stores_l10n

[Webdashboard]: https://l10n.mozilla-community.org/webdashboard/
[Webstatus]: https://l10n.mozilla-community.org/webstatus/
