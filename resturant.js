document.addEventListener("DOMContentLoaded", () => {
  const menuGroup = document.querySelectorAll(".menu-group"); // Identify the menu groups

  // Function to sort menu items
  function sortMenuItems(criteria, order) {
    menuGroup.forEach((group) => {
      const menuItems = Array.from(group.querySelectorAll(".menu-item")); // Convert NodeList to array
      
      // Sort based on the given criteria and order
      menuItems.sort((a, b) => {
        if (criteria === "name") {
          const nameA = a.querySelector(".menu-item-name").textContent;
          const nameB = b.querySelector(".menu-item-name").textContent;
          const comparison = nameA.localeCompare(nameB);
          return order === "asc" ? comparison : -comparison;
        } else if (criteria === "price") {
          const priceA = parseFloat(a.querySelector(".price").textContent);
          const priceB = parseFloat(b.querySelector(".price").textContent);
          return order === "asc" ? priceA - priceB : priceB - priceA;
        }
      });

      // Clear the group and re-append in sorted order
      group.innerHTML = ""; // Clear existing content
      menuItems.forEach((item) => group.appendChild(item)); // Re-append sorted items
    });
  }

  // Event listener for the sorting select
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const value = e.target.value; // Get selected value
      const [criteria, order] = value.split("-"); // Extract criteria and order
      sortMenuItems(criteria, order); // Apply sorting
    });
  }

  // Initial sort (optional): Set default sorting on page load
  sortMenuItems("name", "asc"); // Example: sort by name in ascending order
});


document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filters li");
  const allMenus = document.querySelectorAll(".menu");

  // By default, show "Hot Drinks" and set it as the active filter
  const defaultFilter = ".hot-drinks";
  filters.forEach(f => f.classList.remove("active"));
  filters[0].classList.add("active"); // Assuming "Hot Drinks" is the first item

  allMenus.forEach(menu => {
    if (menu.classList.contains(defaultFilter.substring(1))) {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  });

  // Add click events to filters
  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      const filterClass = filter.getAttribute("data-filter").substring(1);

      // Reset active state
      filters.forEach(f => f.classList.remove("active"));
      filter.classList.add("active");

      // Show/hide content based on the active filter
      allMenus.forEach(menu => {
        menu.style.display = menu.classList.contains(filterClass) ? "block" : "none";
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const menuItems = document.querySelectorAll(".menu-item");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase(); // Get search term

    menuItems.forEach(item => {
      const itemName = item.querySelector(".menu-item-name").textContent.toLowerCase();
      item.style.display = itemName.includes(query) ? "flex" : "none"; // Show if it matches
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all the list items in the "filters" class
  const listItems = document.querySelectorAll(".filters li");

  // Function to handle click events and toggle the active class
  function handleItemClick(event) {
    // Remove the "active" class from all list items
    listItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Add the "active" class to the clicked item
    event.target.classList.add("active");
  }

  // Add click event listener to each list item
  listItems.forEach((item) => {
    item.addEventListener("click", handleItemClick);
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.getElementById("addToCart");
    const checkboxes = document.querySelectorAll(".cart"); // Checkbox for menu items
    const quantities = document.querySelectorAll(".qty .num"); // Quantity selectors

    // Function to collect selected items and save to `localStorage`
    function updateCart() {
        const cart = {};

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const menuItem = checkbox.closest(".menu-item");
                const itemName = menuItem.querySelector(".menu-item-name").textContent;
                const itemPrice = parseFloat(menuItem.querySelector(".price").textContent);
                const itemImage = menuItem.querySelector(".menu-item-img").src; // Get the image source
                const itemQuantity = parseInt(quantities[index].textContent);

                cart[itemName] = {
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: itemQuantity
                };
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart)); // Save to `localStorage`
    }

    // Handle "Add to Cart" button click
    addToCartButton.addEventListener("click", () => {
        updateCart(); // Update cart in `localStorage`
        window.location.href = "cart.html"; // Redirect to the cart page
    });

    // Handle quantity increment/decrement
    document.querySelectorAll(".qty .inc").forEach((inc, index) => {
        inc.addEventListener("click", () => {
            const currentQuantity = parseInt(quantities[index].textContent);
            quantities[index].textContent = (currentQuantity + 1).toString(); // Increment quantity
            updateCart(); // Update `localStorage`
        });
    });

    document.querySelectorAll(".qty .dec").forEach((dec, index) => {
        dec.addEventListener("click", () => {
            const currentQuantity = parseInt(quantities[index].textContent);
            if (currentQuantity > 1) {
                quantities[index].textContent = (currentQuantity - 1).toString(); // Decrement quantity
                updateCart(); // Update `localStorage`
            }
        });
    });
});


