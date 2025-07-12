import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
    getFirestore,
    getDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCALRsEdIwM8g0BJeaVW51DBsWUdZ0lXJ0",
    authDomain: "student-essentials-fbd17.firebaseapp.com",
    projectId: "student-essentials-fbd17",
    storageBucket: "student-essentials-fbd17.firebasestorage.app",
    messagingSenderId: "1061657235972",
    appId: "1:1061657235972:web:597c4cf66ebb5a838b1b51",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const signOutBtn = document.querySelector(".sign-out-btn");
signOutBtn.addEventListener("click", ()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href = "../authentication/login.html";
    })
    .catch((error)=>{
        alert("Error signing out:", error)
    })
})

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);

        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                const authenticationBtn = document.querySelectorAll(
                    ".authenticate-anchor-tags"
                );

                authenticationBtn.forEach((element) => {
                    element.style.display = "none";
                });

                const userEl = document.querySelector(".sign-out-element");
                userEl.innerText = userData.username;
                userEl.style.display = "block";
                userEl.style.fontSize = "1.4em";
                userEl.style.marginLeft = "15px";
            }
        });
    }
});