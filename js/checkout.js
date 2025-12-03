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




// ===============================
// Appointment booking logic
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const homeDeliveryCheckbox = document.getElementById("home-delivery");
  const addressRow = document.getElementById("address-row");
  const apptForm = document.getElementById("appointment-form");

  // Show/hide address field based on checkbox
  if (homeDeliveryCheckbox && addressRow) {
    homeDeliveryCheckbox.addEventListener("change", () => {
      addressRow.style.display = homeDeliveryCheckbox.checked ? "block" : "none";
    });
  }

  // Handle appointment form submission
  if (apptForm) {
    apptForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const appointment = {
        name: document.getElementById("cust-name").value.trim(),
        phone: document.getElementById("cust-phone").value.trim(),
        date: document.getElementById("appt-date").value,
        slot: document.getElementById("appt-slot").value,
        reason: document.getElementById("appt-reason").value,
        homeDelivery: document.getElementById("home-delivery").checked,
        address: document.getElementById("home-delivery").checked
          ? document.getElementById("delivery-address").value.trim()
          : "",
        paymentMethod: document.getElementById("payment-method").value,
        // Optional: saath me jo cart hai uska snapshot bhi save kar sakte hain
        cartSnapshot: JSON.parse(localStorage.getItem("cart") || "[]"),
      };

      // Appointments array in localStorage
      const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
      existing.push(appointment);
      localStorage.setItem("appointments", JSON.stringify(existing));

      alert(
        `Your eye test appointment is booked for ${appointment.date} (${appointment.slot}).\n` +
        "We will contact you on your mobile number for confirmation."
      );

      // form clear + address row hide
      apptForm.reset();
      if (addressRow) addressRow.style.display = "none";

      // Optional: cart clear karna ho to uncomment karo
      // localStorage.removeItem("cart");

      // Home page pe redirect:
      window.location.href = "index.html";
    });
  }
});



