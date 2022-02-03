let basket = localStorage.getItem("product");
let displayBasket = JSON.parse(basket);

// On récupère le panier depuis le localStorage
async function getBasket() {

  // Si il est vide, on affichage que le panier est vide
  if (basket == null) {
    let items = document.getElementById("cart__items");
    items.innerHTML = "<h2>Votre panier est vide !</h2>";
  }
  // Sinon, on boucle les produits dans le panier et on les affiche
  else {
    for (product of displayBasket) {
      let newItem = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
              <div class="cart__item__img">
                ${product.img}
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${product.name}</h2>
                  <p>${product.color}</p>
                  <p>${product.price}€</p>
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
      let items = document.getElementById("cart__items");
      items.innerHTML += newItem;
      // Sinon on indique qu'il y a un problème de communication avec l'API
    }
  }
  getTotal();


};
getBasket();

// Calcul de la quantité totale et du prix total
function getTotal() {
  // Calcul de la quantité de produits
  var quantityProduct = document.getElementsByClassName("itemQuantity");
  totalQuantity = 0;

  for (let i = 0; i < quantityProduct.length; ++i) {
    totalQuantity += quantityProduct[i].valueAsNumber;
  }
  // On modifie le DOM
  let productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerHTML = totalQuantity;

  // Calcul du prix total
  totalPrice = 0;

  for (let i = 0; i < quantityProduct.length; ++i) {
    totalPrice += (quantityProduct[i].valueAsNumber * displayBasket[i].price);
  }
  // On modifie le DOM
  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
}

// Fonction pour modifier la quantité des produits dans le panier
function modifyQuantity() {
  let changeQuantity = document.querySelectorAll(".itemQuantity");

  // Boucle sur tous les produits qui existent
  for (let j = 0; j < changeQuantity.length; j++) {
    // On "écoute" les changements
    changeQuantity[j].addEventListener('change', result => {
      result.preventDefault();
      // on modifie la quantité et on l'ajoute au localStorage
      let newQuantity = parseInt(changeQuantity[j].valueAsNumber);
      displayBasket[j].quantity = newQuantity;
      localStorage.setItem("product", JSON.stringify(displayBasket));

      // Refresh pour mettre à jour quantité total et prix total
      location.reload();

    });
  };
}
modifyQuantity();

// Fonction pour supprimer un produit du panier
function deleteProduct() {
  let deleteBtn = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener('click', result => {
      result.preventDefault();
      // On récupère l'id et la couleur du produit à supprimer
      let productIdDelete = displayBasket[k].id;
      let productcolorDelete = displayBasket[k].color
      // On demande confirmation à l'utilisateur
      confirm(`Etes vous sûrs de vouloir retirer le ${displayBasket[k].name} du panier ?`);
      // On récupère le panier sans l'élément à supprimer
      displayBasket = displayBasket.filter(product => product.id != productIdDelete || product.color != productcolorDelete);
      // On met à jour le panier dans le localStorage
      localStorage.setItem("product", JSON.stringify(displayBasket));
      // On rafraichit
      location.reload();
      // On informe l'utilisateur de la bonne réalisation
      alert(`Le produit a bien été supprimé du panier`);
    })
  }
}

deleteProduct();

// On affiche la quantité de produits dans le panier dans la navigation
let basketQuantity = JSON.parse(localStorage.getItem("product"));
document.querySelector(".basketQuantity").innerHTML += ` <strong>(${basketQuantity.length})</strong>`;