# Testing Mozilla.org

Mozilla.org is highly visible because the site houses the basic info of all Mozilla products, conveys Mozilla’s mission, vision, and values it stands for. Additionally, it promotes initiatives and campaigns in time of these events. The localized versions reach 60% of the Mozilla users globally. It is very important that, not only the main pages are localized, they are thoroughly tested before they are launched on production.

## Key Links
* Production: https://www.mozilla.org/{locale_code}/
* Staging: https://www-dev.allizom.org/{locale_code}/
* Repository: https://github.com/mozilla-l10n/www.mozilla.org/
* Pontoon: https://pontoon.mozilla.org/projects/mozillaorg/
* Locamotion: https://mozilla.locamotion.org/projects/mozilla_lang/
* Web dashboard: https://l10n.mozilla-community.org/webdashboard/?locale={locale_code}. Visit this page on a regular basis to check localization progress, pending work, deadline, and errors that were introduced during translation

It’s highly advised you to ask other community members to conduct peer review not only on Pontoon or Locamotion, but on staging. While not all the languages are required for certain projects, each community can opt in the projects at a later time.

## What to Test

### Pre-L10n Test
* Have your [glossary]((https://transvision.mozfr.org/) available as a reference, select mozilla.org as Repository, your language as your Target Locale
* For terminology consistency, reference the product or site that the page is for, assuming the product or site is localized (e.g.: Firefox, Test Pilot)
* Have the matching US page up as reference, though some strings may not be identical due to A/B testing
* Have the project you just localized available for editing (Pontoon or Locamotion)

### Linguistic Testing
* Translation quality in context
* Grammar correctness in context
* Truncation: button text should remain inside the button
* Header line break wraps at proper place
* Text not overlapping graphic
* Terminology consistent with product, and among web pages
* Brand names remain in English
* Product names comply to Mozilla guideline and adhere to what the community has agreed to
* No corrupted characters
* Click on the links on the page, which should take you to the pages of the same language if they are localized, or they will be redirected to en-US if the pages are not.
* Nav bar terms consistent with the page titles they are linked to (except when Nav bar term is shortened due to space limitation)
* Footer links don’t overlap with one another

You can make linguistic changes directly in [Pontoon](https://pontoon.mozilla.org/projects/mozillaorg/), [Locamotion](https://mozilla.locamotion.org/projects/mozilla_lang/), or [GitHub](https://github.com/mozilla-l10n/www.mozilla.org/).

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

When a brand new page is available for localization, it won’t be enabled in production until it’s fully localized. When existing pages receive updates with new strings, this new content won’t be displayed on production until localized, to avoid displaying a mix of English and localized text.

In some cases pages receive major updates that require a complete rewrite of the template: if this happens, the old template is kept online only for a short period of time and, when removed, it will cause the URL to redirect users to the English version.

### Sync and Update Frequencies
* Pontoon syncs every 20 minutes to the repository
* Pootle is imported manually (at least daily); an automated solution and faster sync will be implemented soon
* Web Dashboard and the Dev server update every 15 minutes

If you work on Pontoon, it is safe to say that it will take less than an hour to see your changes reflected on the dashboard and the dev server.

When a project has a firm deadline to meet, it will be communicated through the [dev-l10n-web mailing list](https://lists.mozilla.org/listinfo/dev-l10n-web). Be sure to sign up so you receive important community wide information on web related projects.

## Testing Dynamic Pages
This section focuses on instructions for testing pages with dynamically generated content. Each page or topic is different in terms of steps or flow. These instructions could change overtime to reflect product design updates. Linguistic testing is the main focus. The instrutions below are detailed steps to get to the localized content so it can be reviewed in context.

### [firefox/desktop/tips.lang](https://www.mozilla.org/firefox/desktop/tips/)   
* Click on the **next** or **back** link to check out the tips on different features
* Highlighted text is the same as in English
* Text fits inside the box

### [firefox/new/horizon.lang](https://www.mozilla.org/en-US/firefox/new/)
* Once page is loaded, click on the link called **Download Firefox for another platform**
* For alternative message, change URL to [Scene2](https://www.mozilla.org/en-US/firefox/new/?scene=2)
* To fully review the Firefox download page messages, tests must go through following scenarios:
.. * Desktop: Windows, macOS, Linux
.. * Mobile: Android and iOS
.. * Updating from older version of Firefox to the latest vs. downloading for the first time

### [firefox/sendto.lang](https://www-dev.allizom.org/styleguide/docs/send-to-device/)
* Enter a mobile phone number, a new page will be generated, suggesting the next action to take
* Enter a phone number in the wrong phone number format. This will prompt an error message

### [firefox/sync.lang](https://www.mozilla.org/en-US/firefox/sync/) 

### firefox/tracking-protection-tour.lang
* Start a new browser by clicking on the Firefox icon, select New Private Window on the menu list
* Once the window is launched, click on **See how it works** button
* You are taken [step one](https://www.mozilla.org/en-US/firefox/51.0.1/tracking-protection/start/?step=1)
* Click the **Next** button, it takes you steps [two](https://www.mozilla.org/en-US/firefox/51.0.1/tracking-protection/start/?step=2) and [three](https://www.mozilla.org/en-US/firefox/51.0.1/tracking-protection/start/?step=3)
* In step [three](https://www.mozilla.org/en-US/firefox/51.0.1/tracking-protection/start/?step=3), an extra text box appears 
* Click on **Disable protection for this session** button to generate a new "step three" message  
* Click on **Enable protection** button to toggle between "enable" and "disable" protection messages
* Click on **Got it!** button to get to the next page
* Click on **Restart tour** button to go through the above steps  

### [mozorg/about/history.lang](https://www.mozilla.org/about/history/)
* The slides should automatically scroll to the next in about 10 seconds or so 
* If it doesn't or it stops, click the next or previous arrows to go to the next slide
* Be sure to cycle to through until you see the first slide to ensure you have covered all the slides
* Text fits inside the box
 
### [mozorg/about/manifesto.lang](https://www.mozilla.org/en-US/about/manifesto/)
You can check out the manifestos without going to the slide mode. However, only in the slide mode, all the localized content can be reviewed.
* Click on the first manifesto
* Click on the “next” and the “previous” arrows to move from one slide to the next
* Check on text layout, alignment and wrapping. Box size should be adjustable to fit all the content

### [mozorg/contribute/signup.lang](https://www.mozilla.org/contribute/signup/)
There are different ways to access the signup dialog box above the footer area.  This is from the Contribute page.  
* Click on any of the six icons or the links below each of them, you will be prompt to the Sign Up section
* Leave the name field empty, click on the **Sign Up Now** button. A text bubble will appear
* Fill out the name field, leave the checkbox unchecked, click on the **Sign Up Now** button. A text bubble will appear
* Fill out all the fields and check the box, click on the **Sign Up Now** button. A confirmation message appears on the page
