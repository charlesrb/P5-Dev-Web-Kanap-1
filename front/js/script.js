const url = "http://localhost:3000/api/products";

async function getProducts() {
    let reponse = await fetch(url);
    // On vérifie que la connexion avec l'API est ok
    if (reponse.ok) {
        let data = await reponse.json();
        for (let item of data) {
            let newItem = `<a href="./product.html?id=${item._id}">
        <article>
        <img src="${item.imageUrl}" alt="${item.altTxt}">
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
        </article>
        </a>`;

            let items = document.getElementById("items");
            items.innerHTML += newItem;
        }
    }
    // Sinon on indique qu'il y a un problème de communication avec l'API
    else {
        let items = document.getElementById("items");
        items.innerHTML = "<h3>Désolé, il y a une erreur de communication avec l'API, veuillez rééssayer plus tard</h3>";
    }
}
getProducts();

// On affiche la quantité de produits dans le panier dans la navigation
let basketQuantity = JSON.parse(localStorage.getItem("product"));
document.querySelector(".basketQuantity").innerHTML += ` <strong>(${basketQuantity.length})</strong>`;

