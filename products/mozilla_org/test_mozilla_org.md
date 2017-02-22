# Testing Mozilla.org

Mozilla.org is highly visible because the site houses the basic info of all Mozilla produced products, conveys Mozilla’s mission, vision, and values it stands for. Additionally, it promotes initiatives and campaigns in time of these events. As a result, new pages are created. New content is added to existing pages. New layout is introduced. The localized versions reach 60% of the Mozilla users globally. It is very important that, not only the main pages are localized, they are thoroughly tested before they are launched on production.  

## Key Links
* Production: https://www.mozilla.org/(locale)/
* Staging: https://www-dev.allizom.org/(locale)/
* Repository:  https://github.com/mozilla-l10n/www.mozilla.org/
* Pontoon: https://pontoon.mozilla.org/projects/mozillaorg/
* Locamotion: https://mozilla.locamotion.org/projects/mozilla_lang/
* Web dashboard: https://l10n.mozilla-community.org/webdashboard/{local code}. Visit this page on a regular basis to check localization progress, pending work, deadline, and errors that were introduced during translation. 

We highly advise you to ask other community members to conduct peer review not only on Pontoon or Locamotion, but on staging. While not all the languages are required for certain projects, each community can opt in the projects at a later time.

## What to Test

### Pre-L10n Test
* Have your [glossary]((https://transvision.mozfr.org/) available as a reference, select mozilla.org as Repository, your language as your Target Locale
* Associate the page with a product or site if it is localized. (e.g.: Firefox, Test Pilot)
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
* Footer: verify that the translation of the link is coherent and the link is functional.
* Language list: Is your language listed as one of the options? Check https://www-dev.allizom.org/en-US/ to confirm.
* Deliberately type a wrong broken link, verify whether [404 page](https://www-dev.allizom.org/404/) is in the same language
* In RTL (right to left languages), both target language and English flows in the correct directions.  The mirroring effect is correct as defined by Mozilla UX team. Indentation and alignment are correct


### Testing for Fundraising Campaigns: 
The annual fundraise campaign is localized in many languages, but not all languages. 
* Date and time format is country specific
* Currency availability
* Postal/zip code in the proper format
* Mailing address format appropriate for the country
* Payment system available for the targeted country
* Country list in your language and order

### Compatibility Testing:
* Test the page layout in other major browsers and on other platform
* Test the page layout on the leading home grown browser if available
* Test the page layout on mobile devices of major platforms

## When Can I See the Localized Page on the Production Server? 

Code push to the production server is made almost daily.  When a brand new page is being localized, the page won't go live until it is fully localized for the very first time. Once a page is on the production server, an ongoing maintenance is required, as updates take place on a irregular basis. New strings added to existing pages are visible in the production server only when localized, unless they're in a shared file.  If localized content is not kept up, either the page is completely out of date over time with old designs and message, or the site contains mixture of English and target language, we may have to disable it if the latter is the case. Check the team [web dashboard](https://l10n.mozilla-community.org/webdashboard/) for updates.  

### Sync Frequencies and Updates
* Pontoon syncs every 20 minutes to the repository
* Pootle is imported manually (at least daily); an automated solution and faster sync will be implemented soon.
* Web Dashboard and the Dev server update every 15 minutes

If you work on Pontoon, it is safe to say that it will take less than an hour to see your changes reflected on the dashboard and the dev server.

When a project has a firm deadline to meet, we will communicate it through the [dev-l10n-web mailing list](https://lists.mozilla.org/listinfo/dev-l10n-web). Be sure to sign up so you receive important community wide information on web related projects.  
