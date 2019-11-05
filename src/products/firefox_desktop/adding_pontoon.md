# Adding a new locale to Pontoon

Before addind a new locale to Pontoon, the `hg` repository needs to be already set up. For brand new locales:

* Create a new public Mercurial repository in the [mozilla-l10n](https://bitbucket.org/mozilla-l10n/) organization on BitBucket.
* Push at least one change to the repository, otherwise Pontoon will not pick it up during sync. The safest change it to initialize the `toolkit/chrome/global/intl.properties` file with the correct values ([example](https://bitbucket.org/mozilla-l10n/ppl/commits/b3fd0faf59b0b45b2cf30c01d85157beee2a0bd0 )).

Once the repository is available and contains at least one commit, the locale can be added to the Firefox project in Pontoon.
