# Adding a new locale to the multi-locales build

Android has two different types of builds: a multi-locale build that ships in Google Play Store, and a single-locale build (containing only one locale) that is mostly used for testing.

The list of locales included in the multi-locales build is stored inside a file named **maemo-locales** within Mozilla’s code repositories. Since the goal is to create Nightly builds, the file will be in mozilla-central: https://hg.mozilla.org/mozilla-central/file/default/mobile/android/locales/maemo-locales

## File a bug to add the new locale

You need to file a bug in Firefox for Android::General requesting the new locale (see for example [this bug for Serbian](https://bugzilla.mozilla.org/show_bug.cgi?id=1262464)). You can use this [bug template] to make things faster:
* Update it with the appropriate locale code and language name.
* Update the target version for Firefox in comment 0.
* Set the `relnote-firefox` flag, e.g.

```
Release Note Request (optional, but appreciated)
[Why is this notable]: New locale
[Suggested wording]: "Locale added: LANGUAGE (ab-CD)"
[Links (documentation, blog post, etc)]:
```

## Creating a patch for build configuration

First of all make sure that your environment is [correctly set up](../../tools/mercurial/setting_mercurial_environment.md), and update your local mozilla-unified clone:

```BASH
$ cd ~/mozilla/mercurial/mozilla-unified
$ hg pull -r default -u
$ hg update central
```

The first file to modify is in `mobile/android/locales/maemo-locales`, open it with your text editor of choice.

```BASH
$ atom mobile/android/locales/maemo-locales
```

And add the new locale to the list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**. Let’s say for example that you need to add `ab-CD` to the list of supported locales.

The second file to modify is `mobile/android/locales/l10n.toml`. This is the beginning of the file:

```
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

basepath = "../../.."

locales = [
    "ab-CD",
    "an",
    "ar",
    "as",
    "ast",
    "az",
...
```

Identify the `locales` section, and make sure the locale is already listed under the `locales` section (it should have been added when enabling single locale builds). In the example above, the locale is represented by `ab-CD`.

Then locate the `exclude-multi-locale` section, and remove the locale from this list.

After you’ve finished editing the files, check the status of the repository, and the diff.

```BASH
$ hg status
M mobile/android/locales/maemo-locales

$ hg diff
--- a/mobile/android/locales/maemo-locales
+++ b/mobile/android/locales/maemo-locales
@@ -1,8 +1,9 @@
+ab-CD
 ar
 be
 ca
 cs
 da
 de
 es-AR
 es-ES

 diff --git a/mobile/android/locales/l10n.toml b/mobile/android/locales/l10n.toml
 --- a/mobile/android/locales/l10n.toml
 +++ b/mobile/android/locales/l10n.toml
 @@ -9,8 +9,9 @@ locales = [
      "ab-CD",
      "ar",
      "be",
      "ca",
      "cs",
      "da",
      "es-AR",
@@ -9,8 +9,9 @@ exclude-multi-locale = [
  -    "ab-CD",
       "ia",
       "oc",
...
```

`M` in `hg status` indicates that the file has been modified, `+` in `hg diff` that the line has been added, and `-` means it was removed. Follow the instructions available in [this document](../../tools/mercurial/creating_mercurial_patch.md) to create a patch, submit it for review, and land it.

**IMPORTANT:** an error in a single locale is going to break the multi-locales build for all locales, English included.

[bug template]: https://bugzilla.mozilla.org/enter_bug.cgi?assigned_to=lebedel.delphine%40gmail.com&bug_file_loc=http%3A%2F%2F&bug_ignored=0&bug_severity=normal&bug_status=NEW&cc=francesco.lodolo%40gmail.com&cf_blocking_b2g=---&cf_blocking_fennec=---&cf_fx_iteration=---&cf_fx_points=---&cf_status_b2g_2_0=---&cf_status_b2g_2_0m=---&cf_status_b2g_2_1=---&cf_status_b2g_2_1_s=---&cf_status_b2g_2_2=---&cf_status_b2g_2_2r=---&cf_status_b2g_2_5=---&cf_status_b2g_2_6=---&cf_status_b2g_master=---&cf_status_firefox46=---&cf_status_firefox47=---&cf_status_firefox48=---&cf_status_firefox49=---&cf_status_firefox_esr38=---&cf_status_firefox_esr45=---&cf_tracking_b2g=---&cf_tracking_firefox46=---&cf_tracking_firefox47=---&cf_tracking_firefox48=---&cf_tracking_firefox49=---&cf_tracking_firefox_esr38=---&cf_tracking_firefox_esr45=---&cf_tracking_firefox_relnote=---&cf_tracking_relnote_b2g=---&comment=Please%20add%20the%20LOCALENAME%20%28ab-CD%29%20locale%20to%20maemo-locales%20to%20ship%20it%20in%20the%20Fennec%20multilocale%20APK.%20%0D%0A%0D%0AA%20revision%20has%20been%20signed%20off%20in%20Central%2C%20they%27re%20good%20to%20ship%20their%20first%20release%20with%20XX.&component=General&contenttypemethod=autodetect&contenttypeselection=text%2Fplain&defined_groups=1&flag_type-37=X&flag_type-4=X&flag_type-41=X&flag_type-607=X&flag_type-720=X&flag_type-721=X&flag_type-737=X&flag_type-781=X&flag_type-787=X&flag_type-799=X&flag_type-800=X&flag_type-803=X&flag_type-835=X&flag_type-855=X&flag_type-864=X&flag_type-875=X&flag_type-889=X&flag_type-892=X&flag_type-901=X&flag_type-905=X&flag_type-908=X&form_name=enter_bug&maketemplate=Remember%20values%20as%20bookmarkable%20template&op_sys=Unspecified&priority=--&product=Firefox%20for%20Android&rep_platform=Unspecified&short_desc=%20Add%20%22ab-CD%22%20to%20Fennec%20maemo-locales%20for%20the%20multi-locale%20build&target_milestone=---&version=unspecified
