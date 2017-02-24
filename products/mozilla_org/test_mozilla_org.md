# Testing Mozilla.org

Mozilla.org is highly visible because the site houses the basic info of all Mozilla produced products, conveys Mozilla’s mission, vision, and values it stands for. Additionally, it promotes initiatives and campaigns in time of these events. As a result, new pages are created. New content is added to existing pages. New layout is introduced. The localized versions reach 60% of the Mozilla users globally. It is very important that, not only the main pages are localized, they are thoroughly tested before they are launched on production.  

## Key Links
* Production: https://www.mozilla.org/{locale code}/
* Staging: https://www-dev.allizom.org/{locale code}/
* Repository:  https://github.com/mozilla-l10n/www.mozilla.org/
* Pontoon: https://pontoon.mozilla.org/projects/mozillaorg/
* Locamotion: https://mozilla.locamotion.org/projects/mozilla_lang/
* Web dashboard: https://l10n.mozilla-community.org/webdashboard/?locale={locale code}. Visit this page on a regular basis to check localization progress, pending work, deadline, and errors that were introduced during translation

We highly advise you to ask other community members to conduct peer review not only on Pontoon or Locamotion, but on staging. While not all the languages are required for certain projects, each community can opt in the projects at a later time.

## What to Test

### Pre-L10n Test
* Have your [glossary]((https://transvision.mozfr.org/) available as a reference, select mozilla.org as Repository, your language as your Target Locale
* For terminology consistency, reference the product or site that the page is for, assuming the product or site is localized  (e.g.: Firefox, Test Pilot)
* Have the matching US page up as reference, though some strings may not be identical due to A/B testing
* Have the project you just localized available for editing (Pontoon or Locamotion)

### Linguistic Testing
* Translation quality in context
* Grammatically correct in context
* Check for truncation: button text remains inside the button
* Header line break wraps at proper place
* Text not overlapping graphic
* Terminology is consistent with product, and between web pages
* Brand names remain in English
* Product names comply to Mozilla guideline and adhere to what the community has agreed to
* No corrupted characters
* Click on the links on the page, which should take you to the pages of the same language if they are localized, or they will be redirected to en-US if the pages are not.  
* Nav bar terms consistent with the page titles they are linked to (except when Nav bar term is shortened due to space limitation)
* Footer links don’t overlap with one another

You can make linguistic changes directly in [Pontoon](https://pontoon.mozilla.org/projects/mozillaorg/), [Locamotion](https://mozilla.locamotion.org/projects/mozilla_lang/) or [GitHub](https://github.com/mozilla-l10n/www.mozilla.org/).  

### Functionality Testing
* Click the download link, you should be able to download the product in your language, if it is localized, such as Firefox
* Font support and readability
* Footer: verify that the translation of the link is coherent and the link is functional
* Language list: Is your language listed as one of the options? Check https://www-dev.allizom.org/en-US/ to confirm
* Error page: Deliberately type a broken link, such as https://www.mozilla.org/firefox/neu/, check whether [404 page](https://www-dev.allizom.org/404/) is localized
* If your language is RTL, make sure that the page layout and text flow in the correct directions

### Compatibility Testing:
* Test the page layout in other major browsers and on other platforms
* Test the page layout on the leading locally developed browser if available
* Test the page layout on mobile devices of major platforms

## When Can I See the Localized Page on the Production Server? 

Updated translations are pushed to the production server almost daily.

When a brand new page is available for localization, it won't be enabled in production until it's fully localized. When existing pages receive updates with new strings, this new content won't be displayed on production until localized, to avoid displaying a mix of English and localized text.

In some cases pages receive major updates that require a complete rewrite of the template: if this happens, the old template is kept online only for a short period of time and, when removed, it will cause the URL to redirect users to the English version.

### Sync and Update Frequencies
* Pontoon syncs every 20 minutes to the repository
* Pootle is imported manually (at least daily); an automated solution and faster sync will be implemented soon
* Web Dashboard and the Dev server update every 15 minutes

If you work on Pontoon, it is safe to say that it will take less than an hour to see your changes reflected on the dashboard and the dev server.

When a project has a firm deadline to meet, we will communicate it through the [dev-l10n-web mailing list](https://lists.mozilla.org/listinfo/dev-l10n-web). Be sure to sign up so you receive important community wide information on web related projects.  
