/**
 * dataFactory - Factory function
 */
const dataFactory = () => {

    /**
     * setPhotographer - stock le photographe dans le tableau arrayPhotographer
     * @param  {Int} id id du photographe
     * @param  {String} name nom du photographe
     * @param  {String} city ville du photographe
     * @param  {String} country pays du photographe
     * @param  {Array} tags tags du photographe
     * @param  {String} tagline tagline du photographe
     * @param  {Int} price prix du photographe
     * @param  {String} portrait nom du fichier d'image du photographe
    */
    const setPhotographer = (id, name, city, country, tags, tagline, price, portrait) => {
        arrayPhotographer.push({ id, name, city, country, tags, tagline, price, portrait });
    };
    
    /**
     * getPhotographer - retourne le tableau arrayPhotographer
     * @returns  {Array} tableau arrayPhotographer contenant les données du photographe
     */
    const getPhotographer = () => { return arrayPhotographer; };

    /**
     * initMedia - stock les médias du photographe dans le tableau arrayMedia
     * @param  {Int} id id du média
     * @param  {Int} photographerId id du photographe
     * @param  {String} media nom du fichier de l'image ou de la vidéo
     * @param  {String} alt description du média
     * @param  {Array} tags tags du média
     * @param  {Int} likes nombre de likeS du média
     * @param  {String} date date du média
     * @param  {Int} price prix du média
     * @param  {Int} likeDefault nombre de likeS du média
     */
    const initMedia = (id, photographerId, media, alt, tags, likes, date, price, likeDefault) => {
        arrayMedia.push({ id, photographerId, media, alt, tags, likes, date, price, likeDefault });
    };
    
    /**
     * setMedia - stock les données dans le tableau arrayMedia
     * @param  {Array} dataMedia tableau contenant les médias du photographe
     */
    const setMedia = (dataMedia) => { arrayMedia = dataMedia; };

    /**
     * getMedia - retourne le tableau arrayMedia
     * @returns  {Array} tableau arrayMedia contenant les médias du photographe
     */
    const getMedia = () => { return arrayMedia; };

    /**
     * filtrePopulariter - filtre les médias du photographe par leur popularité décroissante
     */
    const filtrePopulariter = () => { arrayMedia.sort((a, b) => b.likes - a.likes); };

    /**
     * filtreDate - filtre les médias du photographe par leur date décroissante
     */
    const filtreDate = () => { arrayMedia.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); };

    /**
     * filtreTitre - filtre les médias du photographe par leur titre décroissante
     */
    const filtreTitre = () => { arrayMedia.sort((a, b) => a.alt.localeCompare(b.alt)); };

    return { setPhotographer, getPhotographer, initMedia, setMedia, getMedia, filtrePopulariter, filtreDate, filtreTitre };
};

const factory = dataFactory();
let arrayPhotographer = [];
let arrayMedia = [];

// eslint-disable-next-line no-undef
const idPhotographe = decodeURIComponent(urlPage).split('?id=')[1].split('#')[0];
let divTrie = document.querySelector('.trie');
let button1 = document.querySelector('.default');
let button2 = document.querySelector('.option1');
let button3 = document.querySelector('.option2');
let sectionMedia = document.querySelector('#media');
let lightbox = document.querySelector('#lightbox');

['click', 'keypress'].forEach(element => {
    divTrie.addEventListener(element, () => {
        if (divTrie.style.height === '117px') {
            divTrie.style.height = 'auto';
            button1.style.marginTop = '-3px';
            button1.style.marginBottom = '-4px';
            button2.style.display = 'none';
            button3.style.display = 'none';
            document.querySelector('.fa-chevron-up').style.transform = 'rotate(180deg)';
        } else {
            divTrie.style.height = '117px';
            button1.style.marginTop = '0px';
            button1.style.marginBottom = '0px';
            button2.style.display = 'block';
            button3.style.display = 'block';
            document.querySelector('.fa-chevron-up').style.transform = 'rotate(0deg)';
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
 * initDataPage - initialise la page
 * @param {Array} photographers liste des photographes
 * @param {Array} media liste des média
 */
// eslint-disable-next-line no-unused-vars
const initDataPage = (photographers, media) => {
    initDataPhotographer(photographers);
    const htmlPhotographer = initHtmlPhotographer();
    initDataMedia(media);
    let filtre = false;
    initMediaTrie(filtre);
    const htmlMedia = initHtmlMedia();
    displayHtml(htmlMedia, htmlPhotographer);
    handleModalForm();
    handleFiltreTag();
    handleLikeMedia();
    handleModalMedia();
    handleModalButton();
};

/**
 * initDataPhotographer - envoie les données du photographe à la factory
 * @param {Array} photographers liste des photographes
 */
const initDataPhotographer = (photographers) => {
    for (let i = 0; i < photographers.length; i++) {
        if (photographers[i].id == idPhotographe) {
            factory.setPhotographer(photographers[i].id, photographers[i].name, photographers[i].city, photographers[i].country, photographers[i].tags, photographers[i].tagline, photographers[i].price, photographers[i].portrait);
        }
    }
    if (arrayPhotographer.length === 0) window.location.href = 'index.html';
};

/**
 * initHtmlPhotographer - met en forme le html des informations du photographe
 * @return {String} code html des informations du photographe
 */
const initHtmlPhotographer = () => {
    const photographer = factory.getPhotographer();
    let htmlListTag = '';
    for (let i = 0; i < photographer[0].tags.length; i++) {
        // Ajout successif des tags du photographe
        htmlListTag += `<a href="#contentinfo" class="tag" aria-label="
        Filtre ${photographer[0].tags[i]}"><span>#${photographer[0].tags[i]}</span></a>`;
    }
    // Ajout du photographe
    const htmlPhotographer = `<div id="contentinfo" role="contentinfo"><h1 title="
    ${photographer[0].name}">${photographer[0].name}</h1>
    <p class="location">${photographer[0].city}, ${photographer[0].country}</p>
    <p class="tagline">${photographer[0].tagline}</p>${htmlListTag}</div>
    <div><button id="contact" aria-pressed="false" aria-label="Button de contact">Contactez-moi</button>
    </div><p><img src="Sample_Photos/Photographers_ID_Photos/${photographer[0].portrait}" alt="Portrait de ${photographer[0].name}" ></p>`;
    return htmlPhotographer;
};

/**
 * initDataMedia - envoie les médias du photographe à la factory
 */
const initDataMedia = (media) => {
    // Parcours la liste des média
    for (let i = 0; i < media.length; i++) {
        if (media[i].photographerId == idPhotographe) {
            factory.initMedia(media[i].id, media[i].photographerId, (media[i].image || media[i].video), media[i].alt, media[i].tags, media[i].likes, media[i].date, media[i].price, media[i].likes);
        }
    }
};

/**
 * initMediaTrie - filtre les médias du photographe
 * @param {String} filtre valeur du filtre
 */
const initMediaTrie = (filtre) => {
    if (filtre === false || filtre === 'Popularité') factory.filtrePopulariter();
    else if (filtre === 'Date') factory.filtreDate();
    else if (filtre === 'Titre') factory.filtreTitre();
    if (filtre) {
        const htmlMedia = initHtmlMedia();
        displayHtml(htmlMedia);
        handleLikeMedia();
        handleModalMedia();
        for (let i = 0; i < 4; i++) {
            if (document.querySelector('#contentinfo').querySelectorAll('a.tag')[i]) {
                document.querySelector('#contentinfo').querySelectorAll('a.tag')[i].style.color = '#901C1C';
                document.querySelector('#contentinfo').querySelectorAll('a.tag')[i].style.background = 'none';
            }
        }
    }
};

/**
 * initHtmlMedia - met en forme le html des médias du photographe
 * @param {Array} mediaFiltreTag liste des média du photographe filtré
 * @return {String} code html des média du photographe
 */
const initHtmlMedia = (mediaFiltreTag = false) => {
    let totalLikes = 0;
    let htmlMedia = '';
    const photographer = factory.getPhotographer();
    let dataMedia;
    if (!mediaFiltreTag) dataMedia = factory.getMedia();
    else dataMedia = mediaFiltreTag;
    // Parcours la liste des médias du photographe
    for (let i = 0; i < dataMedia.length; i++) {
        let typeMedia = dataMedia[i].media.split('.')[1];
        let srcMedia = photographer[0].name.split(' ')[0].split('-').join('_') + '/' + dataMedia[i].media.replace('mp4', 'webp');
        let nameImage = dataMedia[i].alt.split(',')[0];
        totalLikes += dataMedia[i].likes;
        // Ajout successif des médias du photographe
        htmlMedia += `<article class="${dataMedia[i].id}" role="document"><p>
        <img class="${typeMedia}" src="Sample_Photos/${srcMedia}" alt="${dataMedia[i].alt}" tabindex="0" /></p>
        <p class="name" title="${nameImage}">${nameImage}</p><p class="price">${dataMedia[i].price} €</p>
        <p class="likes" tabindex="0" aria-label="Nombre de like">${dataMedia[i].likes} <em class="fas fa-heart"></em></p></article>`;
    }
    htmlMedia += `<aside role="complementary"><p class="totalLikes">${totalLikes} <em class="fas fa-heart"></em></p><p>${photographer[0].price}€ / jour</p></aside>`;
    return htmlMedia;
};

/**
 * displayHtml - affiche le code html
 * @param  {String} htmlMedia code html des médias du photographe
 * @param  {String} htmlPhotographer code html du photographe 
 */
const displayHtml = (htmlMedia, htmlPhotographer = false) => {
    document.querySelector('#media').innerHTML = htmlMedia;
    if (htmlPhotographer) document.querySelector('#info').innerHTML = htmlPhotographer;
    // Fermeture du loader et affichage du code html
    setTimeout(() => {
        document.querySelector('main > p').style.display = 'none';
        document.querySelector('#info').style.opacity = 1;
        document.querySelector('#media').style.opacity = 1;
    }, 2000);
};

/**
 * handleModalForm - manipule la modal form contact
 */
const handleModalForm = () => {
    let contact = document.querySelector('#contact');
    let formBox = document.querySelector('#formBox');
    let closeFormBox = document.querySelector('.closeFormBox');
    const photographer = factory.getPhotographer();
    document.querySelector('#formBox > div').ariaLabel += ' ' + photographer[0].name;
    document.querySelector('#formBox > div > h1').textContent += ' ' + photographer[0].name;
    ['click', 'keypress'].forEach(element => {
        contact.addEventListener(element, () => {
            formBox.style.display = 'flex';
            setTimeout(() => { formBox.style.opacity = 1; }, 500);
            handleDataForm();
        });
        closeFormBox.addEventListener(element, () => {
            formBox.style.opacity = 0;
            setTimeout(() => { formBox.style.display = 'none'; }, 500);
        });
    });
    window.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') {
            formBox.style.opacity = 0;
            setTimeout(() => { formBox.style.display = 'none'; }, 500);
        }
    });
};

/**
 * handleDataForm - submit formulaire contact
 */
const handleDataForm = () => {
    const formContact = document.querySelector('form');
    const inputFirst = document.querySelector('#prénom');
    const inputName = document.querySelector('#nom');
    const inputEmail = document.querySelector('#email');
    const inputMsg = document.querySelector('#message');
    let formBox = document.querySelector('#formBox');

    formContact.addEventListener('submit', (e) => {
        e.preventDefault();
        [inputFirst, inputName, inputEmail, inputMsg].forEach(element => {
            console.log(element.id + ': ' + element.value + ';');
        });
        formBox.style.opacity = 0;
        setTimeout(() => { formBox.style.display = 'none'; }, 500);
    });
};

/**
 * handleFiltreTag - filtre les média du photographe en fonction du tag activé 
 */
const handleFiltreTag = () => {
    let listTag = document.querySelector('#contentinfo');
    // Parcours les tags du photographe
    for (let i = 0; i < 4; i++) {
        if (listTag.querySelectorAll('a.tag')[i]) {
            let tag = listTag.querySelectorAll('a.tag')[i];
            ['click', 'keypress'].forEach(element => {
                tag.addEventListener(element, () => {
                    let dataMedia = factory.getMedia();
                    // Si le même tag n'est pas déjà activé
                    if (listTag.querySelectorAll('a.tag')[i].style.color !== 'white') {
                        for (let y = 0; y < 4; y++) {
                            if (listTag.querySelectorAll('a.tag')[y] && y !== i) {
                                listTag.querySelectorAll('a.tag')[y].style.color = '#901C1C';
                                listTag.querySelectorAll('a.tag')[y].style.background = 'none';
                            }
                        }
                        listTag.querySelectorAll('a.tag')[i].style.color = 'white';
                        listTag.querySelectorAll('a.tag')[i].style.background = '#901C1C';
                        let isFiltreTag = ({ tags }) => tags[0] === tag.textContent.split('#')[1];
                        const dataMediaFiltreTag = dataMedia.filter(isFiltreTag);
                        const htmlMedia = initHtmlMedia(dataMediaFiltreTag);
                        displayHtml(htmlMedia);
                        let filtreTag = true;
                        handleLikeMedia(dataMediaFiltreTag, filtreTag);
                        handleModalMedia(dataMediaFiltreTag);
                    } else {
                        listTag.querySelectorAll('a.tag')[i].style.color = '#901C1C';
                        listTag.querySelectorAll('a.tag')[i].style.background = 'none';
                        const htmlMedia = initHtmlMedia(dataMedia);
                        displayHtml(htmlMedia);
                        handleLikeMedia();
                        handleModalMedia();
                    }
                });
            });
        }
    }
};

/**
 * handleLikeMedia - incrémente ou décrémente 1 like du média liker
 * @param {Array} dataMediaFiltreTag liste des média du photographe filtré
 * @param {Boolean} filtreTag filtre activé ou pas
 */
function handleLikeMedia(dataMediaFiltreTag = false, filtreTag = false) {
    let dataMedia;
    if (dataMediaFiltreTag) dataMedia = dataMediaFiltreTag;
    else dataMedia = factory.getMedia();
    for (let i = 0; i < dataMedia.length; i++) {
        let like = sectionMedia.querySelectorAll('article > p.likes')[i];
        ['click', 'keypress'].forEach(element => {
            like.addEventListener(element, () => {
                let totalLikes = sectionMedia.querySelector('aside > p.totalLikes');
                if (dataMedia[i].likeDefault === parseInt(like.textContent)) {
                    like.innerHTML = (parseInt(like.textContent) + 1) + ' <em class="fas fa-heart" aria-hidden="true"></em>';
                    totalLikes.innerHTML = (parseInt(totalLikes.textContent) + 1) + ' <em class="fas fa-heart" aria-hidden="true"></em>';
                }
                else if (dataMedia[i].likeDefault === (parseInt(like.textContent) - 1)) {
                    like.innerHTML = (parseInt(like.textContent) - 1) + ' <em class="fas fa-heart" aria-hidden="true"></em>';
                    totalLikes.innerHTML = (parseInt(totalLikes.textContent) - 1) + ' <em class="fas fa-heart" aria-hidden="true"></em>';
                }
                if (filtreTag) {
                    const idMedia = parseInt(sectionMedia.querySelector('article').className);
                    let origineDataMedia = factory.getMedia();
                    let positionMedia;
                    for (let y = 0; y < origineDataMedia.length; y++) {
                        if (origineDataMedia[y].id === idMedia) {
                            positionMedia = y;
                            break;
                        }
                    }
                    origineDataMedia[positionMedia].likes = parseInt(like.textContent);
                    factory.setMedia(origineDataMedia);
                } else {
                    dataMedia[i].likes = parseInt(like.textContent);
                    factory.setMedia(dataMedia);
                }
            });
        });
    }
}

/**
 * handleModalMedia - manipule les articles au click ouvre la lithbox
 * @param {Array} dataMediaFiltreTag liste des média du photographe filtré
 */
const handleModalMedia = (dataMediaFiltreTag = false) => {
    let dataMedia;
    if (dataMediaFiltreTag) dataMedia = dataMediaFiltreTag;
    else dataMedia = factory.getMedia();
    for (let i = 0; i < dataMedia.length; i++) {
        let media = sectionMedia.querySelectorAll('article > p > img')[i];
        const typeMedia = media.className;
        const nameMedia = sectionMedia.querySelectorAll('article > p.name')[i].textContent;
        ['click', 'keypress'].forEach(element => {
            media.addEventListener(element, () => {
                lightbox.style.display = 'flex';
                setTimeout(() => { lightbox.style.opacity = 1; }, 500);
                document.querySelector('#pMedia').className = i;
                if (typeMedia === 'mp4') {
                    document.querySelector('.media').style.display = 'none';
                    document.querySelector('.mediaVideo').style.display = 'initial';
                    document.querySelector('.mediaVideo').src = media.src.replace('webp', 'mp4');
                    document.querySelector('.mediaVideo > a').href = media.src.replace('webp', 'mp4');
                    document.querySelector('.mediaVideo').poster = media.src;
                } else {
                    document.querySelector('.mediaVideo').style.display = 'none';
                    document.querySelector('.media').style.display = 'initial';
                    document.querySelector('.media').src = media.src;
                    document.querySelector('.media').alt = nameMedia;
                }
                document.querySelector('.nameMedia').textContent = nameMedia;
            });
        });
    }
};

/**
 * handleModalButton - manipule les buttons de la lithbox
 */
const handleModalButton = () => {
    const dataMedia = factory.getMedia();
    const closeLightbox = document.querySelector('.closeLightbox');
    const nextLightbox = document.querySelector('.nextLightbox');
    const previousLightbox = document.querySelector('.previousLightbox');
    // Au click souris ou entrée
    [nextLightbox, previousLightbox].forEach(selector => {
        ['click', 'keypress'].forEach(element => {
            closeLightbox.addEventListener(element, () => {
                document.querySelector('#pMedia').className = 0;
                lightbox.style.opacity = 0;
                setTimeout(() => { lightbox.style.display = 'none'; }, 500);
            });
            selector.addEventListener(element, () => {
                let articleMediaMax;
                for (let i = 0; i < dataMedia.length; i++) {
                    if (!sectionMedia.querySelectorAll('article')[i]) {
                        articleMediaMax = i - 1;
                        break;
                    } else {
                        articleMediaMax = 9;
                    }
                }
                let numberMedia = parseInt(document.querySelector('#pMedia').className);
                for (let i = 0; i < dataMedia.length; i++) {
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
                if (typeMedia === 'mp4') {
                    document.querySelector('.media').style.display = 'none';
                    document.querySelector('.mediaVideo').style.display = 'initial';
                    document.querySelector('.mediaVideo').src = media.src.replace('webp', 'mp4');
                    document.querySelector('.mediaVideo > a').href = media.src.replace('webp', 'mp4');
                    document.querySelector('.mediaVideo').poster = media.src;
                } else {
                    document.querySelector('.mediaVideo').style.display = 'none';
                    document.querySelector('.media').style.display = 'initial';
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
            setTimeout(() => { lightbox.style.display = 'none'; }, 500);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            let articleMediaMax;
            for (let i = 0; i < dataMedia.length; i++) {
                if (!sectionMedia.querySelectorAll('article')[i]) {
                    articleMediaMax = i - 1;
                    break;
                } else {
                    articleMediaMax = 9;
                }
            }
            let numberMedia = parseInt(document.querySelector('#pMedia').className);
            for (let i = 0; i < dataMedia.length; i++) {
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
            if (typeMedia === 'mp4') {
                document.querySelector('.media').style.display = 'none';
                document.querySelector('.mediaVideo').style.display = 'initial';
                document.querySelector('.mediaVideo').src = media.src.replace('webp', 'mp4');
                document.querySelector('.mediaVideo > a').href = media.src.replace('webp', 'mp4');
                document.querySelector('.mediaVideo').poster = media.src;
            } else {
                document.querySelector('.mediaVideo').style.display = 'none';
                document.querySelector('.media').style.display = 'initial';
                document.querySelector('.media').src = media.src;
                document.querySelector('.media').alt = mediaName;
                document.querySelector('.nameMedia').textContent = mediaName;
            }
            document.querySelector('#pMedia').className = numberMedia;
        }
    });
};