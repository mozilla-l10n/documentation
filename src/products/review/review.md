# Reviewing strings in Firefox desktop and Firefox for Android

## Review landed strings

Starting from Firefox 57, all versions of Firefox desktop and Firefox for Android ship by localizing a single repository containining the reference English strings, called [gecko-strings](https://hg.mozilla.org/l10n/gecko-strings). It is generated from strings landing in the code repository for each branch (e.g. mozilla-central and comm-central for Nightly, mozilla-beta and comm-beta for Beta, etc.), and it’s exposed to localization tools like Pontoon.

There is a second repository, [gecko-strings-quarantine](https://hg.mozilla.org/users/axel_mozilla.com/gecko-strings-quarantine), used as a buffer to avoid exposing poor strings to the larger audience of localizers.

The localizations for all channels can be found in [l10n-central](https://hg.mozilla.org/l10n-central/), with a single repository for each locale.

The review process consists of three parts:
* Review strings landing in `mozilla-central`. Currently `comm-central` doesn’t undergo a similar review process.
* Review strings landing in `gecko-strings-quarantine`. Currently, the quarantine repository is updated manually every few days.
* Push reviewed strings to `gecko-strings`, and start the localization process.

### Review strings landing in mozilla-central

You can get the list of changesets touching localized strings in the last 2 days from [mozilla-central](https://hg.mozilla.org/mozilla-central/log?rev=keyword("locales/en-US")+and+pushdate("-2")). Adjust the `pushdate` part if you want to see more or less days.

There are some irrelevant changesets, like en-US dictionary updates, but the majority of landings are relevant and need to be checked for localization issues.

You need to open each changeset, and identify changed files that are relevant for localization (.properties, .dtd, .ini).

Things to look out for:
* Unclear strings and missing localization comments: the best way to identify them is to translate the strings, only having the string and comment as context (not the entire file, or the bug). For example: is the word used both a noun and a verb in English? Is the ID clear enough to give context (e.g. `buttonLabel`)?
* String changes without new IDs.
* Duplicated strings.
* [Localization issues](https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_content_best_practices), like misused plural forms, unclear comments, etc.

In case of issues, you have two options:
* Ask sheriffs (via bug or IRC in #sheriffs) to back out the patch.
* Ask clarifications in the bug, and decide if it’s worth to stop exposing new strings until the issue is fixed.

### Review strings landing in gecko-strings-quarantine

The next step is to spot check changes landed in [gecko-strings-quarantine](https://hg.mozilla.org/users/axel_mozilla.com/gecko-strings-quarantine/shortlog). Here are some things to look out for:
* Check if a changeset is removing strings. This should happen only when a string landed in Nightly and was removed during the same cycle, or at the beginning of a release cycle when a group of strings becomes unused in all shipping versions.
* Compare the changeset with the original landing in mozilla-central. Each changeset’s header contains a set of references (consider [this example](https://hg.mozilla.org/users/axel_mozilla.com/gecko-strings-quarantine/rev/9c9e89dd4fd5)), the most important one is `X-Channel-Converted-Revision`, which links to the original landing in the code repository.

### Run compare-locales against gecko-strings

A good next step to check for issues is to run [compare-locales](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/compare-locales) against the `gecko-strings` repository.

First of all make sure that your environment is [correctly set up](../../tools/mercurial/setting_mercurial_environment.md), and update your local `mozilla-unified` clone.

`compare-locales` needs to be installed on your system. You can either install a specific release, or clone the [hg repository](https://hg.mozilla.org/l10n/compare-locales/) and install it via `pip install -e .`. You can check that `compare-locales` is running correctly by checking its version:

```
$ compare-locales --version
compare-locales 2.1
```

Let’s assume that:
* [gecko-strings-quarantine](https://hg.mozilla.org/users/axel_mozilla.com/gecko-strings-quarantine) is cloned in `~/l10n/gecko-strings-quarantine`.
* [mozilla-unified](https://hg.mozilla.org/mozilla-unified) is cloned in `~/src/mozilla-unified`, and you checked out the version corresponding to the converted changeset.

Then run

```
$ compare-locales --unified --full ~/src/mozilla-unified/browser/locales/l10n.toml ~/src/mozilla-unified/mobile/android/locales/l10n.toml ~/l10n gecko-strings-quarantine
```

If you also have [comm-central](https://hg.mozilla.org/comm-central) checked out, you can check Thunderbird and allies with:

```
$ compare-locales --unified --full -Dmozilla=~/src/mozilla-unified/ ~/src/comm-central/mail/locales/l10n.toml ~/src/comm-central/calendar/locales/l10n.toml ~/src/comm-central/suite/locales/l10n.toml ~/l10n gecko-strings-quarantine
```

When running these, you should see no errors or warnings. When running them against the central revisions, you should see no missing or changed strings, while having obsolete strings is expected. When running against beta or release revisions, expect to have changed strings, but again, no missing strings.

Note: when running compare-locales against a non-existing locale code, use the `--full` commandline argument to get all strings in submodules. In particular for gecko-strings, you need that, otherwise you only get the strings in the `browser` and `mobile/android` directories.

### Run compare-locales against a localization repository

A good next step to check for issues is to run compare-locales against a localization repository frequently updated (Italian and French are good examples).
* [l10n-central/it](https://hg.mozilla.org/l10n-central/it) is cloned in `~/l10n/it`.

To run compare-locales against `mozilla-unified` and Italian, for both desktop and Android, you can run:

```
$ compare-locales --unified ~/src/mozilla-unified/browser/locales/l10n.toml ~/src/mozilla-unified/mobile/android/locales/l10n.toml ~/l10n it
```

To run compare-locales against `gecko-strings-quarantine` and Italian, for both desktop and Android, you can run:

```
$ compare-locales --unified ~/l10n/gecko-strings-quarantine/_configs/browser.toml ~/l10n/gecko-strings-quarantine/_configs/mobile-android.toml ~/l10n it
```

Both are really long commands, so it’s convenient to create Bash aliases in `~/.bash_profile` for them, e.g.

```
cmp_moz="compare-locales --unified ~/src/mozilla-unified/browser/locales/l10n.toml ~/src/mozilla-unified/mobile/android/locales/l10n.toml ~/l10n it"
cmp_mozx="compare-locales --unified ~/l10n/gecko-strings-quarantine/_configs/browser.toml ~/l10n/gecko-strings-quarantine/_configs/mobile-android.toml ~/l10n it"
```

Let’s start with the output of `compare-locales` against `gecko-strings-quarantine`: most of the time, it should only report missing strings. There will be obsolete strings only if a string was removed, which is a rare event in cross-channel.

For example, this is the output for a fully localized locale.

```
$ compare-locales --unified ~/l10n/gecko-strings-quarantine/_configs/browser.toml ~/l10n/gecko-strings-quarantine/_configs/mobile-android.toml ~/l10n it
it:
changed: 9914
changed_w: 52351
keys: 1383
unchanged: 883
unchanged_w: 1085
91% of entries changed
```

Check the results for duplicated strings and errors. For example, if a new error shows up for a missing variable, it’s likely that a string changed without a new ID and introduced new variables.

The output of `compare-locales` against `mozilla-unified` is going to contain a lot of noise, since it includes all strings that are obsolete for `mozilla-central`, but are still needed for other branches. If you’re interested in only seeing missing strings, i.e. strings that need to be added to the l10n repository, you can `grep` the results by piping the output to `egrep '^\s*\+'`.

```
$ compare-locales --unified ~/src/mozilla-unified/browser/locales/l10n.toml ~/src/mozilla-unified/mobile/android/locales/l10n.toml ~/l10n it | egrep '^\s*\+'
```

### Push reviewed strings to gecko-strings

If there are no issues in `gecko-strings-quarantine`, the next step is to push changes to `gecko-strings` and expose content to tools.

One time setup: after you cloned `gecko-strings-quarantine` on your system, you need to edit its `.hg/hgrc` file, and add `gecko-strings` as path. While you only need `https` for pulling the quarantine repository, you need `ssh` in order to push updates to `gecko-strings`.

The content of `~/l10n/gecko-strings-quarantine/.hg/hgrc` should be similar to this:

```
[paths]
default = https://hg.mozilla.org/users/axel_mozilla.com/gecko-strings-quarantine
gecko-strings = ssh://hg.mozilla.org/l10n/gecko-strings
```

To push the current `default` to `gecko-strings`, from the `gecko-strings-quarantine` folder simply run:

```
$ hg push -r default gecko-strings
```

Instead of `default`, you can also push a specific changeset, e.g.

```
$ hg push -r 4c05bc050007 gecko-strings
```
