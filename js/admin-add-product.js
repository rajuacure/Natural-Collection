// ==========================================
// Natural Collection V2
// admin-add-product.js
// Complete File
// ==========================================

import { db, storage } from "../firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

// ==========================================
// DOM
// ==========================================

const productForm = document.getElementById("productForm");

// ==========================================
// Add Product
// ==========================================

if (productForm) {

    productForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name =
            document.getElementById("productName").value.trim();

        const price =
            Number(document.getElementById("productPrice").value);

        const category =
            document.getElementById("productCategory").value.trim();

        const stock =
            Number(document.getElementById("productStock").value);

        const description =
            document.getElementById("productDescription").value.trim();

        const featured =
            document.getElementById("productFeatured").checked;

        const imageInput =
            document.getElementById("productImage");

        let imageURL = "";

        try {

            // Upload Image

            if (
                imageInput.files &&
                imageInput.files.length > 0
            ) {

                const file = imageInput.files[0];

                const storageRef = ref(

                    storage,

                    `products/${Date.now()}_${file.name}`

                );

                await uploadBytes(storageRef, file);

                imageURL =
                    await getDownloadURL(storageRef);

            }

            // Save Product

            await addDoc(

                collection(db, "products"),

                {

                    name,

                    price,

                    category,

                    stock,

                    description,

                    image: imageURL,

                    featured,

                    createdAt: serverTimestamp()

                }

            );

            alert("✅ Product Added Successfully");

            productForm.reset();

            window.location.href =
                "admin-products.html";

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}
