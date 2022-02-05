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

function getForm() {
  // Selection du formulaire
  let form = document.querySelector('.cart__order__form');
  // RegExp pour les champs du formulaire
  let nameRegExp = new RegExp("^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$");
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  let mailRegExp = new RegExp("[-a-zA-Zàâäéèêëïîôöùûüç]+@[a-z0-9.-]+\.[a-z]{2,}$");

  // Ecoute des différents champs et validation de ceux-ci
  form.firstName.addEventListener('change', function () {
    validationName(this);
  });

  form.lastName.addEventListener('change', function () {
    validationLastName(this);
  });

  form.address.addEventListener('change', function () {
    validationAddress(this);
  });

  form.city.addEventListener('change', function () {
    validationCity(this);
  });

  form.email.addEventListener('change', function () {
    validationEmail(this);
  });

  // Validation firstName
  const validationName = (firstName) => {
    let firstNameErrorMsg = firstName.nextElementSibling;
    if (nameRegExp.test(firstName.value)) {
      firstNameErrorMsg.innerHTML = '';
    }
    else if (!nameRegExp.test(firstName.value)) {
      firstNameErrorMsg.innerHTML = 'Des caractères saisis ne sont pas autorisés';
    }
  }

  // Validation lastName
  const validationLastName = (lastName) => {
    let lastNameErrorMsg = lastName.nextElementSibling;
    if (nameRegExp.test(lastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    }
    else {
      lastNameErrorMsg.innerHTML = 'Des caractères saisis ne sont pas autorisés';
    }
  }

  // Validation adresse
  const validationAddress = (address) => {
    let addressErrorMsg = address.nextElementSibling;
    if (!addressRegExp.test(address.value)) {
      addressErrorMsg.innerHTML = 'Merci de saisir une adresse valide';
    }
  }

  // Validation ville
  const validationCity = (city) => {
    let cityErrorMsg = city.nextElementSibling;
    if (nameRegExp.test(city.value)) {
      cityErrorMsg.innerHTML = '';
    }
    else {
      cityErrorMsg.innerHTML = 'Des caractères saisis ne sont pas autorisés';
    }
  }

  // Validation mail
  const validationEmail = (email) => {
    let emailErrorMsg = email.nextElementSibling;
    if (!mailRegExp.test(email.value)) {
      emailErrorMsg.innerHTML = 'Merci de saisir une adresse email valide';
    }
  }
}
getForm();

function sentForm() {
  document.getElementById("order").addEventListener('click', (result) => {
    // result.preventDefault();

    // Récupération des id qu'on ajoute dans le tableau products
    let products = [];
    for (i = 0; i < displayBasket.length; i++) {
      products.push(displayBasket[i].id);
    }

    // Création d'un objet order contenant un objet contact et le tableau product
    const order = {
      contact: {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName'),
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
      },
      products: products,
    }

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
        // localStorage.clear();
        document.location.href = 'confirmation.html?id=' + data.orderId;
      })
      .catch(error => {
        console.log(error);
      });
  })
};
sentForm();


// On affiche la quantité de produits dans le panier dans la navigation
// let basketQuantity = JSON.parse(localStorage.getItem("product"));
// document.querySelector(".basketQuantity").innerHTML += ` <strong>(${basketQuantity.length})</strong>`;