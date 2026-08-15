/* Ahmad Droobi — site behaviour. No dependencies. */
(function () {
    "use strict";

    /* ---- Theme -------------------------------------------------------- */
    // The initial theme is applied by an inline script in <head> so the page
    // never flashes the wrong colours. Here we only handle toggling.

    var root = document.documentElement;

    function systemPrefersDark() {
        return window.matchMedia &&
               window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function currentTheme() {
        return root.getAttribute("data-theme") ||
               (systemPrefersDark() ? "dark" : "light");
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        try {
            localStorage.setItem("theme", theme);
        } catch (e) { /* private mode — fall back to session-only */ }

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute("content", theme === "dark" ? "#131619" : "#ffffff");
        }

        document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
            btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        });
    }

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            applyTheme(currentTheme() === "dark" ? "light" : "dark");
        });
    });

    // Follow the OS until the visitor makes an explicit choice.
    if (window.matchMedia) {
        var mq = window.matchMedia("(prefers-color-scheme: dark)");
        var onChange = function (e) {
            var stored = null;
            try { stored = localStorage.getItem("theme"); } catch (err) {}
            if (!stored) {
                root.setAttribute("data-theme", e.matches ? "dark" : "light");
            }
        };
        if (mq.addEventListener) { mq.addEventListener("change", onChange); }
        else if (mq.addListener) { mq.addListener(onChange); }
    }

    /* ---- Mobile navigation drawer ------------------------------------- */

    var body = document.body;
    var sidebar = document.getElementById("sidebar");
    var scrim = document.querySelector(".scrim");
    var toggles = document.querySelectorAll("[data-nav-toggle]");

    function setNav(open) {
        body.setAttribute("data-nav", open ? "open" : "closed");
        toggles.forEach(function (btn) {
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
        if (sidebar) { sidebar.setAttribute("aria-hidden", open ? "false" : "true"); }
    }

    function isOpen() {
        return body.getAttribute("data-nav") === "open";
    }

    // The drawer only exists below the layout breakpoint; above it the sidebar
    // is always visible and must never be marked hidden from assistive tech.
    var mobileMq = window.matchMedia ? window.matchMedia("(max-width: 62rem)") : null;

    function syncForViewport() {
        if (!mobileMq || !mobileMq.matches) {
            body.setAttribute("data-nav", "closed");
            if (sidebar) { sidebar.removeAttribute("aria-hidden"); }
            toggles.forEach(function (btn) {
                btn.setAttribute("aria-expanded", "false");
            });
        } else {
            setNav(isOpen());
        }
    }

    toggles.forEach(function (btn) {
        btn.addEventListener("click", function () { setNav(!isOpen()); });
    });

    if (scrim) {
        scrim.addEventListener("click", function () { setNav(false); });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isOpen()) {
            setNav(false);
            var btn = document.querySelector("[data-nav-toggle]");
            if (btn) { btn.focus(); }
        }
    });

    // Close the drawer after following an in-page link.
    if (sidebar) {
        sidebar.addEventListener("click", function (e) {
            var link = e.target.closest ? e.target.closest("a") : null;
            if (link && isOpen()) { setNav(false); }
        });
    }

    if (mobileMq) {
        if (mobileMq.addEventListener) {
            mobileMq.addEventListener("change", syncForViewport);
        } else if (mobileMq.addListener) {
            mobileMq.addListener(syncForViewport);
        }
    }
    syncForViewport();

    /* ---- Current page in nav ------------------------------------------ */
    // Pages ship with aria-current in the markup; this is a safety net for
    // directory-style URLs (e.g. "/" serving index.html).

    var path = window.location.pathname.replace(/\/$/, "/index.html");
    var file = path.substring(path.lastIndexOf("/") + 1) || "index.html";

    if (!document.querySelector('.nav a[aria-current="page"]')) {
        document.querySelectorAll(".nav a").forEach(function (link) {
            var href = link.getAttribute("href");
            if (href === file) { link.setAttribute("aria-current", "page"); }
        });
    }
})();
