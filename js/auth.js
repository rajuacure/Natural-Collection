// ==========================================
// Natural Collection V2
// Firebase Authentication
// auth.js
// Part 10.1
// ==========================================

import {

auth

} from "../firebase.js";

import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

GoogleAuthProvider,

signInWithPopup,

sendEmailVerification,

sendPasswordResetEmail,

updateProfile,

signOut,

onAuthStateChanged,

setPersistence,

browserLocalPersistence,

browserSessionPersistence

}

from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Google Provider

const provider = new GoogleAuthProvider();

// Login Form

const loginForm = document.getElementById("loginForm");

// Register Form

const registerForm = document.getElementById("registerForm");
// ==========================================
// User Register
// Part 10.2
// ==========================================

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("registerName").value.trim();

        const email = document.getElementById("registerEmail").value.trim();

        const phone = document.getElementById("registerPhone").value.trim();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        // Validation

        if (name === "") {

            alert("Full Name লিখুন");

            return;

        }

        if (phone.length !== 11) {

            alert("সঠিক Phone Number লিখুন");

            return;

        }

        if (password.length < 6) {

            alert("Password কমপক্ষে ৬ অক্ষরের হতে হবে");

            return;

        }

        if (password !== confirmPassword) {

            alert("Password মিলছে না");

            return;

        }

        try {

            // Create User

            const userCredential = await createUserWithEmailAndPassword(

                auth,

                email,

                password

            );

            const user = userCredential.user;

            // Update Profile

            await updateProfile(user, {

                displayName: name

            });

            // Email Verification

            await sendEmailVerification(user);

            alert(

                "✅ Account তৈরি হয়েছে!\n\nEmail Verification Link পাঠানো হয়েছে।"

            );

            // Save Basic User Info

            localStorage.setItem(

                "currentUser",

                JSON.stringify({

                    uid: user.uid,

                    name: name,

                    email: email,

                    phone: phone

                })

            );

            // Redirect

            window.location.href = "login.html";

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}
// ==========================================
// User Login
// Part 10.3
// ==========================================

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.getElementById("loginPassword").value;

        const remember = document.getElementById("rememberMe");

        try {

            // Remember Me

            await setPersistence(

                auth,

                remember && remember.checked

                    ? browserLocalPersistence

                    : browserSessionPersistence

            );

            // Login

            const userCredential = await signInWithEmailAndPassword(

                auth,

                email,

                password

            );

            const user = userCredential.user;

            // Email Verification

            if (!user.emailVerified) {

                alert("❌ আপনার Email এখনও Verify করা হয়নি।");

                await signOut(auth);

                return;

            }

            alert("✅ Login Successful");

            window.location.href = "index.html";

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}

// ==========================================
// Google Login
// ==========================================

window.googleLogin = async function () {

    try {

        const result = await signInWithPopup(auth, provider);

        alert("✅ Google Login Successful");

        window.location.href = "index.html";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

// ==========================================
// Forgot Password
// ==========================================

window.resetPassword = async function () {

    const email = prompt("আপনার Email লিখুন");

    if (!email) return;

    try {

        await sendPasswordResetEmail(auth, email);

        alert("✅ Password Reset Email পাঠানো হয়েছে।");

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

// ==========================================
// Logout
// ==========================================

window.logout = async function () {

    try {

        await signOut(auth);

        alert("✅ Logout Successful");

        window.location.href = "login.html";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

// ==========================================
// Auto Login Check
// ==========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("Logged In :", user.email);

    } else {

        console.log("No User Logged In");

    }

});
