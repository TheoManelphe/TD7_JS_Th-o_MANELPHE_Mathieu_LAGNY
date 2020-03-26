function afficherAdh(tableau) {
	let la = document.getElementById("listeAdherents");
	for (let i = 0; i < tableau.length; i ++) {
		let p = document.createElement('p');
	p.innerHTML = tableau[i];
		la.appendChild(p);
	}
}

function requeteAJAX(callback) {
	let url = "php/Adhreq.php";
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load", function () {
		callback(requete);
	});
	requete.send(null);
}


function videAdh() {
	let la = document.getElementById("listeAdherents");
	while(la.children.length > 0) {
		la.removeChild(la.firstChild);
	}
	la.style.borderWidth = "0px";
}

function callback_1(req) {console.log(req);}

function callback_2(req) {console.log(JSON.parse(req.responseText));}

function callback_3(req) {
	let tab = JSON.parse(req.responseText);
	let tabAdh = new Array();
	for(let i = 0; i < tab.length; i++) {
		tabAdh.push(tab[i]["nomAdherent"]);
	}
	console.log(tabAdh);
	console.log(tab)
	console.log();
	afficherAdh(tabAdh);
}



requeteAJAX(callback_3);

/*

function afficherLdisp(tableau) {
	let ld = document.getElementById("listeLivresDisponibles");
	for (let i = 0; i < tableau.length; i ++) {
		let p = document.createElement('p');
		p.innerHTML = tableau[i];
		ld.appendChild(p);
	}
}

function requeteAJAX(stringLdisp,callback) {
	let url = "php/Model.php?";
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load", function () {
		callback(requete);
	});
	requete.send(null);
}


function videLdisp() {
	let la = document.getElementById("listeLivresDisponibles");
	while(la.children.length > 0) {
		la.removeChild(la.firstChild);
	}
	la.style.borderWidth = "0px";
}

function callback_1(req) {console.log(req);}

function callback_2(req) {console.log(JSON.parse(req.responseText));}

function callback_3(req) {
	let tab = JSON.parse(req.responseText);
	let tabLdisp = new Array();
	for(let i = 0; i < tab.length; i++) {
		tabLdisp.push(tab[i].name);
	}
	console.log(tabLdisp);
	console.log();
}

function callback_4(req) {
	let tab = JSON.parse(req.responseText);
	let tabLdisp = new Array();
	for(let i = 0; i < tab.length; i++) {
		tabLdisp.push(tab[i].name);
	}
	afficheLdisp(tabLdisp);
}

function maRequeteAJAX(stringLdisp) {
	if (stringLdisp.length > 1) {
		requeteAJAX_v2(
			stringLdisp,
			callback_4,
			function() {document.getElementById("loading").style.visibility = "visible";},
			function() {document.getElementById("loading").style.visibility = "hidden";}
		);
	} else {
		videLdisp();
	}
}

function maRequeteAJAX(stringLdisp) {
	if (stringLdisp.length > 1) {
		requeteAJAX_v2(
			stringLdisp,
			callback_4,
			function() {document.getElementById("loading").style.visibility = "visible";},
			function() {document.getElementById("loading").style.visibility = "hidden";}
		);
	} else {
		videLdisp();
	}
}




function afficherLemp(tableau) {
	let le = document.getElementById("listeLivresEmpruntes");
	for (let i = 0; i < tableau.length; i ++) {
		let p = document.createElement('p');
		p.innerHTML = tableau[i];
		le.appendChild(p);
	}
}

function videLemp() {
	let le = document.getElementById("listeLivresEmpruntes");
	while(le.children.length > 0) {
		le.removeChild(le.firstChild);
	}
	le.style.borderWidth = "0px";
}

function callback_1(req) {console.log(req);}

function callback_2(req) {console.log(JSON.parse(req.responseText));}

function callback_3(req) {
	let tab = JSON.parse(req.responseText);
	let tabLemp = new Array();
	for(let i = 0; i < tab.length; i++) {
		tabLemp.push(tab[i].name);
	}
	console.log(tabLemp);
	console.log();
}

function callback_4(req) {
	let tab = JSON.parse(req.responseText);
	let tabLemp = new Array();
	for(let i = 0; i < tab.length; i++) {
		tabLemp.push(tab[i].name);
	}
	afficheLemp(tabLemp);
}

function maRequeteAJAX(stringLemp) {
	if (stringLemp.length > 1) {
		requeteAJAX_v2(
			stringLemp,
			callback_4,
			function() {document.getElementById("loading").style.visibility = "visible";},
			function() {document.getElementById("loading").style.visibility = "hidden";}
		);
	} else {
		videLemp();
	}
}

function maRequeteAJAX(stringLemp) {
	if (stringLemp.length > 1) {
		requeteAJAX_v2(
			stringLemp,
			callback_4,
			function() {document.getElementById("loading").style.visibility = "visible";},
			function() {document.getElementById("loading").style.visibility = "hidden";}
		);
	} else {
		videLemp();
	}
}

function requeteAJAX(stringLemph,callback) {
	let url = "php/Model.php?";
	let requete = new XMLHttpRequest();
	requete.open("GET", url, true);
	requete.addEventListener("load", function () {
		callback(requete);
	});
	requete.send(null);
}
*/

