import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHZj-GtwtlPjO37nsHOizCiheeHa7SKrY",
  authDomain: "fittrack-ae723.firebaseapp.com",
  projectId: "fittrack-ae723",
  storageBucket: "fittrack-ae723.firebasestorage.app",
  messagingSenderId: "655003598620",
  appId: "1:655003598620:web:17a04806961e89654dc4d9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
