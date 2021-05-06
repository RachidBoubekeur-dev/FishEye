window.addEventListener('scroll', () => {
    if (window.scrollY <= 100) {
        document.querySelector("header > p > a").style.top = "15px";
    }
    else {
        document.querySelector("header > p > a").style.top = "-50px";
    }
})

/**
 * initPhotographer - initialise la liste des photographes
 * @param {Array} photographers liste des photographes
 * @param {String} filtre par défaut false sinnon contien le filtre choisi
 */
function initPhotographer(photographers, filtre = false) {
    let htmlListData;
    if (!filtre) { htmlListData = initHtmlPhotographer(photographers); }
    else { htmlListData = initHtmlFiltrePhotographer(photographers, filtre); }
    handleNavFiltreTag(photographers);
    displayHtml(htmlListData);
    handleArticleFiltreTag(photographers);
}

/**
 * initHtmlPhotographer - stock la liste des photographes
 * @param {Array} photographers liste des photographes
 * @return {String} code html de la liste des photographes
 */
function initHtmlPhotographer(photographers) {
    let htmlListData = "";
    // Parcours la liste des photographes
    for (let i = 0; i < photographers.length; i++) {
        let htmlListTag = "";
        // Parcours les tags du photographe
        for (let y = 0; y < photographers[i].tags.length; y++) {
            // Ajout successif des tags
            htmlListTag += '<a href=\"#' + photographers[i].tags[y]
                + '\" class=\"tag\" aria-label=\"Filtre ' + photographers[i].tags[y]
                + '\"><span>#' + photographers[i].tags[y] + '</span></a>';
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
    return htmlListData;
}

/**
 * initHtmlFiltrePhotographer - stock la liste des photographes en fonction du filtre choisi
 * @param {Array} photographers liste des photographes
 * @param {String} filtre filtre choisi
 * @return {String} code html de la liste des photographes filtré
 */
function initHtmlFiltrePhotographer(photographers, filtre) {

    document.querySelector("header > p > a").style.display = "none";
    document.querySelector("section").style.justifyContent = "space-evenly";

    let htmlListData = "";
    // Parcours la liste des photographes
    for (let i = 0; i < photographers.length; i++) {
        // Parcours les tags du photographe
        for (let y = 0; y < photographers[i].tags.length; y++) {
            // Si le tag correspond au filtre demandé on stock tous les tags du photographe
            if (photographers[i].tags[y] === filtre) {
                let htmlListTag = "";
                for (let x = 0; x < photographers[i].tags.length; x++) {
                    if (photographers[i].tags[x] === filtre) {
                        // Ajout du tag égale au filtre
                        htmlListTag += '<a href=\"#' + photographers[i].tags[x]
                            + '\" class=\"tag\" style=\"color:white;background-color:#901C1C\" aria-label=\"Filtre '
                            + photographers[i].tags[x] + '\"><span>#' + photographers[i].tags[x] + '</span></a>';
                    } else {
                        // Ajout successif des autres tags
                        htmlListTag += '<a href=\"#' + photographers[i].tags[x]
                            + '\" class=\"tag\" aria-label=\"Filtre ' + photographers[i].tags[x] + '\"><span>#'
                            + photographers[i].tags[x] + '</span></a>';
                    }
                }
                // Ajout successif des photographes correspondant au filtre
                htmlListData += "<article id=\"" + photographers[i].id +
                    "\" aria-label=\"Photographe " + photographers[i].name +
                    "\" style=\"margin-left:0%;margin-right:0%;\"><a href=\"photographer.html?id="
                    + photographers[i].id + "\" aria-label=\"Lien page photographe\"><img src=\"Sample_Photos/Photographers_ID_Photos/"
                    + photographers[i].portrait + "\" alt=\"Portrait de " + photographers[i].name + "\" /><h2>"
                    + photographers[i].name + "</h2></a><p class=\"location\">" + photographers[i].city + ", "
                    + photographers[i].country + "</p><p class=\"tagline\">" + photographers[i].tagline
                    + "</p><p class=\"price\">" + photographers[i].price + "€/jour</p>" + htmlListTag + "</article>";
                break;
            }
        }
    }
    return htmlListData;
}

/**
 * handleNavFiltreTag - écoute les filtres de navigation
 * @return {String} renvoi la liste des photographes et le filtre de navigation cliqué a la function initPhotographer
 */
function handleNavFiltreTag(photographers) {
    const navTag = document.querySelector('nav > ul');
    // Parcours tous les filtres
    for (let i = 0; i < 8; i++) {
        let filtreNav = navTag.querySelectorAll('a.tag')[i];
        filtreNav.addEventListener('click', () => {
            filtreNav = filtreNav.innerText.toLowerCase().split('#').join('');
            initPhotographer(photographers, filtreNav);
        })
    }
}

/**
 * displayHtml - affiche le code html de la liste des photographes
 * @param {String} htmlListData code html de la liste des photographes
 */
function displayHtml(htmlListData) {
    document.querySelector('#contenu').innerHTML = htmlListData;
    // Fermeture du loader et affichage de la liste
    setTimeout(() => {
        document.querySelector('main > p').style.display = "none";
        document.querySelector('#contenu').style.opacity = 1;
    }, 2000);
}

/**
 * handleArticleFiltreTag - écoute les filtre des photographes
 * @return {String} renvoi la liste des photographes et le filtre du photographe cliqué a la function initPhotographer
 */
function handleArticleFiltreTag(photographers) {
    let section = document.querySelector('section');
    // Parcours la liste des photographes
    for (let i = 0; i < 6; i++) {
        if (section.querySelectorAll('article')[i]) {
            let article = section.querySelectorAll('article')[i];
            // Parcours les tags du photographe
            for (let y = 0; y < 4; y++) {
                if (article.querySelectorAll('a.tag')[y]) {
                    let filtreArticle = article.querySelectorAll('a.tag')[y];
                    filtreArticle.addEventListener('click', () => {
                        filtreArticle = filtreArticle.innerText.split('#').join('');
                        initPhotographer(photographers, filtreArticle);
                    })
                }
            }
        }
    }
}