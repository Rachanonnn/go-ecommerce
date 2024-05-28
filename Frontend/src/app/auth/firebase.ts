// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeTihwbm2tkDsryZUD6gEpTReKhXY1rAc",
  authDomain: "ecommerce-71a5d.firebaseapp.com",
  projectId: "ecommerce-71a5d",
  storageBucket: "ecommerce-71a5d.appspot.com",
  messagingSenderId: "1062742160437",
  appId: "1:1062742160437:web:3410caa9b7009e68742d7c",
  measurementId: "G-EJCHSN0W2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, analytics };
export default app;