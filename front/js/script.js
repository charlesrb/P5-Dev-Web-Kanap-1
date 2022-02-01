const url = "http://localhost:3000/api/products";



fetch(url).then(response => response.json()).then(data => {
    console.log(data)
    console.log(data[0].price)
    for (let item of data) {
        let newItem = `<a href="./product.html?id=${item._id}">
    <article>
    <img src="${item.imageUrl}" alt="${item.altTxt}">
    <h3 class="productName">${item.name}</h3>
    <p class="productDescription">${item.description}</p>
    </article>
    </a>`;
        console.log(newItem);
        let items = document.getElementById("items");
        items.innerHTML += newItem;
    }

});

