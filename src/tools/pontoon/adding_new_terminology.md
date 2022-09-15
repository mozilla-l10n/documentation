# Adding new terminology on Pontoon

To add new terminology to Pontoon access Django’s admin interface at `https://pontoon.mozilla.org/a/` (note that this is not the usual admin interface), then follow the steps below.

## Add the new term

Find and click `Terms` on the navigation pane on the left. Check on the following page to make sure a term does not already exist by searching in the search field near the top.

To add a new term, click `Add Term +`. The following page will have the following fields:

* Text: Term you wish to register.
* Entity: *Ignore*
* Part of speech: Select the part of speech that applies to your term. In some cases the same string can be registered twice with different parts of speech,e.g. bookmark as a noun (“open your bookmarks”) or as a verb (“bookmark this website”).
* Definition: Definition of the meaning of the term, or explanatio of what the term is.
* Usage: Example usage of the term.
* Notes: Any other notes or context that could be pertinent to localizers.
* Case sensitive: Flag if the term should only match when case matches.
* Exact match: Flag if the term should only match on an exact match. (Unflagged allows fuzzy matching.)
* Do not translate: Flag if the term should not be translated (example brand names like Firefox).
* Forbidden: Flag if this term is forbidden from usage.
* Created by: *Ignore*

Once the necessary information has been filled out click one of the three save options `Save and add another`, `Save and continue editing`, or `SAVE` to register the term to Pontoon.

This term will automatically populate in the terminology projects for all locales for translation, and will also appear in the `TERMS` pane of the translation UI when it appears in a string.
