# Adding a new locale to Pontoon

* If the locale is not [available](https://pontoon.mozilla.org/teams/) in Pontoon yet, [consult this document](../../tools/pontoon/adding_new_locale.md) for instructions on how to add it.
* File a bug to create a new Mercurial repository in [l10n-central](https://hg.mozilla.org/l10n-central/) using [this bug template](https://mzl.la/3VxIZgs) (replace `%LOCALE_CODE%` with the actual locale code).
* Push at least one change to the repository, otherwise Pontoon will not pick it up during sync. The safest change is to initialize the `toolkit/chrome/global/intl.properties` file with the correct values ([example](https://hg.mozilla.org/l10n-central/ppl/rev/b3fd0faf59b0b45b2cf30c01d85157beee2a0bd0)).

Once the repository is available and contains at least one commit, the locale can be added to the Firefox project in Pontoon.
