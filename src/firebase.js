// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnKElwMOGxD0M1KXSmT46Jn82BBt7JdXE",
  authDomain: "food-delight-8b406.firebaseapp.com",
  databaseURL: "https://food-delight-8b406-default-rtdb.firebaseio.com",
  projectId: "food-delight-8b406",
  storageBucket: "food-delight-8b406.firebasestorage.app",
  messagingSenderId: "577963079077",
  appId: "1:577963079077:web:0143d2494bb5138e19244c",
  measurementId: "G-GVKCNRWW20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
