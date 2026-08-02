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
