window.addEventListener('scroll', () => {
    if (window.scrollY <= 100) {
        document.querySelector('header > p > a').style.top = '15px';
    }
    else {
        document.querySelector('header > p > a').style.top = '-50px';
    }
});

/**
 * dataFactory - Factory function
 */
const dataFactory = () => {

    /**
     * setPhotographers - stock les photographes dans le tableau arrayPhotographers
     * @param  {Int} id id du photographe
     * @param  {String} name nom du photographe
     * @param  {String} city ville du photographe
     * @param  {String} country pays du photographe
     * @param  {Array} tags tags du photographe
     * @param  {String} tagline tagline du photographe
     * @param  {Int} price prix du photographe
     * @param  {String} portrait nom du fichier d'image du photographe
     */
    const setPhotographers = (id, name, city, country, tags, tagline, price, portrait) => {
        arrayPhotographers.push({ id, name, city, country, tags, tagline, price, portrait });
    };
    
    /**
     * getPhotographers - retourne le tableau arrayPhotographers
     * @returns  {Array} tableau arrayPhotographers contenant la liste des photographes
     */
    const getPhotographers = () => { return arrayPhotographers; };
    return { setPhotographers, getPhotographers };
};

const factory = dataFactory();
let arrayPhotographers = [];
const navTag = document.querySelector('nav > ul');
const section = document.querySelector('section');

/**
 * initDataPage - initialise la page
 * @param {Array} photographers liste des photographes
 */
// eslint-disable-next-line no-unused-vars
const initDataPage = (photographers) => {
    initDataPhotographer(photographers);
    const htmlListData = initHtmlPhotographer();
    handleNavFiltreTag();
    displayHtml(htmlListData);
    handleArticleFiltreTag();
};

/**
 * initDataPhotographer - envoie les données à la factory
 * @param {Array} photographers liste des photographes
 */
const initDataPhotographer = (photographers) => {
    for (let i = 0; i < photographers.length; i++) {
        factory.setPhotographers(photographers[i].id, photographers[i].name, photographers[i].city, photographers[i].country, photographers[i].tags, photographers[i].tagline, photographers[i].price, photographers[i].portrait);
    }
};

/**
 * initHtmlPhotographer - met en formes html la liste des photographes
 * @param {Array} photographers liste des photographes filtrés
 * @return {String} code html de la liste des photographes
 */
const initHtmlPhotographer = (photographers = false) => {
    if (!photographers) photographers = factory.getPhotographers();
    let htmlListData = '';
    // Parcours la liste des photographes
    for (let i = 0; i < photographers.length; i++) {
        let htmlListTag = '';
        // Parcours les tags du photographe
        for (let y = 0; y < photographers[i].tags.length; y++) {
            // Ajout successif des tags
            htmlListTag += `<a href="#${photographers[i].tags[y]}" class="tag" aria-label="
            Filtre ${photographers[i].tags[y]}"><span>#${photographers[i].tags[y]}</span></a>`;
        }
        // Ajout successif des photographes
        htmlListData += `<article id="${photographers[i].id}" aria-label="
        Photographe ${photographers[i].name}"><a href="photographer.html?id=${photographers[i].id}"
        aria-label="Lien page photographe"><img src="Sample_Photos/Photographers_ID_Photos/${photographers[i].portrait}" alt="Portrait de ${photographers[i].name}" />
        <h2>${photographers[i].name}</h2></a><p class="location">${photographers[i].city}, ${photographers[i].country}</p>
        <p class="tagline">${photographers[i].tagline}</p><p class="price">${photographers[i].price}€/jour</p>${htmlListTag}</article>`;
    }
    return htmlListData;
};

/**
 * initDataFiltrePhotographer - filtre la liste des photographes en fonction du filtre demandé
 * @param {String} filtre filtre demandé
 */
const initDataFiltrePhotographer = (filtre) => {
    let photographers = factory.getPhotographers();
    const photographersFiltre = photographers.filter(photographer => {
        return photographer.tags.includes(filtre);
    });
    const htmlListData = initHtmlPhotographer(photographersFiltre);
    displayHtml(htmlListData, filtre);
    handleArticleFiltreTag();
};

/**
 * handleNavFiltreTag - écoute les filtres de navigation
 */
const handleNavFiltreTag = () => {
    // Parcours tous les filtres
    for (let i = 0; i < 8; i++) {
        let filtreNav = navTag.querySelectorAll('li > a.tag')[i];
        filtreNav.addEventListener('click', () => {
            if (filtreNav.style.color !== 'white') {
                initDataFiltrePhotographer(filtreNav.innerText.toLowerCase().split('#')[1]);
            } else {
                const htmlListData = initHtmlPhotographer();
                displayHtml(htmlListData);
            }
        });
    }
};

/**
 * displayHtml - affiche le code et le style html de la liste des photographes
 * @param {String} htmlListData code html de la liste des photographes
 * @param {String} filtre filtre demandé
 */
const displayHtml = (htmlListData, filtre = false) => {
    document.querySelector('#contenu').innerHTML = htmlListData;
    window.addEventListener('click', () => {
        if (filtre) {
            document.querySelector('header > p > a').style.display = 'none';
            document.querySelector('section').style.justifyContent = 'space-evenly';
            if (section.querySelector('article:nth-of-type(2)')) section.querySelector('article:nth-of-type(2)').style.flex = 'initial';
            for (let i = 0; i < 8; i++) {
                let filtreNav = navTag.querySelectorAll('a.tag')[i];
                filtreNav.style.color = '#901C1C';
                filtreNav.style.backgroundColor = 'white';
                if (filtreNav.innerText.toLowerCase().split('#')[1] === filtre) {
                    filtreNav.style.color = 'white';
                    filtreNav.style.backgroundColor = '#901C1C';
                }
            }
            for (let i = 0; i < 6; i++) {
                if (section.querySelectorAll('article')[i]) {
                    let article = section.querySelectorAll('article')[i];
                    // Parcours les tags du photographe
                    for (let y = 0; y < 4; y++) {
                        if (article.querySelectorAll('a.tag')[y]) {
                            let filtreArticle = article.querySelectorAll('a.tag')[y];
                            filtreArticle.style.color = '#901C1C';
                            filtreArticle.style.backgroundColor = 'white';
                            if (filtreArticle.innerText.toLowerCase().split('#')[1] === filtre) {
                                filtreArticle.style.color = 'white';
                                filtreArticle.style.backgroundColor = '#901C1C';
                            }
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < 8; i++) {
                let filtreNav = navTag.querySelectorAll('a.tag')[i];
                filtreNav.style.color = '#901C1C';
                filtreNav.style.backgroundColor = 'white';
            }
            for (let i = 0; i < 6; i++) {
                if (section.querySelectorAll('article')[i]) {
                    let article = section.querySelectorAll('article')[i];
                    // Parcours les tags du photographe
                    for (let y = 0; y < 4; y++) {
                        if (article.querySelectorAll('a.tag')[y]) {
                            let filtreArticle = article.querySelectorAll('a.tag')[y];
                            filtreArticle.style.color = '#901C1C';
                            filtreArticle.style.backgroundColor = 'white';
                        }
                    }
                }
            }
            document.querySelector('header > p > a').style.display = 'block';
            document.querySelector('section').style.justifyContent = 'space-between';
            if (window.screen.width >= 1660) section.querySelector('article:nth-of-type(2)').style.flex = '44%';
            else if (window.screen.width >= 1292) section.querySelector('article:nth-of-type(2)').style.flex = '42%';
            else if (window.screen.width >= 1095) section.querySelector('article:nth-of-type(2)').style.flex = '40%';
            else section.querySelector('article:nth-of-type(2)').style.flex = 'initial', section.style.justifyContent = 'space-evenly';
        }
    });
    // Fermeture du loader et affichage de la liste
    setTimeout(() => {
        document.querySelector('main > p').style.display = 'none';
        document.querySelector('#contenu').style.opacity = 1;
    }, 2000);
};

/**
 * handleArticleFiltreTag - écoute les filtre des photographes
 */
const handleArticleFiltreTag = () => {
    // Parcours la liste des photographes
    for (let i = 0; i < 6; i++) {
        if (section.querySelectorAll('article')[i]) {
            let article = section.querySelectorAll('article')[i];
            // Parcours les tags du photographe
            for (let y = 0; y < 4; y++) {
                if (article.querySelectorAll('a.tag')[y]) {
                    let filtreArticle = article.querySelectorAll('a.tag')[y];
                    filtreArticle.addEventListener('click', () => {
                        if (filtreArticle.style.color !== 'white') {
                            initDataFiltrePhotographer(filtreArticle.innerText.split('#')[1]);
                        } else {
                            const htmlListData = initHtmlPhotographer();
                            displayHtml(htmlListData);
                        }
                    });
                }
            }
        }
    }
};