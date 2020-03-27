let adherents = new Adherent();
let livres = new Livres();

let ajouterLivre = document.getElementById("ajouterLivre");
ajouterLivre.addEventListener("click",function(){livres.ajouter();});

let ajouterAdherent = document.getElementById("ajouterAdherent");
ajouterAdherent.addEventListener("click",function(){adherents.ajouter();});