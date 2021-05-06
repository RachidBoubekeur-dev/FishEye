let urlPage = new URLSearchParams(document.location.href);
alert(decodeURIComponent(urlPage));
let page = decodeURIComponent(urlPage).split('//')[1].split('/')[1].split('/')[1].split('.html')[0];
alert(page);
// Retourne la liste des photographes et la liste des medias dans le fichier data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        if (page === "index") initPhotographer(data['photographers'])
        else initDataPage(data['photographers'], data['media'])
    })
