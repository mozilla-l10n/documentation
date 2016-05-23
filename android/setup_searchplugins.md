# Set up searchplugins

## Cloning/Updating the locale’s repository
The first thing to remember is that you will be working on Aurora for a new locale, and you need this locale’s Mercurial repository on your computer.

l10n repositories for Android live in https://hg.mozilla.org/releases/l10n/mozilla-aurora/. In this case let’s assume that l10n clones will be stored in `~/mozilla/mercurial/l10n`, with a subfolder for each locale and each branch. So, if the locale is `gn`, the repository will be stored in `$/mozilla/mercurial/l10n/gn/mozilla-aurora`.

Note that the `$` is not part of the command, it just indicates the terminal prompt.

```
$ mkdir -p ~/mozilla/mercurial/l10n/gn
$ cd ~/mozilla/mercurial/l10n/gn
```
The first command makes sure that the path for `gn` exists, the second moves into the folder.

If you don’t have a clone yet, you need to create it.
```
$ hg clone ssh://hg.mozilla.org/releases/l10n/mozilla-aurora/gn mozilla-aurora
```

A couple of details to note in this `hg clone` command:
* The command uses `ssh://`, which means you need an active (and properly configured) SSH access to the repository.
* It doesn't use the default folder for the local clone, but specify a `mozilla-aurora` directory. Without that it would create a `gn` folder, making it impossible to distinguish different branches.

If you already had a clone on your computer, make sure to update it before doing anything:
```
$ cd ~/mozilla/mercurial/l10n/gn
$ hg pull -r default -u
```

## Setting up files

### list.txt
list.txt lives in `mobile/searchplugins/list.txt`. If the folder `mobile/searchplugins/` doesn't exist, you need to create it first.

Things to remember about list.txt:
* It’s a flat text file.
* Order is not relevant, so it’s highly suggested to use alphabetical order (easy to obtain with Atom and Sort Lines).
* Each line maps to a searchplugin: if the file for the searchplugin is called `google.xml`, the line will just say `google`, without the extension but also **respecting the case**.
