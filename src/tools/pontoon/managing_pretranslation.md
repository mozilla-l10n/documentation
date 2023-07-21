# Managing Pretranslation

## Opt-in guidelines to enable new locales

It’s important to note that **these are not strict criteria**: members of staff will evaluate each request to opt in individually, based on their knowledge of the project and direct experience with the locale.

**Criteria for enabling pretranslation for a new locale**
* Request needs to come from translators or managers active within the last month (translating or reviewing).
* There is an active manager for the locale (last activity within 2 months).

**Criteria for enabling pretranslation for a new project**
* Less than 400 missing strings, except for projects or locales where existing pretranslation statistics provide high-confidence.
* Average review time for pretranslations in existing projects is faster than 3 weeks.

**Criteria for disabling the feature for a locale or a project**
* Approval rate drops below 40%.
* Average review time for pretranslations is slower than 6 weeks.

Note that disabling a project would always involve a conversation with reviewers for the locale.

## Enabling pretranslation in a project

Access Pontoon’s [admin console](https://pontoon.mozilla.org/admin/), and select the project: at the bottom of the page there is a section dedicated to *Pretranslation*.

**IMPORTANT**: if this is the first project for a locale, the first step is to [train and set up the custom engine model](#train-and-set-up-a-custom-engine-model) in Google AutoML Translation.

Use the checkbox `PRETRANSLATION ENABLED` to enable the feature for the project, then move the requested locales from the `Available` list to `Chosen`. Clicking the `PRETRANSLATE` button will pretranslate immediately all missing strings in enabled locales, otherwise pretranslation will run automatically as soon as new strings are added to the project.

## Train and set up a custom engine model

(TBD)
