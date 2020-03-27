class Livres {
	
	constructor() {
		this.afficher();
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

	afficher(){
		this.requeteAJAX("php/LivresRequeteDispos.php",function(r){
			livres.afficherDispos(r);
		});
		this.requeteAJAX("php/LivresRequeteEmpruntes.php",function(r){
			livres.afficherEmpruntes(r);
		});
	}

	effacer(){
		this.effacerDispos();
		this.effacerEmpruntes();
	}

	effacerDispos(){
		let div = document.getElementById("listeLivresDisponibles");
		while(div.children.length > 0){
			div.removeChild(div.lastChild);
		}
	}

	effacerEmpruntes(){
		let div = document.getElementById("listeLivresEmpruntes");
		while(div.children.length > 0){
			div.removeChild(div.lastChild);
		}
	}

	afficherDispos(requete){
		this.effacerDispos();
		let liste = JSON.parse(requete.responseText);
		let div = document.getElementById("listeLivresDisponibles");
		let ul = document.createElement("ul");
		div.appendChild(ul);

		for (var i = 0; i < liste.length; i++) {
			let li = document.createElement("li");
			li.innerHTML = liste[i].idLivre+"-"+liste[i].titreLivre;
			div.children[0].appendChild(li);
		}
	}

	afficherEmpruntes(requete){
		this.effacerEmpruntes();
		let liste = JSON.parse(requete.responseText);
		let div = document.getElementById("listeLivresEmpruntes");
		let ul = document.createElement("ul");
		div.appendChild(ul);

		for (var i = 0; i < liste.length; i++) {
			let li = document.createElement("li");
			li.innerHTML = liste[i].idLivre+"-"+liste[i].titreLivre;
			div.children[0].appendChild(li);
		}
	}

	ajouter(){
		let livre = document.getElementById("titreLivre");
		if(livre.value.length != 0){
			let url = "php/requeteCreateLivre.php?titre="+livre.value;
			this.requeteAJAX(url);
			livre.value = "";
		}
		this.requeteAJAX("php/LivresRequeteDispos.php",function(r){
			livres.afficherDispos(r);
		});
	}

	emprunterLivre(idLivre,idAdherent){
		let url = "php/requeteCreateEmprunt.php?idLivre="+idLivre+"&idAdherent="+idAdherent; 
		this.requeteAJAX(url,function(){livres.afficher(); adherents.afficher()});
	}

	retourLivre(idLivre){
		console.log("retour du livre");
		let url = "php/requeteDeleteEmprunt.php?idLivre="+idLivre; 
		this.requeteAJAX(url,function(){livres.afficher(); adherents.afficher()});
	}

	fenetreEmprunts(idLivre){
		let url = "php/requeteSelectEmprunteur.php?idLivre="+idLivre; 
		console.log(url)
		this.requeteAJAX(url,function(r){
			console.log(r.responseText)
			let adh = JSON.parse(r.responseText)[0];
			if (confirm("Livre prete a  "+adh.nomAdherent+".\nRetour de ce livre ?")) {
				livres.retourLivre(idLivre);
			}

		});
	}
}