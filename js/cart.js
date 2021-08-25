// Déclaration d'une variable pour récupérer les produits du local storage
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

function main() {
  displayCart();
}

main();

// ----- PANIER ----- //

// Fonction pour afficher le panier => SI le local storage contient au moins un objet (produit), on affiche les produits dans le panier, SI NON on affiche le message panier vide.

function displayCart() {
  const productCartSummary = document.getElementById("productCartSummary");
  const allProducts = document.getElementById("allProductsTable");
  if (productInLocalStorage) {
    // Boucle for pour récupérer tous les objets du local storage et les ajouter dans le HTML.
    for (let product in productInLocalStorage) {
      product = productInLocalStorage[product];
      allProducts.innerHTML += `
      <tbody>
      <tr>
          <th scope="row">
              <div class="p-2">
                  <div class="ml-3 d-inline-block">
                      <p class="mb-1 fs-5"> <a href="../front-end/camera.html?id=${product._id}" class="text-dark d-inline-block text-decoration-none">${product.name}</a></p><span class="text-uppercase fw-light">Lentille : </span>
                  </div>
              </div>
          </th>
          <td class="align-middle">${product.quantity}</td>
          <td class="align-middle">${product.price}</td>
          <td class="align-middle"><a href="#" class="btn btn-outline-danger deleteProductBtn"><i class="bi bi-trash"></i></i></a></td>
      </tr>
      <tr>
     </tbody>`;
      totalPrice(product);
    }
  } else {
    productCartSummary.innerHTML = `
    <div class="p-4 bg-white rounded shadow-sm">
        <p>Votre panier est vide.</p>
        <a class="btn btn-dark btn-check-cart" role="button" href="./index.html">
            Commencer mes achats
        </a>
    </div> `;
    document.getElementById("formValidation").style.display = "none";
  }
}

// Fonction pour supprimer les produits

function deleteProduct() {
  const deleteBtn = document.querySelector(".deleteProductBtn");
  deleteBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("product");
  });
}

// Fonction pour avoir la somme totale

function totalPrice(product) {
  let cartTotal = localStorage.getItem("totalPrice");
  cartTotal = parseInt(cartTotal);

  if (cartTotal != null) {
    cartTotal = parseInt(cartTotal);
    localStorage.setItem("totalPrice", cartTotal + product.price);
  } else {
    localStorage.setItem("totalPrice", product.price);
  }
}

// ----- FORMULAIRE ----- //

// Fonction pour désactiver le bouton "valider ma commande" si les champs ne sont pas bien complétés

// Fonction pour envoyer la commander lorsqu'on clique sur le bouton "valider ma commande"
