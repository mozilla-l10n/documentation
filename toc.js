// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html">Introduction</a></li><li class="chapter-item expanded "><a href="products/android-l10n/index.html">Android-l10n</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="products/android-l10n/adding_projects.html">Adding projects</a></li><li class="chapter-item expanded "><a href="products/android-l10n/updating_locales.html">Updating locales</a></li><li class="chapter-item expanded "><a href="products/android-l10n/reviewing_strings.html">Reviewing new strings</a></li><li class="chapter-item expanded "><a href="products/android-l10n/removing_projects.html">Removing projects</a></li></ol></li><li class="chapter-item expanded "><a href="products/firefox_desktop/index.html">Firefox Desktop</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="products/firefox_desktop/adding_pontoon.html">Add to Pontoon</a></li><li class="chapter-item expanded "><a href="products/firefox_desktop/adding_nightly.html">Nightly builds</a></li><li class="chapter-item expanded "><a href="products/firefox_desktop/adding_release.html">Beta/Release builds</a></li><li class="chapter-item expanded "><a href="products/firefox_desktop/setup_searchplugins.html">Searchplugins</a></li><li class="chapter-item expanded "><a href="products/firefox_desktop/removing_locales.html">Removing locales</a></li><li class="chapter-item expanded "><a href="products/firefox_desktop/review.html">Review strings</a></li><li class="chapter-item expanded "><a href="products/firefox_desktop/fluent_migrations.html">Fluent migrations</a></li><li class="chapter-item expanded "><a href="products/firefox_desktop/build_system.html">Build system</a></li><li class="chapter-item expanded "><a href="products/firefox_desktop/firefox_l10n_faqs.html">L10N FAQs</a></li></ol></li><li class="chapter-item expanded "><a href="products/mozilla_org/index.html">Mozilla.org</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="products/mozilla_org/manage_review_mozilla_org.html">Manage and review content</a></li></ol></li><li class="chapter-item expanded "><a href="localization/index.html">Localization</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="localization/making_string_changes.html">Change existing strings</a></li><li class="chapter-item expanded "><a href="localization/dev_best_practices.html">Best practices for developers</a></li><li class="chapter-item expanded "><a href="localization/globalization_best_practices.html">Globalization best practices for product managers</a></li></ol></li><li class="chapter-item expanded "><a href="products/iOS_products/index.html">iOS Products</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="products/iOS_products/adding_projects.html">Adding projects</a></li><li class="chapter-item expanded "><a href="products/iOS_products/updating_locales.html">Updating locales</a></li><li class="chapter-item expanded "><a href="products/iOS_products/reviewing_strings.html">Reviewing new strings</a></li><li class="chapter-item expanded "><a href="products/iOS_products/screenshots.html">Providing localized screenshots</a></li></ol></li><li class="chapter-item expanded "><a href="products/other/index.html">Other Projects</a></li><li class="chapter-item expanded "><a href="products/mobile/index.html">Mobile</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="products/mobile/mobile_l10n_faqs.html">L10N FAQs</a></li></ol></li><li class="chapter-item expanded "><a href="tools/pontoon/index.html">Pontoon</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tools/pontoon/adding_new_project.html">New project</a></li><li class="chapter-item expanded "><a href="tools/pontoon/renaming_a_project.html">Renaming a project</a></li><li class="chapter-item expanded "><a href="tools/pontoon/adding_new_short_term_project.html">New short-term project</a></li><li class="chapter-item expanded "><a href="tools/pontoon/adding_new_locale.html">New locale</a></li><li class="chapter-item expanded "><a href="tools/pontoon/managing_pretranslation.html">Pretranslation</a></li><li class="chapter-item expanded "><a href="tools/pontoon/messaging_center.html">Messaging Center</a></li><li class="chapter-item expanded "><a href="tools/pontoon/renaming_a_file.html">Renaming a localization file</a></li><li class="chapter-item expanded "><a href="tools/pontoon/deactivating_users.html">Deactivating users</a></li><li class="chapter-item expanded "><a href="tools/pontoon/removing_users.html">Removing users</a></li><li class="chapter-item expanded "><a href="tools/pontoon/adding_new_terminology.html">New terminology</a></li></ol></li><li class="chapter-item expanded "><a href="misc/index.html">Other docs</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="misc/creating_new_repository.html">New l10n repository</a></li><li class="chapter-item expanded "><a href="misc/documentation_styleguide.html">Documentation styleguide</a></li><li class="chapter-item expanded "><a href="misc/stock_emails.html">Stock emails</a></li><li class="chapter-item expanded "><a href="misc/terminology_export.html">Exporting terminology</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
