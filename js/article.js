// Créer une classe "Article" pour assigner toutes les propriétés de jsonArticle dans this + mettre le prix en euros
class Article {
  constructor(jsonArticle) {
    jsonArticle && Object.assign(this, jsonArticle);
  }

  getFormatedPrice(article) {
    // let currency = new Intl.NumberFormat("fr-FR", {
    //   style: "currency",
    //   currency: "EUR",
    // }).format(this.price / 100);
    // return currency;

    let price = this.price / 100;
    return price;
  }
}
