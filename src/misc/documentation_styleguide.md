# Documentation style guide

## General rules

These are some of the general rules to follow when writing and reviewing documentation for this repository:
* Address the reader as **you**, avoid using **we**.
* Avoid using generic terms.
* Avoid unnecessary empty lines in the document.

## Typography

* Lists: each list item should start with an uppercase letter, and end with a period (only exception when the item ends with a URL). Use the `*` markdown notation for each item.
* Use lowercase after colons, only one space after a period.
* Use proper quotes, like `“example”`, instead of straight double quotes.
* Use typographical apostrophes `’` instead of straight single quotes `'` (code fragments are the only exception).
* Use backticks `, **bold**, or *italic* to highlight text in a sentence, not quotes.
* Use `*` instead of `_` for bold and italic.
* Try to use links instead of putting URLs directly in the text. For example, `visit [this page](https://example.com)` should be preferred to `visit https://example.com`.
* Leave an empty line before and after code fragments, specify the language where possible. For example:

<pre>
This is some text.

```PHP
$test = 'test';
```

This is some other text.
</pre>

## Titles

* Use the hash syntax, leave one space after the hash, e.g. `# This is a title`.
* Use sentence case, avoid title case.
* Documents should always start with a 1st level title. There should be **only one** 1st level title across the document.
* Leave an empty line before and after each title. The only exception is the 1st level title at the beginning of the page.
* Make sure to follow a logic when using titles, e.g. a 3rd level title should be in a section starting with a 2nd level title of its own.

This is an example of a good structure:

```
# This is the main title for this document

## This is a section

This is some text.

### This is a subsection

This is some text.

## This is another section

This is some more text.
```

## Line breaks

A line break in the Markdown file is not converted to an actual line break when the content is rendered in GitHub as preview, or converted to HTML. Take for example this text:

```
This is a line.
This is a second line
```

When rendered on GitHub, the text will appear as a single line, with the line break converted to a whitespace:

```
This is a line. This is a second line
```

There are several options to obtain an actual line break:

1. End the line with a backslash `\`:

```
This is a line.\
This is a second line
```

2. End the line with an HTML line break `<br>`:

```
This is a line.<br>
This is a second line
```

3. Leave at least two empty spaces at the end of the line. It’s worth noting that this can be problematic, as code editors are often set to remove trailing whitespaces (see also the [Tools section](#tools)):

```
This is a line.  
This is a second line
```

## Bullet and numbered items

The first level has no indentation, and it’s completely aligned to the left. Sub levels should be indented using 4 spaces. Use `*` instead of `-` to create items. Example:

```
* The first level bullet point
    * A second level bullet point
        * A third level bullet point
```

## Links

There are three kind of links when cross referencing a document: within a document, within a project group, and outside a project group. The `[displayed text]` should be to the point and within a pair of square brackets. The displayed text must be followed by `(the link)` enclosed in a pair of parenthesis. Follow these formats for each case:

* Reference within the same document: link directly to the anchor, e.g. `[General rules](#general-rules)`. Note that GitHub automatically creates anchors for titles: if the title is *Title Example*, the anchor will be lowercase, with spaces replaced by dashes, i.e. `#title-example`.
* Reference within a project group: use relative links, instead of absolute links (starting with `/`) or full GitHub URLs. For example, to link to a document in the parent folder, use `[other document](../other.md)`.
* Reference outside the current repository: use the full GitHub URL, e.g. `[OpenDesign GitHub repository](https://github.com/mozilla/OpenDesign/tree/master/2017)`.

It’s important to note that URLs are displayed as active links in GitHub previews, but they show as plain text when converted to HTML. To avoid this issue, always use an explicit link, e.g. `[https://example.com](https://example.com)`.

## Images

When adding images to a repository, make sure that the size is not too big for the content displayed on GitHub. In case of PNG files, make also sure to optimize files through online services like [TinyPNG](https://tinypng.com/).

* Naming convention: if only a couple of images are needed, make the file name easily identifiable, e.g.: product_feature_type.png.
* File name must not contain spaces and uppercase, and must use underscore to separate words as needed.
* Image size: keep it under 800px. If necessary, create two versions: a small one and a bigger one to open when clicked.
* Image format: `![Encoding bug](../assets/images/l10n_testing/encoding_bug.png)`.
* When images contain personal information, such as email addresses, try to blur it out.

## Tools

[Visual Studio Code](https://code.visualstudio.com/) is the best tool for editing Markdown files:
* You can preview the content with `⇧⌘V` or `Ctrl+Shift+V` (or right-click on the tab and select `Open Preview`). You can also use `⇧⌘P` or `Ctrl+Shift+P` to display the list of available commands, and search for `Markdown: Open Preview`.
* You can install a package called [Smart Quotes](https://marketplace.visualstudio.com/items?itemName=LukeParkinson.smart-quotes), which lets you swap straight quotes with curly ones. Once the package is installed, use `⇧⌘P` or `Ctrl+Shift+P` and search for `Convert smart quotes`. Make sure to not swap `"` or `’` in code fragments where these characters are wanted.

VS Code allows the user to [set different personal settings](https://code.visualstudio.com/docs/getstarted/settings): *User settings* (global personal settings) and *Workplace setting* (settings specific for a project that override user settings). These are some useful settings for working with Markdown files:
* Enable `Editor: Trim Auto Whitespace` to trim automatically trailing whitespaces.
* Enable `Files: Insert Final Newline` and `Files: Trim Final Newlines` to automatically have leave only one line at the end of files.

Here's an example of [workplace setting](https://github.com/mozilla/legal-docs/blob/main/.vscode/settings.json) in a repository to preserve trailing whitespaces, even when the user setting has `Editor: Trim Auto Whitespace` enabled. Opening the editor in the root of the repository, e.g. with `code .`, will load and enforce this override.

To install packages in VS Code, click on the *Extensions* icon in the left sidebar (or use `⇧⌘X` or `Ctrl+Shift+X`), search for the package you’re interested in, then click *Install*.

[markdownlint](https://github.com/DavidAnson/markdownlint), a Markdown linter, is run on automation for each pull request. If you want to use the customized Mozilla version of this tool on your system, make sure to install [Node.js](https://nodejs.org/en/), then run the following commands from the root of your repository (only once):

```BASH
$ git clone https://github.com/flodolo/l10ndocs-linter
$ npm --prefix ./l10ndocs-linter install ./l10ndocs-linter
```

At this point you can launch the linter with this command:

```BASH
$ node l10ndocs-linter/linter/markdownlint.js
Using config file: /your_path/documentation/l10ndocs-linter/linter/markdownlint.json
Searching path: /your_path/documentation

There are no linter errors.
```
