// Array of objects representing available offers
let offers = [
    { name: "Offer 1", percentage: "10%", photo: "offer1.jpg" },
    { name: "Offer 2", percentage: "20%", photo: "offer2.jpg" },
    // Add more offers as needed
];

// Function to handle offer deletion
function deleteOffers() {
    const checkboxes = document.querySelectorAll('.avo input[type="checkbox"]');
    const checkedOffers = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    if (checkedOffers.length === 0) {
        alert("Please select at least one offer");
        return;
    }

    if (confirm("Are you sure you want to delete the selected offers?")) {
        checkedOffers.forEach(checkbox => {
            const offerIndex = parseInt(checkbox.getAttribute('data-index'));
            offers.splice(offerIndex, 1);
        });

        renderOffers();
    }
}

// Function to render offers
function renderOffers() {
    const container = document.querySelector('.container');
    container.innerHTML = '';

    offers.forEach((offer, index) => {
        const avoDiv = document.createElement('div');
        avoDiv.className = 'avo';
        avoDiv.innerHTML = `
            <img src="${offer.photo}" alt="${offer.name}">
            <div class="button-container">
                <button class="delete-button" onclick="deleteOffers()">Delete</button>
                <button class="add-button">Add</button>
            </div>
            <input type="checkbox" data-index="${index}">
        `;
        container.appendChild(avoDiv);
    });
}

// Function to handle form submission for adding a new offer
function addOffer(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const percentage = document.querySelector('input[name="percentage"]').value.trim();
    const photo = document.querySelector('input[name="photo"]').value.trim();

    if (name === '' || percentage === '' || photo === '') {
        alert("Please fill in all fields");
        return;
    }

    // Add the new offer to the offers array
    offers.push({ name, percentage, photo });
    renderOffers();

    // Clear the form fields
    document.querySelector('form').reset();
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', addOffer);

// Initial rendering of offers
renderOffers();
