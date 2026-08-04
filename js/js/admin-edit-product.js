// ==========================================
// Natural Collection V2
// admin-edit-product.js
// Complete File
// ==========================================

import { db, storage } from "../firebase.js";

import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

// ==========================================
// URL Parameter
// ==========================================

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

// ==========================================
// DOM
// ==========================================

const form = document.getElementById("editProductForm");

const nameInput = document.getElementById("productName");

const priceInput = document.getElementById("productPrice");

const categoryInput = document.getElementById("productCategory");

const stockInput = document.getElementById("productStock");

const descriptionInput = document.getElementById("productDescription");

const featuredInput = document.getElementById("productFeatured");

const imageInput = document.getElementById("productImage");

const previewImage = document.getElementById("previewImage");

let currentImage = "";

// ==========================================
// Load Product
// ==========================================

async function loadProduct() {

    if (!productId) {

        alert("Product ID Missing");

        window.location.href = "admin-products.html";

        return;

    }

    try {

        const productRef = doc(db, "products", productId);

        const snap = await getDoc(productRef);

        if (!snap.exists()) {

            alert("Product Not Found");

            window.location.href = "admin-products.html";

            return;

        }

        const product = snap.data();

        nameInput.value = product.name || "";

        priceInput.value = product.price || "";

        categoryInput.value = product.category || "";

        stockInput.value = product.stock || "";

        descriptionInput.value = product.description || "";

        featuredInput.checked = product.featured || false;

        currentImage = product.image || "";

        if (currentImage) {

            previewImage.src = currentImage;

        }

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Preview New Image
// ==========================================

imageInput.addEventListener("change", () => {

    if (imageInput.files.length > 0) {

        previewImage.src = URL.createObjectURL(

            imageInput.files[0]

        );

    }

});

// ==========================================
// Update Product
// ==========================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        let imageURL = currentImage;

        // Upload New Image

        if (imageInput.files.length > 0) {

            const file = imageInput.files[0];

            const storageRef = ref(

                storage,

                "products/" + Date.now() + "_" + file.name

            );

            await uploadBytes(

                storageRef,

                file

            );

            imageURL = await getDownloadURL(storageRef);

        }

        await updateDoc(

            doc(db, "products", productId),

            {

                name: nameInput.value.trim(),

                price: Number(priceInput.value),

                category: categoryInput.value.trim(),

                stock: Number(stockInput.value),

                description: descriptionInput.value.trim(),

                featured: featuredInput.checked,

                image: imageURL,

                updatedAt: serverTimestamp()

            }

        );

        alert("✅ Product Updated Successfully");

        window.location.href = "admin-products.html";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});

// ==========================================
// Init
// ==========================================

loadProduct();
