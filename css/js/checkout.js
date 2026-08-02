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
// ==========================================
// Place Order
// ==========================================

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const customerName = document.getElementById("customerName").value.trim();

        const customerPhone = document.getElementById("customerPhone").value.trim();

        const customerEmail = document.getElementById("customerEmail").value.trim();

        const customerAddress = document.getElementById("customerAddress").value.trim();

        const paymentMethod = document.querySelector(
            'input[name="payment"]:checked'
        ).value;

        if (
            customerName === "" ||
            customerPhone === "" ||
            customerAddress === ""
        ) {

            alert("সব তথ্য পূরণ করুন");

            return;

        }

        // Total

        let grandTotal = 0;

        cart.forEach(item => {

            grandTotal += item.price * item.qty;

        });

        // Order Object

        const order = {

            orderId: "ORD-" + Date.now(),

            customerName,

            customerPhone,

            customerEmail,

            customerAddress,

            paymentMethod,

            items: cart,

            total: grandTotal,

            status: "Pending",

            orderDate: new Date().toLocaleString()

        };

        // Save Order

        localStorage.setItem(

            "lastOrder",

            JSON.stringify(order)

        );

        localStorage.setItem(

            "orders",

            JSON.stringify([

                ...(JSON.parse(localStorage.getItem("orders")) || []),

                order

            ])

        );

        // Clear Cart

        localStorage.removeItem("cart");

        alert("✅ Order Placed Successfully");

        window.location.href = "order-success.html";

    });

}
