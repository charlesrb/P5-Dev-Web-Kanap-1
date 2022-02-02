

// Recherche de l'ID dans l'URL //
/////////////////////////////////

// vérifier qu'il y a bien des paramètres sur l'URL

let url = new URL(window.location.href);
let itemId = url.searchParams.get('id');

// AFFICHAGE DU PRODUIT //
/////////////////////////////////

// Ne pas oublier catch / try si il y a un souci avec le serveur ou si c'est vide

async function getProducts() {
    let reponse = await fetch(`http://localhost:3000/api/products/${itemId}`)
    let data = await reponse.json();

    document.title = data.name;
    document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    document.getElementById("title").innerHTML = data.name;
    document.getElementById("price").innerHTML = data.price;
    document.getElementById("description").innerHTML = data.description;
    let nameTest = data.name;
    const img = document.querySelector(".item__img");
    for (color of data.colors) {
        document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`;
    }

};
getProducts();

// AJOUT AU PANIER           //
/////////////////////////////////


document.getElementById("quantity").addEventListener('change', (event) => {
    quantity = event.target.value;
});
document.getElementById("colors").addEventListener('change', (event) => {
    color = event.target.value;
});

document.getElementById("addToCart").addEventListener('click', result => {
    // on vérifie que la couleur est choisie et que la quantité est comprise entre 0 et 100
    if (color != "" && quantity <= 100 && quantity != 0) {
        const product = {
            id: itemId,
            color: color,
            quantity: quantity,
        };


        // Si le localStorage est vide, on y ajoute la constante product
        if (localStorage.getItem("product") == null) {
            localStorage.setItem("product", JSON.stringify(product));
            window.confirm(`Votre commande de ${quantity} ${title.textContent} ${color} est ajoutée au panier`);
        }
        // Si non, on récupère old Product
        else {

            let oldProduct = JSON.parse(localStorage.getItem("product"));
            // Si c'est pas un array, on le transforme en array et on ajoute le product
            if (!(oldProduct instanceof Array)) {
                oldProduct = [oldProduct];
                oldProduct.push(product);
                localStorage.setItem("product", JSON.stringify(oldProduct));
                window.confirm(`Votre panier a été mis à jour de ${quantity} ${title.textContent} ${color}`);
            }
            // Si c'est déjà un array, on ajoute le product
            else {
                oldProduct.push(product);
                localStorage.setItem("product", JSON.stringify(oldProduct));
                window.confirm(`Votre panier a été mis à jour de ${quantity} ${title.textContent} ${color}`);

            }

        }








    }
    else {
        window.confirm("Veuillez sélectionner une couleur et une quantité comprise entre 1 et 100")

    }
})

