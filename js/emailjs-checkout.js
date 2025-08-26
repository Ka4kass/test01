document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize EmailJS
    emailjs.init("LZaVsASJPgQ80yTg1"); // your public key

    // 2. Get checkout form element
    const checkoutForm = document.getElementById("checkoutForm");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form reload

            // Button loading state
            const checkoutButton = document.getElementById("checkoutButton");
            const originalButtonText = checkoutButton.textContent;
            checkoutButton.textContent = "Processing...";
            checkoutButton.disabled = true;

            // Collect order info
            const orderInfo = collectOrderInfo();

            // Validate that cart has items
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            if (orders.length === 0) {
                alert("Your cart is empty. Please add items before checkout.");
                checkoutButton.textContent = originalButtonText;
                checkoutButton.disabled = false;
                return;
            }

            // 3. Send email to admin
            emailjs.send(
                "service_a8255u8",     // your service ID
                "template_2iewpr4",   // your admin template ID
                orderInfo
            ).then(function(response) {
                console.log("SUCCESS: Sent order to admin!", response);

                // 4. Send email to user
                emailjs.send(
                    "service_a8255u8",     // your service ID
                    "template_jwew9vt",   // create this template in EmailJS
                    orderInfo
                ).then(function(userResponse) {
                    console.log("SUCCESS: Sent confirmation to user!", userResponse);
                }).catch(function(userError) {
                    console.error("FAILED: Sending confirmation to user", userError);
                });

                // Show success message
                checkoutButton.textContent = "Order Submitted!";
                const successMessage = document.createElement("div");
                successMessage.className = "success-message";
                successMessage.innerHTML = `
                    <h3>Thank you for your order!</h3>
                    <p>We've sent you a confirmation email with your order details.</p>
                `;
                successMessage.style.padding = "15px";
                successMessage.style.backgroundColor = "#e7f7e7";
                successMessage.style.border = "1px solid #c3e6c3";
                successMessage.style.borderRadius = "4px";
                successMessage.style.marginTop = "20px";

                checkoutForm.parentNode.insertBefore(successMessage, checkoutForm.nextSibling);

                // Clear cart
                localStorage.removeItem("orders");

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Optional redirect
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 5000);

            }).catch(function(error) {
                console.error("FAILED: Sending order failed", error);
                checkoutButton.textContent = originalButtonText;
                checkoutButton.disabled = false;
                alert("There was a problem submitting your order. Please try again.");
            });
        });
    }
});

/**
 * Collects all order and customer information for the email
 * @returns {Object} Formatted data for the email template
 */
function collectOrderInfo() {
    const email = document.getElementById("email")?.value || "";
    const firstName = document.getElementById("first-name")?.value || "";
    const lastName = document.getElementById("last-name")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    const company = document.getElementById("company")?.value || "Not provided";
    const address1 = document.getElementById("address1")?.value || "";
    const address2 = document.getElementById("address2")?.value || "";
    const city = document.getElementById("city")?.value || "";
    const state = document.getElementById("state")?.value || "";
    const postalCode = document.getElementById("postal-code")?.value || "";
    const country = document.getElementById("country")?.value || "";
    const paymentMethod = document.getElementById("payment-method")?.value || "";

    const fullAddress = `${address1}${address2 ? ', ' + address2 : ''}, ${city}, ${state}, ${postalCode}, ${country}`;
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    let orderItemsList = "";
    let subtotal = 0;

    orders.forEach((item, index) => {
        orderItemsList += `Item ${index + 1}: ${item.name} - €${item.price.toFixed(2)}\n`;
        subtotal += item.price;
    });

    const shippingCost = country === "Germany" ? 4.49 : 6.49;
    const totalAmount = subtotal + shippingCost;

    return {
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        customer_phone: phone,
        company: company,
        customer_address: fullAddress,
        order_items: orderItemsList,
        subtotal: `€${subtotal.toFixed(2)}`,
        shipping: `€${shippingCost.toFixed(2)}`,
        total_amount: `€${totalAmount.toFixed(2)}`,
        payment_method: paymentMethod,
        order_date: new Date().toLocaleString(),
        order_id: generateOrderId()
    };
}

/**
 * Generates a unique order ID
 */
function generateOrderId() {
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `VST-${timestamp.toString().slice(-6)}-${randomPart}`;
}