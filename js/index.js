const urlPage = new URLSearchParams(document.location.href);
const page = decodeURIComponent(urlPage).split('https://rachidboubekeur-dev.github.io/RachidBoubekeur_DA6_12042021/')[1].split('.html')[0];
// Retourne la liste des photographes et la liste des medias dans le fichier data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // eslint-disable-next-line no-undef
        if (page === 'index') initDataPage(data['photographers']);
        // eslint-disable-next-line no-undef
        else initDataPage(data['photographers'], data['media']);
    });