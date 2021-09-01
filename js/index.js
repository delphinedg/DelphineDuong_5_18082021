// -------------------- CONTENU DE LA PAGE --------------------
// Récupérer la liste des produits de l'API au format JSON
// Afficher la liste des produits sur la page index.html (dans l'élément #productsList) en utilisant une boucle
// Mettre un message d'erreur s'il y a une erreur

fetch("http://localhost:3000/api/cameras")
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonListArticles) {
    for (let jsonArticle of jsonListArticles) {
      let article = new Article(jsonArticle);
      document.getElementById("productsList").innerHTML += `
        <div class="col-12 col-md-6 col-lg-3 mb-5">
            <div class="card h-100">
                <img class="card-img-top" id="cardImageIndex" src="${
                  article.imageUrl
                }" alt="Image caméra" />
                <div class="card-body p-3">
                    <div class="text-center">
                        <p class="fw-bolder h5">${article.name}</p>
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <p class="m-0">${article.getFormatedPrice()} €</p>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto stretched-link" href="produit.html?id=${
                      article._id
                    }">Voir les détails</a></div>
                </div>
            </div>
        </div>`;
    }
  })
  .catch(function (error) {
    document.getElementById("productsList").innerHTML += `
        <div class="col-12 text-center">
            <p class="h2">Aïe...</p>
            <p>Une erreur est survenue lors du chargement de la liste des produits.</p>
        </div>`;
  });