# Adding a new project on Pontoon

## Verify that the project is properly localizable

Project owners can follow the [guidelines](https://developer.mozilla.org/en-US/docs/Mozilla/Implementing_Pontoon_in_a_Mozilla_website) available on MDN to properly structure files inside the repository. Some things to check:
* Files should be in a folder like `locale(s)/ab-CD/somefile.extension` and be in one of the supported formats (.ftl, .lang, .properties, .po, .xliff).
* User **mozilla-pontoon** needs write access to the repository.

It's important to also check the files for localization issues before exposing them to localizers: unclear strings, lack of localization comments, missing plural forms are some of the things to check.

## Create the project in Pontoon

Access Pontoon's [admin console](https://pontoon.mozilla.org/admin/) and click **ADD NEW PROJECT**.
* Name: name of the repository in Pontoon's project selector.
* Slug: used in URLs, will be generated automatically based on the repository's name.
* Locales: select locales supported for this project.
* Repositories: select the type of repository and URL. Make sure to use SSH to allow write access. For example, if the repository is `https://github.com/meandavejustice/min-vid`, the URL should be `git@github.com:meandavejustice/min-vid.git`
* Download prefix: a URL prefix for downloading localized files. For GitHub repositories, select any localized file on GitHub, click `Raw` and replace locale code and the following bits in the URL with `{locale_code}`.
* Project info: provide some information about the project to help localizers with context or testing instructions. HTML is supported, so you can add external links, e.g.
```
Localization for the <a href="https://testpilot.firefox.com/experiments/min-vid">Min Vid add-on</a>.
```

Click **SAVE PROJECT** at the end of the page.

It's a good idea to only select one language in the supported locales, and wait for the next cycle to happen to verify that everything looks good in [sync logs](https://pontoon.mozilla.org/sync/log/).
