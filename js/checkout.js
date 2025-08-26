document.addEventListener("DOMContentLoaded", () => {
    const orderItemsList = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
    const countrySelect = document.getElementById("country");
    const paymentButton = document.getElementById("checkoutButton");
    paymentButton.addEventListener("click", sendPaymentRequest);

    async function sendPaymentRequest() {
        try {
            let itemsList = document.querySelectorAll("#order-items li.item");
            const totalPriceElement = document.getElementById("total-price");
            const rawPrice = totalPriceElement.textContent.trim();
            const numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ''));
    
            let description = "";
            Array.from(itemsList).forEach(item => {
                description += item.innerText.trim() + "; ";
            });
            description = description.trim();
    
            if (!description) {
                description = "Описание товара не указано";
            }
    
            console.log({ price: numericPrice, description }); // Лог запитуваних даних
    
            const response = await fetch('http://85.215.151.125:8080/payments', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Basic " + btoa("user:c018457a-0fe7-4cc9-bdfa-6a642dbc0483")
                },
                body: JSON.stringify({
                    price: numericPrice,
                    quantity: "1",
                    description: description
                }),
                credentials: "include"
            });
    
            if (!response.ok) {
                const text = await response.text();
                console.error("Ошибка сервера:", text);
                throw new Error("Ошибка: " + response.status);
            }
    
            const result = await response.json();
            window.location.replace(result.url);
            console.log(result);
        } catch (error) {
            console.error("Ошибка при отправке платежа:", error);
            alert(error.message);
        }
    }
    


    
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    if (orderItemsList) {
        if (orders.length === 0) {
            orderItemsList.innerHTML = "<li>Your cart is empty</li>";
            if (totalPriceElement) {
                totalPriceElement.textContent = "€0.00";
            }
        } else {
            // Display order items
            displayOrderItems();
        }
    }
    
    // Add event listener to country select to update shipping cost
    if (countrySelect) {
        countrySelect.addEventListener("change", calculateTotalWithShipping);
        // Initial calculation based on default selected country
        calculateTotalWithShipping();
    }
    
    // Initialize navigation toggle
    initNavToggle();
    
    // Initialize Stripe checkout if form exists
   
    
    // Function to add JSON viewer button
    function addJsonViewerButton() {
        const container = document.querySelector('.checkout-container') || 
                         document.querySelector('main') || 
                         document.body;
        
        if (container) {
            // Create button container
            const buttonContainer = document.createElement('div');
            
            // Create button
            const viewJsonButton = document.createElement('button');
            
            // Add button to container
            buttonContainer.appendChild(viewJsonButton);
            
            // Add container to page
            container.appendChild(buttonContainer);
            
            // Add click event
            viewJsonButton.addEventListener('click', showOrderJson);
        }
    }
    
    // Function to display order items
    function displayOrderItems() {
        if (!orderItemsList) return;
        
        // Clear the list before adding items
        orderItemsList.innerHTML = "";
        
        let subtotal = 0;
        
        orders.forEach(order => {
            let price = typeof order.price === 'number' ? order.price : 0;
            let listItem = document.createElement("li");
            listItem.textContent = `${order.name || "Unnamed item"} - €${price.toFixed(2)}`;
            orderItemsList.appendChild(listItem);
            subtotal += price;
        });
        
        
        // Store subtotal for shipping calculation
        orderItemsList.dataset.subtotal = subtotal;
        
        // Calculate and display total with shipping
        calculateTotalWithShipping();
    }
    
    // Calculate and display total with shipping
    function calculateTotalWithShipping() {
        if (!countrySelect || !orderItemsList) return;
        
        const selectedCountry = countrySelect.value;
        const subtotal = parseFloat(orderItemsList.dataset.subtotal || 0);
        
        // If Germany is selected, shipping is 5 euros, otherwise 6 euros
        const shippingCost = selectedCountry === "Germany" ? 4.95 : 7.45;
        
        // Update shipping display
        updateShippingDisplay(shippingCost);
        
        // Calculate final total amount
        const totalAmount = subtotal + shippingCost;
        
        // Update total price display
        if (totalPriceElement) {
            totalPriceElement.textContent = `${totalAmount.toFixed(2)}`; // Changed $ to €
        }
    }   
    
    // Update shipping display
    function updateShippingDisplay(shippingCost) {
        if (!orderItemsList) return;
        
        // Remove any existing shipping line item
        const existingShipping = document.querySelector(".shipping-cost");
        if (existingShipping) {
            existingShipping.remove();
        }
        
        // Create new shipping line item
        const shippingItem = document.createElement("li");
        shippingItem.className = "shipping-cost";
        shippingItem.textContent = `Shipping - €${shippingCost.toFixed(2)}`; // Changed $ to €
        orderItemsList.appendChild(shippingItem);
    }
    
    // Initialize navigation toggle
    function initNavToggle() {
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
    }
    
    // Redirect to Stripe Checkout
    function redirectToStripeCheckout(stripe, amount) {
        // Get order information
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        let items = [];
        
        // If we have order items, create line items for each
        if (orders.length > 0) {
            orders.forEach(order => {
                items.push({
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: order.name,
                            description: order.city ? `3D Model from ${order.city}` : "3D Model",
                        },
                        unit_amount: Math.round(order.price * 100), // Convert to cents
                    },
                    quantity: 1,
                });
            });
        } else {
            // Fallback if no items found
            items.push({
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: "3D Architecture Models",
                    },
                    unit_amount: amount, // Already in cents from getTotalAmount()
                },
                quantity: 1,
            });
        }
        
        // Add shipping as a separate line item
        const country = document.getElementById("country")?.value || "Other";
        const shippingCost = country === "Germany" ? 5 : 6;
        
        items.push({
            price_data: {
                currency: "eur",
                product_data: {
                    name: "Shipping",
                    description: `Shipping to ${country}`,
                },
                unit_amount: shippingCost * 100, // Convert to cents
            },
            quantity: 1,
        });
        
        // Redirect to Stripe Checkout
        stripe.redirectToCheckout({
            lineItems: items,
            mode: "payment",
            successUrl: window.location.origin + "/success.html",
            cancelUrl: window.location.origin + "/checkout.html",
            customerEmail: document.getElementById("email")?.value || null,
            shippingAddressCollection: {
                allowedCountries: ["DE", "AT", "CH", "FR", "IT", "GB", "US"],
            },
        }).then(function(result) {
            if (result.error) {
                console.error("Stripe checkout error:", result.error);
                alert(result.error.message);
            }
        });
    }
});

// Function to display the JSON on the page
function showOrderJson() {
    // Get the JSON data from localStorage
    const jsonData = localStorage.getItem("currentOrder");
    
    // Remove any existing JSON display
    const existingDisplay = document.getElementById("json-display-container");
    if (existingDisplay) {
        existingDisplay.remove();
    }
    
    if (jsonData) {
        try {
            // Parse JSON to format it nicely
            const parsedJson = JSON.parse(jsonData);
            const formattedJson = JSON.stringify(parsedJson, null, 2);
            
            // Create container

            
            // Assemble the container
            container.appendChild(heading);
            container.appendChild(closeButton);
            container.appendChild(pre);
            
            // Add to page - look for a good place to insert it
            const checkoutContainer = document.querySelector('.checkout-container') || 
                                     document.querySelector('main') || 
                                     document.body;
            checkoutContainer.appendChild(container);
            
            // Scroll to the JSON display
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            console.error("Error parsing JSON:", error);
            alert("Error displaying JSON data. Check console for details.");
        }
    } else {
        alert("No order data found. Complete the checkout form first.");
    }
}

// Function to get total amount in cents
function getTotalAmount() {
    // Extract the numeric value from total price element
    const totalPriceElement = document.getElementById("total-price");
    if (!totalPriceElement) {
        console.error("Total price element not found");
        return 0;
    }
    
    const totalPriceText = totalPriceElement.textContent;
    // Convert to cents for Stripe (multiply by 100)
    const amount = parseFloat(totalPriceText.replace("€", "").replace("€", "")) || 0;
    return Math.round(amount * 100);
}

// Function to get complete order information as JSON
function getOrderJson() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const country = document.getElementById("country")?.value || "Other";
    const shippingCost = country === "Germany" ? 5 : 6;
    
    // Calculate subtotal
    let subtotal = 0;
    orders.forEach(item => {
        subtotal += item.price;
    });
    
    // Calculate total with shipping
    const total = subtotal + shippingCost;
    
    // Get customer information
    const customerInfo = {
        firstName: document.getElementById("first-name")?.value || "",
        lastName: document.getElementById("last-name")?.value || "",
        email: document.getElementById("email")?.value || "",
        company: document.getElementById("company")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        address1: document.getElementById("address1")?.value || "",
        address2: document.getElementById("address2")?.value || "",
        city: document.getElementById("city")?.value || "",
        state: document.getElementById("state")?.value || "",
        postalCode: document.getElementById("postal-code")?.value || "",
        country: country,
        paymentMethod: document.getElementById("payment-method")?.value || "stripe"
    };
    
    // Create complete order object
    const completeOrder = {
        orderNumber: generateOrderNumber(),
        orderDate: new Date().toISOString(),
        customer: customerInfo,
        items: orders,
        shipping: {
            method: "Standard Shipping",
            cost: shippingCost
        },
        payment: {
            method: customerInfo.paymentMethod,
            subtotal: subtotal,
            shipping: shippingCost,
            total: total
        }
    };
    
    return JSON.stringify(completeOrder, null, 2);
}

// Generate a unique order number
function generateOrderNumber() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

// Ініціалізація EmailJS
document.addEventListener("DOMContentLoaded", () => {
    // Ініціалізація EmailJS
    emailjs.init("LZaVsASJPgQ80yTg1"); // свій Public Key

    const paymentButton = document.getElementById("checkoutButton");
    paymentButton.addEventListener("click", async (event) => {
        event.preventDefault(); // щоб форма не перезавантажувала сторінку

        try {
            // 👉 тут твоя функція відправки платежу
            const response = await sendPaymentRequest();

            if (response.success) {
                // Якщо оплата пройшла успішно, надсилаємо email
                await sendCustomerData();
                alert("❌");
            } else {
                alert(" ❌");
            }
        } catch (error) {
            console.error("Помилка при оплаті:", error);
            alert("Сталася помилка. Спробуйте ще раз.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("checkoutForm");
    const button = document.getElementById("checkoutButton");
    const inputs = form.querySelectorAll("input[required], select[required], select");

    
    button.disabled = true;
    button.style.opacity = "0.5";

    function checkForm() {
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
            }
        });

        button.disabled = !allFilled;
        button.style.opacity = allFilled ? "1" : "0.5";
    }

    inputs.forEach(input => {
        input.addEventListener("input", checkForm);
        input.addEventListener("change", checkForm);
    });
});

// Твоя функція відправки даних замовлення на EmailJS
async function sendCustomerData() {
    try {
        const orderData = JSON.parse(getOrderJson()); // твоя функція формує JSON
        const itemsList = orderData.items.map(i => `${i.name} - €${i.price}`).join(", ");

        await emailjs.send("service_bb2pnbm", "template_2iewpr4", {
            orderNumber: orderData.orderNumber,
            orderDate: orderData.orderDate,
            firstName: orderData.customer.firstName,
            lastName: orderData.customer.lastName,
            email: orderData.customer.email,
            phone: orderData.customer.phone,
            address1: orderData.customer.address1,
            postalCode: orderData.customer.postalCode,
            country: orderData.customer.country,
            items: itemsList,
            total: orderData.payment.total
        });

        console.log("✅ Дані покупця відправлені успішно");
    } catch (error) {
        console.error("gav Помилка відправки email:", error);
    }
}

// Для прикладу робимо sendPaymentRequest "фейковим"
async function sendPaymentRequest() {
    return { success: true }; // Тест: завжди успіх
}
 