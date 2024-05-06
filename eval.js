document.addEventListener('DOMContentLoaded', function () {
    const allStar = document.querySelectorAll('.rating .star');
    const ratingValue = document.querySelector('.rating input');
    const form = document.querySelector('form');
    const skipButton = document.querySelector('.btn.cancel');
    const restaurantName = document.getElementById('restaurant_name');

    // Function to update the restaurant name
    function updateRestaurantName(selectedRestaurant) {
        restaurantName.textContent = selectedRestaurant;
    }

    // Event listener for dropdown change
    document.getElementById('another_order').addEventListener('change', function () {
        const selectedRestaurant = this.value;
        updateRestaurantName(selectedRestaurant);
    });

    allStar.forEach((item, idx) => {
        item.addEventListener('click', function () {
            let click = 0;
            ratingValue.value = idx + 1;

            allStar.forEach(i => {
                i.classList.replace('bxs-star', 'bx-star');
                i.classList.remove('active');
            });
            for (let i = 0; i < allStar.length; i++) {
                if (i <= idx) {
                    allStar[i].classList.replace('bx-star', 'bxs-star');
                    allStar[i].classList.add('active');
                } else {
                    allStar[i].style.setProperty('--i', click);
                    click++;
                }
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedRestaurant = document.getElementById('another_order').value;
        const selectedRating = ratingValue.value;

        if (selectedRestaurant && selectedRating) {
            // Display the alert message
            alert(`Thank you for your feedback! Your rating for ${selectedRestaurant} is ${selectedRating} /5`);
            // Redirect to the home page
            window.location.href = "index.html";
        } else {
            // Show an error message if restaurant or rating is not selected
            alert("Please select a restaurant and provide a rating before submitting.");
        }
    });

    skipButton.addEventListener('click', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Redirect to the home page
        window.location.href = "index.html";
    });
});

