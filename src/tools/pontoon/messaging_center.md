# Sending emails and notifications in Pontoon

Pontoon allows you to send emails and in-app notifications to contributors, with advanced filtering options.
To access the Messaging Center, click [Messaging](https://pontoon.mozilla.org/messaging/) in the page header when logged in as Administrator.

## Message type

Once in the Messaging Center, you will be able to choose your message type at the top of the page. You can choose to send it as a `Notification`, an `Email`, or both (by selecting both types).

By default, emails will only be sent to users who have opted in to `News and updates` in their settings. However, if the message is considered transactional (e.g. an email about a password reset) then the `Transactional` option can be selected and emails will also be sent to users who have not opted in to email communication.

Note: Notifications sent via Messaging Center are not included in Notification email digests.

## Message content

Next, enter your message using the Subject and Body fields. Links will be rendered as clickable when the message is sent. Markdown is supported for advanced formatting, such as creating links.

## Choosing recipients

You can send messages to a wide range of targeted groups by applying precise filters.

### Filter by user role

Select whether you’d like to send your message to Managers, Translators, Contributors, or all of them.

### Filter by locale

All locales are included by default and are listed under the “Chosen” column to the right. You can choose to remove a subset of locales by clicking on them one by one, so they get moved to the “Available” column to the left. You can also use the “MOVE ALL” options to move all locales from one column to the other.

### Filter by project

All projects are included by default and are listed under the “Chosen” column to the right. You can choose to remove a subset of projects by clicking on them one by one, so they get moved to the “Available” column to the left. You can also use the “MOVE ALL” options to move all projects from one column to the other.

### Filter by submitted translations

Filters users by the number of translations they have submitted, or when they submitted a translation.\
\
You can set a minimum threshold, maximum threshold, start of date range, and/or end of date range for submitted translations. Fields can be left empty (e.g. setting the minimum threshold to 5 and leaving maximum blank will set the filter to those with 5 or more translations).

### Filter by performed reviews

Filter users based on the number of reviews they have conducted, or when they conducted a review.\
\
You can set a minimum threshold, maximum threshold, start of date range, and/or end of date range for reviews conducted. Fields can be left empty (e.g. setting the minimum threshold to 5 and leaving maximum blank will set the filter to those with 5 or more reviews).

### Filter by last login

Filter contributors based on their last login activity.\
\
You can set the start of date range and/or end of date range. Fields can be left empty (e.g. setting just the `From` field will search for users who have logged in on the specified day or later.)

## Reviewing and sending messages

Click `REVIEW MESSAGE` at the bottom of the page to review your message content, recipients, and selected message type. You will have the option to either return to editing, send the message to yourself (to view the actual rendered notification or email), or send to recipients.

The `SEND TO * RECIPIENTS` button will display the number of users who will receive the message. Review contents of the page carefully and if everything looks okay, complete sending the messages by clicking the button.

A confirmation will appear at the top of the page once the messages have been sent out.
