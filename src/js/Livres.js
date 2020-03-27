class Livres {
	constructor() {
		this.requeteAJAX(this.callback_3);
	}

	requeteAJAX(callback) {
		let url = "php/Livres.php";
		let requete = new XMLHttpRequest();
		requete.open("GET", url, true);
		requete.addEventListener("load", function () {
			callback(requete);
		});
		requete.send(null);
	}

	callback_1(req) {console.log(req);}

	callback_2(req) {console.log(JSON.parse(req.responseText));}

	callback_3(req) {
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
}