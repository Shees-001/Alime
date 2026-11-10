const WHATSAPP_NUMBER = "923220025475"; // country code ke saath, bina + ke

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".order-btn");
  if (!btn) return;
  e.preventDefault();

  addOrder(btn.dataset.product, btn.dataset.price); // orders.js se

  const msg =
    "Hello ALIMÈ! I would like to order:\n\n" +
    "Product: " + btn.dataset.product + "\n" +
    "Price: Rs " + btn.dataset.price + "\n\n" +
    "Please confirm availability and delivery details.";

  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
});