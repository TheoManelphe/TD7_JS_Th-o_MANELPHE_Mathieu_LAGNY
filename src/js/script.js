let adherents = new Adherent();
let livres = new Livres();

let ajouterLivre = document.getElementById("ajouterLivre");
ajouterLivre.addEventListener("click",function(){livres.ajouter();});

//La vie au XIVe siecle