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
// ==========================================
// Checkout Form Submit
// Part 2
// ==========================================

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Customer Information

        const customerName = document.getElementById("customerName").value.trim();

        const customerPhone = document.getElementById("customerPhone").value.trim();

        const customerEmail = document.getElementById("customerEmail").value.trim();

        const customerAddress = document.getElementById("customerAddress").value.trim();

        // Payment Method

        const paymentMethod = document.querySelector(
            'input[name="payment"]:checked'
        ).value;

        // Validation

        if (customerName.length < 3) {

            alert("সঠিক নাম লিখুন");

            return;

        }

        if (!isValidPhone(customerPhone)) {

            alert("সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন");

            return;

        }

        if (customerAddress.length < 10) {

            alert("সম্পূর্ণ ঠিকানা লিখুন");

            return;

        }

        if (cart.length === 0) {

            alert("আপনার Cart খালি।");

            return;

        }

        // Order Object

        const order = {

            orderId: "NC" + Date.now(),

            customer: {

                name: customerName,

                phone: customerPhone,

                email: customerEmail,

                address: customerAddress

            },

            paymentMethod: paymentMethod,

            products: cart,

            total: getGrandTotal(),

            status: "Pending",

            createdAt: new Date().toISOString()

        };

        // Previous Orders

        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        // Add New Order

        orders.push(order);

        // Save Orders

        localStorage.setItem(

            "orders",

            JSON.stringify(orders)

        );

        // Last Order

        localStorage.setItem(

            "lastOrder",

            JSON.stringify(order)

        );
