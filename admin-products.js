// ==========================================
// Natural Collection V2
// admin-products.js
// Complete File
// ==========================================

import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// DOM
const productsTable = document.getElementById("productsTable");
const searchInput = document.getElementById("searchProduct");

const productCount = document.getElementById("productCount");
const featuredCount = document.getElementById("featuredCount");
const lowStockCount = document.getElementById("lowStockCount");
const categoryCount = document.getElementById("categoryCount");

let allProducts = [];

// ==========================================
// Load Products
// ==========================================

async function loadProducts() {

    productsTable.innerHTML = `
        <tr>
            <td colspan="7">Loading...</td>
        </tr>
    `;

    const snapshot = await getDocs(collection(db, "products"));

    allProducts = [];

    snapshot.forEach((docSnap) => {

        allProducts.push({

            id: docSnap.id,

            ...docSnap.data()

        });

    });

    renderProducts(allProducts);

    updateStatistics();

}

window.loadProducts = loadProducts;

// ==========================================
// Render Products
// ==========================================

function renderProducts(products) {

    if (products.length === 0) {

        productsTable.innerHTML = `
            <tr>
                <td colspan="7">
                    No Products Found
                </td>
            </tr>
        `;

        return;

    }

    productsTable.innerHTML = "";

    products.forEach(product => {

        productsTable.innerHTML += `

<tr>

<td>

<img
src="${product.image}"
width="60"
height="60"
style="border-radius:10px;object-fit:cover;">

</td>

<td>

${product.name}

</td>

<td>

${product.category}

</td>

<td>

৳${product.price}

</td>

<td>

${product.stock}

</td>

<td>

<button
onclick="toggleFeatured('${product.id}',${product.featured})"
class="btn">

${product.featured ? "⭐ Yes" : "No"}

</button>

</td>

<td>

<a
href="admin-edit-product.html?id=${product.id}"
class="btn">

Edit

</a>

<button
onclick="deleteProduct('${product.id}')"
class="btn btn-danger">

Delete

</button>

</td>

</tr>

`;

    });

}

// ==========================================
// Statistics
// ==========================================

function updateStatistics() {

    productCount.innerHTML = allProducts.length;

    featuredCount.innerHTML =

        allProducts.filter(p => p.featured).length;

    lowStockCount.innerHTML =

        allProducts.filter(p => Number(p.stock) < 10).length;

    const categories =

        [...new Set(allProducts.map(p => p.category))];

    categoryCount.innerHTML = categories.length;

}

// ==========================================
// Search
// ==========================================

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const keyword =

            searchInput.value.toLowerCase();

        const filtered =

            allProducts.filter(product =>

                product.name.toLowerCase().includes(keyword)

            );

        renderProducts(filtered);

    });

}

// ==========================================
// Delete Product
// ==========================================

window.deleteProduct = async function(id) {

    if (!confirm("Delete this product?"))

        return;

    await deleteDoc(doc(db, "products", id));

    loadProducts();

}

// ==========================================
// Toggle Featured
// ==========================================

window.toggleFeatured = async function(id, current) {

    await updateDoc(

        doc(db, "products", id),

        {

            featured: !current

        }

    );

    loadProducts();

}

// ==========================================
// Auto Load
// ==========================================

loadProducts();
