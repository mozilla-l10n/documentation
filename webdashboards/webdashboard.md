# Webdashboard
Webdashboard, getting its data from Langchecker, has only one main configuration file in [app/data/locales.php](https://github.com/mozilla-l10n/webdashboard/blob/master/app/data/locales.php). This list of locales should be always in sync with the one available in Langchecker (`$mozilla`).

There is a second file, [app/data/project.php](https://github.com/mozilla-l10n/webdashboard/blob/master/app/data/project.php), that is used to create special project views (e.g. [Fall 2015](https://l10n.mozilla-community.org/webdashboard/?project=fall2015)).
