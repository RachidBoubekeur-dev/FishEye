class Media {
    constructor(id, photographerId, media, alt, tags, likes, date, price, likeDefault) {
        this.id = id,
            this.photographerId = photographerId,
            this.media = media,
            this.alt = alt,
            this.tags = tags,
            this.likes = likes,
            this.date = date,
            this.price = price,
            this.likeDefault = likeDefault
    }
}

let idPhotographe = decodeURIComponent(urlPage).split('?id=')[1].split('#')[0];
let divTrie = document.querySelector('.trie');
let button1 = document.querySelector('.default');
let button2 = document.querySelector('.option1');
let button3 = document.querySelector('.option2');
let sectionMedia = document.querySelector('#media');
let lightbox = document.querySelector('#lightbox');

['click', 'keypress'].forEach(element => {
    divTrie.addEventListener(element, () => {
        if (divTrie.style.height === "117px") {
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
    ['click', 'keypress'].forEach(element => {
        selector.addEventListener(element, () => {
            let value1 = button1.textContent;
            let value2 = selector.textContent;
            button1.textContent = value2;
            button1.ariaLabel = 'Filtre ' + value2;
            selector.textContent = value1;
            selector.ariaLabel = 'Filtre ' + value1;
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
    handleModalForm();
    handleFiltreTag();
    handleLikeMedia();
    handleModalMedia();
    handleModalButton();
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
            localStorage.setItem('Name', photographers[i].name);
            localStorage.setItem('Price', photographers[i].price);
            let htmlListTag = "";
            for (let y = 0; y < photographers[i].tags.length; y++) {
                // Ajout successif des tags du photographe
                htmlListTag += "<a href=\"#contentinfo\" class=\"tag\" aria-label=\"Filtre " + photographers[i].tags[y]
                    + "\"><span>#" + photographers[i].tags[y] + "</span></a>";
            }
            // Ajout du photographe
            htmlPhotographer = "<div id=\"contentinfo\" role=\"contentinfo\"><h1 title=\"" + photographers[i].name + "\">" + photographers[i].name
                + "</h1><p class=\"location\">" + photographers[i].city
                + ", " + photographers[i].country + "</p><p class=\"tagline\">" + photographers[i].tagline + "</p>" + htmlListTag + "</div><div><button id=\"contact\" aria-pressed=\"false\" aria-label=\"Button de contact\">Contactez-moi</button></div><p><img src=\"Sample_Photos/Photographers_ID_Photos/"
                + photographers[i].portrait + "\" alt=\"Portrait de " + photographers[i].name + "\"  ></p>";
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
        if (media[i].photographerId == idPhotographe) {
            arrayMedia.push(new Media(media[i].id, media[i].photographerId, (media[i].image || media[i].video), media[i].alt, media[i].tags, media[i].likes, media[i].date, media[i].price, media[i].likes));
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
    if (filtre) {
        let htmlMedia = initHtmlMedia();
        displayHtml(htmlMedia);
        handleLikeMedia(JSON.stringify(arrayMedia));
        handleModalMedia(JSON.stringify(arrayMedia));
        for (let i = 0; i < 4; i++) {
            if (document.querySelector('#contentinfo').querySelectorAll('a.tag')[i]) {
                document.querySelector('#contentinfo').querySelectorAll('a.tag')[i].style.color = "#901C1C";
                document.querySelector('#contentinfo').querySelectorAll('a.tag')[i].style.background = "none";
            }
        }
    }
}

/**
 * initHtmlMedia - stock les média du photographe
 * @param {Array} arrayMedia liste des média du photographe
 * @return {String} code html des média du photographe
 */
function initHtmlMedia(filtreTag = false) {
    let totalLikes = 0;
    let htmlMedia = "";
    let arrayMedia;
    if (!filtreTag) arrayMedia = JSON.parse(localStorage.getItem('arrayMedia'));
    else arrayMedia = filtreTag;
    // Parcours la liste des média du photographe
    for (let i = 0; i < arrayMedia.length; i++) {
        let typeMedia = arrayMedia[i].media.split('.')[1];
        let srcMedia = localStorage.getItem('Name').split(' ')[0].split('-').join('_') + "/" + arrayMedia[i].media.replace('mp4', 'webp');
        let nameImage = arrayMedia[i].alt.split(',')[0];
        totalLikes += arrayMedia[i].likes;
        // Ajout successif des média du photographe
        htmlMedia += "<article class=\"" + arrayMedia[i].id + "\" role=\"document\"><p><img class=\"" + typeMedia + "\" src=\"Sample_Photos/" + srcMedia + "\" alt=\"" + arrayMedia[i].alt
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
    setTimeout(() => {
        htmlPhotographer
        document.querySelector('main > p').style.display = "none";
        document.querySelector('#info').style.opacity = 1;
        document.querySelector('#media').style.opacity = 1;
    }, 2000);
}

/**
 * handleModalForm - ouvre ou ferme la modal form contact
 */
function handleModalForm() {
    let contact = document.querySelector('#contact');
    let formBox = document.querySelector('#formBox');
    let closeFormBox = document.querySelector('.closeFormBox');
    document.querySelector('#formBox > div').ariaLabel += " " + localStorage.getItem('Name');
    document.querySelector('#formBox > div > h1').textContent += " " + localStorage.getItem('Name');
    ['click', 'keypress'].forEach(element => {
        contact.addEventListener(element, () => {
            formBox.style.display = "flex";
            setTimeout(() => { formBox.style.opacity = 1; }, 500);
            handleDataForm();
        });
        closeFormBox.addEventListener(element, () => {
            formBox.style.opacity = 0;
            setTimeout(() => { formBox.style.display = "none"; }, 500);
        });
    });
    window.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') {
            formBox.style.opacity = 0;
            setTimeout(() => { formBox.style.display = "none"; }, 500);
        }
    });
}

/**
 * handleDataForm - submit formulaire contact
 */
function handleDataForm() {
    const formContact = document.querySelector('form');
    const inputFirst = document.querySelector('#prénom');
    const inputName = document.querySelector('#nom');
    const inputEmail = document.querySelector('#email');
    const inputMsg = document.querySelector('#message');
    let formBox = document.querySelector('#formBox');

    formContact.addEventListener('submit', (e) => {
        e.preventDefault();;
        [inputFirst, inputName, inputEmail, inputMsg].forEach(element => {
            console.log(element.id + ': ' + element.value + ';');
        });
        alert('Message envoyé !');
        formBox.style.opacity = 0;
        setTimeout(() => { formBox.style.display = "none"; }, 500);
    });
}

/**
 * handleFiltreTag - filtre les média du photographe en fonction du tag activé 
 */
function handleFiltreTag() {
    let listTag = document.querySelector('#contentinfo');
    // Parcours les tags du photographe
    for (let i = 0; i < 4; i++) {
        if (listTag.querySelectorAll('a.tag')[i]) {
            let tag = listTag.querySelectorAll('a.tag')[i];
            ['click', 'keypress'].forEach(element => {
                tag.addEventListener(element, () => {
                    let arrayMedia = JSON.parse(localStorage.getItem('arrayMedia'));
                    // Si le même tag n'est pas déjà activé
                    if (listTag.querySelectorAll('a.tag')[i].style.color !== "white") {
                        for (let y = 0; y < 4; y++) {
                            if (listTag.querySelectorAll('a.tag')[y] && y !== i) {
                                listTag.querySelectorAll('a.tag')[y].style.color = "#901C1C";
                                listTag.querySelectorAll('a.tag')[y].style.background = "none";
                            }
                        }
                        listTag.querySelectorAll('a.tag')[i].style.color = "white";
                        listTag.querySelectorAll('a.tag')[i].style.background = "#901C1C";
                        let isFiltreTag = ({tags}) => tags[0] === tag.textContent.split('#')[1];
                        let arrayMediaFiltreTag = arrayMedia.filter(isFiltreTag);
                        let htmlMedia = initHtmlMedia(arrayMediaFiltreTag);
                        displayHtml(htmlMedia);
                        handleLikeMedia(JSON.stringify(arrayMediaFiltreTag), filtreTag = true);
                        handleModalMedia(JSON.stringify(arrayMediaFiltreTag));
                    } else {
                        listTag.querySelectorAll('a.tag')[i].style.color = "#901C1C";
                        listTag.querySelectorAll('a.tag')[i].style.background = "none";
                        let htmlMedia = initHtmlMedia(arrayMedia);
                        displayHtml(htmlMedia);
                        handleLikeMedia(JSON.stringify(arrayMedia));
                        handleModalMedia(JSON.stringify(arrayMedia));
                    }
                });
            });
        }
    }
}

/**
 * handleLikeMedia - incrémente ou décrémente 1 like du média liker
 * @param {Array} arrayMedia liste des média du photographe
 */
function handleLikeMedia(arrayMedia = false, filtreTag = false) {
    if (arrayMedia) arrayMedia = JSON.parse(arrayMedia);
    else arrayMedia = JSON.parse(localStorage.getItem('arrayMedia'));
    for (let i = 0; i < arrayMedia.length; i++) {
        let like = sectionMedia.querySelectorAll('article > p.likes')[i];
        ['click', 'keypress'].forEach(element => {
            like.addEventListener(element, () => {
                let totalLikes = sectionMedia.querySelector('aside > p.totalLikes');
                if (arrayMedia[i].likeDefault === parseInt(like.textContent)) {
                    like.innerHTML = (parseInt(like.textContent) + 1) + " <em class=\"fas fa-heart\" aria-hidden=\"true\"></em>";
                    totalLikes.innerHTML = (parseInt(totalLikes.textContent) + 1) + " <em class=\"fas fa-heart\" aria-hidden=\"true\"></em>";
                }
                else if (arrayMedia[i].likeDefault === (parseInt(like.textContent) - 1)) {
                    like.innerHTML = (parseInt(like.textContent) - 1) + " <em class=\"fas fa-heart\" aria-hidden=\"true\"></em>";
                    totalLikes.innerHTML = (parseInt(totalLikes.textContent) - 1) + " <em class=\"fas fa-heart\" aria-hidden=\"true\"></em>";
                }
                if (filtreTag) {
                    let idMedia = parseInt(sectionMedia.querySelector('article').className);
                    let origineArrayMedia = JSON.parse(localStorage.getItem('arrayMedia'));
                    let positionMedia;
                    for (let y = 0; y < origineArrayMedia.length; y++) {
                        if (origineArrayMedia[y].id === idMedia) {
                            positionMedia = y;
                            break;
                        }
                    }
                    origineArrayMedia[positionMedia].likes = parseInt(like.textContent);
                    localStorage.setItem('arrayMedia', JSON.stringify(origineArrayMedia));
                } else {
                    arrayMedia[i].likes = parseInt(like.textContent);
                    localStorage.setItem('arrayMedia', JSON.stringify(arrayMedia));
                }
            });
        });
    }
}

/**
 * handleModalMedia - écoute les articles au click ouvre la lithbox
 * @param {Array} arrayMedia liste des média du photographe
 */
function handleModalMedia(arrayMedia = false) {
    if (arrayMedia) arrayMedia = JSON.parse(arrayMedia);
    else arrayMedia = JSON.parse(localStorage.getItem('arrayMedia'));
    for (let i = 0; i < arrayMedia.length; i++) {
        let media = sectionMedia.querySelectorAll('article > p > img')[i];
        let typeMedia = media.className;
        let nameMedia = sectionMedia.querySelectorAll('article > p.name')[i].textContent;
        ['click', 'keypress'].forEach(element => {
            media.addEventListener(element, () => {
                lightbox.style.display = "flex";
                setTimeout(() => { lightbox.style.opacity = 1; }, 500);
                document.querySelector('#pMedia').className = i;
                if (typeMedia === "mp4") {
                    document.querySelector('.media').style.display = "none";
                    document.querySelector('.mediaVideo').style.display = "initial";
                    document.querySelector('.mediaVideo').src = media.src.replace('webp', 'mp4');
                    document.querySelector('.mediaVideo > a').href = media.src.replace('webp', 'mp4');
                    document.querySelector('.mediaVideo').poster = media.src;
                } else {
                    document.querySelector('.mediaVideo').style.display = "none";
                    document.querySelector('.media').style.display = "initial";
                    document.querySelector('.media').src = media.src;
                    document.querySelector('.media').alt = nameMedia;
                }
                document.querySelector('.nameMedia').textContent = nameMedia;
            });
        });
    }
}

/**
 * handleModalButton - écoute les buttons de la lithbox
 */
function handleModalButton() {
    arrayMedia = JSON.parse(localStorage.getItem('arrayMedia'));
    let closeLightbox = document.querySelector('.closeLightbox');
    let nextLightbox = document.querySelector('.nextLightbox');
    let previousLightbox = document.querySelector('.previousLightbox');
    // Au click souris ou entrée
    [nextLightbox, previousLightbox].forEach(selector => {
        ['click', 'keypress'].forEach(element => {
            closeLightbox.addEventListener(element, () => {
                document.querySelector('#pMedia').className = 0;
                lightbox.style.opacity = 0;
                setTimeout(() => { lightbox.style.display = "none"; }, 500);
            });
            selector.addEventListener(element, () => {
                let articleMediaMax;
                for (let i = 0; i < arrayMedia.length; i++) {
                    if(!sectionMedia.querySelectorAll('article')[i]){
                        articleMediaMax = i - 1;
                        break;
                    } else {
                        articleMediaMax = 9;
                    }
                }
                let numberMedia = parseInt(document.querySelector('#pMedia').className);
                for (let i = 0; i < arrayMedia.length; i++) {
                    if (selector === nextLightbox) {
                        if (!sectionMedia.querySelectorAll('article')[numberMedia + 1]) {
                            numberMedia = 0;
                            break;
                        } else {
                            numberMedia += 1;
                            break;
                        }
                    } else if (selector === previousLightbox) {
                        if (!sectionMedia.querySelectorAll('article')[numberMedia - 1]) {
                            numberMedia = articleMediaMax;
                            break;
                        } else {
                            numberMedia -= 1;
                            break;
                        }
                    }
                }

                let media = sectionMedia.querySelectorAll('article > p > img')[numberMedia];
                let mediaName = sectionMedia.querySelectorAll('article > p.name')[numberMedia].textContent;
                let typeMedia = media.className;
                if (typeMedia === "mp4") {
                    document.querySelector('.media').style.display = "none";
                    document.querySelector('.mediaVideo').style.display = "initial";
                    document.querySelector('.mediaVideo').src = media.src.replace('webp', 'mp4');
                    document.querySelector('.mediaVideo > a').href = media.src.replace('webp', 'mp4');
                    document.querySelector('.mediaVideo').poster = media.src;
                } else {
                    document.querySelector('.mediaVideo').style.display = "none";
                    document.querySelector('.media').style.display = "initial";
                    document.querySelector('.media').src = media.src;
                    document.querySelector('.media').alt = mediaName;
                    document.querySelector('.nameMedia').textContent = mediaName;
                }
                document.querySelector('#pMedia').className = numberMedia;
            });
        });
    });
    // Pour les touches echap, arrow left/right
    window.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') {
            document.querySelector('#pMedia').className = 0;
            lightbox.style.opacity = 0;
            setTimeout(() => { lightbox.style.display = "none"; }, 500);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            let articleMediaMax;
            for (let i = 0; i < arrayMedia.length; i++) {
                if(!sectionMedia.querySelectorAll('article')[i]){
                    articleMediaMax = i - 1;
                    break;
                } else {
                    articleMediaMax = 9;
                }
            }
            let numberMedia = parseInt(document.querySelector('#pMedia').className);
            for (let i = 0; i < arrayMedia.length; i++) {
                if (event.key === 'ArrowRight') {
                    if (!sectionMedia.querySelectorAll('article')[numberMedia + 1]) {
                        numberMedia = 0;
                        break;
                    } else {
                        numberMedia += 1;
                        break;
                    }
                }
                else if (event.key === 'ArrowLeft') {
                    if (!sectionMedia.querySelectorAll('article')[numberMedia - 1]) {
                        numberMedia = articleMediaMax;
                        break;
                    } else {
                        numberMedia -= 1;
                        break;
                    }
                }
            }
            let media = sectionMedia.querySelectorAll('article > p > img')[numberMedia];
            let mediaName = sectionMedia.querySelectorAll('article > p.name')[numberMedia].textContent;
            let typeMedia = media.className;
            if (typeMedia === "mp4") {
                document.querySelector('.media').style.display = "none";
                document.querySelector('.mediaVideo').style.display = "initial";
                document.querySelector('.mediaVideo').src = media.src.replace('webp', 'mp4');
                document.querySelector('.mediaVideo > a').href = media.src.replace('webp', 'mp4');
                document.querySelector('.mediaVideo').poster = media.src;
            } else {
                document.querySelector('.mediaVideo').style.display = "none";
                document.querySelector('.media').style.display = "initial";
                document.querySelector('.media').src = media.src;
                document.querySelector('.media').alt = mediaName;
                document.querySelector('.nameMedia').textContent = mediaName;
            }
            document.querySelector('#pMedia').className = numberMedia;
        }
    });
}