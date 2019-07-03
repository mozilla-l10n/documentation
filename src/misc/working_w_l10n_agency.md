# Working with a Localization Agency

This document is a guideline for project manager who interacts with a localization agency that already successfully went through our [vetting process](https://docs.google.com/document/d/1Y0xfGo-24ZJI_uYFLtJFcuxCi20FNIqaeEc7v_FlaY4/edit). Our vetting process helps us ensure the vendors we work with are able to deliver translations in a timely manner, with the required level of quality and following our localization processes. We are also assessing their flexibility to work efficiently with our communities and our tools when it’s required.

## Initial set up before sending localization requests

### Ask for a rate sheet

* Make sure you have received a rate sheet customized for Mozilla needs. This should have been sent as part of the vetting process, and it can be updated annually. An example of the official [rate sheet](https://drive.google.com/a/mozilla.com/file/d/0B7u_NzvpgGcgTDhoVFBsN3dMc0E/view?usp=sharing) that includes the following but not limited to:
  * Word rate for each of the interested locales as in new words, 100% match, fuzzy match for translation, review, proofreading.
  * Hourly rate: engineering, QA and testing, PM rate.
  * Minimum charge for a project and the thresholds by number of words per locale.
  * Rush rate, and its threshold.

### Do the initial paperwork

A series of activities need to happen before an l10n project can start. The first step is doing the paperwork to be able to receive quotes for projects and pay bills for requests.

Unless there are changes in the signed document, this step is done once, for the whole organization, and only at the beginning of relationship engagement.

* A master service agreement (or MSA) has to be signed between Mozilla and the vendor. The person signing on Mozilla side could be the PM or PM’s manager. This document shows the conditions that the contract is operated in between the service provider and Mozilla. Without this agreement, a service can’t start. Here is an example of [MSA](https://drive.google.com/a/mozilla.com/file/d/0B7u_NzvpgGcgSW5Jend3TlpyRlE/view?usp=sharing). Note that two separate MSA must be signed, one for Mozilla Corporation and another one for Mozilla Foundation.
* An Account Payable (or AP) form has to be filled. It contains banking information, billing cycle (monthly, quarterly, or “as soon as”) and payment due terms (within 30 or 45 days), billing email address. Here is an example of [AP form](https://drive.google.com/a/mozilla.com/file/d/0B7u_NzvpgGcgYmN6c0tJc2IwUzA/view?usp=sharing).

PO, or Purchase Order, may or may not be necessary in order to get vendor service. Some teams have ongoing need for l10n service and have a budget set aside annually. This is a good reason to have a PO established. For most projects that are one time need, or sporadic, it’s best to go without a PO, and bill to the serviced department as needed.

### Set up accounts

Depending on the needs and where the source file can be accessed, it’s good to have an account set up for the vendor’s project manager in the following places:

* Pontoon: set up a “translator” account when there is no community; or a basic “contributor” account when a community exists so that the vendor provides suggestions and the community can review them.
* Bugzilla: so that the vendor’s project manager can interact in bugs. Bugzilla will allow us to have a central place to post project details and updates. Communication is generally handled via email with the vendor, but it’s useful to have a bug number to reference to, and the vendor can use the bug to quickly access all the details.
* Google Drive: create a shared folder for the vendor to view, review, and translate directly spreadsheets or Google Docs.
* GitHub: give commit permission if they need to commit directly in a repository (e.g. [Legal docs](https://github.com/mozilla/legal-docs/)).

Note: additional account setup may be needed if the project does not support our localization process (e.g. WordPress).

Once accounts are set up, allow the agency to explore the tools, flows and the product features to familiarize itself before actual work starts. Make sure to provide links to documentation as needed on how to use Pontoon and explain how to perform queries on Transvision. Setting up a meeting to share your screen might be a good idea, and use this opportunity to answer their questions about the project or the tools.

## Localizing a project

### Planning the request

Once outsourcing is a necessity for a project, before reaching out to the l10n agency to make an official request, make sure to check the following:

* Required locales.
* Scope of work: is the request asking for anything other than translation, review and testing?
* Milestones and Deadlines: negotiate it so the agency has sufficient time to finish each of the required tasks, and the community has enough time to review and sign off.
* Check with communities if they want to fully handle the request, handle only some parts (e.g. initial translation or QA), or can’t work on it at all and let the agency do the work.

### Quotation

Now that you have all the initial info you need, you are good to go ahead and reach out to the vendor and provide what they need to generate a quote. Get a quote from the agency by communicating volume, locales, deadline, level of service needed, and type of content.

### Setting everything up for the request

Now that you got a quote, you need to get it approved, send content to the vendor, and check permission.

* Provide a quote/estimate to the project requestor for approval.
* For all the target locales, make sure both agency and the community have the proper access to the l10n tool or platform where the localizable content is staged and roles properly assigned per agreement.
* Information to share with both the vendor and the community:
  * Scope: volume, type of content being localized, list of locales and type of service.
  * Plan: schedule with milestones.
  * Expectations: how you want the translations to be delivered (as a single batch or as each locale is ready), the file format you want the translations to be delivered into, and any additional service you would need, like following a specific test plan.
* Communicate the plan and the finalized schedule with the project stakeholders.
* File a bug to track project progress. It can be a good idea to remind project specifics (repositories, deadline(s), locales…).

### Executing the request

The initial quote has been approved, roles and permission are set accordingly to the request. You can now execute it, receive translations and deliver them to the project stakeholders.

* Share the content with the agency:
  * Strings (whether it’s text files, a link to Pontoon, a link to a repository, a spreadsheet, a Google Doc…).
  * Locale specific style guides and product specific term list.
  * Terminology: Ask them to always refer to [Transvision](https://transvision.mozfr.org/) to check terminology.
* Confirm with the vendor the following: word count, schedule and cost of the service.
* Run testing/QA once you’ve received the translations, either by the community or the vendor, depending on the project agreement.
* Communicate with communities for a chance to review and sign off on the project before releasing to the internal customer.

### Post mortem

After the project is delivered, you need to handle payment with the vendor and feedback with the community.
At the end of a calendar year, you would review the vendor working model and quality of paid service. You then provide feedback and evaluate if the service should be continued.

#### Steps to go through with the agency

* Have the agency send an updated quote, in case there is a change of scope in the project.
* PM reviews the quote and checks for discrepancies and then approves the quote.
* The agency’s account payable contact sends invoice to mozilla@bill.com and accounting@mozilla.com.
* In a few days, PM will be notified and asked to approve the invoice in bill.com system.
* PM reviews the bill one more time, updates the Cost Center to the one corresponding the internal customer’s.

#### Steps to go through with the community

* PM should check with community periodically to gather input on translation quality if needed but it’s not necessary to do it every time. A necessary case could be if the community wants to replace the translator for their language because there are quality concerns.
* Gather feedback in a spreadsheet, with summary in category of the type of issues reported, and detailed examples to support the summary.
* Mozilla localizers give an overall quality rating and suggest to keep using the same translator(s) or ask for a replacement. The PM then shares the feedback with the agency for rebuttal and further feedback if needed.

## Terminology

<dl>
  <dt>Account Manager</dt>
  <dd>Relationship, escalation of issues; handles complaints about quality or deadlines.</dd>

  <dt>Project Manager</dt>
  <dd>Handles day-to-day operations. Coordinates resources on the agency side; provides estimate of a project’s deadline and cost.</dd>

  <dt>Account Payable Manager</dt>
  <dd>Sends the bill to Mozilla Account Payable.</dd>
</dl>
