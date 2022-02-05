// On récupère le panier depuis le localStorage
let basket = localStorage.getItem("product");
let displayBasket = JSON.parse(basket);
function getBasket() {
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
      if (confirm(`Etes vous sûrs de vouloir retirer le ${displayBasket[k].name} du panier ?`)) {
        // On récupère le panier sans l'élément à supprimer
        displayBasket = displayBasket.filter(product => product.id != productIdDelete || product.color != productcolorDelete);
        // On met à jour le panier dans le localStorage
        localStorage.setItem("product", JSON.stringify(displayBasket));
        // On rafraichit
        location.reload();
        // On informe l'utilisateur de la bonne réalisation
        alert(`Le produit a bien été supprimé du panier`);
      }
    })
  }
}
deleteProduct();

// Fonction validation des champs de formulaire
const validationForm = () => {
  let nameRegExp = new RegExp("^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$");
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  let mailRegExp = new RegExp("[-a-zA-Zàâäéèêëïîôöùûüç]+@[a-z0-9.-]+\.[a-z]{2,}$");

  let firstName = document.getElementById('firstName');
  let lastName = document.getElementById('lastName');
  let address = document.getElementById('address');
  let city = document.getElementById('city');
  let email = document.getElementById('email');

  if (!nameRegExp.test(firstName.value) || firstName.value.length === 0) {
    firstName.nextElementSibling.innerHTML = 'Merci de saisir une prénom valide';
    firstName.style.border = "solid red 1px"
  } else if (!nameRegExp.test(lastName.value) || lastName.value.length === 0) {
    lastName.nextElementSibling.innerHTML = 'Merci de saisir un nom valide';
    firstName.style.border = "solid red 1px"
  } else if (!addressRegExp.test(address.value) || address.value.length === 0) {
    address.nextElementSibling.innerHTML = 'Merci de saisir une adresse valide';
    address.style.border = "solid red 1px";
  } else if (!nameRegExp.test(city.value) || city.value.length === 0) {
    city.nextElementSibling.innerHTML = 'Merci de saisir une ville valide';
    city.style.border = "solid red 1px";
  } else if (!mailRegExp.test(email.value) || email.value.length === 0) {
    email.nextElementSibling.innerHTML = 'Merci de saisir une adresse mail valide';
    email.style.border = "solid red 1px";
  } else {
    sentForm();
  }
}

const sentForm = () => {
  // Récupération des id qu'on ajoute dans le tableau products
  let products = [];
  for (i = 0; i < displayBasket.length; i++) {
    products.push(displayBasket[i].id);
  }

  // Création d'un objet order contenant un objet contact et le tableau product
  const order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    },
    products: products,
  }
  // Connexion à l'API et envoi des données
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then(data => {
      localStorage.clear();
      document.location.href = 'confirmation.html?id=' + data.orderId;
    })
    .catch(error => {
      console.log(error);
    });

};

// Au clic, on valide le formulaire puis on envoie
document.getElementById("order").addEventListener('click', (result) => {
  result.preventDefault();
  validationForm();
});




// On affiche la quantité de produits dans le panier dans la navigation
let basketQuantity = JSON.parse(localStorage.getItem("product"));
if (basketQuantity.length > 0) {
  document.querySelector(".basketQuantity").innerHTML += ` <strong>(${basketQuantity.length})</strong>`;
}
