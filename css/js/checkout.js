// ==========================================
// Natural Collection
// checkout.js
// Part 1
// ==========================================

// Cart Data Load

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM

const checkoutItems = document.getElementById("checkoutItems");

const checkoutTotal = document.getElementById("checkoutTotal");

const checkoutForm = document.getElementById("checkoutForm");

// ==========================================
// Load Checkout Items
// ==========================================

function loadCheckout() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

<tr>

<td colspan="3" style="text-align:center;">

Cart Empty

</td>

</tr>

`;

        checkoutTotal.innerHTML = "৳0";

        return;

    }

    cart.forEach(item => {

        const total = item.price * item.qty;

        grandTotal += total;

        checkoutItems.innerHTML += `

<tr>

<td>

${item.name}

</td>

<td>

${item.qty}

</td>

<td>

৳${total}

</td>

</tr>

`;

    });

    checkoutTotal.innerHTML = "৳" + grandTotal;

}

// ==========================================
// Auto Load
// ==========================================

loadCheckout();
