# Enable a new locale on production for mozilla.org

All locales available in the [www.mozilla.org GitHub repository](https://github.com/mozilla-l10n/www.mozilla.org) are automatically enabled on the [dev server](https://www-dev.allizom.org/). In order to enable a language for [stage](https://www.allizom.org/) and [production](https://www.mozilla.org/), it needs to be added to Bedrock’s settings.

Before doing that, make sure that the locale has reached a good level of completion, and test the main pages on the dev server.

First, [file a bug](https://bugzilla.mozilla.org/enter_bug.cgi?product=www.mozilla.org&component=L10N) to track this change. Bug number will be needed for the commit message later. Consider for example [this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1338759), to add Nepali to production.

## Create a new branch

A clone of your fork of Bedrock is already available in the [virtual machine](/config/setup_l10ndrivers_vm.md), so run `gitup` to make sure everything is up to date. Then move to Bedrock’s folder, and create a new branch, for example using the bug number as reference.

```BASH
$ cd ~/mozilla/git/bedrock
$ git branch bug1338759
$ git checkout bug1338759
```

If you see a message referencing legal-docs like this one, it means that there’s an unwanted change in the legal-docs repository:

```BASH
$ git checkout bug1338759
M	vendor-local/src/legal-docs
Switched to branch 'bug1338759'
```

You can verify it by running `git status`

```BASH
$ git status
On branch bug1338759
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   vendor-local/src/legal-docs (new commits)

no changes added to commit (use "git add" and/or "git commit -a")
```

**IMPORTANT**: you need to get rid of this change before doing any work. If you don’t, your pull request will be rejected.

In order to remove this change, run the following commands

```BASH
$ cd ~/mozilla/git/bedrock/vendor-local/src/legal-docs/
$ git checkout master
$ git pull
$ cd ~/mozilla/git/bedrock
```

Make sure you’re back to the `bedrock` folder in your virtual machine, and check that there are no pending changes with `git status`.

## Edit Bedrock’s settings

The file to modify is `bedrock/base/settings.py`.

```BASH
$ cd ~/mozilla/git/bedrock
$ atom bedrock/settings/base.py
```

Search for `PROD_LANGUAGES`.

```PYTHON
PROD_LANGUAGES = ('ach', 'af', 'an', 'ar', 'as', 'ast', 'az', 'bg',
                  'bn-BD', 'bn-IN', 'br', 'bs', 'ca', 'cak', 'cs',
                  'cy', 'da', 'de', 'dsb', 'el', 'en-GB', 'en-US',
                  'en-ZA', 'eo', 'es-AR', 'es-CL', 'es-ES', 'es-MX', 'et',
                  'eu', 'fa', 'ff', 'fi', 'fr', 'fy-NL', 'ga-IE', 'gd',
                  'gl', 'gn', 'gu-IN', 'he', 'hi-IN', 'hr', 'hsb',
                  'hu', 'hy-AM', 'id', 'is', 'it', 'ja', 'ja-JP-mac',
                  'ka', 'kab', 'kk', 'km', 'kn', 'ko', 'lij', 'lt',
                  'ltg', 'lv', 'mai', 'mk', 'ml', 'mr', 'ms', 'my', 'nb-NO',
                  'nl', 'nn-NO', 'oc', 'or', 'pa-IN', 'pl', 'pt-BR', 'pt-PT',
                  'rm', 'ro', 'ru', 'si', 'sk', 'sl', 'son', 'sq',
                  'sr', 'sv-SE', 'ta', 'te', 'th', 'tr', 'uk', 'ur',
                  'uz', 'vi', 'xh', 'zh-CN', 'zh-TW', 'zu')
```

You need to add your locale to the list, making sure to:
* Respect the alphabetical order.
* Use one space after commas, no comma after the last element.
* Maximum 80 characters per line.
* Enclose the locale code in single quotes.

In Atom there’s a vertical line to display where the 80 characters limit is. If your line is too long, like in this case, you can use a trick to make sure the text fits within the maximum length. First add the new locale code in the correct position, don’t worry about the line length.

```PYTHON
PROD_LANGUAGES = ('ach', 'af', 'an', 'ar', 'as', 'ast', 'az', 'bg',
                  'bn-BD', 'bn-IN', 'br', 'bs', 'ca', 'cak', 'cs',
                  'cy', 'da', 'de', 'dsb', 'el', 'en-GB', 'en-US',
                  'en-ZA', 'eo', 'es-AR', 'es-CL', 'es-ES', 'es-MX', 'et',
                  'eu', 'fa', 'ff', 'fi', 'fr', 'fy-NL', 'ga-IE', 'gd',
                  'gl', 'gn', 'gu-IN', 'he', 'hi-IN', 'hr', 'hsb',
                  'hu', 'hy-AM', 'id', 'is', 'it', 'ja', 'ja-JP-mac',
                  'ka', 'kab', 'kk', 'km', 'kn', 'ko', 'lij', 'lt',
                  'ltg', 'lv', 'mai', 'mk', 'ml', 'mr', 'ms', 'my', 'nb-NO', 'ne-NP',
                  'nl', 'nn-NO', 'oc', 'or', 'pa-IN', 'pl', 'pt-BR', 'pt-PT',
                  'rm', 'ro', 'ru', 'si', 'sk', 'sl', 'son', 'sq',
                  'sr', 'sv-SE', 'ta', 'te', 'th', 'tr', 'uk', 'ur',
                  'uz', 'vi', 'xh', 'zh-CN', 'zh-TW', 'zu')
```

Add an empty line two lines above and below the line you need to fix (more if needed, i.e. all lines are at near the maximum length).

```PYTHON
PROD_LANGUAGES = ('ach', 'af', 'an', 'ar', 'as', 'ast', 'az', 'bg',
                  'bn-BD', 'bn-IN', 'br', 'bs', 'ca', 'cak', 'cs',
                  'cy', 'da', 'de', 'dsb', 'el', 'en-GB', 'en-US',
                  'en-ZA', 'eo', 'es-AR', 'es-CL', 'es-ES', 'es-MX', 'et',
                  'eu', 'fa', 'ff', 'fi', 'fr', 'fy-NL', 'ga-IE', 'gd',
                  'gl', 'gn', 'gu-IN', 'he', 'hi-IN', 'hr', 'hsb',
                  'hu', 'hy-AM', 'id', 'is', 'it', 'ja', 'ja-JP-mac',

                  'ka', 'kab', 'kk', 'km', 'kn', 'ko', 'lij', 'lt',
                  'ltg', 'lv', 'mai', 'mk', 'ml', 'mr', 'ms', 'my', 'nb-NO', 'ne-NP',
                  'nl', 'nn-NO', 'oc', 'or', 'pa-IN', 'pl', 'pt-BR', 'pt-PT',

                  'rm', 'ro', 'ru', 'si', 'sk', 'sl', 'son', 'sq',
                  'sr', 'sv-SE', 'ta', 'te', 'th', 'tr', 'uk', 'ur',
                  'uz', 'vi', 'xh', 'zh-CN', 'zh-TW', 'zu')
```

Position the cursor in the block including the line you need to fix, and select *Edit -> Reflow Selection*. With this command lines are reorganized to fit the 80 characters limit, and this will be the result:

```PYTHON
PROD_LANGUAGES = ('ach', 'af', 'an', 'ar', 'as', 'ast', 'az', 'bg',
                  'bn-BD', 'bn-IN', 'br', 'bs', 'ca', 'cak', 'cs',
                  'cy', 'da', 'de', 'dsb', 'el', 'en-GB', 'en-US',
                  'en-ZA', 'eo', 'es-AR', 'es-CL', 'es-ES', 'es-MX', 'et',
                  'eu', 'fa', 'ff', 'fi', 'fr', 'fy-NL', 'ga-IE', 'gd',
                  'gl', 'gn', 'gu-IN', 'he', 'hi-IN', 'hr', 'hsb',
                  'hu', 'hy-AM', 'id', 'is', 'it', 'ja', 'ja-JP-mac',

                  'ka', 'kab', 'kk', 'km', 'kn', 'ko', 'lij', 'lt', 'ltg', 'lv',
                  'mai', 'mk', 'ml', 'mr', 'ms', 'my', 'nb-NO', 'ne-NP', 'nl',
                  'nn-NO', 'oc', 'or', 'pa-IN', 'pl', 'pt-BR', 'pt-PT',

                  'rm', 'ro', 'ru', 'si', 'sk', 'sl', 'son', 'sq',
                  'sr', 'sv-SE', 'ta', 'te', 'th', 'tr', 'uk', 'ur',
                  'uz', 'vi', 'xh', 'zh-CN', 'zh-TW', 'zu')
```

You can then **remove the empty lines** and save the file. These empty lines are needed to avoid affecting more content than needed, in particular the first line. Withouth them you would end up with this:

```PYTHON
PROD_LANGUAGES = ('ach', 'af', 'an', 'ar', 'as', 'ast', 'az', 'bg', 'bn-BD',
'bn-IN', 'br', 'bs', 'ca', 'cak', 'cs', 'cy', 'da', 'de', 'dsb', 'el', 'en-GB',
'en-US', 'en-ZA', 'eo', 'es-AR', 'es-CL', 'es-ES', 'es-MX', 'et', 'eu', 'fa',
'ff', 'fi', 'fr', 'fy-NL', 'ga-IE', 'gd', 'gl', 'gn', 'gu-IN', 'he', 'hi-IN',
'hr', 'hsb', 'hu', 'hy-AM', 'id', 'is', 'it', 'ja', 'ja-JP-mac', 'ka', 'kab',
'kk', 'km', 'kn', 'ko', 'lij', 'lt', 'ltg', 'lv', 'mai', 'mk', 'ml', 'mr', 'ms',
'my', 'nb-NO', 'ne-NP', 'nl', 'nn-NO', 'oc', 'or', 'pa-IN', 'pl', 'pt-BR',
'pt-PT', 'rm', 'ro', 'ru', 'si', 'sk', 'sl', 'son', 'sq', 'sr', 'sv-SE', 'ta',
'te', 'th', 'tr', 'uk', 'ur', 'uz', 'vi', 'xh', 'zh-CN', 'zh-TW', 'zu')
```

Verify that there are no other changed files, and the diff looks good with `git diff`. Since you reorganized lines to fit the 80 characters limit, there will be more than one line changed.

```BASH
$ git status
On branch bug1338759
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   bedrock/settings/base.py

no changes added to commit (use "git add" and/or "git commit -a")
$ git diff
```

If you notice **trailing whitespaces** after a line, you need to remove them. First make sure that Atom is set to trim whitespaces:
* Open *Edit->Preferences*.
* Select the *Packages* tab and search for *whitespace*.
* Click on the package *whitespace* in *Core Packages*.
* Check *Remove Trailing Whitespace*. If it’s already selected, uncheck and check it again (this should fix configuration problems).

Then open and save your file again.

## Commit and open a pull request

You’re ready to commit your change. Remember to references your bug with "Fix", this will automatically close the bug when the change lands.

```BASH
$ git commit -a -m "Fix Bug 1338759 - Enable ne-NP on production for mozilla.org"
$ git push origin bug1338759
```

Then visit [Bedrock on GitHub](https://github.com/mozilla/bedrock) and use the *Compare & pull request* button. Don’t forget to double check the diff:
* Only one file should be included: `bedrock/settings/base.py`).
* No trailing whitespaces added.
* New locale should be there.
