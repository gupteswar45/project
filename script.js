// Sample Car Dataset
const carsData = [
    {
        id: 1,
        name: "CyberTracer X1",
        category: "hypercar",
        price: 2450000,
        speed: "410 km/h",
        power: "1200 HP",
        img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Tesla Roadster Concept",
        category: "sports",
        price: 200000,
        speed: "400 km/h",
        power: "1000 HP",
        img: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Apex Volt E-SUV",
        category: "suv",
        price: 85000,
        speed: "250 km/h",
        power: "650 HP",
        img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Stratos Electric GTR",
        category: "sports",
        price: 350000,
        speed: "320 km/h",
        power: "800 HP",
        img: "https://images.unsplash.com/photo-1611245801097-4524b0af40a3?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Titan Mach-E SUV",
        category: "suv",
        price: 110000,
        speed: "220 km/h",
        power: "580 HP",
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Chiron Blue Edition",
        category: "hypercar",
        price: 3200000,
        speed: "440 km/h",
        power: "1500 HP",
        img: "https://images.unsplash.com/photo-1600706432502-75a0e2b4279c?q=80&w=600&auto=format&fit=crop"
    }
];

let cart = [];

// DOM Elements
const carContainer = document.getElementById("car-container");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const filterButtons = document.querySelectorAll(".filter-btn");

// 1. Function to display cars dynamically
function renderCars(filter = "all") {
    carContainer.innerHTML = "";
    
    const filteredCars = filter === "all" ? carsData : carsData.filter(car => car.category === filter);
    
    filteredCars.forEach(car => {
        const carCard = `
            <div class="car-card">
                <img src="${car.img}" alt="${car.name}">
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <div class="car-specs">
                        <span><i class="fas fa-tachometer-alt"></i> ${car.speed}</span>
                        <span><i class="fas fa-bolt"></i> ${car.power}</span>
                    </div>
                    <div class="car-bottom">
                        <div class="price">$${car.price.toLocaleString()}</div>
                        <button class="add-to-cart-btn" onclick="addToCart(${car.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        carContainer.innerHTML += carCard;
    });
}

// 2. Filter Functionality
filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Remove active class from previous active button
        document.querySelector(".filter-btn.active").classList.remove("active");
        // Add active class to clicked button
        e.target.classList.add("active");
        
        const filterValue = e.target.getAttribute("data-filter");
        renderCars(filterValue);
    });
});

// 3. Add item to virtual garage cart
window.addToCart = function(id) {
    const selectedCar = carsData.find(car => car.id === id);
    
    // Check if car is already in cart
    if(cart.some(item => item.id === id)) {
        alert("This car is already added to your Garage!");
        return;
    }
    
    cart.push(selectedCar);
    updateCart();
    
    // Auto-open sidebar when item is added
    cartSidebar.classList.add("open");
}

// 4. Remove item from garage cart
window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// 5. Update UI Interface of Cart Dashboard
function updateCart() {
    cartCount.innerText = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Your garage is empty!</p>`;
        cartTotal.innerText = "$0";
        return;
    }
    
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;
    
    cart.forEach(item => {
        totalPrice += item.price;
        const itemRow = `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString()}</p>
                </div>
                <i class="fas fa-trash-alt" onclick="removeFromCart(${item.id})"></i>
            </div>
        `;
        cartItemsContainer.innerHTML += itemRow;
    });
    
    cartTotal.innerText = `$${totalPrice.toLocaleString()}`;
}

// 6. Sidebar Cart Sliding Event Listeners
cartBtn.addEventListener("click", () => cartSidebar.classList.add("open"));
closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));

// Initial Run Call
renderCars();