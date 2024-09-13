# Build system details for Firefox desktop

<!-- toc -->

## Overview

Thanks to using a [single source for localization](https://firefox-source-docs.mozilla.org/l10n/singlel10nsource.html), we ship all versions of Firefox from a [single localization repository](https://github.com/mozilla-l10n/firefox-l10n).

A job, called `l10n-bumper`, runs on Taskcluster every hour, and stores information on which changeset (defined by the revision SHA of `firefox-l10n`) to use for each build in a file called `l10n-changesets.json`:
* Nightly (`mozilla-central`) changeset: [l10n-changesets.json](https://hg.mozilla.org/mozilla-central/file/default/browser/locales/l10n-changesets.json). This always uses the latest revision of `main`.
* Beta (`mozilla-beta`) changeset: [l10n-changesets.json](https://hg.mozilla.org/releases/mozilla-beta/file/default/browser/locales/l10n-changesets.json).  This also uses the the latest revision of `main`, but it’s only updated twice a week.
* Before Release Candidate week, the mozilla-beta tree is [closed](https://moz-releng-docs.readthedocs.io/en/latest/how-to/releaseduty/merge-duty/merge_duty.html#merge-beta-to-release) on `mozilla-beta`. The `l10n-bumper` will restart at the beginning of the next cycle, when the mozilla-beta tree is [restarted](https://moz-releng-docs.readthedocs.io/en/latest/how-to/releaseduty/merge-duty/merge_duty.html#re-opening-the-tree-s).
* When the Beta code is merged to Release, [l10n-changesets.json](https://hg.mozilla.org/releases/mozilla-release/file/default/browser/locales/l10n-changesets.json) moves together with the rest of the code to `mozilla-release`. That means that Release builds will use the same changesets as the last beta with the same version number, and any further change [requires code uplifts](#updating-release).

## Timeline and deadlines

This is how Beta looks like in a 4 weeks release cycle, with relevant milestones.

![Beta cycle](../../assets/images/build_system/beta_cycle.png)

On Monday, 8 days before the release, the `l10n-bumper` will stop updating `l10n-changesets.json` on `mozilla-beta`.

Once the code merges from Beta to Release, any changeset update would require a manual uplift to `mozilla-release` and a new Release Candidate (RC) build.

![Timeline of all channels, 2 cycles](../../assets/images/build_system/all_channels_timeline.png)

### Updating release

When the code moves from `mozilla-beta` to `mozilla-release`, `l10n-changesets.json` is frozen, as `l10n-bumper` is not configured to run against the release branch.

In case of severe issues affecting one or more locales, it’s still possible to manually update the shipping changesets. A patch needs to be provided for `l10n-changesets.json` in `mozilla-release` branch and approved for uplift by Release Drivers (see for example [this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1513259) and [associated patch](https://hg.mozilla.org/releases/mozilla-release/rev/308fd26a204e)). Note that a dot release is needed in order to ship the updated version to users. [This script](https://github.com/flodolo/scripts/blob/master/mozilla_l10n/validate_fx_changesets_uplift/fx_release_changesets.py) can be used to validate the updated JSON.

The same process applies to ESR versions, as long as the associated esr repository is included among the [supported versions in firefox-l10n-source](https://github.com/mozilla-l10n/firefox-l10n-source/blob/main/.github/update-config.json#L2).
