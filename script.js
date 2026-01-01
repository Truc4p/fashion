// ========================================
// Product Data
// ========================================
const products = [
    {
        id: 1,
        name: "Structured Silk Blazer",
        category: "woman",
        price: 895.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
        badge: "new",
        new: true
    },
    {
        id: 2,
        name: "Premium Linen Shirt",
        category: "man",
        price: 425.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
        badge: null,
        new: false
    },
    {
        id: 3,
        name: "Wide Leg Wool Trousers",
        category: "woman",
        price: 625.00,
        originalPrice: 890.00,
        image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80",
        badge: "sale",
        new: false
    },
    {
        id: 4,
        name: "Italian Leather Jacket",
        category: "man",
        price: 1995.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        badge: null,
        new: true
    },
    {
        id: 5,
        name: "Silk Midi Dress",
        category: "woman",
        price: 785.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
        badge: "new",
        new: true
    },
    {
        id: 6,
        name: "Selvedge Denim Jacket",
        category: "man",
        price: 695.00,
        originalPrice: 895.00,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
        badge: "sale",
        new: false
    },
    {
        id: 7,
        name: "Cashmere Sweater",
        category: "woman",
        price: 1295.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
        badge: null,
        new: false
    },
    {
        id: 8,
        name: "Bespoke Tailored Suit",
        category: "man",
        price: 2995.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
        badge: null,
        new: true
    },
    {
        id: 9,
        name: "Leather Crossbody Bag",
        category: "accessories",
        price: 495.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        badge: "new",
        new: true
    },
    {
        id: 10,
        name: "Wool & Cashmere Coat",
        category: "woman",
        price: 1895.00,
        originalPrice: 2495.00,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
        badge: "sale",
        new: false
    },
    {
        id: 11,
        name: "Handcrafted Leather Sneakers",
        category: "accessories",
        price: 595.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
        badge: null,
        new: false
    },
    {
        id: 12,
        name: "Merino Wool Cardigan",
        category: "man",
        price: 795.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
        badge: null,
        new: true
    },
    {
        id: 13,
        name: "Pleated Silk Skirt",
        category: "woman",
        price: 565.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
        badge: "new",
        new: true
    },
    {
        id: 14,
        name: "Italian Leather Belt",
        category: "accessories",
        price: 295.00,
        originalPrice: 395.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        badge: "sale",
        new: false
    },
    {
        id: 15,
        name: "Oversized Cotton Shirt",
        category: "woman",
        price: 395.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&q=80",
        badge: null,
        new: false
    },
    {
        id: 16,
        name: "Tailored Chino Pants",
        category: "man",
        price: 495.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
        badge: null,
        new: false
    }
];

// ========================================
// State Management
// ========================================
let cart = [];
let currentFilter = 'all';
let currentSort = 'featured';

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
    loadCartFromStorage();
});

// ========================================
// Render Products
// ========================================
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;

    const priceHTML = product.originalPrice
        ? `<span class="product-price sale">$${product.price.toFixed(2)} <span class="original-price">$${product.originalPrice.toFixed(2)}</span></span>`
        : `<span class="product-price">$${product.price.toFixed(2)}</span>`;

    const badgeHTML = product.badge
        ? `<span class="product-badge">${product.badge}</span>`
        : '';

    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            ${badgeHTML}
            <div class="product-actions">
                <button class="product-action-btn add-to-cart" data-id="${product.id}" aria-label="Add to cart">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 2L11 8"></path>
                        <path d="M15 2L13 8"></path>
                        <path d="M1 8h22"></path>
                        <path d="M4 8l2 13h12l2-13"></path>
                    </svg>
                </button>
                <button class="product-action-btn quick-view" data-id="${product.id}" aria-label="Quick view">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            ${priceHTML}
        </div>
    `;

    // Add event listeners
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
    });

    // Navigate to product detail on card click
    card.addEventListener('click', () => {
        window.location.href = 'product-detail.html?id=' + product.id;
    });

    return card;
}

// ========================================
// Filter & Sort Functionality
// ========================================
function filterProducts(category) {
    currentFilter = category;
    applyFiltersAndSort();
}

function sortProducts(sortType) {
    currentSort = sortType;
    applyFiltersAndSort();
}

function applyFiltersAndSort() {
    let filtered = products;

    // Apply filter
    if (currentFilter !== 'all') {
        if (currentFilter === 'new') {
            filtered = products.filter(p => p.new);
        } else {
            filtered = products.filter(p => p.category === currentFilter);
        }
    }

    // Apply sort
    let sorted = [...filtered];
    switch (currentSort) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.sort((a, b) => b.new - a.new);
            break;
        default:
            // Featured - keep original order
            break;
    }

    renderProducts(sorted);
}

// ========================================
// Cart Functionality
// ========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    saveCartToStorage();
    showNotification('Item added to cart');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToStorage();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
        saveCartToStorage();
    }
}

function updateCart() {
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-details">${item.category.toUpperCase()}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCartTotal() {
    const totalPrice = document.querySelector('.total-price');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// ========================================
// Local Storage
// ========================================
function saveCartToStorage() {
    localStorage.setItem('fashionCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('fashionCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// ========================================
// Event Listeners Setup
// ========================================
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.category);
        });
    });

    // Sort select
    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // Cart toggle
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.addEventListener('click', toggleCart);

    const closeCart = document.querySelector('.close-cart');
    closeCart.addEventListener('click', toggleCart);

    const cartOverlay = document.querySelector('.cart-overlay');
    cartOverlay.addEventListener('click', toggleCart);

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('.newsletter-input').value;
        showNotification('Thank you for subscribing!');
        e.target.reset();
    });

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        showNotification('Proceeding to checkout...');
        // Here you would redirect to checkout page
    });

    // Search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.getElementById('searchInput');

    searchToggle.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
        searchInput.value = '';
        renderProducts(products);
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filtered);
    });

    // Smooth scroll for hero button
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('products').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // ESC key closes cart and search
        if (e.key === 'Escape') {
            const cartSidebar = document.querySelector('.cart-sidebar');
            const cartOverlay = document.querySelector('.cart-overlay');
            if (cartSidebar.classList.contains('active')) {
                toggleCart();
            }
            if (searchBar.classList.contains('active')) {
                searchBar.classList.remove('active');
                searchInput.value = '';
                renderProducts(products);
            }
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
        
        // Ctrl/Cmd + K opens search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchBar.classList.add('active');
            searchInput.focus();
        }
    });

    // Image lazy loading fallback
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = '#f0f0f0';
            this.alt = 'Image not available';
        });
    });
}

// ========================================
// Utility Functions
// ========================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
        color: #fff;
        padding: 20px 32px;
        border-radius: 0;
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.5px;
        border-left: 3px solid #d4af37;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Make functions globally accessible for onclick handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
