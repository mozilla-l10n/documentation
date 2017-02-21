# Testing Mozilla.org

Mozilla.org is highly visible because the site houses the basic info of all Mozilla produced products, conveys Mozilla’s mission, vision and values it stands for. Additionally, it promotes initiatives and campaigns in time of these events. As a result, new pages are created. New content is added to existing pages. New layout is introduced. The localized versions reach 60% of the Mozilla users globally. It is very important that, not only the main pages are localized, they are thoroughly tested before they are launched on production.  

## Key Links
* Production: https://www.mozilla.org/(locale)/
* Staging: https://www-dev.allizom.org/(locale)/
* Repository:  https://github.com/mozilla-l10n/www.mozilla.org/{local code}/{project name}/{sub pages}
* Pontoon: https://pontoon.mozilla.org/(local code)/mozillaorg/{project name}/{sub pages}
* Locamotion: https://mozilla.locamotion.org/{locale code}/mozilla_lang/{project name}/{sub pages}
* Web dashboard: https://l10n.mozilla-community.org/webdashboard/{local code}. Visit this page on a regular basis to check localization progress, pending work, deadline, and errors that were introduced during translation. 

We highly advise you to ask other community members to conduct peer review not only on Pontoon or Locamotion, but on staging While not all the languages are required for certain projects, each community can opt in the projects at a later time.

## What to test:

### Pre-l10n test
* Have your [glossary]((https://transvision.mozfr.org/) available as a reference, select mozilla.org as Repository, your language as your Target Locale.
* Associate the page with a product or site if it is localized. (e.g.: Firefox, Test Pilot).
* Have the matching US page up as reference, though some strings may not be identical due to A/B testing
* Have the project you just localized available for editing (Pontoon or Locamotion)

## Linguistic Testing
* Translation quality in context
* Grammatically correct in context
* Check for truncation: button text remains inside the button
* Header line break wraps at proper place
* Text not overlapping graphic
* Terminology is consistency with product, and between web pages
* Brand names remain in English
* Product names comply to Mozilla guideline and adhere to what the community has agreed to
* No corrupted characters
* Click on the links on the page, which should take you to the pages of the same language if they are localized?
* Nav bar terms consistent with the page titles they are linked to 
* Footer links don’t overlap with one another

You can make linguistic changes directly in Pontoon, Locamotion or github.  

## Functionality Testing
* Click the download link, you should be able to download the product in your language, if it is localized, such as Firefox.
* Font support and readability
* Footer: links point to pages of in the same language if those pages, sites or documents are localized
* Language list: your language is listed as one of the option
* Deliberately type a wrong broken link, verify whether 404 page is in the same language.
* Sorting order of languages in dropdown list
* In RTL (right to left languages), both target language and English flows in the correct directions.  The mirroring effect is correct as defined by Mozilla UX team.  Indentation and alignment are correct.


## Testing for Fundraising Campaigns: 
The annual fundraise campaign is localized in many languages, but not all languages. 
* Date and time format is country specific
* Currency availability
* Postal/zip code in the proper format
* Mailing address format appropriate for the country
* Payment system available for the targeted country
* Country list in your language and order

## Compatibility testing:
* Test the page layout in other major browsers and on other platform
* Test the page layout on the leading home grown browser if available.
* Test the page layout on mobile devices of major platforms

## When Can I See the Localized Page on Production? 

Code push to production is made almost daily.  When a brand new page is being localized, the page won't go live until it is fully localized for the very first time. Once a page is on the production, an ongoing maintenance is required, as updates take place on a irregular basis. When it is updated with minor change, especially when a new string is associated with a tag, the page will be updated when the tagged string is localized.  Sometimes a tagged string has a firm deadline.  If the new tagged string is not localized by certain date, the new string will be pushed to production regardless.  If localized content is not kept up, either the page is completely out of date over time with old designs and message, or the site contains mixed of English and target language. We may have to disable it if the latter is the case. Check the team [Webpage dashboard](https://l10n.mozilla-community.org/webdashboard/) for updates.  

When a project has a firm deadline to meet, we will communicate it through the [dev-l10n-web mailing list](https://lists.mozilla.org/listinfo/dev-l10n-web). Be sure to sign up so you receive important community wide information on web related projects.  
