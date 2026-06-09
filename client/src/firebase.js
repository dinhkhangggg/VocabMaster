// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfS_VsVMrfbw5u1NHl_4lCaNpdAveQHYA",
  authDomain: "vocabmaster-hcmute.firebaseapp.com",
  projectId: "vocabmaster-hcmute",
  storageBucket: "vocabmaster-hcmute.firebasestorage.app",
  messagingSenderId: "945546388501",
  appId: "1:945546388501:web:6f253e4b8e674dc04d1a1c",
  measurementId: "G-G8SDQS543J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;
