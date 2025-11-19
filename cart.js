/* === cart.js === */

// 1. VARIABLES
let cart = JSON.parse(localStorage.getItem('anniCart')) || [];
const DELIVERY_FEE = 4.99;
const PROCESSING_FEE = 1.99;
let isDelivery = false;

// 2. INIT
document.addEventListener('DOMContentLoaded', () => {
    // If we are on the cart page, render the cart items
    if(document.getElementById('cart-items-container')) {
        renderCart();
        setupCheckoutListeners();
    }
    updateNavbarCount();
});

// 3. ADD TO CART
window.addToCart = function(itemData, btnElement) {
    // itemData = { id, name, price, image }
    
    const existingItem = cart.find(item => item.id === itemData.id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({
            id: itemData.id,
            name: itemData.name,
            price: parseFloat(itemData.price),
            image: itemData.image,
            qty: 1
        });
    }

    localStorage.setItem('anniCart', JSON.stringify(cart));
    updateNavbarCount();
    
    // Button Animation Feedback
    if(btnElement) {
        const originalText = btnElement.innerText;
        btnElement.innerText = "ADDED";
        btnElement.style.background = "#fff";
        btnElement.style.color = "#000";
        setTimeout(() => {
            btnElement.innerText = originalText;
            btnElement.style.background = "";
            btnElement.style.color = "";
        }, 800);
    }
};

// 4. RENDER CART
function renderCart() {
    const container = document.getElementById('cart-items-container');
    if(!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:40px;">
            <p>Your cart is currently empty.</p>
            <a href="menu.html" class="btn" style="margin-top:10px;">Browse Menu</a>
        </div>`;
        updateTotals();
        return;
    }

    container.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row';
        itemRow.innerHTML = `
            <div class="cart-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-details">
                <h4>${item.name}</h4>
                <div class="cart-controls">
                    <span style="color:#fff">$${item.price.toFixed(2)}</span>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                        <span style="color:#fff; font-weight:bold; min-width:20px; text-align:center;">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
                </div>
            </div>
        `;
        container.appendChild(itemRow);
    });
    
    updateTotals();
}

// 5. HELPERS & LISTENERS
function setupCheckoutListeners() {
    const pickupRadio = document.getElementById('pickup-radio');
    const deliveryRadio = document.getElementById('delivery-radio');
    const checkoutForm = document.getElementById('checkout-form');

    if(pickupRadio && deliveryRadio) {
         pickupRadio.addEventListener('change', () => { isDelivery = false; updateTotals(); });
         deliveryRadio.addEventListener('change', () => { isDelivery = true; updateTotals(); });
    }
    if(checkoutForm) {
         checkoutForm.addEventListener('submit', handleFormSubmit);
    }
}

window.changeQty = function(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    localStorage.setItem('anniCart', JSON.stringify(cart));
    renderCart();
    updateNavbarCount();
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('anniCart', JSON.stringify(cart));
    renderCart();
    updateNavbarCount();
}

function updateNavbarCount() {
    const countEl = document.getElementById('cart-icon');
    const mobileCountEl = document.getElementById('mobile-cart-icon');
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    
    if(countEl) countEl.innerText = `Cart (${totalQty})`;
    if(mobileCountEl) mobileCountEl.innerText = `Cart (${totalQty})`;
}

function updateTotals() {
    const subtotalEl = document.getElementById('cart-subtotal');
    const deliveryFeeEl = document.getElementById('cart-delivery-fee');
    const grandTotalEl = document.getElementById('cart-grand-total');

    if(!subtotalEl) return;

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const delivery = isDelivery ? DELIVERY_FEE : 0;
    const total = subtotal + PROCESSING_FEE + delivery;

    subtotalEl.innerText = subtotal.toFixed(2);
    deliveryFeeEl.innerText = delivery.toFixed(2);
    grandTotalEl.innerText = total.toFixed(2);
}

function handleFormSubmit(e) {
    // (Same logic as before: validate cart not empty, date selected, populate hidden fields)
    if (cart.length === 0) {
        e.preventDefault();
        alert("Your cart is empty!");
    }
    // ... add your flatpickr validations here
}