document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutCart = document.querySelector("#checkoutCart tbody");
  const checkoutTotal = document.querySelector("#checkoutTotal");
  const orderForm = document.getElementById("orderForm");

  let total = 0;

  // Cart items load
  cart.forEach(item => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price * item.quantity}</td>
    `;
    checkoutCart.appendChild(row);
    total += item.price * item.quantity;
  });

  checkoutTotal.textContent = total;

  // Form submit
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // User details
    const orderDetails = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      phone: document.getElementById("phone").value,
      cart,
      total
    };

    // Abhi ke liye console me log
    console.log("Order Placed:", orderDetails);

    alert("🎉 Order Placed Successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});
