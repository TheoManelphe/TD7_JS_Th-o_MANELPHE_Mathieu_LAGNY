class Livres {
	
	constructor() {
		this.afficher();
	}

	requeteAJAX(callback, url) {
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function () {
			callback(requete);
		});
		requete.send(null);
	}

	afficher(){
		this.requeteAJAX(function(r){
			livres.afficherDispos(r);
		},"php/LivresRequeteDispos.php");
		this.requeteAJAX(function(r){
			livres.afficherEmpruntes(r);
		},"php/LivresRequeteEmpruntes.php");
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

		console.log(requete)
		let xhrJSON = JSON.parse(requete.responseText);
		let div = document.getElementById("listeLivresDisponibles");
		let ul = document.createElement("ul");
		div.appendChild(ul);

		for (var i = 0; i < xhrJSON.length; i++) {
			let li = document.createElement("li");
			li.innerHTML = xhrJSON[i].idLivre+"-"+xhrJSON[i].titreLivre;
			div.children[0].appendChild(li);
		}
	}

	afficherEmpruntes(requete){
		this.effacerEmpruntes();
		let xhrJSON = JSON.parse(requete.responseText);
		let div = document.getElementById("listeLivresEmpruntes");
		let ul = document.createElement("ul");
		div.appendChild(ul);

		for (var i = 0; i < xhrJSON.length; i++) {
			let li = document.createElement("li");
			li.innerHTML = xhrJSON[i].idLivre+"-"+xhrJSON[i].titreLivre;
			div.children[0].appendChild(li);
		}
	}

	ajouter(){
		let livre = document.getElementById("titreLivre");
		if(livre.value.length != 0){
			let url = "php/requeteCreateLivre.php?titre="+livre.value;
			this.requeteAJAX(function(r){livres.afficherDispos(r);},url);
			livre.value = "";
		}
	}
}