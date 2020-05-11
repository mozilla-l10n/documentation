# Deactivating Pontoon users

Access Django’s admin interface at `https://pontoon.mozilla.org/a/` (note that this is not the usual admin interface), then click `Users`. In the next page search for the user you want to deactivate (safer to search by email address):

* Click on the user among the results displayed under the search field.
* In the *Permissions* section, deselect the `Active` checkbox and click `SAVE` at the bottom of the page.

This will prevent them from logging in in Pontoon, and disconnect them immediately from the system.

At the moment, it’s not possible to safely remove users with all the associated data, and removal needs to be performed manually by developers.
