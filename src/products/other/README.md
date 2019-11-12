# Other Projects

## Firefox Monitor

* Repository: [GitHub](https://github.com/mozilla/blurts-server/)
* Bug reports: [GitHub](https://github.com/mozilla/blurts-server/issues)
* Dev server: [link](https://fx-breach-alerts.herokuapp.com/)
* Prod server: [link](https://monitor.firefox.com/)
* Other resources: [email templates](https://fx-breach-alerts.herokuapp.com/email-l10n)

To add a new locale to this project it’s enough to add the locale to Pontoon. This will make the locale automatically available on the dev server and commit to the repository.

For production, locales need to be added to a list that is stored in a private repository, so a new issue needs to be filed ([example](https://github.com/mozilla/blurts-server/issues/1332)).

## Firefox Send

* Repository: [GitHub](https://github.com/mozilla/send/)
* Bug reports: [GitHub](https://github.com/mozilla/send/issues)
* Dev server: [link](https://dev.send.nonprod.cloudops.mozgcp.net/)
* Prod server: [link](https://send.firefox.com/)

To add a new locale to this project it’s enough to add the locale to Pontoon. This will make the locale automatically available on the dev server and commit to the repository.

The list of locales enabled in production is stored in the `availableLanguages` key in [package.json](https://github.com/mozilla/send/blob/master/package.json). New locales can be added through pull requests ([example](https://github.com/mozilla/send/pull/1417)).
