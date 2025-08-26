document.addEventListener('DOMContentLoaded', function() {
    // Get product parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const cityName = urlParams.get('city');
    const price = parseFloat(urlParams.get('price')) || 0;
    const imageName = urlParams.get('image');
    
    // For debugging
    console.log("Product page loaded with parameters:", {
        productName,
        cityName,
        price,
        imageName
    });
    
    // Function to get image URL
    function getImageUrl(imageName) {
        if (imageName && typeof imageName === 'string') {
            return `img/products/${imageName}`;
        } else {
            return `/api/placeholder/600/600`;
        }
    }
    
    // Get the product detail section
    const productDetailSection = document.querySelector('.product-detail');
    
    if (productDetailSection && productName) {
        // Create product detail HTML
        const productDetailHTML = `
            <div class="container">
                <div class="product-detail-content">
                    <div class="product-image">
                        <img src="${getImageUrl(imageName)}" alt="${productName}" />
                    </div>
                    <div class="product-info">
                        <h1>${productName}</h1>
                        <p class="product-city">Standort: ${cityName}</p>
                        <p class="product-price">€${price.toFixed(2).replace('.', ',')}</p>
                        <div class="product-description">
                            <h3>Produktbeschreibung</h3>
                            <p>Hochwertiges 3D-Modell von ${productName} in ${cityName}. Dieses detaillierte digitale Modell ist perfekt für Architektur-Visualisierungen, VR/AR-Anwendungen, Bildungsressourcen und kreative Projekte.</p>
                            <ul>
                                <li>Hochdetailliertes 3D-Modell</li>
                                <li>Photorealistische Texturen</li>
                                <li>Optimiert für verschiedene 3D-Software</li>
                                <li>Umfasst alle wichtigen architektonischen Details</li>
                            </ul>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart-btn" onclick="addProductToCart()">In den Warenkorb</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Set the HTML content
        productDetailSection.innerHTML = productDetailHTML;
    } else {
        // Show error if product information is missing
        if (productDetailSection) {
            productDetailSection.innerHTML = `
                <div class="container">
                    <h2>Produkt nicht gefunden</h2>
                    <p>Entschuldigung, die Produktinformationen konnten nicht geladen werden.</p>
                    <a href="regionen.html" class="btn btn-primary">Zurück zur Produktübersicht</a>
                </div>
            `;
        }
    }
    
    // Function to add the current product to cart
    window.addProductToCart = function() {
        // Create product object
        const product = {
            name: productName,
            city: cityName,
            price: price,
            image: getImageUrl(imageName)
        };
        
        // Add to cart using the existing function
        addToCart(product);
        
        // Show notification
        showNotification('Produkt wurde zum Warenkorb hinzugefügt!');
    };
    
    // Function to show notification
    function showNotification(message) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(function() {
                notification.classList.remove('show');
            }, 3000);
        }
    }
    
    
    
});