// On crée une variable avec le paramètre "id" dans l'URL de la page

let parameters = new URL(document.location).searchParams;
let id = parameters.get("id");

// Constantes pour les éléments du DOM

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productDescription = document.getElementById("productDescription");
const productOption = document.getElementById("select");

const addCartBtn = document.getElementById("addCart");
const itemAdded = document.getElementById("itemAlreadyAdded");
const productContainer = document.getElementById("productContainer");

// Variables pour le local storage

let productsArray = [];
let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

// -------------------- CONTENU DE LA PAGE --------------------

// Si on a un paramètre id dans l'URL, on récupère les données produit dans l'API et on les affiche dans le HTML. Si non, on affiche un texte d'erreur.

if (id !== null && id !== "") {
  fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonArticle) {
      let article = new Article(jsonArticle);
      productName.innerHTML = article.name;
      productPrice.innerHTML = article.getFormatedPrice();
      productDescription.innerHTML = article.description;
      productImage.setAttribute(`src`, article.imageUrl);
      for (i = 0; i < article.lenses.length; i++) {
        let option = document.createElement("option");
        option.setAttribute(`value`, article.lenses[i]);
        option.innerHTML = article.lenses[i];
        productOption.appendChild(option);
      }
    })
    .catch(function (err) {
      displayError(productContainer);
    });
} else {
  displayError(productContainer);
}

// --- Fonction pour afficher le texte d'erreur

function displayError(container) {
  container.innerHTML = `            
      <div class="row my-5 py-5">
          <div class="col-12 text-center py-5 my-4">
              <h1 class="display-1 fw-bolder">404</h1>
              <p class="display-6 fw-bolder text-secondary">Produit introuvable</p>
              <p class="lead mb-4">Le produit que vous recherchez n'existe pas ou n'est plus disponible.</p>
              <a class="btn btn-outline-dark" role="button" href="./index.html">
                  Retour à la page d'accueil
              </a>
          </div>
      </div>`;
}

// -------------------- AJOUT AU PANIER --------------------

// Au clic du bouton "Ajouter au panier"

addCartBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let item = {
    name: productName.innerHTML,
    price: productPrice.innerHTML,
    _id: id,
  };

  // S'il n'y a pas de produits dans la key "products" du local storage, on ajoute les données du produit sélectionné dans l'objet "item", on met cet objet dans le tableau (vide) "productsArray" et on stocke le tableau dans le local storage.
  if (productsInLocalStorage == null) {
    productsArray.push(item);
    localStorage.setItem("products", JSON.stringify(productsArray));
  } 
  // S'il y a déjà des produits dans la key "products", on récupère le tableau existant avec les objets et on y ajoute un nouvel objet avec les données du produit sélectionné.
  else {
    productsArray = productsInLocalStorage;
    productsArray.push(item);
    localStorage.setItem("products", JSON.stringify(productsArray));
  }
  
  // On désactive le bouton ajout au panier et on affiche un message de succès.
  addCartBtn.setAttribute("disabled", true);
  itemAdded.innerHTML = `Ce produit a été ajouté dans votre <a class="text-success"
  href="./cart.html">panier</a> !`

});


// Si le produit est déjà dans le panier, on désactive le bouton "ajouter au panier"

for (j = 0; j < productsInLocalStorage.length; j++) {
  let products = productsInLocalStorage[j];
  if (products._id === id) {
    addCartBtn.setAttribute("disabled", true);
    itemAdded.innerHTML = `Ce produit est déjà dans votre <a class="text-success"
    href="./cart.html">panier</a>.`
  }
}