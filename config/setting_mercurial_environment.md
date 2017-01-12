# Set up the environment for Mercurial

**IMPORTANT:** This configuration has to be done only once on the computer. After that you will simply need to keep Mercurial up to date (a new version is released every month).

## Mercurial
Most of the work needs to be done in [Mercurial](https://www.mercurial-scm.org/downloads), so you need to install if first. An alternative way to install it is via [homebrew](http://brew.sh/) with `brew install hg` (`brew upgrade hg` to update it later).

To check if Mercurial is available and up to date, run in the terminal `hg --version`, the output should look like this:
```
$ hg --version
Mercurial Distributed SCM (version 4.0.1)
(see https://mercurial-scm.org for more information)

Copyright (C) 2005-2016 Matt Mackall and others
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```
Note that the `$` is not part of the command, it just indicates the terminal prompt across the entire documentation.

Unless you’re familiar with `vi`, you also want to setup `nano` as the default editor in the system.
```
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

## Set up MozReview
Detailed instructions and explanations are available in [the official documentation](http://mozilla-version-control-tools.readthedocs.io/en/latest/mozreview/install-mercurial.html#mozreview-install-mercurial).

Clone the **version-control-tools** repository on your machine. In this case, the clone’s folder will be stored inside `~/mozilla/mercurial/`. If you move it, you’ll need to update the reference in `~/.hgrc` later.
```
$ hg clone https://hg.mozilla.org/hgcustom/version-control-tools ~/mozilla/mercurial/version-control-tools
```

At this point you need to enable the reviewboard extension by editing the `.hgrc` file. If the file doesn’t have an `[extensions]` section create one and add a line `reviewboard = ~/mozilla/mercurial/version-control-tools/hgext/reviewboard/client.py` to enable the *reviewboard* extension.

Other useful extensions are `Mercurial Queues Extension` (queues), `color` (colorize output, for example diffs) and `purge` (to remove untracked files from the repository).

Create some aliases that you’ll use in your work with MozReview:
```INI
[alias]
shortlog = log --template "{node|short} | {date|isodatesec} | {author|user}: {desc|strip|firstline}\n"
wip = log --graph --rev=wip --template=wip

[templates]
wip = '{label("log.branch", branches)} {label("changeset.{phase}", rev)}{label("changeset.{phase}", ":")}{label("changeset.{phase}", short(node))} {label("grep.user", author|user)}{label("log.tag", if(tags," {tags}"))}{label("log.tag", if(fxheads," {fxheads}"))} {label("log.bookmark", if(bookmarks," {bookmarks}"))}\n{label(ifcontains(rev, revset("."), "desc.here"),desc|firstline)}'
```

Add your bugzilla ID (email address) and an API key (use https://bugzilla.mozilla.org/userprefs.cgi?tab=apikey to generate one):
```INI
[bugzilla]
username = YOUR EMAIL
apikey = APIKEY
```

Add your IRC Nickname (used for reviews):
```INI
[mozilla]
ircnick = mynick
```

Add the path to the review repository (HTTP version is enough for our use case):
```INI
[paths]
# For HTTP pushing
review = https://reviewboard-hg.mozilla.org/autoreview
```

The first time you’ll need to [link](http://mozilla-version-control-tools.readthedocs.io/en/latest/mozreview/install.html#manually-associating-your-ldap-account-with-mozreview) your LDAP account with MozReview:
```
$ ssh reviewboard-hg.mozilla.org mozreview-ldap-associate
```

This is how a complete basic configuration file would look like:

```INI
[ui]
username = YOUR NAME <YOUR EMAIL>
ignore.other = ~/.hgignore

[defaults]
qnew = -Ue

[extensions]
color =
mq =
purge =
reviewboard = ~/mozilla/mercurial/version-control-tools/hgext/reviewboard/client.py

[bugzilla]
username = YOUR EMAIL
apikey = APIKEY

[mozilla]
ircnick = YOURNICK

[paths]
review = https://reviewboard-hg.mozilla.org/autoreview

[diff]
git = 1
showfunc = 1
unified = 8
```

## Cloning/Updating mozilla-unified
Since searchplugins are stored in mozilla-central, you will also need a clone of it on your computer. Using the [mozilla-unified repository](http://mozilla-version-control-tools.readthedocs.io/en/latest/hgmozilla/unifiedrepo.html) repository is a better solution, especially if you need to work on more than just mozilla-central (e.g. mozilla-aurora to update shipping locales).
```
$ cd ~/mozilla/mercurial/
$ hg clone https://hg.mozilla.org/mozilla-unified
```

To update the existing repository:
```
$ cd ~/mozilla/mercurial/
$ hg pull -u
$ hg up central
```
The last command makes sure you’re working against central (to be more precise, it moves you to the `central` bookmark).

## Text editor
The suggestion is to use [Atom](https://atom.io/) with the optional [Sort Lines package](https://atom.io/packages/sort-lines) installed.

If you don’t like to use `nano` to edit commit messages, you can also use a graphical editor. A possible alternative on Mac is to use [TextMate](https://macromates.com/): after installing it, open Preferences and install the *Shell support* (*Terminal* tab), then add a `editor` preference to `.hgrc`.
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
