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