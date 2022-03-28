# Set up the environment for Mercurial

**IMPORTANT:** This configuration has to be done only once on the computer. After that you will simply need to keep Mercurial up to date (a new version is released every month).

## Mercurial

Most of the work needs to be done in [Mercurial](https://www.mercurial-scm.org/downloads), so you need to install if first. An alternative way to install it on macOS is via [homebrew](https://brew.sh/) with `brew install hg` (`brew upgrade hg` to update it later).

To check if Mercurial is available and up to date, run in the terminal `hg --version`, the output should look like this:

```BASH
$ hg --version
Mercurial Distributed SCM (version 4.0.1)
(see https://mercurial-scm.org for more information)

Copyright (C) 2005-2016 Matt Mackall and others
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

Unless you’re familiar with `vi`, you also want to setup `nano` as the default editor in the system.

```BASH
$ export EDITOR=/usr/bin/nano
```

## Mercurial configuration

Mercurial’s configuration is stored in a hidden file called `.hgrc` inside your user folder (`~/.hgrc`). You will need to create it if it’s not available on the system.

It’s divided into sections, with section names between square parentheses. For example:

```INI
[ui]
username = something@example.com
```

## Set up SSH access for l10n repositories

In order to be able to commit directly to l10n repositories, you need SSH access via your LDAP account (both obtained through a bug, where you also provide your SSH key).

Assuming your SSH key is stored in `~/.ssh/id_rsa`, your `.ssh/config` file should have a line that looks like this

```
Host hg.mozilla.org
User YOUR_LDAP_EMAIL_ADDRESS
IdentityFile ~/.ssh/id_rsa
```

## Set up MozPhab for Phabricator

Detailed instructions and explanations are available in [the official documentation](https://moz-conduit.readthedocs.io/en/latest/phabricator-user.html#setting-up-mozphab).

You also need to [create an account](https://moz-conduit.readthedocs.io/en/latest/phabricator-user.html) on Phabricator and [log in](https://phabricator.services.mozilla.com/).

The configuration will be completed after cloning `mozilla-unified`.

## Cloning and updating mozilla-unified

Since searchplugins are stored in mozilla-central, you will also need a clone of it on your computer. Using the [mozilla-unified repository](https://mozilla-version-control-tools.readthedocs.io/en/latest/hgmozilla/unifiedrepo.html) repository is a better solution, especially if you need to work on more than just mozilla-central.

```BASH
$ cd ~/mozilla/mercurial/
$ hg clone https://hg.mozilla.org/mozilla-unified
```

To update the existing repository:

```BASH
$ cd ~/mozilla/mercurial/mozilla-unified
$ hg pull -u
$ hg up central
```

The last command makes sure you’re working against central (to be more precise, it moves you to the `central` bookmark).

Now you can complete the setup for MozPhab. Follow the instructions on screen to complete, it will require you to connect to Phabricator and generate an API key to copy in the terminal:

```BASH
$ cd ~/mozilla/mercurial/mozilla-unified
$ moz-phab install-certificate
```

## Mercurial configuration

Mercurial configuration is stored in the `.hgrc` file in the user’s home directory.

Useful extensions are `Mercurial Queues Extension` (queues), `color` (colorize output, for example diffs) and `purge` (to remove untracked files from the repository). If the `.hgrc` file doesn’t have an `[extensions]` section create one and add the following lines:

```INI
[extensions]
mq =
color =
purge =
```

Some aliases are also useful to work with bookmarks:

```INI
[alias]
shortlog = log --template "{node|short} | {date|isodatesec} | {author|user}: {desc|strip|firstline}\n"
wip = log --graph --rev=wip --template=wip

[templates]
wip = '{label("log.branch", branches)} {label("changeset.{phase}", rev)}{label("changeset.{phase}", ":")}{label("changeset.{phase}", short(node))} {label("grep.user", author|user)}{label("log.tag", if(tags," {tags}"))}{label("log.tag", if(fxheads," {fxheads}"))} {label("log.bookmark", if(bookmarks," {bookmarks}"))}\n{label(ifcontains(rev, revset("."), "desc.here"),desc|firstline)}'
```

## Text editor

The suggestion is to use [Atom](https://atom.io/) with the optional [Sort Lines package](https://atom.io/packages/sort-lines) installed.

If you don’t like to use `nano` to edit commit messages, you can also use a graphical editor. A possible alternative on macOS is to use [TextMate](https://macromates.com/): after installing it, open Preferences and install the *Shell support* (*Terminal* tab), then add a `editor` preference to `.hgrc`.

```INI
[ui]
username = YOUR NAME <YOUR EMAIL>
ignore.other = ~/.hgignore
editor = mate -w
```

You can also use Atom, but it’s definitely slower.

```INI
[ui]
username = YOUR NAME <YOUR EMAIL>
ignore.other = ~/.hgignore
editor = atom --wait
```

In general, in order to be able to use it for commit messages, you’ll need a text editor available from the command line, and with a `wait` option.
