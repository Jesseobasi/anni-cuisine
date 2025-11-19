/* === script.js === */

// 1. GLOBAL VARIABLES
let cart = JSON.parse(localStorage.getItem('anniCart')) || [];

const navbar = document.getElementById("navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// 2. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI(); 

  // Logic for Menu Page
  if (document.querySelector('.menu-grid')) {
    loadMenu();
    setupTabs();
    setupSearch();
  }

  // Logic for FAQ Page
  if (document.querySelector('.faq-item')) {
    setupFAQ();
  }
});

// 3. NAVBAR LOGIC
window.addEventListener("scroll", () => {
  if(navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

// 4. LOAD MENU
async function loadMenu() {
  try {
    const response = await fetch('menu-data.json');
    const data = await response.json();

    data.forEach(item => {
      const container = document.querySelector(`#${item.category} .menu-grid`);
      
      if (container) {
        const card = document.createElement('div');
        card.className = 'food-card glass-card reveal-item'; 
        
        card.innerHTML = `
          <div class="card-image-wrapper">
             <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="food-info">
            <div class="info-top">
                <h3>${item.name}</h3>
                <p class="desc">${item.description}</p>
                ${item.details ? `<span class="details-tag">${item.details}</span>` : ''}
            </div>
            <div class="action-row">
              <span class="price-tag">$${item.price.toFixed(2)}</span>
              <button class="add-btn" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.image}', this)">
                ADD +
              </button>
            </div>
          </div>
        `;
        container.appendChild(card);
      }
    });

  } catch (error) {
    console.error("Error loading menu:", error);
  }
}

// 5. TAB LOGIC
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-link');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });
}

// 6. SEARCH LOGIC
function setupSearch() {
    const searchBar = document.getElementById("search-bar");
    if(!searchBar) return;

    searchBar.addEventListener("keyup", (e) => {
        const term = e.target.value.toLowerCase();
        const activeTab = document.querySelector(".tab-content.active");
        const cards = activeTab.querySelectorAll(".food-card");

        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const desc = card.querySelector(".desc").textContent.toLowerCase();
            if (title.includes(term) || desc.includes(term)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// 7. FAQ LOGIC
function setupFAQ() {
  const allDetails = document.querySelectorAll('.faq-item');
  allDetails.forEach(targetDetail => {
    targetDetail.addEventListener('toggle', () => {
      if (targetDetail.open) {
        allDetails.forEach(otherDetail => {
          if (otherDetail !== targetDetail && otherDetail.open) {
            otherDetail.open = false;
          }
        });
      }
    });
  });
}

// 8. CART LOGIC
window.addToCart = function(id, name, price, image, btnElement) {
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ id, name, price, image, qty: 1 });
  }

  localStorage.setItem('anniCart', JSON.stringify(cart));
  updateCartUI();
  
  // Button Feedback
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

function updateCartUI() {
    const cartIcon = document.getElementById('cart-icon');
    const mobileCartIcon = document.getElementById('mobile-cart-icon');
    
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    
    if(cartIcon) cartIcon.innerText = `Cart (${totalQty})`;
    if(mobileCartIcon) mobileCartIcon.innerText = `Cart (${totalQty})`;
}