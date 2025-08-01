# Other Projects

<!-- toc -->

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
