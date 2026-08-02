// ==========================================
// Natural Collection
// products.js
// ==========================================

// Search Product
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const name = card.querySelector("h3").innerText.toLowerCase();

            if (name.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// Category Filter
const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const category = this.value;

        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const productCategory = card.dataset.category;

            if (category === "all" || productCategory === category) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// Wishlist
document.querySelectorAll(".wishlist-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        this.classList.toggle("active");

        alert("❤️ Wishlist Updated");

    });

});

// Add To Cart
document.querySelectorAll(".cart-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        const name = this.dataset.name;

        alert(name + " Cart-এ যোগ করা হয়েছে");

    });

});
