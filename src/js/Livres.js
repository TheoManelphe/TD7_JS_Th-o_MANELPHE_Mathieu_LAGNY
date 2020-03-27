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
		this.effacer();
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
}