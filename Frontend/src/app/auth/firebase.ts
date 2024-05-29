// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

let json = process.env.FIREBASE_CONFIG;

const firebaseConfig = JSON.parse(json || "{}");

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