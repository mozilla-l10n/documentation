# Adding a new project on Pontoon

## Verify that the project is properly localizable
Project owners can follow the [guidelines](https://developer.mozilla.org/en-US/docs/Mozilla/Implementing_Pontoon_in_a_Mozilla_website) available on MDN to properly structure files inside the repository. Some things to check:
* Files should be in a folder like `locale(s)/ab-CD/somefile.extension` and be in one of the supported formats (.ftl, .lang, .properties, .po, .xliff).
* User **mozilla-pontoon** needs write access to the repository.

It's important to also check the files for localization issues before exposing them to localizers: unclear strings, lack of localization comments, missing plural forms are some of the things to check.

## Create the project in Pontoon STAGE instance
First you want to test that everything works using Pontoon staging server.

Access Pontoon's [admin console](https://mozilla-pontoon-staging.herokuapp.com/admin/) on the **stage server** and click **ADD NEW PROJECT**.
* Name: name of the repository (it will be displayed in Pontoon's project selector).
* Slug: used in URLs, will be generated automatically based on the repository's name.
* Locales: select at least one locale.
* Repositories: select the type of repository and URL. Make sure to use SSH to allow write access. For example, if the repository is `https://github.com/meandavejustice/min-vid`, the URL should be `git@github.com:meandavejustice/min-vid.git`. You can use the *Clone or download* button in the repository page on GitHub, making sure that *Clone with SSH* is selected.
* Download prefix: a URL prefix for downloading localized files. For GitHub repositories, select any localized file on GitHub, click `Raw` and replace locale code and the following bits in the URL with `{locale_code}`. For example, if the link is `https://raw.githubusercontent.com/bwinton/TabCenter-l10n/master/locales/en-US/addon.properties`, the field should be set to `https://github.com/bwinton/TabCenter-l10n/blob/master/locales/{locale_code}`.
* Project info: provide some information about the project to help localizers with context or testing instructions. HTML is supported, so you can add external links. For example:
```
Localization for the <a href="https://testpilot.firefox.com/experiments/min-vid">Min Vid add-on</a>.
```

Click **SAVE PROJECT** at the bottom of the page, then click **SYNC** to run a test sync. In the [Sync log](https://mozilla-pontoon-staging.herokuapp.com/sync/log/) you should be able to see if it succeeded or failed.

## Create the project in Pontoon PROD instance
At this point you need to repeat the same steps on the **production server**.

Access Pontoon's [admin console](https://pontoon.mozilla.org/admin/), add the same information you used on the staging server and make sure to select all supported locales for this project.
