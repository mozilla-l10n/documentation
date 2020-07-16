# Deactivating Pontoon users

Access Django’s admin interface at `https://pontoon.mozilla.org/a/` (note that this is not the usual admin interface), then click `Users`. In the next page search for the user you want to deactivate (safer to search by email address):

* Click on the user among the results displayed under the search field.
* In the *Permissions* section, deselect the `Active` checkbox and click `SAVE` at the bottom of the page.

This will prevent them from logging into Pontoon, and will log them out of the system immediately.

It's possible to safely remove users with all the associated data. Refer to [Removing users](removing_users.md) for more details.
