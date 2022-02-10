const url = "http://localhost:3000/api/products";

// Fonction asynchrone getProducts qui se connecte à l'API via fetch, qui attend la réponse, puis qui affiche les données sur le front
async function getProducts() {
    // On utilise le bloc try / catch en cas d'erreur
    try {
        let reponse = await fetch(url); 
        let data = await reponse.json();
        for (let item of data) { // expliquer la redirection
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
    // On indique qu'il y a un problème de communication avec l'API
    catch (error) {
        console.log("Error :" + error)
        let items = document.getElementById("items");
        items.innerHTML = "<h3>Désolé, il y a une erreur de communication avec l'API, veuillez rééssayer plus tard</h3>";
    }
}
getProducts();
