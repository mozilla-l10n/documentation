# Importing translations from existing files

Sometimes it’s useful to import strings from existing files. A typical example is when an existing page is replaced by a new template, with some strings in common.

First of all, always make sure that your repositories are up to date. If you’re using the l10n-drivers VM, simply run `gitup`.

Let’s consider a simple example: the string `Internet Health` is currently available in `main.lang`. A new page is created (`mozorg/internet-health.lang`), and it includes that string in the template. Since `main.lang` is a shared file it would be possible to avoid adding the string to the new template, but in this case you want to make sure that localizers can use an alternative translation.

To start check that all locales have the untranslated string available in `mozorg/internet-health.lang`

```BASH
$ lang_update mozorg/internet-health.lang 0 all
```

At this point you need to work on langchecker, editing your local copy of [app/scripts/lang_update](https://github.com/mozilla-l10n/langchecker/blob/master/app/scripts/lang_update#L105).

```BASH
$ atom ~/mozilla/git/app/scripts/lang_update
```

Search for the variable `$import_files` and add the file from which you want to import strings (`main.lang` in this case). Make also sure that `$import_website` is set to `0` (identifier for `mozilla.org`).

```PHP
$import_files = ['main.lang'];
$import_website = 0;
```

This will make the next run of `lang_update` import existing strings from `main.lang`. For this reason, always run `lang_update` only against the file you wish to update.

Now you can run the update, propagating updates to all locales:

```BASH
$ lang_update mozorg/internet-health.lang 0 all
```

Note that `$import_files` is an array, which means you could have more source files, e.g.

```PHP
$import_files = ['main.lang', 'mozorg/home/index.lang'];
```
The order is relevant: files are checked in the order they’re available in the array, the first matching translation is kept.

**Important**: make sure to not commit this change to langchecker. You can either ignore it and it will be removed the next time you run `gitup`, or reset the repository with `git reset --hard`.

```BASH
$ cd ~/mozilla/git/langchecker
$ git reset --hard
```

Check your local installation of langchecker for errors by visiting http://localhost/langchecker/?action=errors

If there are no errors, check the status of this repository with `git status`, and the content of the updated files for at least one locale (with `git diff LOCALE`), to confirm that strings were imported correctly. Then push to your branch.

It’s a good idea to send localizers an email to explain why the string will be already translated when they start working on the file.
