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
   OUR WORK VIEWER (all photos + videos, with next / previous)
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const grid = document.querySelector(".work-grid");

    if (!grid) {
        return;
    }

    const viewer = document.createElement("div");
    viewer.className = "work-viewer";
    viewer.setAttribute("role", "dialog");
    viewer.setAttribute("aria-modal", "true");
    viewer.innerHTML =
        '<button type="button" class="work-viewer-close" aria-label="Close">&times;</button>' +
        '<button type="button" class="work-viewer-nav work-prev" aria-label="Previous">&#10094;</button>' +
        '<div class="work-viewer-body"></div>' +
        '<button type="button" class="work-viewer-nav work-next" aria-label="Next">&#10095;</button>' +
        '<div class="work-viewer-count"></div>';
    document.body.appendChild(viewer);

    const body = viewer.querySelector(".work-viewer-body");
    const count = viewer.querySelector(".work-viewer-count");

    let items = [];
    let index = 0;

    function show(i) {

        index = (i + items.length) % items.length;

        const item = items[index];
        const src = item.getAttribute("data-src");

        if (item.getAttribute("data-type") === "video") {
            body.innerHTML =
                '<video src="' + src + '" controls autoplay playsinline></video>';
        } else {
            body.innerHTML = '<img src="' + src + '" alt="">';
        }

        count.textContent = (index + 1) + " / " + items.length;
    }

    function closeViewer() {
        viewer.classList.remove("open");
        body.innerHTML = "";
    }

    grid.addEventListener("click", function (event) {

        const item = event.target.closest(".work-item");

        if (!item) {
            return;
        }

        /* every photo and video currently in the grid */
        items = Array.prototype.slice.call(
            grid.querySelectorAll(".work-item")
        );

        viewer.classList.add("open");
        show(items.indexOf(item));
    });

    viewer.addEventListener("click", function (event) {

        if (event.target === viewer ||
            event.target.classList.contains("work-viewer-close")) {
            closeViewer();
        }

        if (event.target.classList.contains("work-prev")) {
            show(index - 1);
        }

        if (event.target.classList.contains("work-next")) {
            show(index + 1);
        }
    });

    document.addEventListener("keydown", function (event) {

        if (!viewer.classList.contains("open")) {
            return;
        }

        if (event.key === "Escape") {
            closeViewer();
        } else if (event.key === "ArrowLeft") {
            show(index - 1);
        } else if (event.key === "ArrowRight") {
            show(index + 1);
        }
    });

    /* swipe left / right on phones */
    let startX = 0;

    viewer.addEventListener("touchstart", function (event) {
        startX = event.changedTouches[0].clientX;
    }, { passive: true });

    viewer.addEventListener("touchend", function (event) {

        const diff = event.changedTouches[0].clientX - startX;

        if (Math.abs(diff) > 50) {
            show(diff > 0 ? index - 1 : index + 1);
        }
    }, { passive: true });

});