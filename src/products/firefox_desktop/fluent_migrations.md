# Running Fluent migrations

[Fluent migrations](https://firefox-source-docs.mozilla.org/l10n/migrations/index.html) are used to migrate existing translations from legacy formats (DTD, properties) to Fluent, or existing Fluent messages to new messages or different FTL files. This document describes in detail which operations need to be performed in order to run migrations on over 150 Mercurial repositories for Firefox. Several access rights are required:
* Write access to [l10n-central](https://hg.mozilla.org/l10n-central), i.e. SSH access with `active_scm_l10n` rights. It’s possible to check your *Access Groups* in [your profile on people.mozilla.org](https://people.mozilla.org/e#nav-access-groups).
* Sign-off rights in [Elmo](https://l10n.mozilla.org/).
* Admin access to [Pontoon](https://pontoon.mozilla.org/).
* An account on Heroku with access to [Pontoon apps](https://dashboard.heroku.com/apps/mozilla-pontoon/resources).

## Prerequisites

In order to run migrations:
* Install the [fluent.migrate](https://pypi.org/project/fluent.migrate/) Python package.
* Clone all [l10n-central](https://hg.mozilla.org/l10n-central) repositories.
* Clone [gecko-strings-quarantine](https://hg.mozilla.org/users/axel_mozilla.com/gecko-strings-quarantine/) and [gecko-strings](https://hg.mozilla.org/l10n/gecko-strings).

A set of scripts to automate cloning and updating of the l10n-central repositories is [available here](https://github.com/flodolo/scripts/tree/master/mozilla_l10n/clone_hgmo).

## Preliminary steps

Migrations will create new changesets in each of the repositories. Before starting, it’s highly recommended to review all pending sign-offs in Elmo for the current Firefox Beta. More details about the sign-off process are available in [this document](../review/signoffs.md).

## Stop sync in Pontoon

Before starting the migration process, sync needs to be suspended for all projects relying on the l10n-central repositories. The list of affected projects is:
* Firefox
* Thunderbird
* Seamonkey
* Lightning

In order to disable sync, access each project from the [admin panel](https://pontoon.mozilla.org/admin/), and select the checkbox `SYNC DISABLED` at the bottom of the page, then `SAVE PROJECT`.

This is needed for several reasons:
* Pontoon takes a lot of time processing this amount of changes, creating a bottleneck in the sync for all projects.
* The migrated strings need to be added in the same cycle as the new strings for the source language (`en-US`). If they’re added before, Pontoon will ignore them, creating a misalignment between internal database and l10n repositories. If they’re added after, these strings will be displayed as missing in Pontoon, and some locales might try to translate them while it’s not needed.

The last step here is to make sure that the current sync process has completed, then increase the resources assigned to the Heroku worker:
* Check the [Sync Logs](https://pontoon.mozilla.org/sync/log/) page, click on the last one, and make sure that there are no projects with `---` in the `DURATION` field.
* In [Heroku](https://dashboard.heroku.com/apps/mozilla-pontoon/resources), switch the *worker* from `PM` (Performance-M dynos) to `PL` (Performance-L dynos).

It’s important to make sure that there is no sync in progress when upgrading the worker, because that will kill any pending process.

## Push updates to gecko-strings

Assuming the new strings are available in the [quarantine repository](https://hg.mozilla.org/users/axel_mozilla.com/gecko-strings-quarantine), it’s now time to push the updates to the official [gecko-strings repository](https://hg.mozilla.org/l10n/gecko-strings).

Pontoon relies on a [different repository](https://hg.mozilla.org/users/m_owca.info/firefox-central/), that is generated every 20 minutes based on the content of `gecko-strings`. That’s why it’s useful to run this update before starting the actual migrations.

## Run migrations

A series of tools and helpers to run migrations is available in [this repository](https://github.com/flodolo/fluent-migrations):
* Clone the repository locally and follow the instructions available in the [README](https://github.com/flodolo/fluent-migrations/blob/master/README.md) to set the configuration file.
* Add the new migration recipe in the `recipes` folder. The script will look for any Python file starting with `bug_` in that folder. More information about the folder’s structure are available in the repository’s README.

At this point, while the migration has been tested as part of the review before landing, it’s always good to run the migration against one locale, e.g. `it`:
* Update the locale’s repository, check the results of `compare-locales`. Assuming l10n repositories are cloned in `~/migrations/locales`, and the quarantine repository in `~/migrations/gecko-strings-quarantine`, the command to run is `compare-locales ~/migrations/gecko-strings-quarantine/_configs/browser.toml ~/migrations/locales it`. Save the output in order to compare it with the results after the migration.
* Run the migration, without pushing, only for `it`: `./scripts/migrate it wet-run`. Then run compare-locales again, and check if the results are as expected: migrated strings should not appear as missing anymore, and there should be no errors.
* If everything looks good, re-run the script adding the push option `./scripts/migrate it wet-run push`.

To run the migration on all repositories, use `./scripts/migrate wet-run push`. For each repository, this will:
* Pull changes.
* Run the migration and commit changes.
* Push changes to the remote.

To run multiple migrations, put all recipes in the `recipes` folder.

The duration of this step depends on the number of migrations and the speed of the Internet connection, but it should take about 20-30 minutes.

While migrations run, it’s important to look out for errors in the console, even if the standard output is quite noisy:
* Python errors with a stack trace are unlikely at this stage of the development, since it means that the code encountered a scenario that it’s unable to manage. If something is broken in the `fluent.migrate` package, or there are issues with Python dependencies, the migration should stop at the very beginning.
* For Mercurial, one potential error scenario is a push that would create a new head in the remote repository (`abort: push creates new remote head`, followed by a changeset ID). The script automatically pulls from the remote repository before running migrations, and Pontoon’s sync is disabled, so that shouldn’t happen, unless a previous migration failed to push to remote and left unsynced local commits. In this case, the easiest solution is to clone the repository for this locale from scratch, and run the migration only for that specific locale.

## Re-enable Sync in Pontoon

Once the actual migration is complete, the next step is to re-enable sync in Pontoon, one project at a time. Before starting, make sure that the [Pontoon repository](https://hg.mozilla.org/users/m_owca.info/firefox-central/) has the commit with the new strings.

* Access the [admin panel for Firefox](https://pontoon.mozilla.org/admin/projects/firefox/), click the `SYNC` button at the bottom, then deselect `SYNC DISABLED` and click `SAVE PROJECT`.
* Clicking the `SYNC` button will spawn a new sync process just for Firefox. Check the [Sync Logs](https://pontoon.mozilla.org/sync/log/) page to see when it’s finished. Depending on the amount of changes, this can require from 15 to over 30 minutes. It’s also possible to monitor the status in Papertrail, accessible from the [Resources](https://dashboard.heroku.com/apps/mozilla-pontoon/resources) page in Heroku, and filter the log using the string `app/worker`.

Once the sync is completed, repeat the process for all other projects (Thunderbird, Seamonkey, Lightning).

When sync is re-enabled for all projects, switch back the *worker* to `PM` in [Heroku](https://dashboard.heroku.com/apps/mozilla-pontoon/resources). Once again, make sure that there are no running sync processes before doing it.

## Update sign-offs

At this point all locales with migrated strings will have a new changeset available for sign off. Given that the changes are relatively safe, [bulk sign-offs](../review/signoffs.md#bulk-sign-offs) can be used, monitoring only a few locales to double check the output (the only diff will be from the migration).

This can be done concurrently with the previous step.
