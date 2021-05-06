const urlPage = new URLSearchParams(document.location.href);
const page = decodeURIComponent(urlPage).split('https://rachidboubekeur-dev.github.io/RachidBoubekeur_DA6_12042021/')[1].split('.html')[0];
// Retourne la liste des photographes et la liste des medias dans le fichier data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        if (page === "index") initPhotographer(data['photographers'])
        else initDataPage(data['photographers'], data['media'])
    })
