class Adherent {
	constructor() {
		this.afficher();
	}

	afficher(){
		this.requeteAJAX("php/Adhreq.php",function(r){
			adherents.afficherAdherents(r);
		});
	}

	afficherAdherents(requete) {
		this.videAdh();
		let liste = JSON.parse(requete.responseText);
		let div = document.getElementById("listeAdherents");
		let ul = document.createElement("ul");
		div.appendChild(ul);

		for (var i = 0; i < liste.length; i++) {
			let li = document.createElement("li");
			li.innerHTML = liste[i].idAdherent+"-"+liste[i].nomAdherent;
			if(liste[i].nbEmprunt > 0){
				li.innerHTML += " ("+liste[i].nbEmprunt+(liste[i].nbEmprunt > 1?" emprunts)":" emprunt)");
			}
			div.children[0].appendChild(li);
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
}