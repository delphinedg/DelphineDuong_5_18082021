// On récupère la liste des produits du Local Storage
let products = JSON.parse(localStorage.getItem("products"));

const productCartSummary = document.getElementById("productCartSummary");
const allProducts = document.getElementById("allProductsTable");
const form = document.getElementById("form");

// -------------------- PANIER --------------------

// Si le local storage contient au moins un objet (produit), on affiche les produits dans le panier,
// Si non on affiche le message panier vide.

if (products) {
  // Boucle for pour récupérer tous les objets du local storage et les ajouter dans le HTML.
  for (let product in products) {
    product = products[product];
    allProducts.innerHTML += `
    <tbody id="${product._id}">
    <tr>
        <th scope="row">
            <div class="p-2">
                <div class="ml-3 d-inline-block">
                    <p class="mb-1 fs-5"> <a href="../front-end/produit.html?id=${product._id}" class="text-dark d-inline-block text-decoration-none">${product.name}</a></p><span class="text-uppercase fw-light">Lentille : </span>
                </div>
            </div>
        </th>
        <td class="align-middle">${product.price} €</td>
        <td class="align-middle"><a href="#" class="btn btn-outline-danger removeItemBtn" onclick="removeItem('${product._id}')"><i class="bi bi-trash"></i></i></a></td>
    </tr>
    <tr>
    </tbody>`;
  }
  displayTotal (products);
} else {
  displayCartEmpty (productCartSummary);
}

// --- Fonction pour afficher un message "votre panier est vide".
function displayCartEmpty (container) {
  container.innerHTML = `
  <div class="p-4 bg-white rounded shadow-sm">
      <p>Votre panier est vide.</p>
      <a class="btn btn-dark btn-check-cart" role="button" href="./index.html">
          Commencer mes achats
      </a>
  </div> `;
  document.getElementById("formValidation").style.display = "none";
}

// --- Fonctions pour calculer la somme du panier et afficher le total sur la page.
function totalCart(products) {
  let totalPrice = 0;
  if (products) {
    for (product of products) {
      totalPrice += parseInt(product.price);
    }
    return totalPrice;
  } else {
    return totalPrice
  }
}

function displayTotal (products) {
  document.getElementById("totalCart").innerHTML = `${totalCart(products)} €`;
  document.getElementById("totalOrder").innerHTML = `${totalCart(products)} €`;
}

// --- Fonction pour supprimer les produits du panier.
function removeItem(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === id) {
      products.splice(i, 1);
      localStorage.setItem("products", JSON.stringify(products));
      document.getElementById(id).remove();
      break;
    }
  }
  if (products.length === 0) {
    localStorage.clear();
    displayCartEmpty (productCartSummary);
  }
  displayTotal (products);
}

// -------------------- FORMULAIRE --------------------

// --- Fonction pour vérifier les données saisies par l'utilisateur
function validateForm(contact) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const nameRegex = /^[a-zA-Zéèçàêëöùä]+(([',. -][a-zA-Zéèçàêëöùä ])?[a-zA-Zéèçàêëöùä]*)*$/;
  let error = document.getElementById("errorForm");
  if (
    contact.firstName == "" ||
    contact.lastName == "" ||
    contact.address == "" ||
    contact.city == "" ||
    contact.email == ""
  ) {
    error.innerHTML =
      "Veuillez renseigner tous les champs du formulaire avant de valider votre commande.";
    error.style.color = "red";
    return false;
  } else if (nameRegex.test(contact.lastName) == false) {
    error.innerHTML = "Veuillez entrer un nom valide.";
    error.style.color = "red";
    return false;
  } else if (nameRegex.test(contact.firstName) == false) {
    error.innerHTML = "Veuillez entrer un prénom valide.";
    error.style.color = "red";
    return false;
  } else if (nameRegex.test(contact.city) == false) {
    error.innerHTML = "Veuillez entrer une ville valide.";
    error.style.color = "red";
    return false;
  } else if (emailRegex.test(contact.email) == false) {
    error.innerHTML = "Veuillez entrer un email valide.";
    error.style.color = "red";
    return false;
  } else {
    return true;
  }
}

// Au clic du bouton "valider ma commande", SI les champs sont complétés correctement on envoie les données à l'API,
// SI NON on affiche un message d'erreur

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // On crée l'objet contact pour récupérer les données de l'utilisateur (en suivant le modèle donné par le back-end)
  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  // On crée le tableau produit avec les ID (boucle sur la liste de products pour recupèrer les ID).
  let productId = [];
  for (product of products) {
    productId.push(product._id);
  }

  // On crée l'objet order avec l'objet contact et le tableau product_id, pour mettre dans le corps de la requête.
  let order = {
    contact: contact,
    products: productId,
  };

  if (validateForm(contact)) {
    fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(order)
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Erreur dans la requête");
      }
    })
    .then(function (data) {
      //console.log(data);
      localStorage.setItem("orderId", data.orderId);
      localStorage.setItem("totalCart", totalCart(products));
      document.location.href = "confirmation.html";
    })
    .catch(function(err) {
      console.log(err);
    })
  }
});