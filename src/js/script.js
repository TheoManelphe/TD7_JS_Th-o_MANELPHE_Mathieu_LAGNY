let adherents = new Adherent();
let livres = new Livres();

let ajouterLivre = document.getElementById("ajouterLivre");
ajouterLivre.addEventListener("click",function(){livres.ajouter();});

let ajouterAdherent = document.getElementById("ajouterAdherent");
ajouterAdherent.addEventListener("click",function(){adherents.ajouter();});

let ld = document.getElementById("listeLivresDisponibles");

ld.addEventListener("click",function(){
	let info = event.target.innerHTML.split("-",2);
	let idAdherent = prompt("pret de \"" + info[1] + "\". \n id de l'emprunteur ?");
	if (idAdherent !== null || idAdherent !== "") {
		livres.emprunterLivre(info[0],idAdherent);
	}
});

let le = document.getElementById("listeLivresEmpruntes");

le.addEventListener("click",function(){
	let infoLivre = event.target.innerHTML.split("-",2);
	livres.fenetreEmprunts(infoLivre[0]);
});
