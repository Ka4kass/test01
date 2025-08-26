document.addEventListener('DOMContentLoaded', function() {
    // Define all cities with their featured products in a structured format
    const cities = [
        { name: "München", product: "München", price: 34, description: "München – eine Stadt mit einer reichen architektonischen Palette, in der gotische Kathedralen, barocke Paläste und Bauten der Neorenaissance harmonisch mit Bereichen moderner Architektur verschmelzen. Ihre Straßen und Plätze bewahren die Atmosphäre der Geschichte, ergänzt durch den lebendigen Rhythmus des modernen Lebens.", scale: "1:4500", parts: 100, size: "18x18", region: "Hamburg", image: "./img/5.png",liste:"./img/25.png" },
        { name: "Stuttgart", product: "Stuttgart", price: 34, description: "Stuttgart – eine Stadt mit einer harmonischen Verbindung aus klassischen Palästen und modernen Bauten. Architektonische Symmetrie und feine dekorative Details verbinden sich mit grünen Rasenflächen und Fußgängeralleen und schaffen im Herzen der Stadt ein Gefühl von Offenheit und Eleganz.", scale: "1:4500", parts: 85, size: "18x18", region: "Bayern", image: "./img/6.png" ,liste:"./img/22.png"},
        { name: "Karlsruhe", product: "Karlsruhe", price: 34, description: "Karlsruhe – eine Stadt mit einzigartiger radialer Stadtplanung, deren Zentrum ein prächtiges Schloss bildet. Von dort erstrecken sich gerade Boulevards wie Sonnenstrahlen und verbinden neoklassizistische Architektur mit weitläufigen Parkanlagen.", scale: "1:4500", parts: 320,size: "18x18",  region: "Bayern", image: "./img/Unbenannt-7.1.png",liste:"./img/71.png"},
        { name: "Heidelberg", product: "Heidelberg", price: 34, description: "Heidelberg – eine Stadt romantischer Ausblicke, in der über den alten Straßen die Ruine eines Schlosses aus rotem Sandstein thront. Die steinerne Alte Brücke und die Universitätsgebäude schaffen eine Atmosphäre des klassischen Europas, die in der Zeit bewahrt wurde.", scale: "1:4500", parts: 65,size: "18x18",  region: "Bayern", image: "./img/2.png",liste:"./img/24.png"},
        { name: "Frankfurt am Main", product: "Frankfurt am Main", price: 34, description: "Frankfurt – das moderne Geschäftsviertel prägt die Skyline mit markanten Türmen aus Stahl und Glas, die zu den bekanntesten in Europa zählen. Hohe Fassaden spiegeln den Himmel wider, während klare geometrische Linien die Dynamik und den internationalen Charakter der Stadt unterstreichen.", scale: "1:4500", parts: 85,size: "18x18",  region: "Nordrhein-Westfalen", image: "./img/1.png",liste:"./img/23.png" },
        { name: "Köln", product: "Köln", price: 34, description: "Köln – eine Stadt mit einem markanten architektonischen Gesicht, in der die Größe der Gotik mit Elementen römischer und moderner Bebauung verschmilzt. Steile Türme, historische Viertel und Freiflächen am Rhein formen eine unverwechselbare Skyline und eine lebendige städtische Atmosphäre.", scale: "1:4500", parts: 50,size: "18x18",  region: "Berlin-Brandenburg", image: "./img/3.png",liste:"./img/20.png" },
        { name: "Dresden", product: "Dresden", price: 34, description: "Dresden – eine Stadt, in der barocke Paläste und prächtige Kirchtürme eine unverwechselbare Skyline am Ufer der Elbe bilden. Das historische Zentrum beeindruckt mit seiner prachtvollen Architektur, darunter das Ensemble des Zwingers und der Frauenkirche, die künstlerische Opulenz mit jahrhundertealter Geschichte verbinden.", scale: "1:4500", parts: 45,size: "18x18", region: "Berlin-Brandenburg", image: "./img/4.png",liste:"./img/21.png" },

    ];
    
    // Group cities by region for easier access
    const citiesByRegion = cities.reduce((acc, city) => {
        if (!acc[city.region]) {
            acc[city.region] = [];
        }
        acc[city.region].push(city.name);
        return acc;
    }, {});
    
    // Handle product selection display
    const productSelection = document.querySelector('.product-selection');
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCity = urlParams.get('city');
    const selectedRegion = urlParams.get('region');
    
    // Update page title based on selection
    const sectionTitle = document.querySelector('.section-title');
    if (productSelection) {
        // Clear any existing content
        productSelection.innerHTML = '';
        
        // Filter cities based on URL parameters
        let displayCities = cities;
        if (selectedCity) {
            displayCities = cities.filter(city => city.name === selectedCity);
        } else if (selectedRegion) {
            displayCities = cities.filter(city => city.region === selectedRegion);
        }
        
        // Add product items for filtered cities
        displayCities.forEach((city) => {
            // Create product item HTML structure
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            
            // Create product item inner structure
            const productHTML = `
                <div class="product-image">
                    <img src="${city.image}" alt="${city.product}">
                </div>
                <div class="product-info">
                    <h3>${city.product}</h3>
                    <div class="product-meta">
                        <span class="detail">Maßstab: ${city.scale} | Teile: ${city.parts} </span>
                    </div>
                </div>
            `;
            
            productItem.innerHTML = productHTML;
            
            // Add "Add to Cart" button
            const addToCartBtn = document.createElement('button');
            
            
            // Append the button to the product-info div
            
            // Make whole product item clickable for product details
            productItem.addEventListener('click', function(e) {
                if (!e.target.classList.contains('add-to-cart')) {
                    window.location.href = `product.html?name=${encodeURIComponent(city.product)}&city=${encodeURIComponent(city.name)}&price=${city.price}&image=${encodeURIComponent(city.image)}&scale=${encodeURIComponent(city.scale)}&parts=${city.parts}&description=${encodeURIComponent(city.description)}&liste=${encodeURIComponent(city.liste)}&size=${encodeURIComponent(city.size)}`;

                }
            });
            
            productSelection.appendChild(productItem);
        });
        
        // Show message if no products found
        if (displayCities.length === 0) {
            const noProducts = document.createElement('div');
            noProducts.className = 'no-products';
            noProducts.textContent = 'Keine Produkte gefunden';
            productSelection.appendChild(noProducts);
        }
    }
    
    // Handle product detail page
    const productDetail = document.querySelector('.product-detail');
    if (productDetail && window.location.pathname.includes('product.html')) {
        const productName = urlParams.get('name');
        const productCity = urlParams.get('city');
        const productPrice = parseFloat(urlParams.get('price') || 0);
        const productImage = urlParams.get('image');
        const productScale = urlParams.get('scale');
        const productParts = urlParams.get('parts');
        const productDescription = urlParams.get('description');
        const productListe = urlParams.get('liste');
        const productSize = urlParams.get('size');


        
        if (productName) {
            // Update page title
            document.title = `${productName} - Versity`;
            
            // Create product detail HTML
            productDetail.innerHTML = `
                <div class="container">
                    <div class="product-detail-content">
                        <img src="${productImage}" alt="${productName}" class="product-detail-img">

                        <div class="product-info">
                            <h1>${productName}</h1>
                            <p class="description">${productDescription}</p>
                            <div class="product-meta">
                                <span class="price">${productPrice.toFixed()} €</span>
                                <span class="detail">Maßstab: ${productScale} | Teile: ${productParts} | Grosse: ${productSize}</span>
                            </div>
                            <button id="addToCartDetail" class="add-to-cart">In den Warenkorb</button>

                        </div>
                        <div class"img-poso">
                                <img src="${productListe}" alt="Zusätzliches Bild" class "position-bild" style="
    margin-top: 100px;>

                           </div>
                            <div class="product-list">
                            <div class="product-additional-info">
                                <h3>Produktdetails</h3>
                                <p>Dieses hochwertige 3D-Modell ist perfekt für Architekturliebhaber und Sammler. Hergestellt aus langlebigem Material, bietet es ein authentisches Abbild des originalen Bauwerks.</p>
                                        
                            </div>
                        </div>
                        

                    </div>
                </div>
            `;
            
            // Add event listener to the "Add to Cart" button on product detail page
            const addToCartDetailBtn = document.getElementById('addToCartDetail');
            if (addToCartDetailBtn) {
                addToCartDetailBtn.addEventListener('click', function() {
                    // Create product object for the cart
                    const product = {
                        name: productName,
                        city: productCity,
                        price: productPrice,
                        image: productImage,
                        liste: productListe
                    };
                    
                    // Add product to cart
                    addToCart(product);
                });
            }
        }
    }
    
    // Handle region pages
    const citiesList = document.getElementById('cities-list');
    if (citiesList && selectedRegion) {
        // Clear existing content
        citiesList.innerHTML = '';
        
        // Display cities for the selected region
        if (citiesByRegion[selectedRegion]) {
            citiesByRegion[selectedRegion].forEach(cityName => {
                const cityLink = document.createElement('a');
                cityLink.href = `products.html?city=${encodeURIComponent(cityName)}`;
                cityLink.textContent = cityName;
                cityLink.className = 'city-card';
                citiesList.appendChild(cityLink);
            });
        } else {
            citiesList.innerHTML = '<p>Keine Städte gefunden</p>';
        }
    }
    
    // Initialize the shopping cart functionality
    initShoppingCart();
});

// Function to initialize shopping cart functionality
function initShoppingCart() {
    // Initialize the order count display
    updateOrderCount();
    
    // Setup modal functionality
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const clearOrdersBtn = document.getElementById('clearOrders');
    const continueOrderBtn = document.getElementById('continueOrder');
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (clearOrdersBtn) {
        clearOrdersBtn.addEventListener('click', function() {
            localStorage.removeItem('orders');
            updateOrderList();
            updateOrderCount();
        });
    }
    
    if (continueOrderBtn) {
        continueOrderBtn.addEventListener('click', function() {
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        });
    }
    
    // If we're on the product.html page, update the product display
    const urlParams = new URLSearchParams(window.location.search);
    const productName = document.getElementById('product-name');
    const productCity = document.getElementById('product-city');
    const productPrice = document.getElementById('product-price');
    
    if (productName && productCity && productPrice && window.location.pathname.includes('product.html')) {
        productName.textContent = urlParams.get('name') || 'Produktname';
        productCity.textContent = urlParams.get('city') || '';
        const price = parseFloat(urlParams.get('price') || 0);
        productPrice.textContent = `${price.toFixed(2).replace('.', ',')} €`;
    }
}

// Function to add product to cart
function addToCart(product) {
    // Validate product object
    if (!product || !product.name || isNaN(product.price)) {
        console.error('Invalid product data');
        return;
    }
    
    // Get existing orders from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add the new product to orders
    orders.push(product);
    
    // Save updated orders to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Update the cart display
    updateOrderList();
    updateOrderCount();
    
    // Open the modal
    openModal();
    
    // Show confirmation message
    showNotification(`${product.name} wurde zum Warenkorb hinzugefügt`);
}

// Function to show a notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Function to update the order count in the header
function updateOrderCount() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderCountElement = document.getElementById('orderCount');
    if (orderCountElement) {
        orderCountElement.textContent = orders.length;
    }
}

// Function to update the order list in the modal
function updateOrderList() {
    const orderList = document.getElementById('orderList');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!orderList || !orderTotal) return;
    
    // Get orders from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Clear the current list
    orderList.innerHTML = '';
    
    // Calculate total
    let totalAmount = 0;
    
    if (orders.length === 0) {
        orderList.innerHTML = '<p class="empty-cart">Ihr Warenkorb ist leer</p>';
    } else {
        // Add each order to the list
        orders.forEach((order, index) => {
            if (!order || !order.name || isNaN(order.price)) return;
            
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            
            orderItem.innerHTML = `
                <span>${index + 1}. ${order.name} (${order.city}) - ${order.price.toFixed(2).replace('.', ',')} €</span>
                <div class="remove-order" data-index="${index}">×</div>
            `;
            
            orderList.appendChild(orderItem);
            
            totalAmount += order.price;
        });
        
        // Add event listeners to remove buttons
        const removeButtons = orderList.querySelectorAll('.remove-order');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeOrder(index);
            });
        });
    }
    
    // Update the total amount display
    orderTotal.textContent = `Summe: ${totalAmount.toFixed(2).replace('.', ',')} €`;
}

// Function to remove an order from the cart
function removeOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (index >= 0 && index < orders.length) {
        const removedProduct = orders[index];
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        updateOrderList();
        updateOrderCount();
        
        // Show confirmation message
        showNotification(`${removedProduct.name} wurde aus dem Warenkorb entfernt`);
    }
}

// Function to open the modal
function openModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.classList.add('open');
        orderModal.style.visibility = 'visible';
        orderModal.style.opacity = '1';

        // Update order list when opening modal
        updateOrderList();
    }
}

// Function to close the modal
function closeModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.classList.remove('open');
        orderModal.style.visibility = 'hidden';
        orderModal.style.opacity = '0';
    }
}
// Function to update the order list in the modal
function updateOrderList() {
    const orderList = document.getElementById("orderList");
    const orderTotal = document.getElementById("orderTotal");
    
    if (!orderList || !orderTotal) return;
    
    // Get orders from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // Clear the current list
    orderList.innerHTML = "";
    
    // Calculate total
    let totalAmount = 0;
    
    // Add each order to the list
    orders.forEach((order, index) => {
        if (!order || !order.name || isNaN(order.price)) return;
        
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        
        // Add image thumbnail to order item
        const itemHTML = `
            <div class="order-item-image">
                <img src="${order.image || '/api/placeholder/60/60'}" alt="${order.name}" width="60" height="60">
            </div>
            <div class="order-item-details">
                <span>${order.name}</span>
                <span class="order-item-price">€${order.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="remove-order" onclick="removeOrder(${index})">×</div>
        `;
        
        orderItem.innerHTML = itemHTML;
        orderList.appendChild(orderItem);
        
        totalAmount += order.price;
    });
    
    // Update the total amount display
    orderTotal.textContent = `Summe: €${totalAmount.toFixed(2).replace('.', ',')}`;
}

// Add this function to your existing JavaScript file (likely tets2.js)

function setupCitySearch() {
    // Get search elements
    const searchInput = document.getElementById('citySearch');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
      // Function to filter cities based on search input
      function filterCities() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const cityItems = document.querySelectorAll('.product-item');
        let hasResults = false;
        
        cityItems.forEach(item => {
          // Skip the "+" card if it exists
          if (item.querySelector('.plus-icon')) return;
          
          const cityName = item.querySelector('h3').textContent.toLowerCase();
          if (searchTerm === '' || cityName.includes(searchTerm)) {
            item.style.display = 'block';
            hasResults = true;
          } else {
            item.style.display = 'none';
          }
        });
        
        // Show/hide no results message
        const noResults = document.getElementById('noSearchResults');
        if (noResults) {
          noResults.style.display = hasResults ? 'none' : 'block';
        }
      }
      
      // Add event listeners
      searchButton.addEventListener('click', filterCities);
      searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          filterCities();
        }
      });
    }
  }
  


document.addEventListener('DOMContentLoaded', function() {
    // Get the nav toggle button and the navigation element
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    // Add click event listener to the toggle button
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            // Toggle a class on the nav element to show/hide it
            nav.classList.toggle('active');
            
            // Optionally, toggle a class on the button itself to show it's active
            navToggle.classList.toggle('active');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    if (window.location.pathname.includes('index.html')) {
        displayAllCities();
    }

    // Function to display all cities in a grid
    function displayAllCities() {
        const citiesContainer = document.querySelector('.product-selection');
        if (!citiesContainer) return;

        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.textContent = "Beliebteste Städte";
        }

        citiesContainer.innerHTML = '';

        const cities = [
            { name: "München", product: "München", price: 34, description: "München – eine Stadt mit einer reichen architektonischen Palette, in der gotische Kathedralen, barocke Paläste und Bauten der Neorenaissance harmonisch mit Bereichen moderner Architektur verschmelzen. Ihre Straßen und Plätze bewahren die Atmosphäre der Geschichte, ergänzt durch den lebendigen Rhythmus des modernen Lebens.", scale: "1:4500", parts: 100, size: "18x18", region: "Hamburg", image: "./img/5.png",liste:"./img/25.png" },
            { name: "Stuttgart", product: "Stuttgart", price: 34, description: "Stuttgart – eine Stadt mit einer harmonischen Verbindung aus klassischen Palästen und modernen Bauten. Architektonische Symmetrie und feine dekorative Details verbinden sich mit grünen Rasenflächen und Fußgängeralleen und schaffen im Herzen der Stadt ein Gefühl von Offenheit und Eleganz.", scale: "1:4500", parts: 85, size: "18x18", region: "Bayern", image: "./img/6.png" ,liste:"./img/22.png"},
            { name: "Karlsruhe", product: "Karlsruhe", price: 34, description: "Karlsruhe – eine Stadt mit einzigartiger radialer Stadtplanung, deren Zentrum ein prächtiges Schloss bildet. Von dort erstrecken sich gerade Boulevards wie Sonnenstrahlen und verbinden neoklassizistische Architektur mit weitläufigen Parkanlagen.", scale: "1:4500", parts: 320,size: "18x18",  region: "Bayern", image: "./img/Unbenannt-7.1.png",liste:"./img/71.png"},
            { name: "Heidelberg", product: "Heidelberg", price: 34, description: "Heidelberg – eine Stadt romantischer Ausblicke, in der über den alten Straßen die Ruine eines Schlosses aus rotem Sandstein thront. Die steinerne Alte Brücke und die Universitätsgebäude schaffen eine Atmosphäre des klassischen Europas, die in der Zeit bewahrt wurde.", scale: "1:4500", parts: 65,size: "18x18",  region: "Bayern", image: "./img/2.png",liste:"./img/24.png"},
            { name: "Frankfurt am Main", product: "Frankfurt am Main", price: 34, description: "Frankfurt – das moderne Geschäftsviertel prägt die Skyline mit markanten Türmen aus Stahl und Glas, die zu den bekanntesten in Europa zählen. Hohe Fassaden spiegeln den Himmel wider, während klare geometrische Linien die Dynamik und den internationalen Charakter der Stadt unterstreichen.", scale: "1:4500", parts: 85,size: "18x18",  region: "Nordrhein-Westfalen", image: "./img/1.png",liste:"./img/23.png" },
            { name: "Köln", product: "Köln", price: 34, description: "Köln – eine Stadt mit einem markanten architektonischen Gesicht, in der die Größe der Gotik mit Elementen römischer und moderner Bebauung verschmilzt. Steile Türme, historische Viertel und Freiflächen am Rhein formen eine unverwechselbare Skyline und eine lebendige städtische Atmosphäre.", scale: "1:4500", parts: 50,size: "18x18",  region: "Berlin-Brandenburg", image: "./img/3.png",liste:"./img/20.png" },
            { name: "Dresden", product: "Dresden", price: 34, description: "Dresden – eine Stadt, in der barocke Paläste und prächtige Kirchtürme eine unverwechselbare Skyline am Ufer der Elbe bilden. Das historische Zentrum beeindruckt mit seiner prachtvollen Architektur, darunter das Ensemble des Zwingers und der Frauenkirche, die künstlerische Opulenz mit jahrhundertealter Geschichte verbinden.", scale: "1:4500", parts: 45,size: "18x18", region: "Berlin-Brandenburg", image: "./img/4.png",liste:"./img/21.png" },
    
        ];

        cities.forEach(city => {
            const cityCard = document.createElement('div');
            cityCard.className = 'product-item';

            cityCard.innerHTML = `
                <div class="product-image">
                    <img src="${city.image}" alt="${city.name}">
                </div>
                <div class="product-info">
                    <h3>${city.name}</h3>
                </div>
            `;

            cityCard.addEventListener('click', function() {
                window.location.href = `product.html?name=${encodeURIComponent(city.product)}&city=${encodeURIComponent(city.name)}&price=${city.price}&image=${encodeURIComponent(city.image)}&scale=${encodeURIComponent(city.scale)}&parts=${city.parts}&description=${encodeURIComponent(city.description)}&liste=${encodeURIComponent(city.liste)}&size=${encodeURIComponent(city.size)}`;
            });

            citiesContainer.appendChild(cityCard);
        });

        // 👉 Додаємо кнопку "+" в кінець
        const plusCard = document.createElement('a');
        plusCard.href = "./stadt.html";
        plusCard.className = 'shop-box'; // або 'product-card', якщо такий стиль використовуєш

        plusCard.innerHTML = `
            <div class="shop-box">

                <a href="./stadt.html" class="plus-icon">+</a>
            </div>
        `;

        citiesContainer.appendChild(plusCard);
    }
});
// EmailJS Integration for Checkout Page



// Function to collect all order information
function collectOrderInfo() {
    // Get customer information from form
    const customerInfo = {
        first_name: document.getElementById("first-name").value,
        last_name: document.getElementById("last-name").value,
        company: document.getElementById("company").value || "Not provided",
        phone: document.getElementById("phone").value,
        address1: document.getElementById("address1").value,
        address2: document.getElementById("address2").value || "Not provided",
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        postal_code: document.getElementById("postal-code").value,
        country: document.getElementById("country").value,
        payment_method: document.getElementById("payment-method").value
    };
    
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // Format orders for email
    let orderItems = "";
    let totalAmount = 0;
    
    orders.forEach((item, index) => {
        orderItems += `Item ${index + 1}: ${item.name} (${item.city}) - €${item.price.toFixed(2)}\n`;
        totalAmount += item.price;
    });
    
    // Calculate shipping based on country
    const shippingCost = customerInfo.country === "Germany" ? 4.49 : 6.49;
    const finalTotal = totalAmount + shippingCost;
    
    // Create complete order information for email
    return {
        customer_name: `${customerInfo.first_name} ${customerInfo.last_name}`,
        customer_email: "customer@example.com", // You might want to add an email field to your form
        customer_phone: customerInfo.phone,
        customer_address: `${customerInfo.address1}, ${customerInfo.address2 ? customerInfo.address2 + ', ' : ''}${customerInfo.city}, ${customerInfo.state}, ${customerInfo.postal_code}, ${customerInfo.country}`,
        order_items: orderItems,
        subtotal: `€${totalAmount.toFixed(2)}`,
        shipping: `€${shippingCost.toFixed(2)}`,
        total_amount: `€${finalTotal.toFixed(2)}`,
        payment_method: customerInfo.payment_method,
        order_date: new Date().toLocaleString(),
        company: customerInfo.company,
        full_address_info: JSON.stringify(customerInfo, null, 2)
    };
}
// Function to display random similar products
function displaySimilarProducts() {
    // Get the container for similar products
    const similarProductsContainer = document.querySelector('.similar-products .product-selection');
    if (!similarProductsContainer) return;
    
    // Define all cities with their featured products (using the same data structure you already have)
    const allProducts = [
        { name: "München", product: "München", price: 34, description: "München – eine Stadt mit einer reichen architektonischen Palette, in der gotische Kathedralen, barocke Paläste und Bauten der Neorenaissance harmonisch mit Bereichen moderner Architektur verschmelzen. Ihre Straßen und Plätze bewahren die Atmosphäre der Geschichte, ergänzt durch den lebendigen Rhythmus des modernen Lebens.", scale: "1:4500", parts: 100, size: "18x18", region: "Hamburg", image: "./img/5.png",liste:"./img/25.png" },
        { name: "Stuttgart", product: "Stuttgart", price: 34, description: "Stuttgart – eine Stadt mit einer harmonischen Verbindung aus klassischen Palästen und modernen Bauten. Architektonische Symmetrie und feine dekorative Details verbinden sich mit grünen Rasenflächen und Fußgängeralleen und schaffen im Herzen der Stadt ein Gefühl von Offenheit und Eleganz.", scale: "1:4500", parts: 85, size: "18x18", region: "Bayern", image: "./img/6.png" ,liste:"./img/22.png"},
        { name: "Karlsruhe", product: "Karlsruhe", price: 34, description: "Karlsruhe – eine Stadt mit einzigartiger radialer Stadtplanung, deren Zentrum ein prächtiges Schloss bildet. Von dort erstrecken sich gerade Boulevards wie Sonnenstrahlen und verbinden neoklassizistische Architektur mit weitläufigen Parkanlagen.", scale: "1:4500", parts: 320,size: "18x18",  region: "Bayern", image: "./img/Unbenannt-7.1.png",liste:"./img/71.png"},
        { name: "Heidelberg", product: "Heidelberg", price: 34, description: "Heidelberg – eine Stadt romantischer Ausblicke, in der über den alten Straßen die Ruine eines Schlosses aus rotem Sandstein thront. Die steinerne Alte Brücke und die Universitätsgebäude schaffen eine Atmosphäre des klassischen Europas, die in der Zeit bewahrt wurde.", scale: "1:4500", parts: 65,size: "18x18",  region: "Bayern", image: "./img/2.png",liste:"./img/24.png"},
        { name: "Frankfurt am Main", product: "Frankfurt am Main", price: 34, description: "Frankfurt – das moderne Geschäftsviertel prägt die Skyline mit markanten Türmen aus Stahl und Glas, die zu den bekanntesten in Europa zählen. Hohe Fassaden spiegeln den Himmel wider, während klare geometrische Linien die Dynamik und den internationalen Charakter der Stadt unterstreichen.", scale: "1:4500", parts: 85,size: "18x18",  region: "Nordrhein-Westfalen", image: "./img/1.png",liste:"./img/23.png" },
        { name: "Köln", product: "Köln", price: 34, description: "Köln – eine Stadt mit einem markanten architektonischen Gesicht, in der die Größe der Gotik mit Elementen römischer und moderner Bebauung verschmilzt. Steile Türme, historische Viertel und Freiflächen am Rhein formen eine unverwechselbare Skyline und eine lebendige städtische Atmosphäre.", scale: "1:4500", parts: 50,size: "18x18",  region: "Berlin-Brandenburg", image: "./img/3.png",liste:"./img/20.png" },
        { name: "Dresden", product: "Dresden", price: 34, description: "Dresden – eine Stadt, in der barocke Paläste und prächtige Kirchtürme eine unverwechselbare Skyline am Ufer der Elbe bilden. Das historische Zentrum beeindruckt mit seiner prachtvollen Architektur, darunter das Ensemble des Zwingers und der Frauenkirche, die künstlerische Opulenz mit jahrhundertealter Geschichte verbinden.", scale: "1:4500", parts: 45,size: "18x18", region: "Berlin-Brandenburg", image: "./img/4.png",liste:"./img/21.png" },
    ];
    
    
    // Get current product name from URL to exclude it from similar products
    const urlParams = new URLSearchParams(window.location.search);
    const currentProductName = urlParams.get('name');
    
    // Filter out the current product
    const availableProducts = allProducts.filter(product => 
        product.product !== currentProductName
    );
    
    // Shuffle the array to get random products
    const shuffledProducts = shuffleArray([...availableProducts]);
    
    // Get 4 random products (or less if not enough available)
    const randomProducts = shuffledProducts.slice(0, 2);
    
    // Clear container
    similarProductsContainer.innerHTML = '';
    
    // Add random products to the container
    randomProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.product}">
            </div>
            <div class="product-card-content">
                <h3>${product.product}</h3>
            </div>
        `;
        
        // Make the card clickable to go to product detail
        productCard.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                window.location.href = `product.html?name=${encodeURIComponent(product.product)}&city=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&scale=${encodeURIComponent(product.scale)}&parts=${product.parts}&description=${encodeURIComponent(product.description)}&liste=${encodeURIComponent(product.image)}`;
            }
        });
        
        // Add event listener to "In den Warenkorb" button
        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent the card click event
                
                // Create product object for cart
                const productForCart = {
                    name: product.product,
                    city: product.name,
                    price: product.price,
                    image: product.image,
                    liste: product.image // Using the same image for liste
                };
                
                // Add to cart
                addToCart(productForCart);
            });
        }
        
        similarProductsContainer.appendChild(productCard);
    });
}

// Shuffle array function (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Call this function when the DOM is loaded and we're on the product detail page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('product.html')) {
        displaySimilarProducts();
    }
});


// Make functions available globally
window.addToCart = addToCart;
window.updateOrderList = updateOrderList;
window.updateOrderCount = updateOrderCount;
window.removeOrder = removeOrder;
window.openModal = openModal;
window.closeModal = closeModal;