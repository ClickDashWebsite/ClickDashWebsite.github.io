document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    const cardText = card.querySelector(".card-text");
    const cardList = card.querySelector(".list-unstyled");

    // Ensure elements are hidden on page load
    if (cardText) {
      cardText.style.display = "none"; // Ensure it's hidden initially
    }
    if (cardList) {
      cardList.style.display = "none";
    }

    // Add mouseover event listener to show elements on hover
    card.addEventListener("mouseover", function () {
      if (cardText) {
        cardText.style.display = "block"; // Reveal on hover
      }
      if (cardList) {
        cardList.style.display = 'flex';
        list.style.flexDirection = 'row';
      }
    });

    // Add mouseout event listener to hide elements when the mouse leaves
    card.addEventListener("mouseout", function () {
      if (cardText) {
        cardText.style.display = "none"; // Hide when mouse leaves
      }
      if (cardList) {
        cardList.style.display = "none";
      }
    });
  });
});

// Function to get the start and end dates of the current week
function getCurrentWeek() {
  const currentDate = new Date();

  // Get the current day of the week (0 = Sunday, 6 = Saturday)
  const currentDay = currentDate.getDay();

  // Calculate the start and end dates of the week
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDay); // Go back to Sunday

  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + (6 - currentDay)); // Go forward to Saturday

  return {
    start: startDate,
    end: endDate,
  };
}

// Function to format the date as "Day, Date Month"
function formatDate(date) {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-GB', options);
}

// Function to display the current week's dates
function displayCurrentWeek() {
  const week = getCurrentWeek();

  const startFormatted = formatDate(week.start);
  const endFormatted = formatDate(week.end);

  const weekDisplayElement = document.getElementById('week-display');
  if (weekDisplayElement) {
    weekDisplayElement.textContent = `Week: ${startFormatted} - ${endFormatted}`;
  }
}

// Execute when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  displayCurrentWeek();
});


document.addEventListener("DOMContentLoaded", () => {
  const restaurantCards = document.querySelectorAll(".card-link"); // Select all restaurant cards
  const showMoreButton = document.createElement("button"); // Create a 'Show More' button
  const initialDisplayCount = 3; // Number of cards to show initially
  let currentDisplayCount = initialDisplayCount;

  showMoreButton.textContent = "Show More";
  showMoreButton.style.display = "block"; // Button visible
  showMoreButton.style.margin = "20px auto"; // Center the button
  showMoreButton.style.padding = "10px 20px"; // Button padding
  showMoreButton.style.backgroundColor = "#FD744A"; // Button background color
  showMoreButton.style.color = "white"; // Button text color
  showMoreButton.style.border = "none"; // No border
  showMoreButton.style.borderRadius = "5px"; // Rounded corners
  showMoreButton.style.cursor = "pointer"; // Change cursor on hover

  // Hide all cards except the initial set
  restaurantCards.forEach((card, index) => {
    if (index >= initialDisplayCount) {
      card.style.display = "none"; // Hide extra cards initially
    }
  });

  // Add click event listener to 'Show More' button
  showMoreButton.addEventListener("click", () => {
    // Show the next set of hidden cards
    for (let i = currentDisplayCount; i < currentDisplayCount + 3; i++) {
      if (i < restaurantCards.length) {
        restaurantCards[i].style.display = "block"; // Reveal the card
      }
    }

    currentDisplayCount += 3; // Update the displayed count

    // If all cards are displayed, hide the 'Show More' button
    if (currentDisplayCount >= restaurantCards.length) {
      showMoreButton.style.display = "none";
    }
  });

  // Append the 'Show More' button to the page (at the end of the card container)
  const cardContainer = document.getElementById("restaurants-container");
  cardContainer.appendChild(showMoreButton);
});

