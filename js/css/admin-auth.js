// ==========================================
// Natural Collection V2
// Admin Authentication
// admin-auth.js
// Part 14.1
// ==========================================

import { auth } from "../firebase.js";

import {

signInWithEmailAndPassword,

signOut,

onAuthStateChanged,

setPersistence,

browserLocalPersistence,

browserSessionPersistence

}

from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// ==========================================
// DOM
// ==========================================

const adminLoginForm = document.getElementById("adminLoginForm");

// ==========================================
// Admin Email
// ==========================================

const ADMIN_EMAIL = "admin@naturalcollection.com";

// ==========================================
// Admin Login
// ==========================================

if(adminLoginForm){

adminLoginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("adminEmail").value.trim();

const password=document.getElementById("adminPassword").value;

const remember=document.getElementById("rememberAdmin").checked;

try{

await setPersistence(

auth,

remember

? browserLocalPersistence

: browserSessionPersistence

);

const userCredential=

await signInWithEmailAndPassword(

auth,

email,

password

);

const user=userCredential.user;

if(user.email!==ADMIN_EMAIL){

alert("Access Denied");

await signOut(auth);

return;

}

window.location.href="admin-dashboard.html";

}

catch(error){

console.error(error);

alert(error.message);

}

});

}
// ==========================================
// Admin Authentication
// Part 14.2
// ==========================================

// ==========================================
// Protect Admin Pages
// ==========================================

onAuthStateChanged(auth, (user) => {

    // Login Page Skip

    if (window.location.pathname.includes("admin-login.html")) {

        if (user && user.email === ADMIN_EMAIL) {

            window.location.href = "admin-dashboard.html";

        }

        return;

    }

    // Protect All Admin Pages

    if (!user) {

        window.location.href = "admin-login.html";

        return;

    }

    if (user.email !== ADMIN_EMAIL) {

        alert("❌ Unauthorized Access");

        signOut(auth);

        window.location.href = "admin-login.html";

        return;

    }

    console.log("✅ Admin Logged In :", user.email);

});

// ==========================================
// Admin Logout
// ==========================================

window.adminLogout = async function () {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {

        await signOut(auth);

        alert("✅ Logout Successful");

        window.location.href = "admin-login.html";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

// ==========================================
// Admin Session Check
// ==========================================

window.isAdminLoggedIn = function () {

    return auth.currentUser &&
           auth.currentUser.email === ADMIN_EMAIL;

};

// ==========================================
// Get Current Admin
// ==========================================

window.getCurrentAdmin = function () {

    return auth.currentUser;

};

// ==========================================
// End admin-auth.js
// ==========================================
