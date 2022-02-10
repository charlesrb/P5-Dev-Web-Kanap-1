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

// Validation des différents champs de formulaire

// Définition des variables
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
let nameRegExp = new RegExp("^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

// Fonctions des différents champs. Si cela ne correspond pas au RegExp ou que le champ est vide, le message d'erreur s'affiche en perdant le focus. 
// Validation du prénom
const validationFirstName = () => {
  if (!nameRegExp.test(firstName.value) || firstName.value.length === 0) {
    firstName.nextElementSibling.innerHTML = 'Merci de saisir un prénom valide comprenant que des lettres';
    firstName.style.border = "solid red 1px"
    return false;
}
else {
  firstName.nextElementSibling.innerHTML = '';
  firstName.style.border = "none";
  return true;
}
}

// Validation du nom
const validationLastName = () => {
  if (!nameRegExp.test(lastName.value) || lastName.value.length === 0) {
    lastName.nextElementSibling.innerHTML = 'Merci de saisir un nom valide comprenant que des lettres';
    lastName.style.border = "solid red 1px"
    return false;
}
else {
  lastName.nextElementSibling.innerHTML = '';
  lastName.style.border = "none";
  return true;
}
}

// Validation de l'adresse
const validationAddress = () => {
  if (!addressRegExp.test(address.value) || address.value.length === 0) {
    address.nextElementSibling.innerHTML = 'Merci de saisir une adresse valide (exemple : 23 allée des hirondelles)';
    address.style.border = "solid red 1px"
    return false;
}
else {
  address.nextElementSibling.innerHTML = '';
  address.style.border = "none";
  return true;
}
}

// Validation de la ville
const validationCity = () => {
  if (!nameRegExp.test(city.value) || city.value.length === 0) {
    city.nextElementSibling.innerHTML = 'Merci de saisir un nom de ville valide comprenant que des lettres';
    city.style.border = "solid red 1px"
    return false;
}
else {
  city.nextElementSibling.innerHTML = '';
  city.style.border = "none";
  return true;
}
}

// Validation de l'email
const validationEmail = () => {
  if (!mailRegExp.test(email.value) || email.value.length === 0) {
    email.nextElementSibling.innerHTML = 'Merci de saisir une adresse email valide de la forme prenom@mail.com';
    email.style.border = "solid red 1px"
    return false;
}
else {
  email.nextElementSibling.innerHTML = '';
  email.style.border = "none";
  return true;
}
}

firstName.addEventListener("blur", validationFirstName);
lastName.addEventListener("blur", validationLastName);
address.addEventListener("blur", validationAddress);
city.addEventListener("blur", validationCity);
email.addEventListener("blur", validationEmail);

// Vérification si toutes les validations sont ok sinon alerte de l'utilisateur
const validationForm = () => {

  if (validationFirstName() && validationLastName() && validationAddress() && validationCity() && validationEmail()) {
    sentForm();
  }
  else {
    alert("Merci de compléter les champs requis");
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
      document.location.href = 'confirmation.html?orderId=' + data.orderId;
    })
    .catch(error => {
      console.log(error);
    });

};

// Au clic sur le bouton, on valide le formulaire puis on envoie
document.getElementById("order").addEventListener('click', (result) => {
  result.preventDefault();
  validationForm();
});
