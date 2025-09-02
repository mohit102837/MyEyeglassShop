// Future interactivity will be added here like cart, filters etc.
console.log("Welcome to VISION EXPERT website");




function filterProducts(category) {
  const cards = document.querySelectorAll(".product-card");
  const tabs = document.querySelectorAll(".tab");

  cards.forEach((card) => {
    const cat = card.getAttribute("data-category");
    if (category === "all" || cat === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  tabs.forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");
}


// Sticky header background change on scroll
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Toggle mobile menu
function toggleMenu() {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('active');
}

// Close menu on scroll
window.addEventListener('scroll', function () {
  const nav = document.querySelector('.navbar');
  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
  }
});

// Close menu when nav link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.navbar');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
});

// Cart array to store items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in header
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.querySelector('#cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

// Add to cart logic
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
    const img = button.getAttribute('data-img');

    const item = { id, name, price, img, quantity: 1 };

    // Check if item already in cart
    const existingItem = cart.find(p => p.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update the cart count immediately after adding
    updateCartCount();
    
    alert(`${name} added to cart!`);
  });
});

// Call it initially to show count if already in localStorage
updateCartCount();



// Function to update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const countElement = document.getElementById('cart-count');
  if (countElement) countElement.textContent = `(${totalItems})`;
}

// Run this on every page load

document.addEventListener('DOMContentLoaded', updateCartCount);



// cart 
function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  let html = `
    <div class="cart-table-wrapper">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  `;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
      <tr>
        <td data-label="Name">${item.name}</td>
        <td data-label="Price">₹${item.price}</td>
        <td data-label="Qty">${item.quantity}</td>
        <td data-label="Total">₹${itemTotal}</td>
        <td data-label="Action"><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
      <div class="cart-total">
        <h3>Total Amount: ₹${total}</h3>
        <button class="checkout-btn" onclick="window.location.href='checkout.html'">Proceed to Checkout</button>
      </div>
    </div>
  `;

  cartContainer.innerHTML = html;
}


function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Refresh cart
}

// Initial render
renderCart();





