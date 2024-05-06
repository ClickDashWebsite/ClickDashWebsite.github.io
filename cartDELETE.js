document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector("#cart tbody");
    const cartSubtotalCell = document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)");
    const cartTotalCell = document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)");
    const clearCartButton = document.getElementById("clearCart");

    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem("cart")) || {}; // Reload the cart from `localStorage`
        cartTableBody.innerHTML = ""; // Clear existing cart items

        let subtotal = 0; // Initialize subtotal

        // Loop through each cart item and update the cart table and subtotal
        Object.keys(cart).forEach((key) => {
            const item = cart[key];
            const itemTotal = item.price * item.quantity; // Total for this item
            subtotal += itemTotal; // Add to subtotal

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><a href="#"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)} $</td>
                <td><input type="number" value="${item.quantity}" min="1"></td>
                <td>${itemTotal.toFixed(2)} $</td>
            `;

            cartTableBody.appendChild(tr); // Add the row to the cart table
        });

        // Update the displayed subtotal and total
        cartSubtotalCell.textContent = `${subtotal.toFixed(2)} $`;
        cartTotalCell.textContent = `${subtotal.toFixed(2)} $`;
    }

    // Event listener for clearing the cart
    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart"); // Remove cart data from `localStorage`
        updateCartDisplay(); // Update the cart display to reflect the empty cart
    });

    updateCartDisplay(); // Initialize the cart display when the page loads
});

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {}; // Load cart from localStorage
    const cartSubtotalCell = document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)");
    const proceedToCheckoutButton = document.querySelector("#cart-add a"); // "Proceed to Checkout" button

    // Calculate the cart subtotal to display in the alert
    function calculateCartSubtotal() {
        let subtotal = 0;
        Object.keys(cart).forEach((key) => {
            const item = cart[key];
            subtotal += item.price * item.quantity; // Calculate total for the item
        });
        return subtotal;
    }

    // Event listener for "Proceed to Checkout" button
    proceedToCheckoutButton.addEventListener("click", (event) => {
        const subtotal = calculateCartSubtotal(); // Get the cart subtotal

        // Display alert with the total cost
        alert(`Your total is ${subtotal.toFixed(2)} SAR.`);

        // Navigate to the next page after displaying the alert
        setTimeout(() => {
            window.location.href = "evaluation.html"; // Navigate to the evaluation page
        }, 500); // Delay to allow users to read the alert
    });
});

