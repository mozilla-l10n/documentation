# Adding a new locale to the single-locale build
Android has two different types of builds: a multi-locale build that ships in Google Play Store, and a single-locale build (containing only one locale) that is mostly used for testing.

The list of locales for which we create single-locale builds is stored inside a file named **all-locales** within Mozilla’s code repositories. Since we want to create Aurora builds, the file will be in mozilla-aurora: https://hg.mozilla.org/releases/mozilla-aurora/file/default/mobile/android/locales/all-locales

## File a bug to add the new locale
You need to file a bug in Firefox for Android::General requesting the new locale (see for example [this bug for Guaraní](https://bugzilla.mozilla.org/show_bug.cgi?id=1271839)). You can use this [bug template] to make things faster (update with the appropriate locale code and language name).

You also want to file a bug to use as tracker ([example for gn](https://bugzilla.mozilla.org/show_bug.cgi?id=1271970)), adding an alias like `fm-l10n-gn` for `gn` and blocking `fm-l10n-tracker`.

## Creating a patch for all-locales
First of all make sure that your environment is [correctly set up](setting_environment.md), and update your local mozilla-aurora clone:
```
$ cd ~/mozilla/mercurial
$ hg pull -r default -u
```
Note that the `$` is not part of the command, it just indicates the terminal prompt.

The file to modify is in `mobile/android/locales/all-locales`, open it with your text editor of choice.

```
$ atom mobile/android/locales/all-locales
```

And add the new locale to the list. With Atom and the Sort Lines package installed, you can press `F5` to make sure that the list is in **alphabetical order**. Let’s say for example that you need to add `ab-CD` to the list of supported locales.

After you’ve finished editing the file, check the status of the repository, and the diff.

```
$ hg status
M mobile/android/locales/all-locales

$ hg diff
--- a/mobile/android/locales/all-locales
+++ b/mobile/android/locales/all-locales
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
```

`M` in `hg status` indicates that the file has been modified, `+` in `hg diff` that the line has been added. Everything looks good, there are no unrelated changes, so it’s time to create a patch. You need to assign a name to this patch, it’s easy to use a reference to the bug number: for example, if the bug number is 123456, the file could be called `bug123456.patch` (note the added extension `.patch`).

```
$ hg qnew bug123456.patch
```

At this point you will be asked to provide a commit message for your patch (in `nano` if you followed the instructions to set up the environment): write your commit message, then press `CTRL+O` to save the file, `enter` to confirm the proposed filename, and finally `CTRL+X` to exit the editor.

The commit message should be the same as the bug, for example `Bug 123456 - Add "ab-CD" to Fennec all-locales for single-locale builds`.

You’ready to *pop* the patch out of the queue. Since there are no other patches, you can pop them all with `-a`.
```
$ hg qpop -a
popping bug123456.patch
patch queue now empty
```

The patch is stored inside the `.hg/patches` folder in the root of the repository (in the suggested setup, the full path would be `~/mozilla/mercurial/mozilla-aurora/.hg/patches`). You can copy the file through the command line or the file explorer. For example, on Mac you can open the folder in Finder by typing:
```
$ open ~/mozilla/mercurial/mozilla-aurora/.hg/patches
```
Or you can copy the file on the Desktop with
```
$ cp ~/mozilla/mercurial/mozilla-aurora/.hg/patches/bug123456.patch ~/Desktop
```

Now you need to attach the file to Bugzilla and set an appropriate reviewer for it.

## After the patch has been reviewed
Once the patch has been reviewed, you need to ask for approval: go in Details for the attachment, set `?` in the `approval‑mozilla‑aurora` flag and specify in the comment that the patch only needs to land in mozilla-aurora.

Once approved for Aurora, sheriffs will land the patch. A couple of days after check on FTP if builds are being generated for this new locale: https://ftp.mozilla.org/pub/mobile/nightly/latest-mozilla-aurora-android-api-15-l10n/

If there are no builds present, it’s usually due to errors in the locale, for example straight single or double quotes in Android DTDs. Check the team’s dashboard for these kind of errors.

[bug template]: https://bugzilla.mozilla.org/enter_bug.cgi?assigned_to=lebedel.delphine%40gmail.com&bug_file_loc=http%3A%2F%2F&bug_ignored=0&bug_severity=normal&bug_status=NEW&cc=francesco.lodolo%40gmail.com&cf_blocking_b2g=---&cf_blocking_fennec=---&cf_fx_iteration=---&cf_fx_points=---&cf_status_b2g_2_0=---&cf_status_b2g_2_0m=---&cf_status_b2g_2_1=---&cf_status_b2g_2_1_s=---&cf_status_b2g_2_2=---&cf_status_b2g_2_2r=---&cf_status_b2g_2_5=---&cf_status_b2g_2_6=---&cf_status_b2g_master=---&cf_status_firefox46=---&cf_status_firefox47=---&cf_status_firefox48=---&cf_status_firefox49=---&cf_status_firefox_esr38=---&cf_status_firefox_esr45=---&cf_tracking_b2g=---&cf_tracking_firefox46=---&cf_tracking_firefox47=---&cf_tracking_firefox48=---&cf_tracking_firefox49=---&cf_tracking_firefox_esr38=---&cf_tracking_firefox_esr45=---&cf_tracking_firefox_relnote=---&cf_tracking_relnote_b2g=---&comment=Please%20add%20the%20LOCALENAME%20%28ab-CD%29%20locale%20to%20all-locales%20to%20start%20Fennec%20single-locale%20builds%20in%20aurora%20and%20add%20Fennec%20to%20this%20team%27s%20dashboard.&component=General&contenttypemethod=autodetect&contenttypeselection=text%2Fplain&defined_groups=1&flag_type-37=X&flag_type-4=X&flag_type-41=X&flag_type-607=X&flag_type-720=X&flag_type-721=X&flag_type-737=X&flag_type-781=X&flag_type-787=X&flag_type-799=X&flag_type-800=X&flag_type-803=X&flag_type-835=X&flag_type-855=X&flag_type-864=X&flag_type-875=X&flag_type-889=X&flag_type-892=X&flag_type-901=X&flag_type-905=X&flag_type-908=X&form_name=enter_bug&maketemplate=Remember%20values%20as%20bookmarkable%20template&op_sys=Unspecified&priority=--&product=Firefox%20for%20Android&rep_platform=Unspecified&short_desc=%20Add%20%22ab-CD%22%20to%20Fennec%20all-locales%20for%20single-locale%20builds&target_milestone=---&version=unspecified
