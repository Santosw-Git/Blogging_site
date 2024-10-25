import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-aG4ya9Z1KQxh7yMu_ngc0arBVNaesu8",
  authDomain: "blogging-102a1.firebaseapp.com",
  projectId: "blogging-102a1",
  storageBucket: "blogging-102a1.appspot.com",
  messagingSenderId: "477193625671",
  appId: "1:477193625671:web:dc766f7c02701b02c95162",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      user = result.user;
    })
    .catch((error) => {
      console.log("error", error);
    });

  return user;
};
