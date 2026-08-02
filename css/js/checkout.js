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
// ==========================================
// Checkout Validation & Payment
// Part 3
// ==========================================

// বাংলাদেশ মোবাইল নম্বর Validation

function isValidPhone(phone){

    const regex = /^(01[3-9]\d{8})$/;

    return regex.test(phone);

}

// Checkout Form Validation

if(checkoutForm){

checkoutForm.addEventListener("submit",function(e){

e.preventDefault();

const customerName=document.getElementById("customerName").value.trim();

const customerPhone=document.getElementById("customerPhone").value.trim();

const customerEmail=document.getElementById("customerEmail").value.trim();

const customerAddress=document.getElementById("customerAddress").value.trim();

const paymentMethod=document.querySelector('input[name="payment"]:checked').value;

// Name

if(customerName.length<3){

alert("সঠিক নাম লিখুন");

return;

}

// Phone

if(!isValidPhone(customerPhone)){

alert("সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন");

return;

}

// Address

if(customerAddress.length<10){

alert("সম্পূর্ণ ঠিকানা লিখুন");

return;

}

// Payment Message

switch(paymentMethod){

case "Cash on Delivery":

alert("আপনি Cash On Delivery নির্বাচন করেছেন।");

break;

case "bKash":

alert("আপনি bKash নির্বাচন করেছেন।");

break;

case "Nagad":

alert("আপনি Nagad নির্বাচন করেছেন।");

break;

default:

alert("Payment Method নির্বাচন করুন");

return;

}

// Order Confirm

const confirmOrder=confirm(

"আপনি কি Order Confirm করতে চান?"

);

if(!confirmOrder){

return;

}

// Grand Total

let grandTotal=0;

cart.forEach(item=>{

grandTotal+=item.price*item.qty;

});

// Order Object

const order={

id:"ORD-"+Date.now(),

name:customerName,

phone:customerPhone,

email:customerEmail,

address:customerAddress,

payment:paymentMethod,

products:cart,

total:grandTotal,

status:"Pending",

createdAt:new Date().toISOString()

};

// Save

const orders=JSON.parse(localStorage.getItem("orders"))||[];

orders.push(order);

localStorage.setItem("orders",JSON.stringify(orders));

// Clear Cart

localStorage.removeItem("cart");

// Success

alert("🎉 Order সফলভাবে সম্পন্ন হয়েছে");

window.location.href="order-success.html";

});

}
