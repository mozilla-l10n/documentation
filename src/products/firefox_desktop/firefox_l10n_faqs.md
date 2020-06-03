# Firefox L10N FAQs

This document includes a series of frequently asked questions regarding Firefox and localization, mostly targeted at developers, but useful for product managers and engineering program managers as well.

<!-- toc -->

## General

### Who can I contact if I have more questions?

A Program Manager (L10N PM) is assigned to any Mozilla project that is localized through community. You can find this information in [Pontoon](https://pontoon.mozilla.org/projects/firefox/) for any project in the header section, and more information about the localization team is available in the Mana page dedicated to [Localization](https://mana.mozilla.org/wiki/pages/viewpage.action?pageId=66651657) (available to staff/NDA only).

## Development and release cycle

### How can I get my strings localized?

Strings need to be added to localization files in known locations within the mozilla-central tree. For all the technical details about these paths and the supported formats, see [this document](https://firefox-source-docs.mozilla.org/build/buildsystem/locales.html#exposing-strings).

Once strings land in mozilla-central, they will be exposed for localization in Pontoon within a few days.

### I landed strings in mozilla-central, when are they going to be localized?

New string changes are periodically exported from mozilla-central into a repository called `gecko-strings-quarantine`, a unified repository that includes strings for all shipping versions of Firefox (nightly, beta, release). This repository is used as a buffer to avoid exposing potential issues to all locales working on Firefox.

Typically once or twice a week, the content of the quarantine repository is pushed to the official repository, called `gecko-strings`, used by [Pontoon](https://pontoon.mozilla.org/projects/firefox/) as source reference. At this point, strings can be localized by community.

### Can I land content without exposing it for localization?

If your content is not stable, or you want to iterate quickly over it before exposing it for localization, it’s possible to land a string file outside of the known paths, and access it from the code.

For Fluent, you can follow examples like [this patch](https://hg.mozilla.org/mozilla-central/rev/e3bc9f1bde6e), where the FTL file is stored outside of the localizable paths, and loaded as “preview”.

### How do I communicate with localizers about my feature or patch?

If there is some specific information that you want to convey to localizers, like testing instructions or particular issues to look out for, get in touch with the [L10N PM for Firefox](#who-can-i-contact-if-i-have-more-questions). They will help you identify the best channel and way to relay this information.

### Can I uplift a patch to Beta or Release?

While Nightly is always open for new strings, Beta and Release are string frozen, meaning that patches with new strings are normally not allowed to land.

Uplifts need to be evaluated case by case, but in general they should be avoided in the context of a 4-weeks release cycle. Possible alternatives are uplifting ad-hoc patches without string changes, or exposing the feature/change only to English users.

One more thing to consider is the timing of the uplift. The second part of the Beta cycle is completely frozen, meaning that we can’t take any updates to localization and ship it in that version. Anything uplifted close to the deadline, or after, will ship untranslated. For more details about the Beta timeline for l10n, see the [Sign-offs document](../review/signoffs.md#timeline-and-deadlines).

### I need to add new strings for version X, do I still have time?

If version X is in Nightly, i.e. currently developed in mozilla-central, there is time to land until merge day, when the code moves from mozilla-central to mozilla-beta.

The sooner you land content in mozilla-central, the higher will be the chances that the content will be localized in several languages before reaching release.

### Where can I find guidelines for developers?

A document including plenty of best practices is [available on MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_content_best_practices), while specific information around Fluent is available [in this document](https://firefox-source-docs.mozilla.org/l10n/fluent/review.html). In case of doubts, reach out to the Firefox L10N PM or localization team for clarifications.

### Where can I find the localized strings?

All shipping versions of Firefox are built from a single Mercurial repository for each locale (`l10n-central`). Repositories are available [here](https://hg.mozilla.org/l10n-central/).

### How can I test a different locale?

The answer depends on the version you want to test:
* On Beta and Release, you can switch the UI language directly from Firefox settings. You can also download localized builds [from mozilla.org](http://www.mozilla.org/firefox/all).
* On Nightly and Developer Edition this feature is disabled, since language packs are not reliable. You can still manually install language packs for the version you’re using directly from FTP ([Nightly](http://ftp.mozilla.org/pub/firefox/nightly/latest-mozilla-central-l10n/linux-x86_64/xpi/), [DevEdition](http://archive.mozilla.org/pub/devedition/releases/77.0b2/win64/xpi/) changing the build in the URL), then enable the language switcher by setting `intl.multilingual.enabled` to `True` in about:config.
* If you’re building locally, you can try installing the latest language pack for Nightly (it might not work if you’re adding new strings), or [build directly in a different locale](https://firefox-source-docs.mozilla.org/build/buildsystem/locales.html#instructions-for-single-locale-repacks-for-developers).
* If you’re using Fluent, you can also test your feature using [pseudolocales](https://firefox-source-docs.mozilla.org/l10n/fluent/tutorial.html#pseudolocalization).

### Should I enable my feature only for English, or ship it in English for everyone?

Shipping a feature only for en-US is not great, since it creates confusion for users: features are described in SUMO articles or publicized in blog posts, but not available for more than 60% of Firefox user base.

Shipping a feature in English for everyone is not a good option either: as an English speaker, imagine starting your browser and finding a window in Chinese.

In the end, both options are a product decision, and the localization team can help assess the impact on users and community. How to ship a feature only to en-US users depends on several factors (technology, information available at the time the feature is loaded, etc.), and the best approach is to get in touch with the [engineering part of the Localization team](https://mana.mozilla.org/wiki/pages/viewpage.action?pageId=66651657) (aka “tech team”).

## Translation completion

### Is my feature going to be localized in language X before launch?

Each community will localize new content at different times: some locales will have a complete localization within hours, while others might take weeks or months. Our continuous localization infrastructure allows us to release Firefox with incomplete translations falling back on a backup locale in case of missing strings or errors.

Given that localization is managed by community volunteers, there is no SLA or guarantee that a product will be completely localized before launch. For more information, see [this page on Mana](https://mana.mozilla.org/wiki/pages/viewpage.action?pageId=66651657) (available to staff/NDA only).

### I see pending suggestions in Pontoon, how can I get them approved?

Standard users in Pontoon can only provide suggestions: these translations are visible in Pontoon, but don’t get committed to repositories or ship in products.

For each locale there are translators and managers that can review these suggestions, and eventually approve them. The timing depends on each locale’s workflow.

### How can I check if my feature is localized?

There’s no easy way to see this information in Pontoon. If all the strings are stored in a single file, only used for that feature, or you have a detailed list of all the strings used, it’s possible to extract this data manually. Get in touch with the [Firefox L10N PM](#who-can-i-contact-if-i-have-more-questions) for more information.

### How can I see all translations available for a specific string?

Pontoon doesn’t allow to see all translations for a specific string, but you can use Transvision for it:
* Search for the string (by ID or text), making sure that gecko-strings is selected as repository
* In the results, click on the green `all locales` tag close a string to see all available translations. Results are also available via API (linked at the bottom of the page).
