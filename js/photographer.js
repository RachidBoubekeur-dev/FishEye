class Media {
    constructor (id, photographerId, media, alt, tags, likes, date, price) {
        this.id = id,
        this.photographerId = photographerId,
        this.media = media,
        this.alt = alt,
        this.tags = tags,
        this.likes = likes,
        this.date = date,
        this.price = price
    }
}

let idPhotographe = decodeURIComponent(urlPage).split('?id=')[1];

let divTrie = document.querySelector('.trie');
let button1 = document.querySelector('.default');
let button2 = document.querySelector('.option1');
let button3 = document.querySelector('.option2');

['click', 'keypress'].forEach(element => {
    divTrie.addEventListener(element, () => {
        if(divTrie.style.height === "117px") {
            divTrie.style.height = "auto";
            button1.style.marginTop = "-3px";
            button1.style.marginBottom = "-4px";
            button2.style.display = "none";
            button3.style.display = "none";
            document.querySelector('.fa-chevron-up').style.transform = "rotate(180deg)";
        } else {
            divTrie.style.height = "117px";
            button1.style.marginTop = "0px";
            button1.style.marginBottom = "0px";
            button2.style.display = "block";
            button3.style.display = "block";
            document.querySelector('.fa-chevron-up').style.transform = "rotate(0deg)";
        } 
    });
});

[button2, button3].forEach(selector => {
    let option = selector;
    ['click', 'keypress'].forEach(element => {
        option.addEventListener(element, () => {
            let value1 = button1.textContent;
            let value2 = option.textContent;
            button1.textContent = value2;
            button1.ariaLabel = 'Filtre ' + value2;
            option.textContent = value1;
            option.ariaLabel = 'Filtre ' + value1;
            initMediaTrie(value2);
        });
    });
});

/**
 * initDataPage - initialise la liste des données reçu
 * @param {Array} photographers liste des photographes
 * @param {Array} media liste des média
 */
function initDataPage(photographers, media) {
    let htmlPhotographer = initHtmlPhotographer(photographers);
    initDataMedia(media);
    initMediaTrie(filtre = false);
    let htmlMedia = initHtmlMedia();
    displayHtml(htmlMedia, htmlPhotographer);
}

/**
 * initHtmlPhotographer - stock les informations du photographe
 * @param {Array} photographers liste des photographes
 * @return {String} code html des informations du photographe
 */
function initHtmlPhotographer(photographers) {
    let htmlPhotographer = "";
    // Parcours la liste des photographes
    for (let i = 0; i < photographers.length; i++) {
        if (photographers[i].id == idPhotographe) {
            localStorage.clear();
            localStorage.setItem('Name', photographers[i].name.split(' ')[0].split('-').join('_'));
            localStorage.setItem('Price', photographers[i].price);
            let htmlListTag = "";
            for (let y = 0; y < photographers[i].tags.length; y++) {
                // Ajout successif des tags du photographe
                htmlListTag += "<a href=\"#" + photographers[i].tags[y]
                    + "\" class=\"tag\" aria-label=\"Filtre " + photographers[i].tags[y]
                    + "\"><span>#" + photographers[i].tags[y] + "</span></a>";
            }
            // Ajout du photographe
            htmlPhotographer = "<div role=\"contentinfo\"><h1 title=\"" + photographers[i].name + "\">" + photographers[i].name
                + "</h1><p class=\"location\">" + photographers[i].city
                + ", " + photographers[i].country + "</p><p class=\"tagline\">" + photographers[i].tagline + "</p>" + htmlListTag + "</div><div><button id=\"contact\" aria-pressed=\"false\" aria-label=\"Button de contact\">Contactez-moi</button></div><p><img src=\"Sample_Photos/Photographers_ID_Photos/"
                + photographers[i].portrait + "\" alt=\"Portrait de " + photographers[i].name + "\"></p>";
            break;
        }
    }
    if (htmlPhotographer.length === 0) window.location.href = "index.html";
    return htmlPhotographer;
}

/**
 * initDataMedia - stock les média du photographe dans le localStorage
 * @param {Array} media liste des média
 */
 function initDataMedia(media) {
    let arrayMedia = [];
    // Parcours la liste des média
    for (let i = 0; i < media.length; i++) {
        if(media[i].photographerId == idPhotographe) {
            arrayMedia.push(new Media(media[i].id, media[i].photographerId, (media[i].image || media[i].video), media[i].alt, media[i].tags, media[i].likes, media[i].date, media[i].price));
        }
    }
    localStorage.setItem('arrayMedia', JSON.stringify(arrayMedia));
}

/**
 * initMediaTrie - filtre les média du photographe
 * @param {String} filtre valeur du filtre
 */
 function initMediaTrie(filtre) {
    let arrayMedia = JSON.parse(localStorage.getItem('arrayMedia'));
    if (filtre === false || filtre === 'Popularité') arrayMedia.sort((a, b) => b.likes - a.likes);
    else if (filtre === 'Date') arrayMedia.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    else if (filtre === 'Titre') arrayMedia.sort((a, b) => a.alt.localeCompare(b.alt));
    localStorage.setItem('arrayMedia', JSON.stringify(arrayMedia));
    if(filtre) {
        let htmlMedia = initHtmlMedia();
        displayHtml(htmlMedia);
    }
}

/**
 * initHtmlMedia - stock les média du photographe
 * @param {Array} arrayMedia liste des média du photographe
 * @return {String} code html des média du photographe
 */
 function initHtmlMedia() {
    let totalLikes = 0;
    let htmlMedia = "";
    let arrayMedia = JSON.parse(localStorage.getItem('arrayMedia'));
    // Parcours la liste des média du photographe
    for(let i = 0; i < arrayMedia.length; i++) {
        let srcMedia = localStorage.getItem('Name') + "/" + arrayMedia[i].media.replace('mp4', 'webp');
        let nameImage = arrayMedia[i].alt.split(',')[0];
        totalLikes += arrayMedia[i].likes;
        // Ajout successif des média du photographe
        htmlMedia += "<article role=\"document\"><p><img src=\"Sample_Photos/" + srcMedia + "\" alt=\"" + arrayMedia[i].alt
            + "\" tabindex=\"0\" /></p><p class=\"name\" title=\"" + nameImage + "\">" + nameImage
            + "</p><p class=\"price\">" + arrayMedia[i].price + " €</p><p class=\"likes\" tabindex=\"0\" aria-label=\"Nombre de like\">"
            + arrayMedia[i].likes + " <em class=\"fas fa-heart\"></em></p></article>";
    }
    htmlMedia += "<aside role=\"complementary\"><p class=\"totalLikes\">" + totalLikes + " <em class=\"fas fa-heart\"></em></p><p>" + localStorage.getItem('Price') + "€ / jour</p></aside>";
    return htmlMedia;
}

/**
 * displayHtml - affiche le code html
 * @param  {String} htmlMedia code html des média du photographe
 * @param  {String} htmlPhotographer code html du photographe 
 */
function displayHtml(htmlMedia, htmlPhotographer = false) {
    document.querySelector('#media').innerHTML = htmlMedia;
    if (htmlPhotographer) document.querySelector('#info').innerHTML = htmlPhotographer;
    // Fermeture du loader et affichage du code html
    setTimeout(() => {htmlPhotographer
        document.querySelector('main > p').style.display = "none";
        document.querySelector('#info').style.opacity = 1;
        document.querySelector('#media').style.opacity = 1;
    }, 2000);
}