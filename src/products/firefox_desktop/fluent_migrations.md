# Fluent migrations

[Fluent migrations](https://firefox-source-docs.mozilla.org/l10n/migrations/index.html) are used to migrate existing translations from legacy formats (DTD, properties) to Fluent, or existing Fluent messages to new messages or different FTL files.

At the core of each migration there is a Python file, called a **migration recipe**, that instructs the system on how to port existing translations to Fluent. Typically, a patch migrating content to Fluent will:
* Add new Fluent strings or files.
* Remove obsolete strings.
* Include a migration recipe.

Once one such patch lands in [gecko-dev](https://github.com/mozilla/gecko-dev), string changes will be pushed to the `update` branch of [firefox-l10n-source](https://github.com/mozilla-l10n/firefox-l10n-source). At this point, this new content is not visible yet in [Pontoon](https://pontoon.mozilla.org/).

The goal of a migration is to port existing translations to a new format or file without forcing the community localizers to retranslate them. For this to happen, migrations need to be performed before the new strings are pushed to the `main` branch of the `firefox-l10n-source` repository and become available in Pontoon.

This means that patches that include migrations should only be pushed from the `update` branch to `main` following the steps described in this document.

## Running Fluent migrations

This section of the document describes in detail which operations need to be performed in order to run migrations.

### Prerequisites

Several access rights are required:
* Admin access to `firefox-l10n-source` and `firefox-l10n` (as a member of the `l10n-firefox` team).
* Admin access to [Pontoon](https://pontoon.mozilla.org/).
* An account on Heroku with access to [Pontoon apps](https://dashboard.heroku.com/apps/mozilla-pontoon/resources).

In order to run migrations:
* Install the [fluent.migrate](https://pypi.org/project/fluent.migrate/) Python package.
* Clone the [firefox-l10n](https://github.com/mozilla-l10n/firefox-l10n) repository.
* Clone the [firefox-l10n-source](https://github.com/mozilla-l10n/firefox-l10n-source) repository.

### Ensure there are no blocking issues in the update branch of firefox-l10n-source

As part of migrations, content needs to be pushed from the `update` branch to the `main` branch of `firefox-l10n-source`. Any pending issue needs to be solved before starting the process (eventually manually backing out problematic changes) to prevent problematic strings being exposed to localizers. For more information about the review process, see [this document](review.md).

### Stop sync in Pontoon

Before starting the migration process, sync needs to be suspended for Firefox from the [admin panel](https://pontoon.mozilla.org/admin/projects/firefox/) by selecting the checkbox `SYNC DISABLED` at the bottom of the page, then clicking `SAVE PROJECT`.

This is needed for several reasons:
* It removes the chance of conflicts in the l10n repository between the running migration and Pontoon committing changes for other projects.
* The migrated strings need to be added in the same cycle as the new strings for the source language (`en-US`). If they’re added before, Pontoon will ignore them, creating a misalignment between the internal database and l10n repositories. If they’re added after, these strings will be displayed as missing in Pontoon, and some locales might try to translate them while it’s not needed.

The last step here is to make sure that the current sync process has completed:
* Check the [Sync Logs](https://pontoon.mozilla.org/sync/log/) page, click on the last one, and make sure that there are no projects with `---` in the `DURATION` field.

### Test the migrations locally

A series of tools and helpers to run migrations is available in [this repository](https://github.com/flodolo/fluent-migrations):
* Clone the repository locally and follow the instructions available in the [README](https://github.com/flodolo/fluent-migrations/blob/master/README.md) to set the configuration file.
* Add the new migration recipes in the `recipes` folder. The script will look for any Python file starting with `bug_` in that folder, so it’s possible to run multiple migrations in one pass. More information about the folder’s structure is available in the repository’s README.

At this point, while each migration has been tested as part of the review before landing, it’s always good to run the migration against one locale, e.g. `it`:
* Update the locale’s repository, check the results of `compare-locales`. Assuming the l10n repository is cloned in `~/migrations/firefox-l10n`, and the quarantine repository is in `~/migrations/firefox-l10n-source` with the `update` branch checked out, the command to run is `compare-locales ~/migrations/firefox-l10n-source/_configs/browser.toml ~/migrations/firefox-l10n it`. Save the output in order to compare it with the results after the migration.
* Run the migration, without pushing, only for `it`: `./scripts/migrate it wet-run`. Then run compare-locales again, and check if the results are as expected: migrated strings should not appear as missing anymore, and there should be no errors.

### Push updates to the main branch of firefox-l10n-source

Before running the migration of localization strings, [merge](review.md#merge-reviewed-strings-to-main-branch-of-firefox-l10n-source) the source (en-US) strings of the `update` branch in `firefox-l10n-source` to the `main` branch. Make sure that:
* The new strings and migrations are available in the `update` branch.
* All [pending issues](#ensure-there-are-no-blocking-issues-in-the-update-branch-of-firefox-l10n-source) are dealt with.
* The migration has been tested locally and works as expected.

Once the new source strings are merged, the remaining procedures need to be completed before re-enabling sync in Pontoon, otherwise additional manual work on the repository to revert the commit will be required. The alternative is forcing all locales to retranslate this content, and losing the entire benefit of migrations.

### Run migrations

To run the migration on all repositories, use `./scripts/migrate wet-run push` in the same environment used for testing. For each repository, this will:
* Pull changes.
* Run the migration and commit changes.
* Push changes to the remote.

The duration of this step depends on the number of migrations and the speed of the Internet connection, but this should only take a few minutes to run.

While migrations run, it’s important to look out for errors in the console, even if the standard output is quite noisy:
* Python errors with a stack trace are unlikely at this stage of the development, since it means that the code encountered a scenario that it’s unable to manage. If something is broken in the `fluent.migrate` package, or there are issues with Python dependencies, the migration should stop at the very beginning.

When the script completes, by default a new branch named `update-migration` will be created in the `firefox-l10n` repository unless run with the `current-branch` argument. Note: the name of the branch created can be adjusted in your local [config.dist](https://github.com/flodolo/fluent-migrations/blob/main/config/config.dist#L12) file.

### Create and merge pull request against main in firefox-l10n

Use the URL generated in your terminal output in the previous step to create a pull request against the `main` branch in GitHub for the migrated strings in [firefox-l10n](https://github.com/mozilla-l10n/firefox-l10n). (Or create a pull request manually.)

Upon creation, review the diff against the `main` branch to ensure everything ran correctly, then if there’s nothing wrong approve the PR and merge it into `main`.

### Re-enable Sync in Pontoon

Once the actual migration is complete, the next step is to re-enable sync in Pontoon.

* Access the [admin panel for Firefox](https://pontoon.mozilla.org/admin/projects/firefox/), click the `SYNC` button at the bottom, then deselect `SYNC DISABLED` and click `SAVE PROJECT`.
* Clicking the `SYNC` button will spawn a new sync process just for Firefox. Check the [Sync Logs](https://pontoon.mozilla.org/sync/log/) page to see when it’s finished. Depending on the amount of changes, this can require from 15 to over 30 minutes. It’s also possible to monitor the status in Papertrail, accessible from the [Resources](https://dashboard.heroku.com/apps/mozilla-pontoon/resources) page in Heroku, and filter the log using the string `app/worker`.
