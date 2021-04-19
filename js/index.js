window.addEventListener('scroll', () => {
    if(window.scrollY <= 100) {
        document.querySelector("header > p > a").style.top = "15px";
    }
    else {
        document.querySelector("header > p > a").style.top = "-50px";
    }
})

function listPhotographers(photographers) {
 
    let htmlListData = "";
    // Parcours la liste des photographes
    for(let i = 0; i < photographers.length; i++) {

        let htmlListTag = "";
        // Parcours les tags du photographe
        for(let y = 0; y < photographers[i].tags.length; y++) {
            // Ajout successif des tags
            htmlListTag += '<a href=\"#' + photographers[i].tags[y] + '\" onclick=\"getDataFiltre(\'' + photographers[i].tags[y] + '\')\" class=\"tag\" aria-label=\"Filtre portrait\"><span>#' + photographers[i].tags[y] + '</span></a>';
        }
        // Ajout successif des photographes
        htmlListData += "<article id=\"" + photographers[i].id + "\" aria-label=\"Photographe " + photographers[i].name + "\"><a href=\"photographer.html?id=" + photographers[i].id + "\" aria-label=\"Lien page photographe\"><img src=\"Sample_Photos/Photographers_ID_Photos/" + photographers[i].portrait + "\" alt=\"Portrait de " + photographers[i].name + "\" /><h2>" + photographers[i].name + "</h2></a><p class=\"location\">" + photographers[i].city + ", " + photographers[i].country + "</p><p class=\"tagline\">" + photographers[i].tagline + "</p><p class=\"price\">" + photographers[i].price + "€/jour</p>" + htmlListTag + "</article>";
    }

    // Incrémentation de la liste dans la section HTML
    document.querySelector('#contenu').innerHTML = htmlListData;

    // Fermeture du loader et affichage de la liste
    setTimeout(() => { 
        document.querySelector('main > p').style.display = "none";
        document.querySelector('#contenu').style.opacity = 1;
    }, 2000);
}

function listDataFiltre(photographers, filtre) {

    document.querySelector("header > p > a").style.display = "none";
    document.querySelector("section").style.justifyContent = "space-evenly";
    let htmlListData = "";
    // Parcours la liste des photographes
    for(let i = 0; i < photographers.length; i++) {
        // Parcours les tags du photographe
        for(let y = 0; y < photographers[i].tags.length; y++) {
            // Si le tag correspond au filtre demandé
            if(photographers[i].tags[y] === filtre) {
                let htmlListTag = "";
                for(let x = 0; x < photographers[i].tags.length; x++) {
                    if(photographers[i].tags[x] === filtre) {
                        // Ajout du tag égale au filtre
                        htmlListTag += '<a href=\"#' + photographers[i].tags[x] + '\" onclick=\"getDataFiltre(\'' + photographers[i].tags[x] + '\')\" class=\"tag\" style=\"color:white;background-color:#901C1C\" aria-label=\"Filtre portrait\"><span>#' + photographers[i].tags[x] + '</span></a>';
                    } else {
                        // Ajout successif des autres tags
                        htmlListTag += '<a href=\"#' + photographers[i].tags[x] + '\" onclick=\"getDataFiltre(\'' + photographers[i].tags[x] + '\')\" class=\"tag\" aria-label=\"Filtre portrait\"><span>#' + photographers[i].tags[x] + '</span></a>';
                    }
                }
                // Ajout successif des photographes
                htmlListData += "<article id=\"" + photographers[i].id + "\" aria-label=\"Photographe " + photographers[i].name + "\" style=\"margin-left:0%;margin-right:0%;\"><a href=\"photographer.html?id=" + photographers[i].id + "\" aria-label=\"Lien page photographe\"><img src=\"Sample_Photos/Photographers_ID_Photos/" + photographers[i].portrait + "\" alt=\"Portrait de " + photographers[i].name + "\" /><h2>" + photographers[i].name + "</h2></a><p class=\"location\">" + photographers[i].city + ", " + photographers[i].country + "</p><p class=\"tagline\">" + photographers[i].tagline + "</p><p class=\"price\">" + photographers[i].price + "€/jour</p>" + htmlListTag + "</article>";
                break;
            }
        }
    }
    // Incrémentation de la liste filtré dans la section HTML
    document.querySelector('#contenu').innerHTML = htmlListData;
}