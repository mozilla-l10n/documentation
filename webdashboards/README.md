# Working with Webdashboard
## Structure
[Webdashboard] is the main dashboard used by localizers. It contains information about files with missing strings, deadlines, and more.

Webdashboard in itself doesn’t generate any data, it just displays information provided by two back-end tools in JSON format:
* [Langchecker] is used to analyze all projects using .lang files as data sources. It also stores all configuration information: which projects we support, which files are in each project, which locales are supported for each project or file, metadata like critical status or deadlines.
* [Webstatus] is used to analyze external projects, currently supporting the following formats: .po (Gettext), .properties and .xliff

## Installation
See the Useful Links at the end of the document for links to the relevant GitHub code repositories. Follow the instructions provided in each README for system requirements and instructions.

Note that the instances on the l10n community server of Langchecker, Webdashboard, and Webstatus use a GitHub’s webhook to update code automatically every time the repository is updated.

# Tools
For detailed information check the specific pages for each project:
* [Langchecker](langchecker.md)
* [Webdashboard](webdashboard.md)

These are detailed instructions for the most common tasks:
* [Add locales to an existing file](add_locales.md).
* [Update an existing file](update_existing_file.md).
* [Add a new file to an existing project](add_new_file.md).
* [Bootstrap a new locale](bootstrap_new_locale.md).

And some documentation specific for managing mozilla.org
* [Importing strings from Pootle](import_locamotion.md).
* [Updating mozilla.org production](updating_mozillaorg_production.md).

## Contribution Guidelines
Always work on forks of the main repository and open pull requests if you’re going to update code. Automated tests are run with Travis on each pull request to check for syntax or functional errors.

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

[Langchecker]: https://l10n.mozilla-community.org/langchecker/
[Webdashboard]: https://l10n.mozilla-community.org/webdashboard/
[Webstatus]: https://l10n.mozilla-community.org/webstatus/
