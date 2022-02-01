const url = "http://localhost:3000/api/products";



fetch(url).then(response => response.json()).then(data => {

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

});

// Ne pas oublier catch / try si il y a un souci avec le serveur ou si c'est vide
