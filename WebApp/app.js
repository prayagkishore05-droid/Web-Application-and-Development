
/* Toast Notification */
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0b1d3a;
        color: gold;
        padding: 15px;
        border-radius: 8px;
        z-index: 1000;
        display: block;
    `;

    setTimeout(() => toast.style.display = "none", 3000);
}


/* Hamburger Menu */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

/* Close Menu After Clicking a Link */
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});


/* Team Filter */
const teamFilter = document.getElementById("teamFilter");
const matchCards = document.querySelectorAll(".match-card");

teamFilter.addEventListener("change", function () {
    const selectedTeam = teamFilter.value;

    matchCards.forEach(card => {
        const teams = card.dataset.teams;

        card.style.display =
            selectedTeam === "All" || teams.includes(selectedTeam)
                ? "block"
                : "none";
    });
});


/* Grid and List View */
const matchContainer = document.getElementById("matchContainer");
const gridButton = document.getElementById("gridView");
const listButton = document.getElementById("listView");

gridButton.addEventListener("click", function () {
    matchContainer.classList.remove("list-view");
});

listButton.addEventListener("click", function () {
    matchContainer.classList.add("list-view");
});


/* Match and Stand Prices */
const prices = {
    "1": {
        "General": 800,
        "Premium": 1500,
        "VIP": 3000
    },
    "2": {
        "General": 900,
        "Premium": 1800,
        "VIP": 3500
    }
};


/* Booking Form Elements */
const matchDropdown = document.getElementById("match");
const standDropdown = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");


/* Update Booking Summary */
function updateSummary(showNotification = true) {
    let match = matchDropdown.value;
    let stand = standDropdown.value;
    let quantity = Number(quantityInput.value);

    let matchName = matchDropdown.options[
        matchDropdown.selectedIndex
    ].text;

    let price = 0;

    if (match !== "" && stand !== "") {
        price = prices[match][stand];
    }

    let total = price * quantity;

    document.getElementById("summaryMatch").textContent =
        match === "" ? "Not Selected" : matchName;

    document.getElementById("summaryStand").textContent =
        stand === "" ? "Not Selected" : stand;

    document.getElementById("summaryPrice").textContent = price;
    document.getElementById("summaryQuantity").textContent = quantity;
    document.getElementById("summaryTotal").textContent = total;

    if (showNotification) {
        showToast("Booking Summary Updated!");
    }
}


/* Listen for Form Changes */
matchDropdown.addEventListener("change", () => updateSummary());
standDropdown.addEventListener("change", () => updateSummary());
quantityInput.addEventListener("input", () => updateSummary());
quantityInput.addEventListener("change", () => updateSummary());


/* Book Match Button */
document.querySelectorAll(".book-match").forEach(button => {
    button.addEventListener("click", function () {
        const matchNumber = button.dataset.match;

        // Select Match Automatically
        matchDropdown.value = matchNumber;

        // Update Booking Summary
        updateSummary(false);

        // Scroll to Booking Form
        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Please complete your ticket booking!");
    });
});
