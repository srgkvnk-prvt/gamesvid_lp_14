function boxclose() {
    var c = document.getElementById("realisedby");
    c.parentNode.removeChild(c);
}

function scrollto(element) {
    document.getElementById(element).scrollIntoView();
    return false;
}

/* Navigator */

function back(a, b) {
    if (a == "step-1") {
        setTimeout(function() {
            $("#step-2").hide();

            document.getElementById(a).style.display = "block";

            $(".progress-bar").animate({
                    width: "25%",
                },
                300
            );

            document.getElementById("form-text").style.display = "block";

            $(".vanish-1").animate({
                    opacity: "1",
                },
                300
            );
        }, 0);

    }

    if (a == "step-2") {
        setTimeout(function() {
            $("#step-3").hide();

            document.getElementById(a).style.display = "block";
            document.getElementById(a).style.opacity = "0";

            $(".progress-bar").animate({
                    width: "50%",
                },
                300
            );

            $(".vanish-2").animate({
                    opacity: "1",
                },
                300
            );
        }, 0);

    }

    if (a == "step-3") {


        setTimeout(function() {
            $("#step-4").hide();

            document.getElementById(a).style.display = "block";
            document.getElementById(a).style.opacity = "0";

            $(".progress-bar").animate({
                    width: "75%",
                },
                300
            );

            $(".vanish-3").animate({
                    opacity: "1",
                },
                300
            );
        }, 0);

    }

    if (a == "step-4") {


        setTimeout(function() {

            document.getElementById(a).style.display = "block";
            document.getElementById(a).style.opacity = "0";

            $(".progress-bar").animate({
                    width: "100%",
                },
                300
            );

            $(".vanish-3").animate({
                    opacity: "1",
                },
                300
            );
        }, 0);

    }
}

function next(a, b) {

    if (event.target.nodeName == "INPUT") {
        //if(event.originalTarget.tagName == 'INPUT') {

        //var item = event.originalTarget;
        var item = event.target;
        var label = item.labels[0];
        item.checked == true;
        label.classList.add("item-active");
    }

    var lang = form.getAttribute("lang");

    var next = "step-" + a;

    if (a == 2) {

        $(".go-next2").click(function() {

            $("#step-1").animate({
                    opacity: "0",
                },
                50
            );
        });

        setTimeout(function() {
            $("#step-1").hide();

            document.getElementById(next).style.display = "block";
            document.getElementById(next).style.opacity = "0";
            document.getElementById(next).style.transition = "0.5s";

            $(".progress-bar").animate({
                    width: "50%",
                },
                300
            );

            document.getElementById("form-text").style.display = "none";

            $(".vanish-2").animate({
                    opacity: "1",
                },
                300
            );

        }, 0);

    }
    if (a == 3) {

        $(".go-next3").click(function() {

            $("#step-2").animate({
                    opacity: "0",
                },
                50
            );
        });

        setTimeout(function() {
            $("#step-2").hide();

            document.getElementById(next).style.display = "block";
            document.getElementById(next).style.opacity = "0";
            document.getElementById(next).style.transition = "0.5s";

            $(".progress-bar").animate({
                    width: "75%",
                },
                300
            );

            $(".vanish-3").animate({
                    opacity: "1",
                },
                300
            );

        }, 0);

    }

    if (a == 4) {

        if (
            form.elements.fieldfulladdress.value == "" ||
            form.elements.fieldfulladdress.value == null
        ) {
            var d = errmsg1("address", form.lang, "miss");
            document.getElementById("errormsg-1").innerHTML = d;
            return;
        }

        if (
            form.elements.fieldhousenumber.value == "" ||
            form.elements.fieldhousenumber.value == null
        ) {
            var d = errmsg1("addressnumber", form.lang, "miss");
            document.getElementById("errormsg-1").innerHTML = d;
            return;
        }

        if (
            form.elements.fieldcity.value == "" ||
            form.elements.fieldcity.value == null
        ) {
            var d = errmsg1("city", form.lang, "miss");
            document.getElementById("errormsg-1").innerHTML = d;
            return;
        }

        if (
            form.elements.fieldzipcode.value == "" ||
            form.elements.fieldzipcode.value == null
        ) {
            var d = errmsg1("zipcode", form.lang, "miss");
            document.getElementById("errormsg-1").innerHTML = d;
            return;
        } else {
            var val = validate(form.elements.fieldzipcode, lang, "zipcode");
            if (val == 1) {
                document.getElementById("errormsg-1").innerHTML = "";
            } else {
                var d = errmsg1("zipcode", form.lang, "validate");
                document.getElementById("errormsg-1").innerHTML = d;
                return;
            }
            document.getElementById("errormsg-1").innerHTML = "";
        }


        $(".go-next4").click(function() {
            $("#step-3").animate({
                    opacity: "0",
                },
                50
            );
        });


        setTimeout(function() {
            $("#step-3").hide();
            document.getElementById(next).style.display = "block";
            document.getElementById(next).style.opacity = "0";
            document.getElementById(next).style.transition = "0.5s";

            $(".progress-bar").animate({
                    width: "100%",
                },
                300
            );

            $(".vanish-4").animate({
                    opacity: "1",
                },
                300
            );
        }, 0);

    }
}

var form = document.forms["mainform"];
form.addEventListener("change", sel);

function sel(e) {
    var item = e.target;
    var label = item.labels[0];
    if (item.checked == true && item.type == "radio") {
        label.classList.add("item-active");
    } else {}

    form = document.forms["mainform"];
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].type == "radio") {
            if (form.elements[i].checked == false) {
                form.elements[i].labels[0].classList.remove("item-active");
            }
        }
    }
}