// Créer une classe "Article" pour assigner toutes les propriétés de jsonArticle dans this + mettre le prix en euros
class Article {
  constructor(jsonArticle) {
    jsonArticle && Object.assign(this, jsonArticle);
  }

  getFormatedPrice() {
    let price = this.price / 100;
    return price;
  }
}
