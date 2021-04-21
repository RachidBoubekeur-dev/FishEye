// Retourne la liste des photographes et la liste des medias dans le fichier data.json
fetch('data.json')
    .then(response => response.json())
    .then(listDataPhotographers => { listPhotographers(listDataPhotographers['photographers'])})
    .then(listDataMedia => { listMedia(listDataMedia['media'])})

/**
 * getDataFiltre - Retourne la liste des photographes dans le fichier data.json
 * @param  {String} filtre
 */
function getDataFiltre(filtre) {
    fetch('data.json')
        .then(response => response.json())
        .then(listData => { listDataFiltre(listData['photographers'], filtre)})
}