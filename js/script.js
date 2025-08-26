document.addEventListener('DOMContentLoaded', function() {
    // Get product parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const cityName = urlParams.get('city');
    const productPrice = urlParams.get('price');
        
    // Find and update product elements
    const productTitleElement = document.querySelector('.product-title');
    const productCityElement = document.querySelector('.product-city');
    const productPriceElement = document.querySelector('.product-price');
    const productImageElement = document.querySelector('.product-image');
    
    if (productTitleElement) productTitleElement.textContent = productName;
    if (productCityElement) productCityElement.textContent = cityName;
    if (productPriceElement) productPriceElement.textContent = `€${parseFloat(productPrice).toFixed(2).replace('.', ',')}`;
    if (productImageElement) productImageElement.src = `/api/placeholder/400/500`;
    
    // Set up the order button
    const orderButton = document.getElementById('orderProduct');
    if (orderButton) {
        orderButton.onclick = function() {
            const product = {
                name: productName,
                city: cityName,
                price: parseFloat(productPrice),
                image: `/api/placeholder/400/500`
            };
            
            addToCart(product);
        };
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const answer = item.querySelector(".faq-answer");

      // Закриваємо всі відповіді, крім поточної
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        if (ans !== answer) {
          ans.style.maxHeight = null;
          ans.parentElement.classList.remove("active");
        }
      });

      // Перемикаємо видимість відповіді
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        item.classList.remove("active");
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        item.classList.add("active");
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            loadProducts(products);
            loadProductDetails(products);
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});

function loadProducts(products) {
    const productContainer = document.getElementById("productList");
    if (!productContainer) return;

    products.forEach((product, index) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <span>${product.name} (${product.city}) - $${product.price.toFixed(2)}</span>
            <button onclick='selectProduct(${index})'>Деталі</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Функція збереження вибраного товару та перехід на сторінку товару
function selectProduct(index) {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            localStorage.setItem("selectedProduct", JSON.stringify(products[index]));
            window.location.href = "product-details.html"; // Перенаправлення на сторінку
        });
}

function loadProductDetails(products) {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!selectedProduct) return;

    document.getElementById("product-name").textContent = selectedProduct.name;
    document.getElementById("product-price").textContent = `$${selectedProduct.price}`;
    document.getElementById("product-city").textContent = `Місто: ${selectedProduct.city}`;

    // Оновлення кнопки замовлення
    const orderButton = document.getElementById("orderProduct");
    orderButton.setAttribute("data-name", selectedProduct.name);
    orderButton.setAttribute("data-price", selectedProduct.price);
}


// Додавання товару у кошик
document.getElementById("orderProduct")?.addEventListener("click", function () {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!selectedProduct) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(selectedProduct);
    localStorage.setItem("orders", JSON.stringify(orders));

    updateOrderList();
    openModal();
});
document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            loadProductDetails(products);
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});


function loadProductDetails(products) {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!selectedProduct) return;

    document.getElementById("product-name").textContent = selectedProduct.name;
    document.getElementById("product-description").textContent = selectedProduct.description;
    document.getElementById("product-city").textContent = `Місто: ${selectedProduct.city}`;
    document.getElementById("product-price").textContent = `$${selectedProduct.price}`;

    const imageElement = document.querySelector(".product-image img");
    imageElement.src = selectedProduct.image;
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("orderProduct")?.addEventListener("click", function () {
        const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
        if (!selectedProduct) return;

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(selectedProduct);
        localStorage.setItem("orders", JSON.stringify(orders));

        updateOrderList();
        openModal();
    });

    updateOrderList();
});


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

function removeOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    updateOrderList();
}
function openModal() {
    const orderModal = document.getElementById("orderModal");
    orderModal.classList.add("open");

    updateOrderList();
}
// Функція для отримання параметрів з URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        city: params.get("city"),
        price: params.get("price"),
    };
}

// Отримуємо дані про продукт
const product = getQueryParams();

// Вставляємо дані в HTML
document.addEventListener("DOMContentLoaded", () => {
    if (product.name) {
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-city").textContent = product.city;
        document.getElementById("product-price").textContent = `€${product.price}`;
    }
});


function closeModal() {
    const orderModal = document.getElementById("orderModal");
    orderModal.classList.remove("open");

    updateOrderList();
}

document.getElementById("closeModal")?.addEventListener("click", closeModal);
document.getElementById("clearOrders")?.addEventListener("click", () => {
    localStorage.removeItem("orders");
    updateOrderList();
});

document.getElementById("continueOrder")?.addEventListener("click", () => {
    const totalAmount = document.getElementById("orderTotal").textContent.replace("", "").trim();
    window.location.href = `checkout.html?total=${encodeURIComponent(totalAmount)}`;
});



document.addEventListener("DOMContentLoaded", function () {
    const orderButton = document.getElementById("orderProduct");

    if (orderButton) {
        orderButton.addEventListener("click", function () {
            const product = {
                name: orderButton.getAttribute("data-name") || "Unknown",
                city: document.getElementById("product-city").textContent.replace("Місто: ", ""),
                price: parseFloat(orderButton.getAttribute("data-price")) || 0
            };

            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(product);
            localStorage.setItem("orders", JSON.stringify(orders));

            alert(`Товар "${product.name}" додано в кошик!`);
            updateOrderCount();
        });
    }

    function updateOrderCount() {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        document.getElementById("orderCount").textContent = orders.length;
    }

    updateOrderCount();
});
// 1. Отримуємо параметр ID з URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// 2. Завантажуємо JSON з продуктами
fetch("products.json")
  .then(response => response.json())
  .then(products => {
    // 3. Знаходимо продукт по ID
    const product = products.find(p => p.id == productId);

    if (product) {
      document.querySelector(".product-title").textContent = product.name;
      document.querySelector(".product-image").src = product.image;
      document.querySelector(".product-city").textContent = product.city;
      document.querySelector(".product-price").textContent = `€${product.price}`;
    } else {
      document.querySelector(".product-info").innerHTML = "<p>Продукт не знайдено</p>";
    }
  });
