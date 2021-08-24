# Localization best practices for developers

This document provides best practices for developers to create localizable code, and describes how to avoid some localizability (l12y) common mistakes.

**Note**: If you're a localizer and you want to contribute to the localization of Mozilla products, you might want to read our [Localization quick start guide](/en-US/docs/Mozilla/Localization/Quick_start_guide) for information on localizing Mozilla code.

## Note on localizers

Mozilla localizers are volunteers with very diverse technical skills: some of them rely exclusively on translation tools, others prefer to work directly with text editors and don't have problems working with version control systems (VCS).

It's important to consider this when adding strings, and especially localization comments for strings that contain references, or obscure technical details.

## Localization files

### Choose good key IDs

The IDs (names) chosen for your keys, regardless of the file format, should always be descriptive of the string, and its role in the interface (button label, title, etc.). Think of them as long variable names. When you have to change a key ID, adding a progressive number to the existing key should always be used as a last resort. For example, suppose this string needs to be changed from "Event" to "Add New Event":

```
new-event-header = Event
```

`add-new-event-header` is definitely a better choice for the new string than `new-event-header1`.

If a string is tied to an accesskey or a tooltip, use string IDs that highlight this relation:

```
neweventbtn.label = Add event
neweventbtn.accesskey = A
neweventbtn.tooltip = Add a new event
```

### Don't duplicate IDs

If you're adding new strings, check that you're not duplicating an existing ID. Depending on the parser logic, one of these two translations will be ignored.

### Add localization notes

Localizers usually work on the localizable files without the context of the source files including the localized strings; it is important to add comments to the localizable files themselves, too. These comments are generally referred to as localization notes.

Don't forget to add a localization note when:

* Part of the string is not supposed to be localized (for example, the name of an HTML attribute in a warning).
* String includes variables: always explain what will be the value of these variables at run-time.
* English could be ambiguous. For example: `bookmark`. Is this a noun or a verb? Using meaningful IDs could also help in these cases.
* Strings are used in a specific context. For example accessibility (a11y) strings: in this case space is less important than clarity, since these strings are not displayed in the UI but used by tools like screen readers.

There is an established format for localization comments: it's important to follow the format as closely as possible, since there are a number of automated tools that parse these comments for easier access and use by localizers.

#### DTD files

```
<!-- LOCALIZATION NOTE (entity name): {{privacy}} will be replaced at run-time by an
     active link. the string 'privacy-link' will be used as text for this link. -->
```

#### Properties files

```
# LOCALIZATION NOTE(privacy-text): {{privacy}} will be replaced at run-time by an
# active link. the string 'privacy-link' will be used as text for this link.
privacy-text = By proceeding you accept the {{privacy}}.
privacy-link = Privacy Terms
```

File-wide comments should use the same format, they should be at the top of the file (after the license header) and just drop the _(entity name/key)_ reference.

### Land good quality strings

* Don't land temporary strings. If you already know that your strings are temporary, they shouldn't be exposed to the localization process. This would waste everybody's time and create unnecessary frustration: localizers have to translate strings that are destined to change, developers will need to [use new IDs](#Changing_existing_strings) later to update them.
* If you're reviewing a patch, check also strings for grammar errors, capitalization or inconsistencies. For example, use the single Unicode …, and not three dots. If you have any doubts about the quality of strings, ask a copywriter to do a copy review of this text. Ideally, all strings landing in code should originate from approved UX wireframes, any copy review should be part of the initial stage of creating these wireframes.

#### Use Unicode characters over their ASCII counterparts when possible

Strings should use directional quotation marks when possible.

* U+2018 and U+2019 (\u2018 and \u2019 in JavaScript) are the left and right single quotation marks, respectively. The right single quotation mark should be used as an apostrophe.
* U+201C and U+201D (\u201c and \u201d in JavaScript) are the left and right double quotation marks, respectively. The pair should be used to surround statements and references to user input.
    * Example: You have chosen a keyword that is currently in use by “%S”. Please select another.
    * Example: Search %1$S for “%2$S”

Non-directional single, and double, quotation marks should be used in reference to HTML code, or other languages where ASCII character usage is required, such as HTML. _HTML does not prefer one over the other, and our codebase uses them interchangeably as of March 2016._

* Example: This web page at <span id='malware_sitename'/> has been reported as an attack page and has been blocked based on your security preferences.

U+2026 (\u2026) is the horizontal ellipsis character. This character should be used in place of three consecutive periods.

## Create localizable strings

### Don't assume grammar structures

You need to consider the need for different grammar structures in different locales, and add switching mechanisms to present them appropriately. You shouldn't make assumptions as to what those structures will be: instead, let locales/localizers decide. When in doubt, ask the localizers.

#### Date and time formats

For example, you shouldn't hard code date formats into applications:

```
%A, %b %e
// resulting in Wednesday, May 20
```

This is fine in English, but in Italian results in "Mercoledì, Mag 20", which sounds unnatural. Every time you use this kind of structure, you should have a localizable string behind it, and let localizers decide the best order for their language.

#### Units

Another example is localizing percentages or units. Some locales use a space between the number and the % symbol, some don't, some use a non-breaking space.

#### Splitting

Splitting sentences into several keys often inadvertently presumes a grammar, a sentence structure, and such composite strings are often very difficult to translate. When a composite string is needed, try to give the translators "room to move".

#### Word Order

If a string will contain a placeholder, always add the placeholder to the string to allow the localizer to change the word order if necessary. For example, it might seem ok in English to present the strings `[username] says:` to localizers simply as `says:` but this will cause serious issues in many other languages as the agent of an action often will not come in front of the verb, but some other position. For example in Irish/Gaelic the correct order is `be [username] at saying:`. If a placeholder is present, this can be correctly localized as `Tá %s ag rádh:` but not without.

Similarly, if the UI string is `Flash Version`, do not simply present the translator with `Version` for translation. Present the whole string or, if there is a significant need for a placeholder, use a placeholder. the word Version may have to go before or after `Flash` and one or both may need to be inflected.

#### Idiom

Idiom, in a loose sense, also has an impact on localization if it leads to strings being prepared in a way that renders them unlocalizable. For example, in English all the following begin with the same clause: `The URL of this feed is invalid; The URL of this feed cannot be reached; The URL of this feed cannot be parsed`. It might be tempting to 'save time' by presenting this as `The URL of this feed %s` and then `is invalid; cannot be reached` and `cannot be parsed`. However, linguistically these are different types of sentences and will be handled differently in other languages. This is usually not a case of translator choice but obligatory in the language. For example, in Gaelic these sentences must be translated as `Tha URL an inbhir seo mì-dhligheach;Cha ruig sinn URL an inbhir seo` and `Cha ghabh URL an inbhir seo a pharsadh`.

Unless there are significant savings of translation volume involved, it is usually easier and quicker for translators to handle these as fixed strings rather than composed strings, especially considering the time needed for locating, checking and potentially fixing composed strings.

#### Case and inflections

(Also see section on Placeholders)

Many languages have features like noun classes (i.e. nouns belonging to different categories and are treated differently by the grammar), case and inflections (changes are made to a word to indicate differences in meaning or use) and so on. In modern English, such features are rare and are mainly restricted to plural `-s` and verb forms (e.g. `go > went` is a form of inflection). Examples from other languages:

* Gender in German: nouns can be either masculine, feminine or neuter. The most obvious impact is that the definite article which in English is always `the` can either be `der, die` or `das`. To complicate matters, if the grammatical context changes, the article will change: `<span style="background-color: #add8e6;">Der</span> Text` 'the text' changes to `Wollen Sie <span style="background-color: #add8e6;">den</span> Text speichern?` 'Do you want to save the text?'
* Suffixes in Basque: where English tends to use expressions such as 'to the' or 'from the', Basque adds an ending to a word to express the same concept. For example `<span style="background-color: #add8e6;">From the</span> menu` in Basque is `Menu<span style="background-color: #add8e6;">tik</span>` and `<span style="background-color: #add8e6;">To the</span>` `printers` is `Inprimagailu<span style="background-color: #add8e6;">ei</span>`.

**Implication:** Using placeholders for something like 'the text' or 'the file' works well in English but is likely to cause severe headaches for localizers if the placeholders cannot be inflected.

### Use proper plural forms

Firefox supports proper [plural forms](https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals). As a native English speaker, you might find it natural to use

```
delete-cookie = Delete cookie
delete-cookies = Delete cookies
```

In Firefox this should be

```
# LOCALIZATION NOTE (delete-cookies): Semi-colon list of plural forms.
# See: http://developer.mozilla.org/en/docs/Localization_and_Plurals
# #1 is the number of cookies to delete
# example:
delete-cookies = Delete #1 cookie;Delete #1 cookies
```

**Important:** always include the localization note with this format if you use a plural form in Firefox. This comment is used by tools to identify strings with plural forms.

One last advice: never use plural form as a replacement for single/multiple conditional. See [bug 658191](https://bugzilla.mozilla.org/show_bug.cgi?id=658191) for more details.

### Use ordered variables in string with multiple variables

Consider this string from /browser:

```
generalSiteIdentity=This website is owned by %S\nThis has been verified by %S
```

First thing: always add a localization comment explaining what these variables mean, even if it seems obvious. Using multiple `%S` give the impression that the order of variables if fixed, which is actually not.

```
# LOCALIZATION NOTE(generalSiteIdentity): %1$S is the owner of the current website,
# %2$S is the name of the Certification Authority signing the certificate.
generalSiteIdentity=This website is owned by %1$S\nThis has been verified by %2$S
```

### Avoid concatenations, use placeholders instead

Consider this string:

```
tos-text = By proceeding you accept the
tos-link = Terms of Services
```

Most developers would consider this a good solution and display the concatenation of `tos-text+tos-link`, with an active link on the second part. Unfortunately, this won't work at all: you need at least a third string to place after the link, without that some languages won't be able to create a natural sounding sentence.

A much more flexible solution would be:

```
# LOCALIZATION NOTE(tos-text): {{link}} will be replaced at run-time
# by an active link. String with ID 'tos-link' will be used as text
# for this link.
tos-text = By proceeding you accept the {{link}}
tos-link = Terms of Services
```

And then replace `{{link}}` at run-time with the second string. Note also the localization comments and make sure it is clear to the localizer which placeholder string will appear in lieu of the placeholder as this may affect translation and/or inflection. For example, `By proceeding you accept the {{Terms of Service}}` will result in the Gaelic translation `Ma leanas tu air adhart, bidh tu a' gabhail ri {{teirmichean na seirbheise}}`. But in another grammatical context, `{{Terms of Service}}` may require a different inflection, for example `{{<span style="background-color: #add8e6;">th</span>eirmichean na seirbheise}}`. So if the localizer is left unsure as to which string goes into which placeholder, this may lead to bad translations.

### Don't reuse strings in different contexts

This is particularly important for mobile, where different context often means different font and available space for the string. For example, if you're adding a new menu item in Settings on Android, don't use the same string for the menu item and the following screen header.

Another example, some locales use nouns for titles, and verbs for actions (for example button labels). Sometimes they coincide with English, but they rarely do in other languages. Take `Bookmark`: it can be both a noun and a verb in English. A developer could be tempted to reuse the same string "Bookmark" in the button to add a bookmark, and in the header for the next dialog. This won't work in some languages.

### Avoid unnecessary complexity in strings

Consider this string:

```
privacy-link = <p>By proceeding you accept the <a href="https://www.mozilla.org/privacy" class="external">Privacy Terms</a>.</p>
```

In this case, you shouldn't put the URL inside the localization string, unless you need it to be localizable. If you change the URL, you're going to need a new string ID; the same goes for the anchor's attributes, or the paragraph markup. Instead, you should use the following strings

```
# LOCALIZATION NOTE(privacy-text): {{link}} will be replaced at run-time
# by an active link. String with ID 'privacy-link' will be used as text
# for this link.
privacy-text = By proceeding you accept the {{link}}.
privacy-link = Privacy Terms
```

And then replace ``{`{link}}` at run-time with the link.

### Don't hardcode characters

Typically white spaces, commas, or other separators (":", "|").

If you need a trailing white space in a string, use the Unicode character \u0020 (that's usually a bad sign, you're concatenating it to another string). At some point, someone will accidentally trim that whitespace.

### Remove unused strings

If you're removing features, don't leave around unused strings in the .properties file.

### Tooltips

If a string is used as a tooltip, it should not end in a period (in English). Tooltips are never written in imperative mood but infinitive mood instead. Hence the proper absence of periods to indicate this isn't just a matter of consistency for en-US, as it is also vital info for localizers.

### Menu and control labels

The labels on controls and menu titles, menu option strings, and so forth should not end in periods (in English). These are generally not complete sentences, but instead, phrases that convey the idea of a concept or action. Therefore, for both correctness and consistency within en-US, please leave out the trailing periods for these items. This also helps with localization.

### Developer tools key shortcuts

When translating Firefox strings from /devtools/ folder, you may see some keys like this:

```
<span class="difflineplus" id="l8.16">inspector.searchHTML.key=CmdOrCtrl+F</span>
```

The first part of the string `_CmdOrCtrl_` should not be translated. You may only translate the letter to better match your locale. This key shortcut definition matches the [Electron key shortcut definition](https://github.com/electron/electron/blob/master/docs/api/accelerator.md).

## Create localizable UI

### CSS issues

Some CSS text/font properties may cause problems with text legibility when applied to certain language texts.

* Avoid using Italic for CJKT. This acronym stands for: Chinese (Simplified and Traditional), Japanese, Korean, and Taiwanese.
* The [`text-transform`](/en-US/docs/Web/CSS/text-transform) property is not reliable for some locales; for example, `text-transform: uppercase` won't work properly with languages such as Irish/Gaelic. For example, `App Size` in English may be capitalized via `text-transform: uppercase` to `APP SIZE` but in Gaelic this would change `Meud na h-aplacaid` to `MEUD NA H-APLACAID` which violates the locales orthographic rules, as it ought to be `MEUD NA hAPLACAID`. In general, localizers should make the decision about capitalization. If you want to display `WARNING`, add a string with that capitalization, and explain it in the localization note.

### Design for +50%

Bear in mind that English strings will likely be a lot shorter than their international equivalents, so you need to leave some space in your UI to allow for this. Some examples:

* `OK` in English becomes `Ceart ma-thà` in Gaelic.
* `Save document?` in English becomes `A bheil thu airson an sgrìobhainn a shàbhaladh` in Gaelic.

Another good example is Yes/No. There are two types of languages, those that have Yes/No as a single word, and those that don't and work on mirroring the verb. For example, a `Do you want to open the page?` > `Yes/No` dialog works in English, but in Gaelic/Irish/Welsh and several other languages the equivalent answer is `Want/Not want`.

W3C has a good [guide](http://www.w3.org/International/articles/article-text-size) on the length ratios a developer should be prepared for.

## Test localizability

As a developer, you should always test your patches not just for code errors, but also for localizability issues in case they involve string or UI changes.

### Gecko and mozilla-central

First, make sure that there are no hard-coded strings, and all strings are available in localization files (.dtd, .properties). One possible way to test a patch for localizability issues is to alter the en-US localization files, adding extraneous characters to the original strings: this can help to identify both hard-coded strings and "flexibility issues" in the UI.

## Changing existing strings

### Updating Entity Names

If you are changing a string such that its meaning has changed, you must update the entity or property name for the string to match the new meaning. If your changes are relevant only for English — for example, to correct a typographical error or to make letter case consistent — then there is generally no need to update the entity name.

Changing the string ID will invalidate the existing translation, the new string will be reported as missing in all tools, and localizers will have to retranslate it. Given the diversity of tools used by localization teams, this is the only reliable method to ensure that localizers update existing localizations.

If you change the entity or property name of a string, you must also update all instances where that entity or property name is used in the source code, including localization comments.

If you change the entity or property name of a string, and the string has an accompanying access key, command key, or tooltip, you should update their names as well for consistency. This change is fundamental for access keys, since many localization tools use the entity name to connect an access key to its label. For example, to check if it's using a character not available in the original string, given entities "useBookmark.label" and "useBookmark.accesskey", if you change to "chooseBookmark.label" due to a string change, change the access key entity to "chooseBookmark.accesskey" to match it.

### String freeze

Some repositories are considered to be _string-frozen_. This means that string changes are not allowed to land, and each case must be evaluated before landing. As a general rule, it's recommended to fix strings on the trunk/master repository, and create ad-hoc patches for string frozen repositories that don't involve string changes. Note that even removing strings is considered a breakage.

In the case of Firefox and Thunderbird, string frozen repositories are: mozilla-aurora, mozilla-beta, mozilla-release.

## Bugzilla and l10n

### Do I need l10n feedback?

Feedback from [l10n-drivers](https://wiki.mozilla.org/L10n:Mozilla_Team) is not necessary for each landing involving strings, as long as you're following the basic rules described in this document. If you have doubts about the localizability of some text or structure (not about the text itself, that would need copywriters), it's definitely good to ask feedback.

### Keywords: l12y, late-l10n

Two keywords are generally used on Bugzilla:

* l12y: it's used to track "localizability" bugs. A bug marked with l12y describes an issue that prevents localizers to create a good quality localization. Some examples: hard-coded strings, implicit grammar structure in the code, lack of plural forms support, UI that breaks with long strings, etc.
* late-l10n: it's used by release-drivers to identify bugs, involving new strings, that will land late in the cycle, typically after soft string freeze in Firefox OS.

### Alias :l10n

The :l10n alias on Bugzilla (community@localization.bugs) is followed by some localizers and it could be CC'd to gather opinions from the wider l10n community (no point in opening NEEDINFO or requiring actions from this alias). There is also a [dev-l10n mailing list](https://lists.mozilla.org/listinfo/dev-l10n) and a [l10n-community chat room](https://chat.mozilla.org/#/room/#l10n-community:mozilla.org) on [Matrix](https://wiki.mozilla.org/Matrix); they might be a good place to ask questions.
