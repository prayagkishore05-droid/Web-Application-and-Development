
// Reusable Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "#0b1d3a";
    toast.style.color = "gold";
    toast.style.padding = "15px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "1000";
    toast.style.display = "block";

    setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}


// Match and Stand Prices
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


// Select Form Elements
const matchDropdown = document.getElementById("match");
const standDropdown = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");


// Update Booking Summary
function updateSummary(showNotification = true) {

    let match = matchDropdown.value;
    let stand = standDropdown.value;
    let quantity = Number(quantityInput.value);

    let matchName = matchDropdown.options[matchDropdown.selectedIndex].text;
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


// Listen for Match and Stand Changes
matchDropdown.addEventListener("change", function () {
    updateSummary();
});

standDropdown.addEventListener("change", function () {
    updateSummary();
});


// Update Quantity Immediately
quantityInput.addEventListener("input", function () {
    updateSummary();
});

quantityInput.addEventListener("change", function () {
    updateSummary();
});


// Book Button Functionality
const bookButtons = document.querySelectorAll("#matches table button");

bookButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let row = button.closest("tr");
        let matchNumber = row.querySelector("td").textContent.trim();

        // Automatically Select Match
        matchDropdown.value = matchNumber;

        // Update Booking Summary
        updateSummary(false);

        // Smooth Scrolling
        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

        // Display Toast
        showToast("Please complete your ticket booking!");

    });

});
