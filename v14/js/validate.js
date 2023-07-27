function errmsg1(field, lang, action) {
    var errmsg = trad[lang].sub[field][action];
    document.getElementById("errormsg-1").setAttribute('style', 'transition: all 1s; transform: scaleY(1); height: auto');
    return errmsg;
}

function errmsg3(field, lang, action) {
    var errmsg = trad[lang].sub[field][action];
    document.getElementById("errormsg-3").setAttribute('style', 'transition: all 1s; transform: scaleY(1); height: auto');
    return errmsg;
}

function validate(field, lang, type) {
    if (type == "email") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.value)) {
            return 1;
        } else {
            return 0;
        }
    }

    if (type == "phone") {
        if (/^[0-9]{8,12}$/.test(field.value)) {
            return 1;
        } else {
            return 0;
        }
    }

    if (type == "zipcode") {
        if (/^[0-9]{5}$/.test(field.value.replace(" ", ""))) {
            return 1;
        } else {
            return 0;
        }
    }

    if (type == "city") {
        // no numbers in city name
        if (/^([^0-9]*)$/.test(field.value.replace(" ", ""))) {
            return 1;
        } else {
            return 0;
        }
    }
}

function sbmt() {
    var err = document.getElementById("errormsg-3");

    var form = document.forms["mainform"];
    var lang = form.getAttribute("lang");

    var data = new Object();

    if (form.elements.fieldfirstname.value == '' || form.elements.fieldfirstname.value == null) {
        var d = errmsg3('firstname', form.lang, 'miss');
        console.log('1');
        document.getElementById('errormsg-3').innerHTML = d;
        return;
    } else {
        document.getElementById('errormsg-3').innerHTML = '';
    }

    if (form.elements.fieldlastname.value == '' || form.elements.fieldlastname.value == null) {
        var d = errmsg3('lastname', form.lang, 'miss');
        console.log('2');
        document.getElementById('errormsg-3').innerHTML = d;
        return;
    } else {
        document.getElementById('errormsg-3').innerHTML = '';
    }

    if (
        form.elements.fieldemail.value == "" ||
        form.elements.fieldemail.value == null
    ) {
        var d = errmsg3("email", form.lang, "miss");
        console.log('3');
        document.getElementById("errormsg-3").innerHTML = d;
        return;
    } else {
        var val = validate(form.elements.fieldemail, lang, "email");
        if (val == 1) {
            document.getElementById("errormsg-3").innerHTML = "";
        } else {
            var d = errmsg3("email", form.lang, "validate");
            document.getElementById("errormsg-3").innerHTML = d;
            return;
        }
    }

    if (
        form.elements.fieldphone.value == "" ||
        form.elements.fieldphone.value == null
    ) {
        var d = errmsg3("phone", form.lang, "miss");
        console.log('4');
        document.getElementById("errormsg-3").innerHTML = d;
        return;
    } else {
        var val = validate(form.elements.fieldphone, lang, "phone");
        if (val == 1) {
            document.getElementById("errormsg-3").innerHTML = "";
        } else {
            var d = errmsg3("phone", form.lang, "validate");
            document.getElementById("errormsg-3").innerHTML = d;
            return;
        }
    }

    data.houseowner = form.elements.fieldhouseowner.value;
    data.city = form.elements.fieldcity.value;
    data.state = form.elements.fieldstate.value;
    data.province = form.elements.fieldprovince.value;
    data.region = form.elements.fieldregion.value;
    data.fulladdress = form.elements.fieldfulladdress.value;
    data.zipcode = form.elements.fieldzipcode.value;
    data.firstname = form.elements.fieldfirstname.value.trim();
    data.lastname = form.elements.fieldlastname.value.trim();
    data.email = form.elements.fieldemail.value.trim();
    data.phone = form.elements.fieldphone.value.trim();
    data.address = form.elements.fieldaddress.value;
    data.honeypot = form.elements.email.value.trim();
    data.housenumber = form.elements.fieldhousenumber.value;
    data.pp = 1;
    data.housetype = form.elements.fieldhousetype.value;

    // HasOffers SDK
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    if (urlParams.get('cid') == null ||  urlParams.get('cid') == "") {
        if (urlParams.get('offer') != null && urlParams.get('offer') != "") {
            data.offer = urlParams.get('offer');
            data.clickid = sessionStorage.getItem(`tdl_default_${data["offer"]}`);
        }
    }

    // Opticks
    if (sessionStorage.getItem('opticksid') !== null) {
        data.opticks = sessionStorage.getItem('opticksid');
        data.opticksbis = opticks;
    } else {
        data.opticks = opticks;
    }

    subscribe(data);

    return;
}

function subscribe(data) {
    $.ajax({
        url: "https://lead.loudingads.com/api/subscribe/",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-AUTH-TOKEN": "Provided by Loudingads"
        },
        data: data,
        success: function(response) {
            console.log(response);
            // Обработка успешного ответа от сервера, если необходимо

            // Отображение страницы благодарности
            showThankYouPage(response);
        },
        error: function(error) {
            console.error(error);
            // Обработка ошибки при выполнении запроса, если необходимо

            // Если возникла ошибка, вы можете здесь отобразить сообщение об ошибке
        }
    });
}

function showThankYouPage(response) {
    var thpg;
    try {
        var result = JSON.parse(response);
        if (result.code === 200 && result.message === 'valid user') {
            thpg = 1;
        } else {
            thpg = 2;
        }
    } catch (e) {
        thpg = 2;
    }

    // Создаем элементы для отображения страницы благодарности
    var main = document.getElementById('body');

    var a = document.createElement('div');
    a.setAttribute('class', 'container thanks-page');
    main.appendChild(a);

    var b = document.createElement('div');
    b.setAttribute('class', 'head row');
    a.appendChild(b);

    var c = document.createElement('div');
    c.setAttribute('class', 'info-thanks col-12');
    b.appendChild(c);

    var d = document.createElement('div');
    d.setAttribute('class', 'text');
    c.appendChild(d);

    var e = document.createElement('h1');
    e.innerHTML = 'Grazie per esserti iscritto!';
    d.appendChild(e);

    var e = document.createElement('h4');
    e.innerHTML = 'Vuoi risparmiare ancora di più?';
    d.appendChild(e);

    var e = document.createElement('hr');
    e.setAttribute('class', 'line');
    d.appendChild(e);

    var e = document.createElement('span');
    e.innerHTML = 'Scegli una delle opzioni qui sotto';
    d.appendChild(e);

    // Добавьте здесь блоки с предложениями и кнопками, в зависимости от значения thpg
    if (thpg === 1) {
        // Отображение содержимого страницы для успешного результата (thpg = 1)
    } else {
        // Отображение содержимого страницы для неуспешного результата (thpg = 2)
    }

    document.getElementById('main').setAttribute('style', 'filter: blur(8px);');
}


//   function subscribe(data) {

// 	var keys = Object.keys(data);
// 	var value = Object.values(data);
// 	var job = '';

// 	for (var i = 0; i < keys.length; i++) {
// 		if(i == (keys.length - 1)) {
// 			job += keys[i] + '=' + value[i];
// 		} else {
// 			job += keys[i] + '=' + value[i] + '&';
// 		}
// 	}

// 	var xhttp;
// 	if (window.XMLHttpRequest) {
// 		xhttp = new XMLHttpRequest();
// 	} else {
// 		// code for IE6, IE5
// 		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
// 	}

// 	xhttp.onreadystatechange = function() {

// 		if(!document.getElementById('thankyoubg')) {

// 			var main = document.getElementById('body');
// 			var cover = document.createElement('div');
// 			cover.id = 'thankyoubg';
// 			main.appendChild(cover);

// 			var a = document.createElement('div');
// 			a.classList.add('container');
// 			a.classList.add('thanks-page');
// 			a.classList.add('thankyouloader');

// 			a.innerHTML = '<img class="logo-loading" src="images/logo-reco.png" height="70px">';

// 			var b = document.createElement('div');
// 			b.id = 'thankyouloader-txt';

// 			var c = document.createElement('span');
// 			c.className = "thanks-span"
// 			c.innerHTML = '<span class="loader-svg"></span><div id="loader-txt"><h1 class="highlight">¡Gracias por confiar en nosotros!</h1><h4>Por favor, espere unos segundos mientras procesamos su información.</h4></div>';

// 			b.appendChild(c);
// 			a.appendChild(b);

// 			cover.appendChild(a);
// 			document.getElementById('main').setAttribute('style','filter: blur(8px);');
// 		}

// 		if (this.readyState == 4 && this.status == 200) {

// 			if(document.getElementById('thankyoubg')) {
// 				document.getElementById('thankyoubg').remove();
// 			}

// 			try {
// 	        var result = JSON.parse(this.responseText);
// 	    	} catch (e) {
// 	    		var lang = document.forms['mainform'].getAttribute('lang');
// 	    		var d = errmsg('general',lang,'error');
// 					var form = document.forms['mainform'];
// 	    		form.elements.fieldfirstname.parentNode.appendChild(d);
// 					d.classList.add('errormsgactive');
// 	        return false;
// 	    	}

// 			if(result.code == 200 && result.message == 'valid user') {
// 				var thpg = 1;
// 			} else {
// 				var thpg = 2;
// 			}
// 	    	var location = 'https://' + window.location.hostname + window.location.pathname + '?thpg='+thpg;

// 			window.location.replace(location);

// 		}

// 	};
// 	xhttp.open("POST", "function/action.php", true);
// 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

// 	setTimeout(function() {
// 	xhttp.send(job);
// 	}, 2000);

// }


function thankyou() {

    var main = document.getElementById('body');

    var a = document.createElement('div');
    //a.id = 'thankyoubg';
    a.setAttribute('class', 'container thanks-page');
    main.appendChild(a);

    var b = document.createElement('div');
    //a.id = 'thankyoubg';
    b.setAttribute('class', 'head row');
    a.appendChild(b);

    var c = document.createElement('div');
    //a.id = 'thankyoubg';
    c.setAttribute('class', 'info-thanks col-12');
    b.appendChild(c);

    var d = document.createElement('div');
    //a.id = 'thankyoubg';
    d.setAttribute('class', 'text');
    c.appendChild(d);

    var e = document.createElement('h1');
    e.innerHTML = 'Grazie per esserti iscritto!';
    d.appendChild(e);

    var e = document.createElement('h4');
    e.innerHTML = 'Vuoi risparmiare ancora di più?';
    d.appendChild(e);

    var e = document.createElement('hr');
    e.setAttribute('class', 'line');
    d.appendChild(e);

    var e = document.createElement('span');
    e.innerHTML = 'Scegli una delle opzioni qui sotto';
    d.appendChild(e);

    var b = document.createElement('div');
    b.setAttribute('class', 'more-webs row');
    a.appendChild(b);

    var c = document.createElement('div');
    c.setAttribute('class', 'web col-md-4');
    b.appendChild(c);

    var d = document.createElement('img');
    d.src = 'images/panel-bl.png';
    d.alt = 'panel icon';
    c.appendChild(d);

    var d = document.createElement('h4');
    d.innerHTML = 'Tariffe';
    c.appendChild(d);

    var d = document.createElement('div');
    d.setAttribute('class', 'list');
    c.appendChild(d);

    var e = document.createElement('ul');
    d.appendChild(e);

    var f = document.createElement('li');
    f.innerHTML = 'Luce, Gas, Internet, Mobile';
    e.appendChild(f);

    var f = document.createElement('li');
    f.innerHTML = 'Risparmia fino a 460€ sulle tue bollette';
    e.appendChild(f);

    var f = document.createElement('li');
    f.innerHTML = 'Amazon Prime per un anno';
    e.appendChild(f);

    var d = document.createElement('a');
    d.setAttribute('class', 'btn btn-thanks');
    d.href = 'https://trk.loudedig.com/aff_c?offer_id=2798&aff_id=1773&aff_sub=leadgen&source=3349';
    d.innerHTML = 'Scopri di più';
    c.appendChild(d);

    var c = document.createElement('div');
    c.setAttribute('class', 'web col-md-4');
    b.appendChild(c);

    var d = document.createElement('img');
    d.src = 'images/isolate-bl.png';
    d.alt = 'panel icon';
    c.appendChild(d);

    var d = document.createElement('h4');
    d.innerHTML = 'Sky';
    c.appendChild(d);

    var d = document.createElement('div');
    d.setAttribute('class', 'list');
    c.appendChild(d);

    var e = document.createElement('ul');
    d.appendChild(e);

    var f = document.createElement('li');
    f.innerHTML = '24,90€/mese per 18 mesi';
    e.appendChild(f);

    var f = document.createElement('li');
    f.innerHTML = 'Sperimenta Sky Q';
    e.appendChild(f);

    var f = document.createElement('li');
    f.innerHTML = 'Serie TV e Show di Sky';
    e.appendChild(f);

    var d = document.createElement('a');
    d.setAttribute('class', 'btn btn-thanks');
    d.href = 'https://trk.loudedig.com/aff_c?offer_id=3336&aff_id=1773&aff_sub=leadgen&source=3349';
    d.innerHTML = 'Scopri di più';
    c.appendChild(d);

    var c = document.createElement('div');
    c.setAttribute('class', 'web col-md-4');
    b.appendChild(c);

    var d = document.createElement('img');
    d.src = 'images/alarm-bl.png';
    d.alt = 'panel icon';
    c.appendChild(d);

    var d = document.createElement('h4');
    d.innerHTML = 'Alarmsystemen';
    c.appendChild(d);

    var d = document.createElement('div');
    d.setAttribute('class', 'list');
    c.appendChild(d);

    var e = document.createElement('ul');
    d.appendChild(e);

    var f = document.createElement('li');
    f.innerHTML = 'Beste manier om inbraak te voorkomen';
    e.appendChild(f);

    var f = document.createElement('li');
    f.innerHTML = 'Preventieve werking';
    e.appendChild(f);

    var f = document.createElement('li');
    f.innerHTML = 'Met een gerust hart de deur uit';
    e.appendChild(f);

    var d = document.createElement('a');
    d.setAttribute('class', 'btn btn-thanks');
    d.href = 'https://trk.loudedig.com/aff_c?offer_id=1227&aff_id=1773&aff_sub=leadgen&source=3080';
    d.innerHTML = 'Scopri di più';
    c.appendChild(d);

    document.getElementById('main').setAttribute('style', 'filter: blur(8px);');
    //document.getElementById('footer').setAttribute('style','filter: blur(8px);');

    //main.scrollIntoView();

}