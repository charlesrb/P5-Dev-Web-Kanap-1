// Recherche de l'ID dans l'URL //
/////////////////////////////////

// vérifier qu'il y a bien des paramètres sur l'URL

let url = new URL(window.location.href);
let itemId = url.searchParams.get('id');


// AFFICHAGE DU PRODUIT //
/////////////////////////////////

// Ne pas oublier catch / try si il y a un souci avec le serveur ou si c'est vide

fetch(`http://localhost:3000/api/products/${itemId}`)
    .then(response => response.json())
    .then(data => {
        document.title = data.name;
        document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        document.getElementById("title").innerHTML = data.name;
        document.getElementById("price").innerHTML = data.price;
        document.getElementById("description").innerHTML = data.description;

        for (color of data.colors) {
            document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`;
        }

    });


// AJOUT AU PANIER           //
/////////////////////////////////

// Ajouter une alerte si pas choix de couleur

document.getElementById("colors").addEventListener('change', (event) => {
    localStorage.color = event.target.value;
});

document.getElementById("quantity").addEventListener('change', (event) => {
    localStorage.quantity = event.target.value;
});

localStorage.id = itemId;

document.getElementById("addToCart").addEventListener('click', result => {
    const product = {
        id: localStorage.id,
        color: localStorage.color,
        quantity: localStorage.quantity

    };
    console.log(product);

})
