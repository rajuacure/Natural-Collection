// ==========================================
// Natural Collection V2
// checkout.js
// Part 1
// ==========================================

// Load Cart From LocalStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

// ==========================================
// Bangladesh Phone Validation
// ==========================================

function isValidPhone(phone) {

    const regex = /^(01[3-9]\d{8})$/;

    return regex.test(phone);

}

// ==========================================
// Currency Format
// ==========================================

function formatPrice(price) {

    return "৳" + Number(price).toLocaleString();

}

// ==========================================
// Calculate Grand Total
// ==========================================

function getGrandTotal() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.qty;

    });

    return total;

}

// ==========================================
// Load Checkout Items
// ==========================================

function loadCheckout() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

<tr>

<td colspan="3" style="text-align:center;padding:20px;">

🛒 Your Cart is Empty

</td>

</tr>

`;

        checkoutTotal.innerHTML = formatPrice(0);

        return;

    }

    cart.forEach(item => {

        const subtotal = item.price * item.qty;

        checkoutItems.innerHTML += `

<tr>

<td>

${item.name}

</td>

<td>

${item.qty}

</td>

<td>

${formatPrice(subtotal)}

</td>

</tr>

`;

    });

    checkoutTotal.innerHTML = formatPrice(getGrandTotal());

}

// ==========================================
// Auto Load
// ==========================================

loadCheckout();
