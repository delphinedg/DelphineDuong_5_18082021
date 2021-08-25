// ----- CONTENU DE LA PAGE ----- //

// 1) Créer une variable id pour chercher le paramètre "id" dans l'URL de la page

let parameters = new URL(document.location).searchParams;
let id = parameters.get("id");

// --- Créer des constantes pour les éléments du DOM afin de faciliter l'écriture du fetch

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productDescription = document.getElementById("productDescription");
const productOption = document.getElementById("select");

// 2) Vérifier si nous avons bien un paramètre id dans l'URL avant de chercher les données du produit. Si non, afficher un texte d'erreur.

function displayContent() {
  if (id !== null && id !== "") {
    displayArticle();
  } else {
    displayError();
  }
}

displayContent();

// --- Fonction pour afficher le texte d'erreur

function displayError() {
  document.getElementById("productContainer").innerHTML = `            
      <div class="row my-5 py-5" id="errorPage">
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

// --- Fonction pour récupérer et afficher les données du produit

function displayArticle() {
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
      displayError();
    });
}

// ----- GESTION DU PANIER ----- //

function addToCart() {
  // 1) Récupérer les données du produit sélectionnées par l'utilisateur lorsqu'il clique sur le bouton "ajouter au panier"

  const addCartBtn = document.getElementById("addCart");

  addCartBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let productAdded = {
      name: productName.innerHTML,
      price: productPrice.innerHTML,
      quantity: document.getElementById("inputQuantity").value,
      _id: id,
    };

    // 2) Stocker les valeurs dans le local storage.

    // --- Déclaration de la variable "productInLocalStorage" dans laquelle on met les "key" et "value" qui sont dans le local storage. JSON.parse pour convertir les données au format JSON qui sont dans le local storage, en objet Javascript.

    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

    // --- Fonction pour ajouter un produit sélectionné dans le local storage
    function addProductInLocalStorage() {
      // Ajout des "values" du produit choisi
      productInLocalStorage.push(productAdded);
      // Transformation des "values" en format JSON et envoie de la "key" vers le local Storage
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    }

    // ** Cas 1 : S'il y a déjà des produits enregistrés (true), on ajoute l'objet dans le tableau existant.
    if (productInLocalStorage) {
      addProductInLocalStorage();
    }
    // ** Cas 2 : S'il n'y a pas de produits enregistrés (false), on crée un tableau et on ajoute l'objet.
    else {
      productInLocalStorage = [];
      addProductInLocalStorage();
    }
  });
}

addToCart();
