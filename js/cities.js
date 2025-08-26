document.addEventListener('DOMContentLoaded', function() {
    // Get the region parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');
    
    // For debugging - log if the script is running
    console.log("Cities.js is running with region:", region);
    
    // Define the cities by region with their featured products and images
    const citiesByRegion = {
        "Baden-Württemberg": [
            { name: "München", product: "München", price: 34, description: "München – eine Stadt mit einer reichen architektonischen Palette, in der gotische Kathedralen, barocke Paläste und Bauten der Neorenaissance harmonisch mit Bereichen moderner Architektur verschmelzen. Ihre Straßen und Plätze bewahren die Atmosphäre der Geschichte, ergänzt durch den lebendigen Rhythmus des modernen Lebens.", scale: "1:4500", parts: 100, size: "18x18", region: "Hamburg", image: "./img/5.png",liste:"./img/25.png" },
            { name: "Heidelberg", product: "Schloss", price:27, image: "heidelberg-schloss.jpg" },
            { name: "Freiburg", product: "Münster", price:27, image: "freiburg-muenster.jpg" }
        ],
        "Bayern": [
            { name: "München", product: "Frauenkirche", price:25, image: "muenchen-frauenkirche.jpg" },
            { name: "Nürnberg", product: "Kaiserburg", price:25, image: "nuernberg-kaiserburg.jpg" },
            { name: "Augsburg", product: "Rathaus", price:25, image: "augsburg-rathaus.jpg" },
            { name: "Regensburg", product: "Dom St. Peter", price:25, image: "regensburg-dom.jpg" },
            { name: "Würzburg", product: "Residenz", price:25, image: "wuerzburg-residenz.jpg" }
        ],
        "Berlin": [
            { name: "Berlin", product: "Brandenburger Tor", price:25, image: "berlin-brandenburger-tor.jpg" },
            { name: "Berlin", product: "Reichstag", price:25, image: "berlin-reichstag.jpg" },
            { name: "Berlin", product: "Fernsehturm", price:25, image: "berlin-fernsehturm.jpg" }
        ],
        "Brandenburg": [
            { name: "Potsdam", product: "Schloss Sanssouci", price:25, image: "potsdam-sanssouci.jpg" },
            { name: "Cottbus", product: "Altstadt", price:25, image: "cottbus-altstadt.jpg" },
            { name: "Brandenburg an der Havel", product: "Dom", price:25, image: "brandenburg-dom.jpg" }
        ],
        "Bremen": [
            { name: "Bremen", product: "Stadtmusikanten", price:25, image: "bremen-stadtmusikanten.jpg" },
            { name: "Bremerhaven", product: "Klimahaus", price:25, image: "bremerhaven-klimahaus.jpg" }
        ],
        "Hamburg": [
            { name: "Hamburg", product: "Elbphilharmonie", price:25, image: "hamburg-elbphilharmonie.jpg" },
            { name: "Hamburg", product: "Speicherstadt", price:25, image: "hamburg-speicherstadt.jpg" },
            { name: "Hamburg", product: "Rathaus", price:25, image: "hamburg-rathaus.jpg" }
        ],
        "Hessen": [
            { name: "Frankfurt", product: "Römer", price:25, image: "frankfurt-roemer.jpg" },
            { name: "Kassel", product: "Herkules", price:25, image: "kassel-herkules.jpg" },
            { name: "Wiesbaden", product: "Kurhaus", price:25, image: "wiesbaden-kurhaus.jpg" },
            { name: "Marburg", product: "Schloss", price:25, image: "marburg-schloss.jpg" }
        ],
        "Mecklenburg-Vorpommern": [
            { name: "Rostock", product: "Stadthafen", price: 25, image: "rostock-stadthafen.jpg" },
            { name: "Schwerin", product: "Schloss", price: 89.99, image: "schwerin-schloss.jpg" },
            { name: "Stralsund", product: "Altstadt", price: 74.99, image: "stralsund-altstadt.jpg" }
        ],
        "Niedersachsen": [
            { name: "Hannover", product: "Rathaus", price: 84.99, image: "hannover-rathaus.jpg" },
            { name: "Goslar", product: "Altstadt", price: 79.99, image: "goslar-altstadt.jpg" },
            { name: "Lüneburg", product: "Wasserviertel", price: 74.99, image: "lueneburg-wasserviertel.jpg" },
            { name: "Wolfsburg", product: "Autostadt", price: 89.99, image: "wolfsburg-autostadt.jpg" }
        ],
        "Nordrhein-Westfalen": [
            { name: "Köln", product: "Kölner Dom", price: 99.99, image: "koeln-dom.jpg" },
            { name: "Düsseldorf", product: "Medienhafen", price: 89.99, image: "duesseldorf-medienhafen.jpg" },
            { name: "Dortmund", product: "Signal Iduna Park", price: 94.99, image: "dortmund-signal-iduna.jpg" },
            { name: "Essen", product: "Zeche Zollverein", price: 79.99, image: "essen-zollverein.jpg" },
            { name: "Bonn", product: "Altes Rathaus", price: 69.99, image: "bonn-rathaus.jpg" }
        ],
        "Rheinland-Pfalz": [
            { name: "Mainz", product: "Dom", price: 84.99, image: "mainz-dom.jpg" },
            { name: "Trier", product: "Porta Nigra", price: 89.99, image: "trier-porta-nigra.jpg" },
            { name: "Speyer", product: "Dom", price: 79.99, image: "speyer-dom.jpg" }
        ],
        "Saarland": [
            { name: "Saarbrücken", product: "Ludwigskirche", price: 79.99, image: "saarbruecken-ludwigskirche.jpg" },
            { name: "Völklingen", product: "Völklinger Hütte", price: 74.99, image: "voelklingen-huette.jpg" }
        ],
        "Sachsen": [
            { name: "Dresden", product: "Frauenkirche", price: 89.99, image: "dresden-frauenkirche.jpg" },
            { name: "Leipzig", product: "Völkerschlachtdenkmal", price: 84.99, image: "leipzig-voelkerschlachtdenkmal.jpg" },
            { name: "Meißen", product: "Albrechtsburg", price: 79.99, image: "meissen-albrechtsburg.jpg" }
        ],
        "Sachsen-Anhalt": [
            { name: "Magdeburg", product: "Dom", price: 79.99, image: "magdeburg-dom.jpg" },
            { name: "Halle", product: "Marktkirche", price: 74.99, image: "halle-marktkirche.jpg" },
            { name: "Wernigerode", product: "Schloss", price: 84.99, image: "wernigerode-schloss.jpg" }
        ],
        "Schleswig-Holstein": [
            { name: "Kiel", product: "Rathaus", price: 79.99, image: "kiel-rathaus.jpg" },
            { name: "Lübeck", product: "Holstentor", price: 84.99, image: "luebeck-holstentor.jpg" },
            { name: "Flensburg", product: "Nordertor", price: 74.99, image: "flensburg-nordertor.jpg" }
        ],
        "Thüringen": [
            { name: "Erfurt", product: "Dom", price: 84.99, image: "erfurt-dom.jpg" },
            { name: "Weimar", product: "Goethehaus", price: 79.99, image: "weimar-goethehaus.jpg" },
            { name: "Eisenach", product: "Wartburg", price: 89.99, image: "eisenach-wartburg.jpg" }
        ]
    };
    
    // Function to check if image exists, otherwise use placeholder
    function getImageUrl(imageName) {
        // For debugging
        console.log("Getting image URL for:", imageName);
        
        // Always use placeholder for now to test if images are displayed
        return `/api/placeholder/400/500`;
        
        /* Uncomment this code once you have real images
        // Check if the imageName is provided and valid
        if (imageName && typeof imageName === 'string') {
            // You can add a path prefix for your image directory
            return `img/products/${imageName}`;
        } else {
            // Return a placeholder if no image is available
            return `/api/placeholder/400/500`;
        }
        */
    }
    
    // Display the region name in the page title and heading
    const regionNameElements = document.querySelectorAll('#region-name, #region-title');
    regionNameElements.forEach(element => {
        if (element) {
            element.textContent = region || '';
        }
    });
    
    // Display the list of cities
    const citiesList = document.getElementById('cities-list');
    console.log("Cities list element:", citiesList);
    
    if (citiesList) {
        if (region && citiesByRegion[region]) {
            console.log(`Found ${citiesByRegion[region].length} cities for region ${region}`);
            
            // Clear any existing content
            citiesList.innerHTML = '';
            
            // Add city cards for the selected region
            citiesByRegion[region].forEach((city, index) => {
                console.log(`Processing city ${index + 1}:`, city.name, city.product);
                
                // Create product card HTML structure
                const cityCard = document.createElement('div');
                cityCard.className = 'city-card';
                
                // Create anchor link to product page with query parameters
                const cityLink = document.createElement('a');
                cityLink.href = `product.html?name=${encodeURIComponent(city.product)}&city=${encodeURIComponent(city.name)}&price=${city.price}&image=${encodeURIComponent(city.image || '')}`;
                
                // Create product card inner structure
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                // Add product image
                const productImage = document.createElement('img');
                
                // Create product card content container
                const productContent = document.createElement('div');
                productContent.className = 'product-card-content';

                const productParts = urlParams.get('parts');
                productParts.className = 'product-parts-content';
                
                // Add product name heading
                const productName = document.createElement('h3');
                productName.textContent = city.product;
                
                // Add city name paragraph
                const cityName = document.createElement('p');
                cityName.textContent = city.name;
                
                // Add price span
                const priceSpan = document.createElement('span');
                priceSpan.className = 'price';
                
                // Add "Add to Cart" button
                const addToCartBtn = document.createElement('button');
                addToCartBtn.onclick = function(e) {
                    e.preventDefault(); // Prevent navigation to product page
                    e.stopPropagation(); // Stop event bubbling
                    
                    // Create product object for the cart
                    const product = {
                        name: city.product,
                        city: city.name,
                        price: city.price,
                        image: getImageUrl(city.image)
                    };
                    
                    // Add product to cart
                    addToCart(product);
                    
                    return false;
                };
                
                // Assemble the components
                productContent.appendChild(productName);
                productContent.appendChild(cityName);
                productContent.appendChild(priceSpan);
                productContent.appendChild(addToCartBtn);
                
                productCard.appendChild(productImage);
                productCard.appendChild(productContent);
                
                cityLink.appendChild(productCard);
                cityCard.appendChild(cityLink);
                citiesList.appendChild(cityCard);
            });
        } else {
            console.log("Region not found or not specified:", region);
            citiesList.innerHTML = '<p>Keine Region ausgewählt oder Region nicht gefunden</p>';
        }
    } else {
        console.error("Cities list element not found in DOM");
    }
    
    // Initialize the order count display
    updateOrderCount();
});

// Function to add product to cart
function addToCart(product) {
    console.log("Adding to cart:", product);
    
    // Get existing orders from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // Add the new product to orders
    orders.push(product);
    
    // Save updated orders to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
    
    // Update the cart display
    updateOrderList();
    updateOrderCount();
    
    // Open the modal
    openModal();
}

// Function to update the order count in the header
function updateOrderCount() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderCountElement = document.getElementById("orderCount");
    if (orderCountElement) {
        orderCountElement.textContent = orders.length;
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

// Function to remove an order from the cart
function removeOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    
    updateOrderList();
    updateOrderCount();
}

// Function to open the modal
function openModal() {
    const orderModal = document.getElementById("orderModal");
    if (orderModal) {
        orderModal.classList.add("open");
        orderModal.style.visibility = "visible";
        orderModal.style.opacity = "1";
    }
}

// Function to close the modal
function closeModal() {
    const orderModal = document.getElementById("orderModal");
    if (orderModal) {
        orderModal.classList.remove("open");
        orderModal.style.visibility = "hidden";
        orderModal.style.opacity = "0";
    }
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem("orders");
    updateOrderList();
    updateOrderCount();
}

// Make sure these functions are available globally
window.addToCart = addToCart;
window.updateOrderList = updateOrderList;
window.updateOrderCount = updateOrderCount;
window.removeOrder = removeOrder;
window.openModal = openModal;
window.closeModal = closeModal;
window.clearCart = clearCart;


// Set up event listeners for modal buttons
document.addEventListener('DOMContentLoaded', function() {
    console.log("Setting up event listeners for modal buttons");
    
    // Set up event listener for the open modal button
    const openModalBtn = document.getElementById('openModal');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            updateOrderList();
            openModal();
        });
    }
    
    // Set up event listener for the close modal button
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Set up event listener for the clear orders button
    const clearOrdersBtn = document.getElementById('clearOrders');
    if (clearOrdersBtn) {
        clearOrdersBtn.addEventListener('click', clearCart);
    }
    
    // Set up event listener for the continue order button
    const continueOrderBtn = document.getElementById('continueOrder');
    if (continueOrderBtn) {
        continueOrderBtn.addEventListener('click', function() {
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        });
    }
});