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
    let htmlMedia = initHtmlMedia(media);
    displayHtml(htmlPhotographer, htmlMedia);
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
 * initHtmlMedia - stock les média du photographe
 * @param {Array} media liste des média
 * @return {String} code html des média
 */
 function initHtmlMedia(media) {
    let totalLikes = 0;
    let htmlMedia = "";
    // Parcours la liste des média
    for(let i = 0; i < media.length; i++) {
        if(media[i].photographerId == idPhotographe) {
            totalLikes += media[i].likes;
            if (media[i].image) {
                localStorage.setItem('Image', media[i].image);
                localStorage.setItem('NameImage', media[i].image.split('.')[0].split('_').join(' '));
            } else {
                localStorage.setItem('Image', media[i].video.replace('mp4', 'webp'));
                localStorage.setItem('NameImage', media[i].video.split('.')[0].split('_').join(' '));
            }
            // Ajout successif des média du photographe
            htmlMedia += "<article role=\"document\"><p><img src=\"Sample_Photos/" + localStorage.getItem('Name')
                + "/" + localStorage.getItem('Image') + "\" alt=\"" + localStorage.getItem('NameImage')
                + ", close-up view\" tabindex=\"0\" /></p><p class=\"name\" title=\"" + localStorage.getItem('NameImage') + "\">" + localStorage.getItem('NameImage')
                + "</p><p class=\"price\">" + media[i].price + " €</p><p class=\"likes\" tabindex=\"0\" aria-label=\"Nombre de like\">"
                + media[i].likes + " <em class=\"fas fa-heart\"></em></p></article>";
        }
    }
    htmlMedia += "<aside role=\"complementary\"><p class=\"totalLikes\">" + totalLikes + " <em class=\"fas fa-heart\"></em></p><p>" + localStorage.getItem('Price') + "€ / jour</p></aside>";
    return htmlMedia;
}

/**
 * displayHtml - affiche le code html
 * @param  {String} htmlPhotographer code html du photographe
 * @param  {String} htmlMedia code html des média du photographe
 */
function displayHtml(htmlPhotographer, htmlMedia) {
    document.querySelector('#info').innerHTML = htmlPhotographer;
    document.querySelector('#media').innerHTML = htmlMedia;
    // Fermeture du loader et affichage du code html
    setTimeout(() => {
        document.querySelector('main > p').style.display = "none";
        document.querySelector('#info').style.opacity = 1;
        document.querySelector('#media').style.opacity = 1;
    }, 2000);
}