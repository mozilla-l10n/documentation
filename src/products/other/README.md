# Other Projects

<!-- toc -->

## Mozilla accounts

* Repository: [GitHub](https://github.com/mozilla/fxa)
* L10n Repository: [GitHub](https://github.com/mozilla/fxa-content-server-l10n)
* L10n format: Fluent, gettext
* Bug reports: [GitHub](https://github.com/mozilla/fxa/issues)
* Dev server: [link](https://accounts.stage.mozaws.net)
* Prod server: [link](https://accounts.firefox.com/signin)

Localization PM is automatically set as reviewer via [CODEOWNER](https://github.com/mozilla/fxa/blob/main/.github/CODEOWNERS) for pull requests affecting Fluent files.

Additional [automation](https://github.com/mozilla/fxa/blob/main/.github/workflows/l10n-gettext-extract.yml) flags PMs for gettext files.

### Enabling a new locale for localization

To enable a new locale for localization, two steps must be taken.

Step 1: The locale needs to be enabled in Pontoon via the admin interface. This will create the respective locale folder in the L10n repository.

Step 2: For gettext files, you will need to add a `LC_MESSAGES` folder and the `client.po` and `server.po` files manually into the generated locale folder in the L10n repository (these files may be initially empty).

### Automation: Strings export

Strings from the `fxa` repository are stored in multiple `.ftl` files across multiple folders (in the case of Fluent) and stored within `.mustache` and JavaScript files (in the case of `gettext`). [Automation](https://github.com/mozilla/fxa-content-server-l10n/blob/main/.github/workflows/l10n_extract.yaml) extracts and merges content into project files.

### Enabling a locale for production

Mozilla accounts has a required completion level of 70% for being enabled in production. Past tickets for updating locales are tracked in [JIRA](https://mozilla-hub.atlassian.net/browse/FXA-4981). To enable a locale in production, a PR can be made to the `fxa` repository adding the locale to the [supported-languages.json](https://github.com/mozilla/fxa/blob/main/libs/shared/l10n/src/lib/supported-languages.json) file.

## Mozilla Monitor

* Repository: [GitHub](https://github.com/mozilla/blurts-server/)
* L10n Repository: [GitHub](https://github.com/mozilla-l10n/monitor-website-l10n)
* L10n format: Fluent
* Bug reports: [GitHub](https://github.com/mozilla/blurts-server/issues)
* Dev server: [link](https://fx-breach-alerts.herokuapp.com/)
* Prod server: [link](https://monitor.firefox.com/)

To add a new locale to this project it’s enough to add the locale to Pontoon. This will make the locale automatically available on the dev server and commit to the repository.

Localization PM is automatically set as reviewer via [CODEOWNER](https://github.com/mozilla/blurts-server/blob/main/docs/CODEOWNERS) for pull requests affecting Fluent files.

For information on the automation, see the [README](https://github.com/mozilla-l10n/monitor-website-l10n#automation) in the l10n repository.

## Mozilla VPN Client

* Repository: [GitHub](https://github.com/mozilla-mobile/mozilla-vpn-client)
* L10n Repository: [GitHub](https://github.com/mozilla-l10n/mozilla-vpn-client-l10n)
* L10n format: XLIFF
* Bug reports: [GitHub](https://github.com/mozilla-mobile/mozilla-vpn-client/issues)
* Testing web app: [link](https://mozilla-mobile.github.io/mozilla-vpn-client/)

To add a new locale to this project it’s enough to add the locale to Pontoon. The locale will be added automatically to Nightly builds, but will be available in production builds only after it reaches 70% completion (and dropped automatically if it gets lower).

Builds are created via GitHub automation and available as assets in each run of [GitHub Actions](https://github.com/mozilla-mobile/mozilla-vpn-client/actions). Builds are multilocale, and users can switch language directly from the app settings.

For this project, there are several elements of automation running (linter, [string extraction](https://github.com/mozilla-l10n/mozilla-vpn-client-l10n#string-updates)).

### Automation: Strings export

Strings are stored in the original repository either directly in the code or in [YAML format](https://github.com/mozilla-mobile/mozilla-vpn-client/blob/main/src/translations/strings.yaml).

[Automation](https://github.com/mozilla-l10n/mozilla-vpn-client-l10n/blob/main/.github/workflows/update.yaml) exports strings from the `main` branch and all `releases` branches into a single XLIFF file, and creates a pull request every workday at 7 AM UTC updating all XLIFF files in the repository. The PM in charge is automatically set as reviewer via [CODEOWNER](https://github.com/mozilla-l10n/mozilla-vpn-client-l10n/blob/main/.github/CODEOWNERS).

### Automation: Linting

There is a [linter](https://github.com/mozilla-mobile/mozilla-vpn-client/blob/main/.github/l10n/check_l10n_issues.py) running in the code repository, checking for common mistakes in strings:
* Use of straight quotes `'` or `"` instead of `'` or `“”`.
* Use of `...` instead of `…`.
* Lack of comments when the string has placeables.
* Empty strings.
