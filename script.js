/* === script.js === */

// 1. GLOBAL VARIABLES
let cart = JSON.parse(localStorage.getItem('anniCart')) || [];

const navbar = document.getElementById("navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// 2. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  // Update the cart count in the navbar immediately
  updateCartUI(); 

  // If we are on the Menu Page, try to load the menu items
  if (document.querySelector('.menu-grid')) {
    loadMenu();
    setupTabs();
    setupSearch();
  }

  // If we are on the FAQ page, setup the accordions
  if (document.querySelector('.faq-item')) {
    setupFAQ();
  }
});

// 3. NAVBAR & MOBILE MENU LOGIC
window.addEventListener("scroll", () => {
  if(navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

// 4. LOAD MENU FUNCTION (The Engine)
async function loadMenu() {
  try {
    // Fetch the data from the JSON file
    const response = await fetch('menu-data.json');
    
    // Check if the file exists
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Loop through every item in the JSON list
    data.forEach(item => {
      // Find the specific container for this category (e.g., #appetizers .menu-grid)
      const container = document.querySelector(`#${item.category} .menu-grid`);
      
      if (container) {
        // Create the HTML card
        const card = document.createElement('div');
        card.className = 'food-card glass-card reveal-item'; 
        
        // Sanitize data for the onclick event
        const safeName = item.name.replace(/'/g, "\\'"); // Escape single quotes
        const safeImage = item.image; 
        
        card.innerHTML = `
          <div class="card-image-wrapper">
             <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='images/headshot.jpg'">
          </div>
          <div class="food-info">
            <div class="info-top">
                <h3>${item.name}</h3>
                <p class="desc">${item.description}</p>
                ${item.details ? `<span class="details-tag">${item.details}</span>` : ''}
            </div>
            <div class="action-row">
              <span class="price-tag">$${item.price.toFixed(2)}</span>
              <button class="add-btn" onclick="addToCart({
                  id: '${item.id}', 
                  name: '${safeName}', 
                  price: ${item.price}, 
                  image: '${safeImage}'
              }, this)">Add +</button>
            </div>
          </div>
        `;
        // Inject it into the page
        container.appendChild(card);
      } else {
        console.warn(`Container not found for category: ${item.category}`);
      }
    });

  } catch (error) {
    console.error("Error loading menu:", error);
    // Show error on screen so you know what happened
    const grid = document.querySelector('.menu-grid');
    if(grid) grid.innerHTML = `<p style="color:white; padding:20px;">Error loading menu. Please check console.</p>`;
  }
}

// 5. TAB LOGIC (Switching between Appetizers, Proteins, etc.)
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-link');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1. Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // 2. Activate clicked tab
      tab.classList.add('active');
      const targetId = tab.dataset.tab;
      const targetContent = document.getElementById(targetId);
      if(targetContent) targetContent.classList.add('active');
    });
  });
}

// 6. SEARCH LOGIC
function setupSearch() {
    const searchBar = document.getElementById("search-bar");
    if(!searchBar) return;

    searchBar.addEventListener("keyup", (e) => {
        const term = e.target.value.toLowerCase();
        // Only search within the currently visible tab
        const activeTab = document.querySelector(".tab-content.active");
        if(!activeTab) return;
        
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

// 8. CART UI UPDATE (Helper)
function updateCartUI() {
    const cartIcon = document.getElementById('cart-icon');
    const mobileCartIcon = document.getElementById('mobile-cart-icon');
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    
    if(cartIcon) cartIcon.innerText = `Cart (${totalQty})`;
    if(mobileCartIcon) mobileCartIcon.innerText = `Cart (${totalQty})`;
}