document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector("#cart tbody");
    const cartSubtotalCell = document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)");
    const cartTotalCell = document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)");
    const clearCartButton = document.getElementById("clearCart");
    const proceedToCheckoutButton = document.querySelector("#cart-add button.normal");

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
                <td><a href="#" class="remove-item" data-key="${key}"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)} SAR</td>
                <td><input type="number" value="${item.quantity}" min="1" class="quantity-input"></td>
                <td>${itemTotal.toFixed(2)} SAR</td>
            `;

            cartTableBody.appendChild(tr); // Add the row to the cart table
        });

        // Update the displayed subtotal and total
        cartSubtotalCell.textContent = `${subtotal.toFixed(2)} SAR`;
        cartTotalCell.textContent = `${subtotal.toFixed(2)} SAR`;

        // Add event listeners to remove items
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeItem);
        });

        // Add event listener to quantity input fields
        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
    }

    // Function to remove item from the cart
    function removeItem(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
        const key = event.target.closest('.remove-item').dataset.key; // Get the key of the item to remove
        let cart = JSON.parse(localStorage.getItem("cart")) || {}; // Load cart from localStorage
        delete cart[key]; // Remove item from the cart
        localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
        updateCartDisplay(); // Update the cart display
    }

    // Function to update quantity of an item
    function updateQuantity(event) {
        const key = event.target.closest('tr').querySelector('.remove-item').dataset.key;
        const newQuantity = parseInt(event.target.value);
        let cart = JSON.parse(localStorage.getItem("cart")) || {}; // Load cart from localStorage
        cart[key].quantity = newQuantity; // Update item quantity in the cart
        localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
        updateCartDisplay(); // Update the cart display
    }

    // Event listener for clearing the cart
    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart"); // Remove cart data from `localStorage`
        updateCartDisplay(); // Update the cart display to reflect the empty cart
    });

    // Event listener for "Proceed to Checkout" button
    proceedToCheckoutButton.addEventListener("click", () => {
        const total = cartTotalCell.textContent.trim();
        alert(`Your total is: ${total}`);
    });

    updateCartDisplay(); // Initialize the cart display when the page loads
});

