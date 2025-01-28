// Sample product data
const products = [
    {
        id: 1,
        name: "باقة المولود الجديد",
        price: 799.99,
        category: "newborn",
        images: [
            "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500",
            "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500",
        ],
        description: "باقة تصوير متكاملة للمواليد من عمر 14 يوم، تشمل جلسة تصوير احترافية مع الأكسسوارات وألبوم صور فاخر.",
        featured: true,
        rating: 4.9,
        reviews: 128,
        includes: [
            "جلسة تصوير لمدة ساعتين",
            "20 صورة معدلة احترافياً",
            "ألبوم صور فاخر",
            "5 صور مطبوعة مقاس A4",
            "قالب فني لليد والقدم"
        ]
    },
    {
        id: 2,
        name: "باقة الأطفال المميزة",
        price: 599.99,
        category: "children",
        images: [
            "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?w=500",
            "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?w=500",
        ],
        description: "باقة تصوير خاصة للأطفال من عمر 7 إلى 9 أشهر، تشمل جلسة تصوير متنوعة مع خلفيات وأكسسوارات مختلفة.",
        featured: true,
        rating: 4.8,
        reviews: 95,
        includes: [
            "جلسة تصوير لمدة ساعة ونصف",
            "15 صورة معدلة احترافياً",
            "ألبوم صور مخصص",
            "3 صور مغناطيسية",
            "صورة مكبرة مع إطار"
        ]
    },
    {
        id: 3,
        name: "باقة التصوير العائلي",
        price: 999.99,
        category: "family",
        images: [
            "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=500",
            "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=500",
        ],
        description: "باقة تصوير شاملة للعائلة، تجمع بين الصور الفردية والجماعية مع خيارات متعددة للخلفيات والأماكن.",
        featured: true,
        rating: 4.7,
        reviews: 67,
        includes: [
            "جلسة تصوير لمدة ساعتين",
            "25 صورة معدلة احترافياً",
            "ألبوم عائلي فاخر",
            "5 صور مغناطيسية",
            "لوحة جدارية كبيرة"
        ]
    },
    {
        id: 4,
        name: "باقة المجسمات التذكارية",
        price: 299.99,
        category: "souvenirs",
        images: [
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500",
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500",
        ],
        description: "مجسمات فنية مميزة لليد والقدم، مصنوعة بأعلى جودة لتخليد ذكريات طفلك الثمينة.",
        featured: false,
        rating: 4.9,
        reviews: 45,
        includes: [
            "قالب فني لليد والقدم",
            "إطار فاخر",
            "شهادة أصالة",
            "علبة هدية أنيقة",
            "خدمة توصيل مجانية"
        ]
    }
];

// Function to format price
function formatPrice(price) {
    return price.toLocaleString('ar-SA', {
        style: 'currency',
        currency: 'SAR'
    });
}

// Function to create product card
function createProductCard(product) {
    return `
        <div class="col-lg-6 col-xl-4">
            <div class="product-card" onclick="showProductDetails(${product.id})">
                <div class="product-image-wrapper">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-details">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <div class="rating">
                        <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                        <span class="rating-count">(${product.reviews} تقييم)</span>
                    </div>
                    <ul class="product-includes">
                        ${product.includes.slice(0, 3).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <div class="product-actions">
                        <button class="add-to-cart-btn">احجز موعد</button>
                        <button class="view-details-btn" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to show product details in modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = formatPrice(product.price);

    const includesList = document.getElementById('modalProductIncludes');
    includesList.innerHTML = product.includes.map(item => `<li>${item}</li>`).join('');

    const carousel = document.querySelector('#productCarousel .carousel-inner');
    carousel.innerHTML = product.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${img}" class="d-block w-100" alt="${product.name}">
        </div>
    `).join('');

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Function to filter products
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('.form-check-input:checked'))
        .map(checkbox => checkbox.value);
    
    const priceRange = document.getElementById('priceRange').value;
    const sortSelect = document.querySelector('.sort-options select');
    const sortValue = sortSelect.value;

    let filteredProducts = products;

    // Apply category filter
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(product => 
        product.price <= priceRange
    );

    // Apply sorting
    switch(sortValue) {
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
            filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
    }

    // Update product grid
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initial product display
    filterProducts();

    // Set up event listeners
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    document.getElementById('priceRange').addEventListener('input', (e) => {
        document.getElementById('priceValue').textContent = formatPrice(Number(e.target.value));
        filterProducts();
    });

    document.querySelector('.sort-options select').addEventListener('change', filterProducts);

    // Set initial price range value
    const priceRange = document.getElementById('priceRange');
    document.getElementById('priceValue').textContent = formatPrice(Number(priceRange.value));
});

// Cart and Notifications Functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Close notifications if open
    const notificationsSidebar = document.getElementById('notificationsSidebar');
    if (notificationsSidebar.classList.contains('active')) {
        notificationsSidebar.classList.remove('active');
    }
}

function toggleNotifications() {
    const notificationsSidebar = document.getElementById('notificationsSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    notificationsSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Close cart if open
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar.classList.contains('active')) {
        cartSidebar.classList.remove('active');
    }
}

function closeAllSidebars() {
    const cartSidebar = document.getElementById('cartSidebar');
    const notificationsSidebar = document.getElementById('notificationsSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    cartSidebar.classList.remove('active');
    notificationsSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

function addToCart(productId) {
    // Show success modal
    const modal = new bootstrap.Modal(document.getElementById('addToCartModal'));
    modal.show();
    
    // Update cart count
    const cartBadge = document.querySelector('.fa-shopping-cart + .badge');
    const currentCount = parseInt(cartBadge.textContent);
    cartBadge.textContent = currentCount + 1;
    
    // You would typically also make an API call here to update the cart in the backend
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to cart and notification icons
    document.querySelector('.fa-shopping-cart').parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });
    
    document.querySelector('.fa-bell').parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        toggleNotifications();
    });
    
    // Add click event listeners to remove buttons in cart
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.opacity = '0';
            setTimeout(() => {
                cartItem.remove();
                updateCartTotal();
            }, 300);
        });
    });
});

function updateCartTotal() {
    const prices = Array.from(document.querySelectorAll('.cart-item .price'))
        .map(el => parseFloat(el.textContent.replace('ر.س', '')));
    
    const total = prices.reduce((sum, price) => sum + price, 0);
    document.querySelector('.total-amount').textContent = total.toFixed(2) + ' ر.س';
    
    // Update cart badge
    const cartBadge = document.querySelector('.fa-shopping-cart + .badge');
    cartBadge.textContent = prices.length;
} 
