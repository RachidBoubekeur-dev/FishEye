window.addEventListener('scroll', () => {
    if(window.scrollY <= 100) {
        document.querySelector("header > p > a").style.top = "15px";
    }
    else {
        document.querySelector("header > p > a").style.top = "-50px";
    }
})

/**
 * clickNavFiltreTag - renvoi le filtre de navigation demandé a la function getDataFiltre
 */
function clickNavFiltreTag() {
    let navTag = document.querySelector('nav > ul');
    // Parcours tous les filtres
    for(let i = 0; i < 8; i++) {
        let filtreNav = navTag.querySelectorAll('a.tag')[i];
        filtreNav.addEventListener('click', () => {
            filtreNav = filtreNav.innerText.toLowerCase().split('#').join('');
            getDataFiltre(filtreNav);
        })
    }
}

/**
 * displayListPhotographer - affiche le code html de la liste des photographes
 * @param  {String} htmlListData code html de la liste des photographes
 */
function displayListPhotographer(htmlListData) {
    document.querySelector('#contenu').innerHTML = htmlListData;
    // Fermeture du loader et affichage de la liste
    setTimeout(() => { 
        document.querySelector('main > p').style.display = "none";
        document.querySelector('#contenu').style.opacity = 1;
    }, 1500);
}

/**
 * clickArticleFiltreTag - renvoi le filtre du photographe demandé a la function getDataFiltre
 */
function clickArticleFiltreTag() {
    let section = document.querySelector('section');
    // Parcours la liste des photographes
    for(let i = 0; i < 6; i++) {
        if(section.querySelectorAll('article')[i]) {
            let article = section.querySelectorAll('article')[i];
            // Parcours les tags du photographe
            for(let y = 0; y < 4; y++) {
                if (article.querySelectorAll('a.tag')[y]) {
                    let filtreArticle = article.querySelectorAll('a.tag')[y];
                    filtreArticle.addEventListener('click', () => {
                        filtreArticle = filtreArticle.innerText.split('#').join('');
                        getDataFiltre(filtreArticle);
                    })
                }
            }
        }
    }
}

/**
 * dataPhotographer - stock la liste des photographes dans htmlListData
 * @param  {Array} photographers liste des photographes
 */
function dataPhotographer(photographers) {
 
    let htmlListData = "";
    // Parcours la liste des photographes
    for(let i = 0; i < photographers.length; i++) {
        let htmlListTag = "";
        // Parcours les tags du photographe
        for(let y = 0; y < photographers[i].tags.length; y++) {
            // Ajout successif des tags
            htmlListTag += '<a href=\"#' + photographers[i].tags[y]
            +'\" class=\"tag\" aria-label=\"Filtre ' + photographers[i].tags[y]
            +'\"><span>#' + photographers[i].tags[y] + '</span></a>';
        }
        // Ajout successif des photographes
        htmlListData += "<article id=\"" + photographers[i].id + 
            "\" aria-label=\"Photographe " + photographers[i].name
            + "\"><a href=\"photographer.html?id=" + photographers[i].id
            + "\" aria-label=\"Lien page photographe\"><img src=\"Sample_Photos/Photographers_ID_Photos/"
            + photographers[i].portrait + "\" alt=\"Portrait de " + photographers[i].name
            + "\" /><h2>" + photographers[i].name + "</h2></a><p class=\"location\">"
            + photographers[i].city + ", " + photographers[i].country + "</p><p class=\"tagline\">"
            + photographers[i].tagline + "</p><p class=\"price\">" + photographers[i].price
            + "€/jour</p>" + htmlListTag + "</article>";
    }

    clickNavFiltreTag();
    displayListPhotographer(htmlListData);
    clickArticleFiltreTag();
}

/**
 * listDataFiltre - stock la liste des photographes en fonction du filtre choisi
 * @param {Array} photographers liste des photographes
 * @param {String} filtre filtre choisi
 */
function listDataFiltre(photographers, filtre) {

    document.querySelector("header > p > a").style.display = "none";
    document.querySelector("section").style.justifyContent = "space-evenly";
    
    let htmlListData = "";
    // Parcours la liste des photographes
    for(let i = 0; i < photographers.length; i++) {
        // Parcours les tags du photographe
        for(let y = 0; y < photographers[i].tags.length; y++) {
            // Si le tag correspond au filtre demandé on stock tous les tags du photographe
            if(photographers[i].tags[y] === filtre) {
                let htmlListTag = "";
                for(let x = 0; x < photographers[i].tags.length; x++) {
                    if(photographers[i].tags[x] === filtre) {
                        // Ajout du tag égale au filtre
                        htmlListTag += '<a href=\"#' + photographers[i].tags[x]
                        +'\" class=\"tag\" style=\"color:white;background-color:#901C1C\" aria-label=\"Filtre '
                        + photographers[i].tags[x] + '\"><span>#' + photographers[i].tags[x] + '</span></a>';
                    } else {
                        // Ajout successif des autres tags
                        htmlListTag += '<a href=\"#' + photographers[i].tags[x]
                        +'\" class=\"tag\" aria-label=\"Filtre ' + photographers[i].tags[x] + '\"><span>#'
                        +photographers[i].tags[x] + '</span></a>';
                    }
                } 
                // Ajout successif des photographes correspondant au filtre
                htmlListData += "<article id=\"" + photographers[i].id +
                    "\" aria-label=\"Photographe "+ photographers[i].name +
                    "\" style=\"margin-left:0%;margin-right:0%;\"><a href=\"photographer.html?id="
                    + photographers[i].id + "\" aria-label=\"Lien page photographe\"><img src=\"Sample_Photos/Photographers_ID_Photos/"
                    + photographers[i].portrait + "\" alt=\"Portrait de " + photographers[i].name + "\" /><h2>"
                    + photographers[i].name + "</h2></a><p class=\"location\">" + photographers[i].city + ", "
                    + photographers[i].country + "</p><p class=\"tagline\">" + photographers[i].tagline
                    +"</p><p class=\"price\">" + photographers[i].price + "€/jour</p>" + htmlListTag + "</article>";
                break;
            }
        }
    }
    
    clickNavFiltreTag();
    displayListPhotographer(htmlListData);
    clickArticleFiltreTag();
}