class Adherent {
	constructor() {
		this.requeteAJAX("php/Adhreq.php",this.callback_3);
	}

	afficherAdh(tableau) {
		adherents.videAdh();
		let la = document.getElementById("listeAdherents");
		for (let i = 0; i < tableau.length; i ++) {
			let p = document.createElement('p');
		p.innerHTML = tableau[i];
			la.appendChild(p);
		}
	}

	requeteAJAX(url, callback) {
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		if(callback !== undefined){
			requete.addEventListener("load", function () {
				callback(requete);
			});
		}
		requete.send(null);
	}

	videAdh() {
		let la = document.getElementById("listeAdherents");
		while(la.children.length > 0) {
			la.removeChild(la.firstChild);
		}
		la.style.borderWidth = "0px";
	}

	ajouter(){
		let nomAdherent = document.getElementById("nomAdherent");
		if(nomAdherent.value.length != 0){
			let url = "php/requeteCreateAdherent.php?nom="+nomAdherent.value;
			this.requeteAJAX(url);
			nomAdherent.value = "";
		}
		this.requeteAJAX("php/Adhreq.php",this.callback_3);
	}

	callback_1(req) {console.log(req);}

	callback_2(req) {console.log(JSON.parse(req.responseText));}

	callback_3(req) {
		let tab = JSON.parse(req.responseText);
		let tabAdh = new Array();
		for(let i = 0; i < tab.length; i++) {
			tabAdh.push(tab[i]["nomAdherent"]);
		}
		adherents.afficherAdh(tabAdh);
	}
}