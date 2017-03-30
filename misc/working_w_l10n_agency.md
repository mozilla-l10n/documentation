# Working with a Localization Agency

This document is a guideline for project manager who interacts with a localization agency that is already vetted.

## Make it official

A series of activities need to happen before an l10n project can start. Unless there are changes in the document, this step is done once, and only at the beginning of relationship engagement.

* A signed master service agreement (or MSA) between Mozilla and the vendor. Person signed on Mozilla side could be the PM or PM’s manager. This document shows the conditions that the contract is opereated in between the service provider and Mozilla.  Without this agreement, a service can't start. Here is an example of [MSA](https://drive.google.com/a/mozilla.com/file/d/0B7u_NzvpgGcgSW5Jend3TlpyRlE/view?usp=sharing).    
* Account Payable (or AP) form that contains banking information, billing cycle (monthly, quarterly, or "as soon as") and payment due terms (within 30 or 45 days); billing email address. Here is an example of [AP form](https://drive.google.com/a/mozilla.com/file/d/0B7u_NzvpgGcgYmN6c0tJc2IwUzA/view?usp=sharing).
* The rate sheet can be updated annually.  An example of the official [rate sheet](https://drive.google.com/a/mozilla.com/file/d/0B7u_NzvpgGcgTDhoVFBsN3dMc0E/view?usp=sharing) that includes the following but not limited to:
** Word rate for each of the interested locales as in new words, 100% match, fuzzy match for translation, review, proofreading
** Hourly rate: engineering, QA and testing, PM rate.
** Minimum charge for a project and the thresholds by number of words per locale.
** Rush rate.

PO, or Purchase Order, may or may not be necessary in order to get vendor service. Some teams have ongoing need for l10n service and have a budget set aside annually. This is a good reason to have a PO established. For most projects that are one time need, or sporadic, it’s best to go without a PO, and bill to the serviced department as needed.

## Key contacts and responsibilities

* Account Manager: relationship, escalation of issues; complaints about quality or deadlines.
* Project Manager: handles day to day operation. Coordinates resources on the agency side; provides estimate of a project's deadline and cost.
* Account Payable Manager: sends the bill to Mozilla Account Payable.

## Set up accounts

Depending on the needs and where the source file can be accessed, it’s good to have an account set up in the following places:

* GitHub: usually for content heavy type of projects, such as legal document; can commit directly.
* Pontoon: as translator when there is no community; or the vendor provides suggestions pending community approval. PM sets permission level.
* Pootle: as translator when there is no community; or the vendor provides suggestions pending community approval. PM sets permission level.
* Bugzilla: to be notified when a new project is initiated in addtion to email. 
* Google drive: to view, review, and translate directly.

Additional account setup may be needed:
* If WordPress platform is used, usually a 3rd party is responsible for buidling the site. This is project specific. Signup is needed to access 3rd party system for translation, for QA and testing on staging server.   

Once accounts are set up, allow the agency to explore the tools, flows and the product features to familiarize itself before actual work starts. Setting up a meeting to share your screen might be a good idea, and use this opportunity to answer their questions about the project or the tools.

## Localizing a project

### Planning

Once outsourcing is a necessity for a project, before reaching out to the l10n agency to make an official request, make sure to check the following:

* Required languages.
* Scope of work: other than translation; review; testing.
* Milestones and Deadline: negotiate it so the agency has sufficient time to finish each of the required tasks, and the community has enough time to review and sign off.
* Check with communities to get their buy-ins on languages to outsource and tasks to divide among the involved parties.

#### Communications

* Get a quote from the agency.
* Make sure both agency and the community have the proper access to the l10n tool or platform where the localizable content is staged and roles properly assigned per agreement.
* Share with agency locale specific style guides and product specific term list. Always refer to [Transvision](https://transvision.mozfr.org/).
* Share the scope, the plan, and the expectations to both the agency and the community.
* Communicate the plan and the finalized schedule with the internal team/customer.
* Provide quote/estimate to the project requestor for approval.
* File a bug to track project progress.

### Executing

* File handoff through email communication, with link to repository.
* Confirm word count, schedule and cost of the service.
* Translation/localization per service details.
* Testing/QA of the delivered translation, either by the community or the vendor, depending on the project agreement.
* Delivery in the requested language(s), before deadline and in the quality defined.
* Communicate with communities for a chance to review and sign off on the project before releasing to the internal customer.

### Post mortem

After the project is delivered,

#### With agency

* Have the agency send an updated quote, in case there is change of scope in the project.
* PM reviews the quote and checks for discrepancies and then approves the quote.
* The agency’s account payable contact sends invoice to mozilla@bill.com and accounting@mozilla.com.
* In a few days, PM will be notified and asked to approve the invoice in bill.com system.
* PM reviews the bill one more time, update the Cost Center to the one corresponding the internal customer’s.

#### With community

* PM should check with community periodically to gather input on translation quality if needed but necessary every time. A necessary case could be that the community wants to replace the translator for their language.
* Gather feedback in a spreadsheet, with summary in category of the type of issues reported, and detailed examples to support the summary.
* Give an overall quality rating.
* Suggest to keep using the same translator(s) or if a replacement is needed.
* PM then shares the feedback with agency for rebuttal and further feedback if needed.

At the end of a calendar year, review the vendor working model and quality of paid service. Provide feedback and evaluate if the service should be continued. 
