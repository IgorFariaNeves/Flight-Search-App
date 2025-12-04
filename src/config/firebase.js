import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDc3b8IO2cLcjYtuT4Rk719w0QUedvadu4",
    authDomain: "flight-search-app-7a40d.firebaseapp.com",
    projectId: "flight-search-app-7a40d",
    storageBucket: "flight-search-app-7a40d.firebasestorage.app",
    messagingSenderId: "802662817826",
    appId: "1:802662817826:web:2b6715cdafaba406fc6a7b",
    measurementId: "G-DEDV2227EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
