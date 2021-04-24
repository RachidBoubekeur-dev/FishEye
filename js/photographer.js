let idPhotographe = new URLSearchParams(document.location.href);
idPhotographe = decodeURIComponent(idPhotographe).split('?id=')[1];

/**
 * displayHtml - affiche le code html
 * @param  {String} section identifiant de section
 * @param  {String} htmlListData code html
 */
 function displayHtml(section, htmlListData) {
    document.querySelector(section).innerHTML = htmlListData;
    // Fermeture du loader et affichage du code html
    setTimeout(() => { 
        document.querySelector('main > p').style.display = "none";
        document.querySelector(section).style.opacity = 1;
    }, 1000);
}

/**
 * dataPhotographer - stock les informations du photographe dans htmlListData
 * @param  {Array} photographers liste des photographes
 */
function dataPhotographer(photographers) {
    let htmlListData;
    // Parcours la liste des photographes
    for (let i = 0; i < photographers.length; i++) {
        if(photographers[i].id == idPhotographe) {
            let htmlListTag = "";
            for(let y = 0; y < photographers[i].tags.length; y++) {
                // Ajout successif des tags du photographe
                htmlListTag += "<a href=\"#" + photographers[i].tags[y]
                + "\" class=\"tag\" aria-label=\"Filtre " + photographers[i].tags[y]
                + "\"><span>#" + photographers[i].tags[y] + "</span></a>";
            }
            // Ajout du photographe
            htmlListData = "<div role=\"contentinfo\"><h1 title=\"" + photographers[i].name + "\">" + photographers[i].name
            + "</h1><p class=\"location\">" + photographers[i].city
            + ", " + photographers[i].country + "</p><p class=\"tagline\">" + photographers[i].tagline + "</p>" + htmlListTag + "</div><div><button id=\"contact\" aria-pressed=\"false\" aria-label=\"Button de contact\">Contactez-moi</button></div><p><img src=\"Sample_Photos/Photographers_ID_Photos/"
            + photographers[i].portrait + "\" alt=\"Portrait de " + photographers[i].name + "\"></p>";
            break;
        }
    }

    displayHtml('#info', htmlListData);
}