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

**IMPORTANT**: if this is the first project for a locale, the first step is to [train and set up the custom machine translation model](#train-and-set-up-a-custom-machine-translation-model) in Google AutoML Translation.

Use the checkbox `PRETRANSLATION ENABLED` to enable the feature for the project, then move the requested locales from the `Available` list to `Chosen`. Clicking the `PRETRANSLATE` button will pretranslate immediately all missing strings in enabled locales, otherwise pretranslation will run automatically as soon as new strings are added to the project.

## Train and set up a custom machine translation model

To improve performance of the machine translation engine powering the pretranslation feature, custom machine translation models are trained for each locale using Pontoon’s translation memory. That results in better translation quality than what’s provided by the generic machine translation engine.

To create a custom translation model, first go to the [team page](https://mozilla-l10n.github.io/localizer-documentation/tools/pontoon/teams_projects.html#team-page) of the locale you are creating custom translation model for and download its [translation memory file](https://mozilla-l10n.github.io/localizer-documentation/tools/pontoon/translate.html#downloading-and-uploading-translations).

Next, go to the [Google Cloud console](https://console.cloud.google.com/translation/datasets?project=moz-fx-pontoon-prod) and follow the [official instructions](https://cloud.google.com/translate/automl/docs/create-machine-translation-model) for creating a translation dataset from the uploaded translation memory file and training an AutoML translation model.

When choosing the name for the dataset, follow the pattern used by existing datasets - `dataset_LOCALE_YYYY_MM_DD`. When choosing the Cloud Storage path where the uploaded files are to be stored, pick `pontoon-prod-model-data-c1107144`.

Note that creating the model takes a few hours. When the model is created, store its name (usally starting with `NM`, followed by a series of integers) under *Google automl model* in the [Django’s admin interface](https://pontoon.mozilla.org/a/) of the locale.

From that point on, Machiney will start using the custom machine translation model instead of the generic one and you’ll be set to enable pretranslation for the locale.
