# How to manage and review Mozilla.org project

<!-- toc -->

## Content flow between Bedrock and www-l10n

Source locale resource files consist of both independent files, which correspond to a specific web page, and groups of files that collectively contain the source strings for a single page. Shared components, such as navigation and footers, use shared resource files containing strings that may appear across multiple pages.

Mozilla.org uses the [Fluent](https://projectfluent.org/) localization system. The process of extracting strings for new Fluent (.ftl) files or updating existing .ftl content is fully automated. Once code changes are merged in the [Bedrock repository](https://github.com/mozilla/bedrock), new strings land in the [en folder](https://github.com/mozilla/bedrock/tree/main/l10n) within the www-l10n repository, which serves as the source for localizable content. Meanwhile, the en-US folder contains US-specific content, treated as a separate locale in this context.

The localization infrastructure relies on multiple configuration files. Changes to these files must be done in the [Bedrock l10n](https://github.com/mozilla/bedrock/tree/main/l10n) folder, as updates will be automatically pushed to the [www-l10n repository](https://github.com/mozilla-l10n/www-l10n), overwriting any local change.
* [configs/pontoon.toml](https://github.com/mozilla/bedrock/blob/main/l10n/configs/vendor.toml): Specifies locales with localization enabled in Pontoon, identifies the files or sets of files available for translation, and designates files limited to specific locales.
* [configs/vendor.toml](https://github.com/mozilla/bedrock/blob/main/l10n/configs/vendor.toml): Lists the locales currently supported by an external Language Service Provider (LSP) and enabled on the Smartling platform.
* [configs/smartling-config.json](https://github.com/mozilla-l10n/www-l10n/blob/master/configs/smartling-config.json): This file is used by Smartling for defining the localizable paths and locales. For more details, check out this [documentation](https://help.smartling.com/hc/en-us/articles/1260801649930-Customize-The-Repo-Connector-Configuration).
* [special-templates.toml](https://github.com/mozilla/bedrock/blob/main/l10n/configs/special-templates.toml): Lists files excluded from both Pontoon and Smartling, and reserved for Mozilla staff.

Within the [Bedrock l10n](https://github.com/mozilla/bedrock/tree/main/l10n) folder, you will also see the following files:
* [l10n-pontoon.toml](https://github.com/mozilla/bedrock/blob/main/l10n/l10n-pontoon.toml) is used in Pontoon to configure the mozilla.org project (it includes the configuration files configs/pontoon.toml and special-templates.toml).
* [l10n-vendor.toml](https://github.com/mozilla/bedrock/blob/main/l10n/l10n-vendor.toml) currently unused, it includes the configuration files configs/vendor.toml and special-templates.toml.

Automation in Bedrock checks for new strings [every three hours](https://github.com/mozilla/bedrock/blob/main/.github/workflows/send_mozorg_fluent_strings_to_l10n_org.yml). If there is new content and there are no open PRs in www-l10n, it will create one, otherwise it will add new commits to the existing PR. When necessary, automation can be manually run by developers to ensure timely delivery of new content to the localization team.

The [www-l10n repository](https://github.com/mozilla-l10n/www-l10n) mirrors the [Bedrock l10n](https://github.com/mozilla/bedrock/tree/main/l10n) folder but includes localized content organized in locale-specific folders.

## Production release

The development of the mozilla.org site doesn’t follow a fixed release schedule, and some pages are reserved for the US market. Updates with localizable content often have no specific deadlines unless stated otherwise. Each localized page is pushed to production as soon as it reaches 85% translation completion. However, time-sensitive pages, such as those tied to campaigns, are prioritized. In these cases, deadlines are communicated to communities via Matrix and a target date is added to the page or project in Pontoon. Some pages may also be held from release until a specific launch date.
Once strings are localized, Bedrock automatically pulls the changes from the www-l10n repository and deploys them to staging. Production should pull updates from www-l10n every 10 minutes.

Relevant links:
* Production: https://www.mozilla.org/
* Staging (primary): https://www-dev.allizom.org/

## Review PRs and address common errors

### PR review

When a new PR is created, [a group](https://github.com/orgs/mozilla-l10n/teams/l10n-bedrock) of l10n team members will be flagged for review. Note that the PR might involve multiple developers so, if a change request is required, be sure to identify the relevant persons and notify them to follow up. Leaving a PR unattended for too long can lead to new changes being added to the existing open PR, resulting in delays if the new content has issues (these would block from merging all pending updates).

Keep in mind that the Bedrock developer won’t see your review comments unless they are explicitly tagged. To find the contributor for a specific PR, examine the update information provided. For example, in [PR #460](https://github.com/mozilla-l10n/www-l10n/pull/460), the update information reads: `From file changes in [mozilla/bedrock@ 3061d26](http://mozilla/bedrock@%203061d26)`. Clicking the link to [3061d26](https://github.com/mozilla/bedrock/commit/3061d26530aa870bc3fef3f81cbce71ecc9a8ce5) will direct you to [a page](https://github.com/mozilla/bedrock/commit/3061d26530aa870bc3fef3f81cbce71ecc9a8ce5) where the top-left corner displays the contributor's GitHub ID. Use this ID to tag the person in your comment or request.

For time-sensitive issues or cases where the fix isn’t straightforward, you can seek advice through the #www-l10n channel on Slack. Tagging developers in your comments ensures that the issue gets resolved efficiently.

## Common errors

Over the years, our style guide and branding guidelines have evolved, leading to inconsistencies between older and newer content. While we generally avoid updating older content unless it’s being completely revised, here are the latest guidelines and common errors to keep in mind during PR reviews:

### Capitalization

* Use lowercase for these terms: internet and web.
* Mozilla account(s): Both the singular or plural expressions are treated as one Fluent term.
  * Correct: `{ -brand-name-mozilla-account } `or `{ -brand-name-mozilla-accounts }`.
  * Incorrect: `{ -brand-name-mozilla } account` or `{ -brand-name-mozilla } accounts`.
* Firefox Browser
  * The marketing team is phasing out the placeholder `{ -brand-name-firefox-browser }`. Instead, use the `{ -brand-name-firefox } browser` for both singular and plural forms.
* Third-Party brands and products
  * Brand and product names from third parties — like Google, Apple, etc. — are no longer coded as Fluent terms in new content.

### Common issues to watch out for

Here are some issues that commonly occur:
* Content changes without new string IDs:
  * If a string is revised, a version number must be added to the ID. This is necessary because updates to strings without changes to IDs will not trigger updates in Pontoon for strings already localized. 
Example: Update the string ID to `features-fast-firefox-is-powered-by-the-world-v2`.
* Configuration changes for new files: 
  * When a new file is added to a PR, verify that it’s covered by the `pontoon.toml` configuration file. If a new entry is required, ensure the file name matches exactly, as mismatches will prevent it from being available in Pontoon. Check out the [Add or remove file](#addorremovefile) section when to add an entry.
* [Dashes](https://acorn.firefox.com/latest/content/punctuation-7J3JVM4o#section-hyphens-and-dashes-c9): correct use of hyphens (-), en-dashes (–) and em-dashes (—)
  * Use hyphens for words like well-being, with no space before and after.
  * Use en-dashes for ranges, such as numbers (1–3), with no space before and after.
  * Use em-dashes to add additional information to a sentence, with a space before and after it.
* Hard-coded content: 
  * Look out for hard-coded discount codes or dates, often found in promotional content (e.g., VPN discount codes with specific validity periods). Ask the developer to use variables and provide examples in the comment of what the variables represent.
* Unnecessary HTML attributes: 
  * Encourage developers not to expose unnecessary HTML attributes — such as href, class, or id, particularly with links — to localization to minimize errors.
Example of a good string with a link: `<a {$attrs}>{ -brand-name-mozilla }</a>` where `{$attrs}` is the link.
* `##` or `#` are used properly for comments. `##` is used for section comments while `#` is only associated with the string right below it. For more information, see the [Fluent guide on the use of comments](https://projectfluent.org/fluent/guide/comments.html).
* Obsolete strings should have a date of removal in the comment. There is typically a two-month window for the removal according to the latest Bedrock policy.

## Add or remove a locale

### Add a new locale

When a community manager or translator requests a new locale, ensure that at least one browser (mobile or desktop) is already localized in that language. The reason is that without the browser in the target language, users are unlikely to see the localized content; this is especially true for smaller locales that are not supported by other browsers. 

* Navigate to the [configs/pontoon.toml](https://github.com/mozilla/bedrock/blob/main/l10n/configs/pontoon.toml) file and create a PR to add the requested locale.
Insert the new locale in alphabetical order near the top of the file. Follow this convention, using `scn` as an example:
````BASH
locales = [
    "ach",
    "af",
    "am",
    "an",
    "ast",
     …
    "scn",
     …
]
````
* The PR will be reviewed, approved and merged by the Bedrock team. The new locale will be included in the next code push from the Bedrock l10n repository to the www-l10n repository.
* After the updated config file is merged in www-l10n, go to the mozilla.org project view in Pontoon. Click on the [Admin - Current Project](https://pontoon.mozilla.org/admin/projects/mozillaorg/) link in your Profile dropdown list, move the new locale from Available column to the Localizable column. Then click the SAVE PROJECT button on the bottom of the page, and click SYNC to trigger a sync.
* This update will enable the locale and the standard set of pages in Pontoon. After the sync is complete, verify the changes in Pontoon and notify the community that the project is ready for localization.

### Enable a locale on production

Once a new locale is enabled in Pontoon, it must reach an overall completion level of 85% before the localized site is available in production. At that point, create [an issue](https://github.com/mozilla/bedrock/issues/12553) in the Bedrock repository to request activation. As an example, this is [a PR](https://github.com/mozilla/bedrock/commit/a71e70069205b7d74b4825d84e7a10984d36188f) to add locale `skr` to the production.

Note: for new pages, the same 85% completion threshold applies. Unlike product releases, Mozilla.org pages are released individually but can also be grouped for release at a specific time. This is managed directly by the Bedrock team.

Once a page is enabled for locale, it will not be automatically deactivated, even if the completion level falls below the activation threshold of 85%. If deactivation is needed, the Bedrock team will follow a specific [set of instructions](https://bedrock.readthedocs.io/en/latest/l10n.html#deactivation), but should consult the l10n team beforehand.

Although the 85% threshold policy for enabling a brand-new locale has been in place for a while, it has not been consistently enforced. It’s advisable to review the status of locales periodically to ensure a good user experience.

### Remove a locale

The removal of a locale is typically initiated at the request of a community. However, if the completion rate for a locale becomes too low, the l10n PM should first discuss the situation with the community managers and get their agreement before proceeding.

* Go to Pontoon, in the mozilla.org project view, click on the [Admin - Current Project](https://pontoon.mozilla.org/admin/projects/mozillaorg/) link in your Profile dropdown list, remove the locale from Localizable column to the Available column. Then click the SAVE PROJECT button on the bottom of the page. 
* Navigate to the Bedrock repository and remove the locale from the supported list in the `pontoon.toml` file. Create a PR with this change. Once the PR is reviewed and merged, it will automatically trigger a corresponding PR in the www-l10n repository.
* The l10n PM should then review the PR in the www-l10n repository, approve it, and merge the changes.

This process will remove the locale from Pontoon; however, the localized files for the locale will remain in the www-l10n repository. For instructions on removing these files, refer to the next section.

## Add or remove files

### Add a file

When a PR includes a new file, ensure that it is accounted for in the pontoon.toml file, depending on its context and inclusion criteria. Here’s how to handle different scenarios:

**Automatically Included Files**

If the file falls under an umbrella path already specified in the `pontoon.toml` file, no additional entry is needed. For example:
````BASH
[[paths]]
    reference = "en/firefox/new/**/*.ftl"
    l10n = "{locale}/firefox/new/**/*.ftl"
````
In this case, ** means files from all subfolders of `en/firefox/new/` will be included, so there’s no need to add `en/firefox/new/desktop.ftl` explicitly.

**Specific File Entries**

If a file follows a naming convention that requires explicit entries, such as welcome pages (`…/welcome/page1`, `…/welcome/page2`, etc.), add each file individually to the `pontoon.toml` file:
````BASHO
[[paths]]
    reference = "en/firefox/welcome/page1.ftl"
    l10n = "{locale}/firefox/welcome/page1.ftl"
````
**Files for Specific Locales**

For files targeting specific locales, such as those for marketing campaigns, include the `locales` parameter to specify the supported languages:
````BASH
[[paths]]
    reference = "en/firefox/welcome/page13.ftl"
    l10n = "{locale}/firefox/welcome/page13.ftl"
    locales = [
        "es-ES",
        "it",
        "nl",
    ]
````
### Remove a file

Files are typically removed when they become obsolete or are replaced by newer versions. Follow these steps to ensure proper removal:

**Update configs/pontoon.toml**: When a PR in the www-l10n repository proposes the removal of a file, check whether the `pontoon.toml` file needs to be updated. Once the PR is reviewed and merged, the file is removed from the en folder, and the localized versions disappear from Pontoon.

**Remove localized files**: To remove the corresponding localized files, the L10n PM must file an issue in the www-l10n repository. Clearly specify which source file was removed so that the localized versions can be deleted as well. The l10n technical team will process the request and remove the files from the repository. 

## Manage files in Pontoon

This document covers some common tasks in Pontoon.

### Add tags

The Mozilla.org project consists of many files, so [Pontoon Tags](https://mozilla-l10n.github.io/documentation/tools/pontoon/adding_new_project.html#tags) can be used to help localizers prioritize specific content. Given the lack of clarity from the marketing team, this is rarely used nowadays.

Tags can also be used to group files, for example to track completion of pages associated with a specific initiative (e.g. VPN market expansion).

With the advice from marketing or the Bedrock team, if a file needs to be tagged, you can make the changes in the project’s admin page. Scroll down to the Tags section, click on the MANAGE RESOURCE button of the priority level you want to choose, the section is expanded with two columns: Available contains a list of files ready to be tagged, and Chosen contains files already tagged. Once done, click the SAVE PROJECT button.

### Add deadlines

Deadlines are almost always associated with individual files, but can also be added at project level in the case of a major campaign. To add a deadline to a file, go to the [Pontoon admin page](https://pontoon.mozilla.org/a/), select Resources under the Base category on the left panel. A list of files is listed on the main page. The new file should be among the top of the search results. If not, type in the newly added file name in the Search field. Click on the PK number of the desired file you want to add the deadline to. Scroll to the bottom of the page, add the date in the Deadline field. Click the SAVE PROJECT button to save the changes. Once the deadline has passed for two weeks, remember to remove it by going back to the same page to empty the Deadline field. 

## Common errors detected by linters

Below are some common errors caught by linters in the source content in Bedrock repository and localized content in www-l10n repository.

Content:
* Use typographic apostrophes and quotes (’“”), instead of straight versions ('").
* For ellipses, use a single character “…” instead of three periods “...”.
* Only Mozilla brands and product names are coded as a Fluent term.
* Use Fluent terms for Mozilla account, instead of combining the term for “Mozilla” with the word “account”.

Other:
* String IDs should use only lowercase characters and hyphens. 