let orderId = localStorage.getItem("orderId");
let totalPrice = parseInt(localStorage.getItem("totalCart"));

// Si on a une orderId, on affiche le numéro de commande (orderId) et le prix total sur la page + on enlève le message d'erreur + on supprimer tous les éléments du local storage. Si non, on enlève le message de succès (pour afficher uniquement le message d'erreur).
if (orderId !== null) {
    document.getElementById("orderId").innerHTML = orderId;
    document.getElementById("totalPrice").innerHTML = totalPrice;
    document.getElementById("orderFailed").style.display = "none";
    localStorage.clear();
} else {
    document.getElementById("successfulOrder").style.display = "none";
}