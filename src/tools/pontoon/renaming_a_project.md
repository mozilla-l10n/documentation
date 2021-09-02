# Renaming a project

You need to think carefully on the name when setting up a new project. Though rare, sometimes a project needs to be renamed because the product name has changed or for some other reasons. To rename it, it’s quite simple:

Go to the project Admin page, update the `Name` field and click the `SAVE PROJECT` button. That’s it! There is no interruption between Pontoon and the project repo. Do send a communication on the name change to the communities.

Word of caution: do NOT change the `Slug` field to make it match the revised project name. The reasons are:
* A slug is a unique ID to the project. It doesn’t have to match the project name 100%.
* Once a slug is claimed, a future project name can’t reuse it, so there is no chance of two projects sharing the same slug.
* Changing the slug could cause confusion to Pontoon users who bookmark the project. They will run into issue when launching the project through the bookmark. They will find the project in Pontoon eventually but this is an avoidable annoyance.

Also, it’s not advisable to create a new project for the purpose of changing the project name. Attributes of contributors’ information will be lost when migrating localized content from old project to the new.
