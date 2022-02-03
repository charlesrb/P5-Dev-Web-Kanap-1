// ---- VERIFICATION URL ----- //
// =========================== //

// On récupère l'URL et on vérifie qu'elle a bien le paramètre id
function checkUrl() {
    let url = new URL(window.location.href);

    if (url.search.includes('id')) {
        return itemId = url.searchParams.get('id');
    }
    else {
        return window.confirm("Désolé, vous n'avez pas sélectionné d'article");
    }
}

checkUrl();

// ---- AFFICHAGE DU PRODUIT ----- //
// ============================== //

// On récupère le produit via l'API et on l'affiche dans le DOM
async function getProducts() {
    let reponse = await fetch(`http://localhost:3000/api/products/${itemId}`)
    // On vérifie que la connexion à l'API est ok
    if (reponse.ok) {
        let data = await reponse.json();
        document.title = data.name;
        document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        document.getElementById("title").innerHTML = data.name;
        document.getElementById("price").innerHTML = data.price;
        document.getElementById("description").innerHTML = data.description;
        for (color of data.colors) {
            document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`;
        }
        addToCart();
    }
    // Sinon on indique qu'il y a un problème de communication
    else {
        window.confirm("Désolé, il y a une erreur de communication avec l'API")
    }
};
getProducts();

// ---- AJOUT AU PANIER ----- //
// ============================== //

// Fonction sauvegarder le panier qui récupère le panier et l'envoie dans le localStorage
function saveBasket(basket) {
    localStorage.setItem("product", JSON.stringify(basket));
}

// Fonction pour récupèrer le panier dans le localStorage. Si il est vide, on retourne un array, si il y a des éléments, on retourne le panier
function getBasket() {
    let basket = localStorage.getItem("product");
    if (basket == null) {
        return [];
    }
    else {
        return JSON.parse(basket);
    }
}

// Fonction pour ajouter un produit au panier
function addBasket(product) {
    // On met le contenu du panier dans la variable basket
    let basket = getBasket();
    // On regarde si le produit ajouté au panier existe dans la même couleur ou pas
    let foundProduct = basket.find(element => element.id == product.id && element.color == product.color);
    // Si oui, on met à jour la quantité
    if (foundProduct != undefined) {
        let newQuantity = parseInt(foundProduct.quantity) + parseInt(product.quantity);
        foundProduct.quantity = newQuantity;
        window.confirm(`Votre panier a été mis à jour de ${quantity} ${title.textContent} ${color}`);

    }
    // Si non, on ajoute le produit au panier
    else {
        product.quantity = quantity;
        basket.push(product);
        window.confirm(`Votre commande de ${quantity} ${title.textContent} ${color} est ajoutée au panier`);
    }
    saveBasket(basket);
}

function addToCart() {
    // On récupère la quantité choisie par l'utilisateur
    document.getElementById("quantity").addEventListener('change', (event) => {
        quantity = event.target.value;
    });

    // On récupère la couleur choisie par l'utilisateur
    document.getElementById("colors").addEventListener('change', (event) => {
        color = event.target.value;
    });

    // On écoute le clic du bouton addToCart
    document.getElementById("addToCart").addEventListener('click', result => {
        // on vérifie que la couleur est choisie et que la quantité est comprise entre 0 et 100
        if (color != "" && quantity <= 100 && quantity != 0) {
            const product = {
                id: itemId,
                color: color,
                quantity: quantity,
                price: document.getElementById("price").textContent,
                name: document.title,
                img: document.querySelector(".item__img").innerHTML
            };

            getBasket();
            addBasket(product);
        }
        // Si l'utilisateur n'a pas choisi de couleur, on lui indique de le faire
        else {
            window.confirm("Veuillez sélectionner une couleur et une quantité comprise entre 1 et 100");
        }

    });
}

// On affiche la quantité de produits dans le panier dans la navigation
let basketQuantity = JSON.parse(localStorage.getItem("product"));
document.querySelector(".basketQuantity").innerHTML += ` <strong>(${basketQuantity.length})</strong>`;