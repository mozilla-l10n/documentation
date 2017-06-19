# Adding a new locale to Beta and Release builds

The majority of the work has already been completed when setting up [Nightly builds](adding_nightly.md). There are a few prerequisites before adding a new locale to Beta and Release:
* Localization should have reached a good level of completion, especially for user facing parts of the UI.
* Localization team has demonstrated a consistent effort, being able to keep up for at least a couple of cycles with the incoming flow of new strings.
* L10n-drivers have performed testing of the builds on different operative systems without identifying critical issues.
* There is a relevant number of users on the Nightly channel. This number varies based on the language, for minority languages 10-20 users is a good result. Also, a trend showing growth is important as well.

To track this work, you need to file a bug in Firefox::Build Config (like [this example](https://bugzilla.mozilla.org/show_bug.cgi?id=1359321)), blocking the original tracking bug for the locale (`fx-l10n-LOCALE`).

## Add locale to build configuration

First of all make sure that your environment is [correctly set up](/tools/mercurial/setting_mercurial_environment.md), update your local mozilla-unified clone and make sure it’s on the `central` bookmark:

```BASH
$ cd ~/mozilla/mercurial/mozilla-unified
$ hg pull -u
$ hg up central
```

The file to modify is in `browser/locales/shipped-locales`, open it with your text editor of choice.

```BASH
$ atom browser/locales/shipped-locales
```

And add the new locale to the list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**.

After you’ve finished editing the file, check the status of the repository, and the diff. Let’s consider for example the task of adding Urdu (ur).

```BASH
$ hg status
M browser/locales/shipped-locales

$ hg diff
--- a/browser/locales/shipped-locales
+++ b/browser/locales/shipped-locales
@@ -83,14 +84,13 @@ son
 te
 th
 tr
 uk
+ur
 uz
 vi
 xh
 zh-CN
```

Let’s create a bookmark for this pending work, for example `bug1342318`.

```BASH
$ hg bookmark bug1342318
```

Commit the changes with a commit message that includes the reviewer’s nickname after `r?`, for example if `flod` is the reviewer

```BASH
$ hg commit -m "Bug 1342318 - Add Urdu(ur) to shipped-locales r?flod"
```

Push to review with:

```BASH
$ hg push review
```

Once the patch has been reviewed, you can land it directly from mozreview (if you have L3 commit level), or set the `checkin-needed` keyword in the bug.
You also need to set the `relnote-firefox` flag to `?` in the bug, the suggested comment is `Suggested for release notes: "Locale added: LANGUAGE_NAME (LOCALE_CODE)"`.

In order to have builds when the Beta cycle starts, make sure to sign-off the locale on [the dashboard](https://l10n.mozilla.org/) (elmo) for central before next merge day, and verify that a sign-off is correctly available on beta before beta1.
