
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


// Book Button Functionality
const bookButtons = document.querySelectorAll("#matches table button");

bookButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get Match Number
        let row = button.closest("tr");
        let matchNumber = row.querySelector("td").textContent.trim();

        // Automatically Select Match
        let matchDropdown = document.getElementById("match");
        matchDropdown.value = matchNumber;

        // Smooth Scrolling to Booking Form
        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

        // Display Toast Notification
        showToast("Please complete your ticket booking!");

    });

});
