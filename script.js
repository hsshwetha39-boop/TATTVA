/* =========================================================
   TATTVA CLEANING SERVICES
   WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE LOADED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const navigation =
        document.getElementById("navigation");


    if (menuButton && navigation) {


        menuButton.addEventListener(
            "click",
            function () {

                navigation.classList.toggle(
                    "active"
                );


                const isOpen =
                    navigation.classList.contains(
                        "active"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        /* Close menu after clicking a link */

        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navigation.classList.remove(
                            "active"
                        );


                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }



    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       WHATSAPP SERVICE FORM
    ====================================================== */

    const serviceForm =
        document.getElementById(
            "serviceForm"
        );


    if (serviceForm) {


        serviceForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("phone")
                        .value
                        .trim();


                const service =
                    document
                        .getElementById("service")
                        .value;


                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                /*
                    CHANGE THIS NUMBER
                    if your WhatsApp number
                    is different.
                */

                const whatsappNumber =
                    "919180577099";


                const whatsappMessage =

                    "Hello TATTVA Cleaning Services\n\n" +

                    "Name: " +
                    name +
                    "\n" +

                    "Phone: " +
                    phone +
                    "\n" +

                    "Service: " +
                    service +
                    "\n" +

                    "Message: " +

                    (
                        message ||
                        "I would like to know more about this service."
                    );


                const whatsappURL =

                    "https://wa.me/" +

                    whatsappNumber +

                    "?text=" +

                    encodeURIComponent(
                        whatsappMessage
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }



    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    const header =
        document.getElementById(
            "header"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (!header) {
                return;
            }


            if (window.scrollY > 20) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }
    );


});


/* =========================================================
   SMOOTH SCROLL, SCROLL ANIMATIONS, ACTIVE MENU, PROGRESS BAR
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const reduceMotion = false; /* animations are always on */
    const header = document.getElementById("header");


    /* ---------- 1. Reading progress bar ---------- */

    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    let ticking = false;

    function updateProgress() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        bar.style.transform = "scaleX(" + ratio + ")";
        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateProgress);
        }
    }, { passive: true });

    updateProgress();


    /* ---------- 2. Eased smooth scroll for in-page links ---------- */

    let scrollFrame = null;

    function cancelScroll() {
        if (scrollFrame) {
            window.cancelAnimationFrame(scrollFrame);
            scrollFrame = null;
            document.documentElement.style.scrollBehavior = "";
        }
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScrollTo(targetY) {
        cancelScroll();

        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = Math.min(1100, Math.max(600, Math.abs(distance) * 0.6));
        const startTime = performance.now();

        /* switch off CSS smooth-scroll while JS drives the animation */
        document.documentElement.style.scrollBehavior = "auto";

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            window.scrollTo(0, startY + distance * easeInOutCubic(progress));

            if (progress < 1) {
                scrollFrame = window.requestAnimationFrame(step);
            } else {
                scrollFrame = null;
                document.documentElement.style.scrollBehavior = "";
            }
        }

        scrollFrame = window.requestAnimationFrame(step);
    }

    /* let the visitor take over at any time */
    ["wheel", "touchstart", "keydown"].forEach(function (evt) {
        window.addEventListener(evt, cancelScroll, { passive: true });
    });

    if (!reduceMotion) {

        document.querySelectorAll('a[href^="#"]').forEach(function (link) {

            link.addEventListener("click", function (event) {

                const hash = link.getAttribute("href");

                if (!hash || hash === "#") {
                    return;
                }

                const target = document.querySelector(hash);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const offset = hash === "#home"
                    ? 0
                    : (header ? header.offsetHeight : 0) - 1;

                const y = target.getBoundingClientRect().top + window.scrollY - offset;

                smoothScrollTo(Math.max(0, y));

                if (window.history && history.pushState) {
                    history.pushState(null, "", hash);
                }

            });

        });

    }


    /* ---------- 3. Highlight the current section in the menu ---------- */

    const navLinks = document.querySelectorAll('.navigation a[href^="#"]');

    if (navLinks.length && "IntersectionObserver" in window) {

        const spy = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(function (link) {
                    link.classList.toggle(
                        "is-current",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });

            });

        }, { rootMargin: "-45% 0px -50% 0px" });

        document.querySelectorAll("main section[id]").forEach(function (section) {
            spy.observe(section);
        });

    }


    /* ---------- 4. Reveal sections as they scroll into view ---------- */

    if (reduceMotion || !("IntersectionObserver" in window)) {
        return;
    }

    const revealSelectors = [
        ".rating-item",
        ".svc-head",
        ".svc-card",
        ".about-section .section-heading",
        ".about-image",
        ".about-content",
        ".process-section .section-heading",
        ".process-item",
        ".register-copy",
        ".register-card",
        ".contact-section .section-heading",
        ".contact-card",
        ".contact-cta",
        ".footer-container > *"
    ];

    revealSelectors.forEach(function (selector) {

        document.querySelectorAll(selector).forEach(function (el, index) {
            el.classList.add("reveal");
            el.style.transitionDelay = (index % 6) * 90 + "ms";
        });

    });

    const revealer = new IntersectionObserver(function (entries, obs) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
                return;
            }

            const el = entry.target;

            el.classList.add("is-visible");
            obs.unobserve(el);

            /* once finished, hand control back to the element's normal hover styles */
            window.setTimeout(function () {
                el.classList.remove("reveal", "is-visible");
                el.style.transitionDelay = "";
            }, 1700);

        });

    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    document.querySelectorAll(".reveal").forEach(function (el) {
        revealer.observe(el);
    });

});



/* =========================================================
   COUNT-UP NUMBERS (ratings strip)
   Works with whatever numbers you type in the HTML, e.g.
   "5.0", "100+", "2K+", "96%".
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const numbers = document.querySelectorAll(".rating-item strong");

    if (!numbers.length || !("IntersectionObserver" in window)) {
        return;
    }

    function animate(el) {

        const original = el.textContent.trim();
        const match = original.match(/^([\d.]+)(.*)$/);

        if (!match) {
            return;
        }

        const target = parseFloat(match[1]);
        const suffix = match[2];
        const decimals = (match[1].split(".")[1] || "").length;
        const duration = 1600;
        const start = performance.now();

        function frame(now) {

            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);

            el.textContent = (target * eased).toFixed(decimals) + suffix;

            if (p < 1) {
                window.requestAnimationFrame(frame);
            } else {
                el.textContent = original;
            }

        }

        window.requestAnimationFrame(frame);

    }

    const io = new IntersectionObserver(function (entries, obs) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                animate(entry.target);
                obs.unobserve(entry.target);
            }

        });

    }, { threshold: 0.6 });

    numbers.forEach(function (el) {
        io.observe(el);
    });

});



/* =========================================================
   REGISTER NOW FORM
   Saves the details to your Google Sheet (and emails you).
   The visitor stays on the page and sees the thank-you message.
   Nothing here opens WhatsApp or goes to another page.

   >>> PASTE YOUR GOOGLE "WEB APP URL" BETWEEN THE QUOTES BELOW <<<
   Example:  "https://script.google.com/macros/s/AKfycb.../exec"
========================================================= */

const REGISTER_ENDPOINT = "";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    if (!form) {
        return;
    }

    const done = document.getElementById("registerDone");
    const failed = document.getElementById("registerError");
    const button = form.querySelector(".register-submit");
    const languageNames = { en: "English", kn: "Kannada", hi: "Hindi" };

    /* the date picker should not allow past days */
    const dateField = document.getElementById("regDate");

    if (dateField) {
        const now = new Date();
        const pad = function (n) { return String(n).padStart(2, "0"); };
        dateField.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
    }

    const value = function (id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
    };

    function setBusy(isBusy) {
        if (!button) { return; }
        button.disabled = isBusy;
        button.classList.toggle("is-loading", isBusy);
    }

    function show(box) {
        if (done) { done.hidden = true; }
        if (failed) { failed.hidden = true; }
        if (box) {
            box.hidden = false;
            box.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

    form.addEventListener("submit", function (event) {

        /* never let the browser leave the page */
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (!REGISTER_ENDPOINT) {
            /* the Google Sheet address has not been pasted in yet */
            console.warn("REGISTER_ENDPOINT is empty in script.js - registrations are not being saved.");
            show(failed);
            return;
        }

        const body = new URLSearchParams();
        body.set("name", value("regName"));
        body.set("phone", value("regPhone"));
        body.set("service", value("regService"));
        body.set("area", value("regArea"));
        body.set("date", value("regDate"));
        body.set("message", value("regMessage"));
        body.set("language", languageNames[document.documentElement.lang] || "English");
        body.set("website", form.elements["website"] ? form.elements["website"].value : "");

        const controller = new AbortController();
        const timer = window.setTimeout(function () { controller.abort(); }, 20000);

        setBusy(true);
        show(null);

        /* "no-cors": the browser sends it and we cannot read Google's reply, so a
           finished request is treated as success; a network failure shows the error box */
        fetch(REGISTER_ENDPOINT, { method: "POST", mode: "no-cors", body: body, signal: controller.signal })
            .then(function () {
                form.reset();
                show(done);
            })
            .catch(function () {
                show(failed);
            })
            .finally(function () {
                window.clearTimeout(timer);
                setBusy(false);
            });

    });

});