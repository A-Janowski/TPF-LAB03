import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwnLkUjKpGRHxciOmhgHSa684MQ7ah7Kk",
  authDomain: "tpf-lab04-a53ac.firebaseapp.com",
  projectId: "tpf-lab04-a53ac",
  storageBucket: "tpf-lab04-a53ac.firebasestorage.app",
  messagingSenderId: "902317765851",
  appId: "1:902317765851:web:fb8bed3bb27d46f07a88fe",
  measurementId: "G-KC9DN1EL23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const emailField = document.getElementById("exampleInputEmail1");

const userSignIn = async () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        console.log(user);
        console.log(user.displayName);
        let name = user.displayName
        const names = name.split(" ");
        firstNameField.value = names[0];
        lastNameField.value = names[1];
        emailField.value = user.email;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
    alert("You have been signed out!")
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
    alert("You are authenticated with Google");
    console.log(user);
    }
})

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);