# Working with Bedrock

This document covers a few tasks and tips regarding Bedrock.

## Running Bedrock

You can install Bedrock by following the instructions available in [this page](https://bedrock.readthedocs.io/en/latest/install.html).

If you’re using the virtual machine described in [this document](../../config/setup_l10ndrivers_vm.md), Bedrock is already installed in `~/mozilla/git/bedrock`.

Move into the main folder, activate the Virtual environment, and run the server

```BASH
$ cd ~/mozilla/git/bedrock/
$ source venv/bin/activate
$ ./manage.py runserver
```

In a different terminal window run

```BASH
$ gulp
```

At this point Bedrock will be available at http://localhost:8000

In the virtual machine the locale folder is a symbolic link to the mozilla.org trunk l10n repository.

Don’t forget to exit the virtual environment by running `deactivate` when you’re finished.

## Extracting strings from a template

The first part is to identify the template (or templates) you need to extract strings from. For example, assuming that you want to extract strings from `bedrock/mozorg/templates/mozorg/contribute/signup.html`, you would run from Bedrock’s main folder:

```BASH
$ cd ~/mozilla/git/bedrock/
$ source venv/bin/activate
(venv) $ ./manage.py l10n_extract bedrock/mozorg/templates/mozorg/contribute/signup.html
```

If the last command returns any error, try reinstalling the requirements with

```BASH
$ pip install -r requirements/test.txt
```

At this point a .lang file will be created inside `/locale/templates` with all the strings extracted. The name of the file depends on several factors: for example the template could include another template that specify a specific .lang file so, instead of having `locale/templates/mozorg/contribute/signup.lang`, you have `locale/templates/mozorg/contribute/index.lang`.

The suggestion is to always remove the `templates` folder before doing an extraction, to make sure you start from a clean situation.

Note that you can also use wildcards in the command, e.g. `./manage.py l10n_extract bedrock/mozorg/templates/mozorg/contribute/*.html`, but you should try to extract strings only from the template you need.

One final note: you only use this generated .lang file as a reference, you still need to add comments and reorder strings before exposing them for localization.

## Notes about templates and l10n

### Wrapping strings

```DJANGO
<span class="outline-button more">{{ _('Start using the Mozilla Stumbler app') }}</span>
```

Localizable strings are wrapped like `_('This')`. That means you can simply copy and paste the string `This` instead of performing a full extraction.

More complex strings can be wrapped in *trans* blocks, e.g.

```DJANGO
{% raw %}
<p class="license">
  {% trans url=url('foundation.licensing.website-content') %}
  Portions of this content are ©1998–{{ current_year }} by individual
  mozilla.org contributors. Content available under
  a <a href="{{ url }}">Creative Commons license</a>.
  {% endtrans %}
</p>
{% raw %}
```

### Shared .lang files

There are some [shared .lang files](https://github.com/mozilla/bedrock/blob/master/bedrock/settings/base.py#L199) that are available across all templates:
* main.lang
* download_button.lang

If a string is available in one of these files, it can be safely used by any of the other templates. This is useful, but these files should’t become bigger than necessary.

### Loading other .lang files

The `add_lang_files` directive is used in templates to specify a different .lang file, or include strings from another .lang file. Example above: normally a template called `bedrock/mozorg/templates/mozorg/contribute/signup.html` should generate a file called `mozorg/contribute/signup.lang`, but instead it generates a .lang file called `mozorg/contribute/index`. Why? Because the template has this directive:

```DJANGO
{% add_lang_files "mozorg/contribute/index" %}
```

This is particularly important to understand .lang file activation.

### Activating a template

A .lang file is active when it starts with the line `## ACTIVE ##`.
A file is activated by l10n-drivers when all strings inside this file are translated, and the page can be displayed in production. Example: https://www.mozilla.org/firefox/new uses `firefox/new.lang` for strings:
* https://www.mozilla.org/en-US/firefox/new will always work, since it’s en-US.
* https://www.mozilla.org/fr/firefox/new will work if `fr/firefox/new.lang` is activated. If it’s not, it will redirect to en-US (or any other active locale before en-US in the accept_languages header).
* https://www-dev.allizom.org/fr/firefox/new will always work, because files are always active on the dev server.

If you’re running Bedrock locally, you need to change `bedrock/settings/local.py` to modify the behaviour:
* `DEV = True` means that the server is set as DEV, and all locales will be enabled.
* `DEV = False` means that the server is set as PROD, and specific pages will work only if a locale has the file activated.

One important fact to keep in mind: if you add a new .lang file with the `add_lang_files` directive, the activation status will be inherited. Always double check with the production settings.

It’s possible to activate l10n files by using the [mark_active script](https://github.com/mozilla-l10n/langchecker/wiki/CLI-scripts-syntax#mark_active) available in Langchecker. It will activate only locales that are completely localized and don’t have any errors.

### L10n tags

Bedrock supports l10n tags through the `l10n_has_tag` function. For example:

```DJANGO
{% if l10n_has_tag('sync_device_note') %}
  {{ _('Learn more about bookmarks') }}
{% else %}
  {{ _('Learn more') }}
{% endif %}
```

l10n tags allow to add a new string in the template and to push it to production without waiting for localization to happen: if the l10n .lang file has this tag, the template will use the new string `Learn more about bookmarks`, otherwise if will fallback to the previous version `Learn more`.

The tag appears as `sync_device_note` in the code, but it will appear as `## sync_device_note ##` at the beginning of the .lang file. Using underscores is preferable to dashes for tag names.

It’s possible to add tags to l10n files by using the [add tags script](https://github.com/mozilla-l10n/langchecker/wiki/CLI-scripts-syntax#add_tags) available in Langchecker. It will add tags only if the file translated all strings associated to it.

All tags are enabled by default on a DEV server.

For more information about .lang files, for example how to bind a string to a tag, see [the wiki page](https://github.com/mozilla-l10n/langchecker/wiki/.lang-files-format).

### Try a patch locally

Let’s assume you want to test a pull request locally, for example to extract strings. The URL for this pull request is https://github.com/mozilla/bedrock/pull/4100. By adding `.patch` to the URL you get a patch for this PR: https://github.com/mozilla/bedrock/pull/4100.patch.

You can download this patch and apply it locally.

```BASH
$ cd ~/mozilla/git/bedrock/
$ source venv/bin/activate
(venv) $ wget https://github.com/mozilla/bedrock/pull/4101.patch
(venv) $ git apply 4101.patch
(venv) $ gulp
```

Remember that Bedrock on the VM-l10n uses a link to the actual trunk repository, so make sure to delete any test you make. The `templates` folder will be automatically ignored.

### Identifying l10n issues in a patch

The most common issue is that strings are not *wrapped*, so they’re not exposed by the extraction process or translated, even if the string is available in the .lang file. To identify them you need to run the patch locally with a modified .lang file, for example adding asterisks or other characters to the English string. There might be need for a tool to automatically create such a file.

How to read a patch and identify the string? One possible approach is to load the patch (add .patch to the PR URL) in a text editor, and use this regular expression to search for new/changed lines with wrapped strings: `^\+.*_\(.*\)`. The regular expression can be read as: search for a line starting with `+` and including a `_(…)` structure. Note that a change might be generated by a change in padding, so the block moves but the string is always the same.

Normally PRs are tagged as L10N to indicate that the PR has some impact on l10n (new strings), either by devs or l10n-drivers.
