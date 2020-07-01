# Managing Mozilla.org

Since the migration from .lang to Fluent, the L10n PM’s job is a lot simpler. The PM’s primary focus is on reviewing the string extractions provided by the bedrock team, provides feedback, manages the project through Pontoon and communicates important information to the communities.

## Reviewing the PR

When a PR is ready for localization review, through a script, the PR is pushed to the [www-l10n](https://github.com/mozilla-l10n/www-l10n/tree/master/) repository. The naming convention of the string ID is the file name followed by the first few words of the string, up to 7 words.

### Reviewing new file

* `en` is the source of a localizable file; en-US is a locale. Review is conducted in `en`.
* Check that the demo URL works so you can review the text against the page on staging.
* Check that all the brand and product names are in the form of placeable. If not, make sure that the term exists or it needs to be added.
* Check for expressions that are metaphors or play with words. Be sure to include comments for alternatives.
* Check for consistent use of punctuation in a series of bullet items or parallel items.
* Check for proper use of punctuation, especially long sentences.
* Check variables and references to the variables in the string.

### Reviewing updated file

* A revised string usually has a unique string ID suffix: `update`. The news string is right before the string replaced.
* When a new string is added, such as `firefox-new-page-title-updated`, it will only be added to the `en` file in the PR, as only locales that have translated the string should contain it.
* Follow the same review steps listed in the _Reviewing new file_ section.
* Look for reused string ID for new content. A string revision should come with a new string ID.

Once the PR passes the review, L10n PM will approve and merge the PR to master.

## Managing the project

### Updating status in Pontoon

* After Pontoon syncs with the repository, the newly added file will appear on the dashboard of a locale.
* Go to the [project admin page](https://pontoon.mozilla.org/admin/projects/mozillaorg/).
Scroll to the **Linked tags** section to set priority to the new file by following [these steps](https://github.com/mozilla-l10n/documentation/blob/master/src/tools/pontoon/adding_new_project.md#tags).
* Set a new deadline for the project if applicable.
* Save the changes made.
* If necessary, set a page-level deadline by following the instructions on the [Resource page](https://pontoon.mozilla.org/a/base/resource/). Select the file, then add the deadline near the bottom of the page.

### Email communication

Sometimes a page is tied to a release. Either the time is short or we want to have as many languages complete as possible, an email to the communities is necessary soon after the page is ready on Pontoon. In the email, include the following information:

* File name along with word and string counts.
* Priority locales if any.
* Deadlines if they are different between priority locales.
* Specify the locales that are covered by Mozilla staff, as long as they are working in Pontoon.
* Demo URL for testing.
* Special instruction for this particular file to watch out for if any.

Send the email to the web [project mailing list](https://groups.google.com/g/mozilla.dev.l10n.web). Forward the same information to the Mozilla copywriters.

### What's New Page (WNP)

Every month, there will be a WNP tied to the release of Firefox for desktop. A bug like [this](https://bugzilla.mozilla.org/show_bug.cgi?id=1649046) will be filed. The l10n PM will be notified on the deadline when the locale list is due. Ideally, the page should be ready for localization between 10-14 days. It has rarely been the case. Communicate to the communities as soon as the content is available and update Pontoon with the deadline.

The list of completed locales is due to the release team on Friday, 10 days prior to the release date. If the release specific WNP can’t be ready by deadline, the [generic WNP list](https://github.com/mozmeao/www-l10n/blob/master/metadata/firefox/whatsnew/whatsnew.json) will do.

## Staging and Production

Pontoon syncs with the repository every 10 minutes. GitHub makes a production push every 5 minutes. Unless a page is tied to a release on a particular day, chances are, the localization review is done on Production.

When a localized string contains Fluent syntax error, it will be rejected in the  production push, thus the string appears in English.

### Page Activation

It is not unusual when a localized page is mixed with some English strings at a given moment. Here are some scenarios:
* New page: a localized page will be activated once it reaches 80% completion.
* Activated page with new string (normal string ID): The strings will appear in English on production right away.
* Activated page with updated string paired with fallback string ID: The update could be one by one or could be switched on once the tagged strings are fully localized. The developer could control the timing of the update if need be.
* Activated page with template change: In some cases, a page receives a major update that requires a complete rewrite of the template. If this happens, the old template is kept online only for a defined period of time. When removed, it will cause the URL to redirect users to the English version if the intended localized version is not ready.
* Activated page missing too many updates: An activated page falling far behind with multiple updates will create bad user experience. We might decide to disable it manually. Removal of a page is done by the Bedrock team.

## Reporting issues

Issues could be reported and questions raised through the following channels:

* [GitHub](https://github.com/mozilla-l10n/www-l10n/pulls)
* [Bugzilla for l10n](https://bugzilla.mozilla.org/enter_bug.cgi?product=Mozilla+Localizations)
* [Web dev mailing list](https://groups.google.com/g/mozilla.dev.l10n.web)
* [Maxtrix Channel](https://chat.mozilla.org/#/room/#l10n-community:mozilla.org)
* Direct email

Depending on the nature of the issues, here are a few ways to address them:

* Direct to Pontoon for any change request that comes through www-1l0n or Bugzilla. Follow up with the locale manager to review the suggestion.
* File a bug to [the web team](https://bugzilla.mozilla.org/enter_bug.cgi?product=www.mozilla.org&component=Pages+%26+Content) if a page doesn’t display on production. Usually it impacts more than one locale.
* File an issue at [Bedrock](https://github.com/mozilla/bedrock/issues) for technical issues or errors in content.

## Distribution of locale coverage

Once the newly vetted TMS is in place, the locale coverage will be distributed between three parties: the l10n community, Mozilla copywriters, and the vetted localization agencies. The coverage distribution of languages can be evolved over time:

* [Community supported locales](https://github.com/mozilla/bedrock/blob/master/l10n/configs/pontoon.toml)
* [Mozilla staff supported locales](https://github.com/mozilla/bedrock/blob/master/l10n/configs/special-templates.toml)
* [Vendor supported locales](https://github.com/mozilla/bedrock/blob/master/l10n/configs/vendor.toml)
