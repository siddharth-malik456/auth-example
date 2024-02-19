import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuJwzMQRn7FWBQAARzQv_YprXoERY1vaU",
  authDomain: "auth-example-4ce3e.firebaseapp.com",
  projectId: "auth-example-4ce3e",
  storageBucket: "auth-example-4ce3e.appspot.com",
  messagingSenderId: "139686783808",
  appId: "1:139686783808:web:807e5ffebc0a1d29d7a8a5",
  measurementId: "G-VNDE2VJLN6",
};
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
