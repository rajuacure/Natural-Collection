// ==========================================
// Natural Collection
// Cart System
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================================
// Add To Cart
// ==========================================

function addToCart(name, price, image) {

    const found = cart.find(item => item.name === name);

    if (found) {

        found.qty++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });

    }

    saveCart();

    alert("✅ Product Added To Cart");

}

// ==========================================
// Load Cart
// ==========================================

function loadCart() {

    const table = document.getElementById("cartItems");

    const total = document.getElementById("grandTotal");

    if (!table) return;

    table.innerHTML = "";

    let grand = 0;

    if (cart.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">
                Cart Empty
            </td>
        </tr>
        `;

        total.innerHTML = "৳0";

        return;

    }

    cart.forEach((item,index)=>{

        const sub = item.price * item.qty;

        grand += sub;

        table.innerHTML += `

<tr>

<td>

<img src="${item.image}"

width="70">

</td>

<td>

${item.name}

</td>

<td>

৳${item.price}

</td>

<td>

<button onclick="minusQty(${index})">-</button>

${item.qty}

<button onclick="plusQty(${index})">+</button>

</td>

<td>

৳${sub}

</td>

<td>

<button onclick="removeItem(${index})">

❌

</button>

</td>

</tr>

`;

    });

    total.innerHTML = "৳"+grand;

}

// ==========================================
// Quantity +
// ==========================================

window.plusQty=function(index){

    cart[index].qty++;

    saveCart();

    loadCart();

}

// ==========================================
// Quantity -
// ==========================================

window.minusQty=function(index){

    if(cart[index].qty>1){

        cart[index].qty--;

    }

    saveCart();

    loadCart();

}

// ==========================================
// Remove
// ==========================================

window.removeItem=function(index){

    cart.splice(index,1);

    saveCart();

    loadCart();

}

// ==========================================

loadCart();
