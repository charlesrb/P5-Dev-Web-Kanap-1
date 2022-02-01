// Recherche de l'ID dans l'URL //
/////////////////////////////////

let url = new URL(window.location.href);
console.log(url);
let itemId = url.searchParams.get('id');


fetch(`http://localhost:3000/api/products/${itemId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.title = data.name;
        document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        document.getElementById("title").innerHTML = data.name;
        document.getElementById("price").innerHTML = data.price;
        document.getElementById("description").innerHTML = data.description;

        for (color of data.colors) {
            document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`;
        }

    });