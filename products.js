// بيانات المنتجات
const products = [
    {
        id: 1,
        name: "ألبوم صور فاخر",
        price: 299.99,
        category: "albums",
        images: [
            "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5",
            "https://images.unsplash.com/photo-1542049943556-ed37bdd10ead",
        ],
        description: "ألبوم صور فاخر مصنوع من أجود أنواع الجلد، مع 40 صفحة وتصميم عصري أنيق.",
        featured: true,
        rating: 4.8,
        reviews: 125
    },
    {
        id: 2,
        name: "إطار صور كريستال",
        price: 149.99,
        category: "frames",
        images: [
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
            "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec",
        ],
        description: "إطار صور كريستالي فاخر بحجم 30×40 سم، مثالي لصور البورتريه والمناسبات.",
        featured: true,
        rating: 4.6,
        reviews: 89
    },
    {
        id: 3,
        name: "طباعة صور فاخرة",
        price: 79.99,
        category: "prints",
        images: [
            "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4",
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
        ],
        description: "طباعة صور عالية الجودة على ورق فاخر، مقاس A3 مع معالجة خاصة للألوان.",
        featured: false,
        rating: 4.7,
        reviews: 67
    },
    {
        id: 4,
        name: "صندوق ذكريات خشبي",
        price: 199.99,
        category: "accessories",
        images: [
            "https://images.unsplash.com/photo-1532033375034-a29004ea9769",
            "https://images.unsplash.com/photo-1532033375034-a29004ea9769",
        ],
        description: "صندوق خشبي فاخر لحفظ الصور والذكريات، مع تصميم كلاسيكي وحجم مثالي.",
        featured: true,
        rating: 4.9,
        reviews: 45
    }
];

// حالة السلة
let cart = [];
let activeFilters = {
    categories: new Set(),
    maxPrice: 1000,
    size: null,
    sortBy: 'featured'
};

// عناصر DOM
const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortSelect = document.querySelector('.glass-select');

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
});

// إعداد أحداث المستمع
function setupEventListeners() {
    cartToggle.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);

    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryFilter);
    });

    priceRange.addEventListener('input', handlePriceFilter);

    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', handleSizeFilter);
    });

    sortSelect.addEventListener('change', handleSort);
}

// عرض المنتجات
function displayProducts(productsToShow) {
    productGrid.innerHTML = productsToShow.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="product-card">
                <div class="product-image-wrapper">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-details">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars" style="--rating: ${product.rating}"></div>
                        <span class="reviews">(${product.reviews} تقييم)</span>
                    </div>
                    <p class="product-price">${product.price.toFixed(2)} ريال</p>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart ms-2"></i>إضافة للسلة
                        </button>
                        <button class="view-details-btn" onclick="showProductModal(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// وظائف السلة
function toggleCart() {
    cartSidebar.classList.toggle('active');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.images[0]}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} ريال × ${item.quantity}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toFixed(2)} ريال`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// وظائف التصفية
function handleCategoryFilter(e) {
    const category = e.target.value;
    if (e.target.checked) {
        activeFilters.categories.add(category);
    } else {
        activeFilters.categories.delete(category);
    }
    applyFilters();
}

function handlePriceFilter(e) {
    activeFilters.maxPrice = parseInt(e.target.value);
    priceValue.textContent = `${activeFilters.maxPrice} ريال`;
    applyFilters();
}

function handleSizeFilter(e) {
    const buttons = document.querySelectorAll('.size-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    activeFilters.size = e.target.textContent;
    applyFilters();
}

function handleSort(e) {
    activeFilters.sortBy = e.target.value;
    applyFilters();
}

function applyFilters() {
    let filteredProducts = [...products];

    if (activeFilters.categories.size > 0) {
        filteredProducts = filteredProducts.filter(product => 
            activeFilters.categories.has(product.category)
        );
    }

    filteredProducts = filteredProducts.filter(product => 
        product.price <= activeFilters.maxPrice
    );

    switch(activeFilters.sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
            filteredProducts.sort((a, b) => b.featured - a.featured);
            break;
    }

    displayProducts(filteredProducts);
}

// نافذة تفاصيل المنتج
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = `${product.price.toFixed(2)} ريال`;
    
    const carouselInner = document.querySelector('#productCarousel .carousel-inner');
    carouselInner.innerHTML = product.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${img}" class="d-block w-100" alt="${product.name}">
        </div>
    `).join('');

    const quantityInput = document.getElementById('productQuantity');
    document.getElementById('decreaseQuantity').onclick = () => {
        if (quantityInput.value > 1) quantityInput.value--;
    };
    document.getElementById('increaseQuantity').onclick = () => {
        quantityInput.value++;
    };

    document.getElementById('modalAddToCart').onclick = () => {
        const quantity = parseInt(quantityInput.value);
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
        modal.hide();
    };

    modal.show();
}

// إشعار التوست
function showToast() {
    const toast = new bootstrap.Toast(document.getElementById('cartToast'));
    toast.show();
} 