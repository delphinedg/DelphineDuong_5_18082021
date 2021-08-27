let orderId = localStorage.getItem("orderId");
let totalPrice = parseInt(localStorage.getItem("totalCart"));

if (orderId !== null) {
    document.getElementById("orderId").innerHTML = orderId;
    document.getElementById("totalPrice").innerHTML = totalPrice;
    document.getElementById("orderFailed").style.display = "none";
} else {
    document.getElementById("successfulOrder").style.display = "none";
}

