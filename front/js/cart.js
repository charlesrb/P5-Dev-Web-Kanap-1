// On récupère le panier depuis le localStorage
async function getBasket() {
  let basket = localStorage.getItem("product");
  // Si il est vide, on affichage que le panier est vide
  if (basket == null) {
    let items = document.getElementById("cart__items");
    items.innerHTML = "<h2>Votre panier est vide !</h2>";
  }
  // Sinon, on boucle les produits dans le panier et on les affiche
  else {
    let displayBasket = JSON.parse(basket);
    for (product of displayBasket) {
      let reponse = await fetch(`http://localhost:3000/api/products/${product.id}`);
      // On vérifie que la connexion avec l'API est ok
      if (reponse.ok) {
        let data = await reponse.json();
        console.log(data);

        let newItem = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
              <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="${data.altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${data.name}</h2>
                  <p>${product.color}</p>
                  <p>${data.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>`;
        console.log(newItem);
        let items = document.getElementById("cart__items");
        items.innerHTML += newItem;

      }
      // Sinon on indique qu'il y a un problème de communication avec l'API
      else {
        let items = document.getElementById("items");
        items.innerHTML = "<h3>Désolé, il y a une erreur de communication avec l'API, veuillez rééssayer plus tard</h3>";
      }
    }
  }
};
getBasket();

// On affiche la quantité de produits dans le panier dans la navigation
let basketQuantity = JSON.parse(localStorage.getItem("product"));
document.querySelector(".basketQuantity").innerHTML += ` <strong>(${basketQuantity.length})</strong>`;