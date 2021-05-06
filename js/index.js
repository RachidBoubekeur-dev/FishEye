let urlPage = new URLSearchParams(document.location.href);
// Retourne la liste des photographes et la liste des medias dans le fichier data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        if (decodeURIComponent(urlPage).split('//')[1].split('/')[1].split('.')[0] === "index" || decodeURIComponent(urlPage).split('//')[1].split('/')[1].split('/')[1].split('.')[0] === "index") initPhotographer(data['photographers'])
        else initDataPage(data['photographers'], data['media'])
    })