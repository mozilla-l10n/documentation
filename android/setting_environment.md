# Setting up the environment
**IMPORTANT:** This needs to be done only the first time. After that you will only need to keep Mercurial up to date.

Most of the work needs to be done in [Mercurial](https://www.mercurial-scm.org/downloads), so you need to install if first.

To check if Mercurial is available and up to date, run in the terminal `hg --version`, the output should look like this:
```
$ hg --version
Mercurial Distributed SCM (version 3.8.2)
(see https://mercurial-scm.org for more information)

Copyright (C) 2005-2016 Matt Mackall and others
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

Unless you're familiar with `vi`, you also want to setup `nano` as the default editor in the system.
```
$ export EDITOR=/usr/bin/nano
```

## Enable the Mercurial Queues Extension
At this point you need to enable the **Mercurial Queues Extension** by editing the `.hgrc` file in your user folder (`~/.hgrc`).

This is the main configuration file for Mercurial: if it doesn’t exist, create it; if you don’t have an `[extensions]` section create one and add a line `mq =` to enable the *Mercurial Queues Extension*. Other useful extensions are `color` (colorize output, for example diffs) and `purge` (to remove untracked files from the repository). This is how a basic configuration file would look like:

```
[ui]
username = YOUR NAME <YOUR EMAIL>
ignore.other = ~/.hgignore

[defaults]
qnew = -Ue

[extensions]
color =
mq =
purge =

[diff]
git = 1
showfunc = 1
unified = 8
```

## Clone mozilla-aurora
You need to create a local clone of the mozilla-aurora repository. In this case, the clone will be stored in `~/mozilla/mercurial`.
```
$ mkdir -p ~/mozilla/mercurial
$ cd ~/mozilla/mercurial
$ hg clone http://hg.mozilla.org/releases/mozilla-aurora/
```

This operation will take several minutes depending on your Internet connection's speed. At the end, you will have a `~/mozilla/mercurial/mozilla-aurora` folder.
