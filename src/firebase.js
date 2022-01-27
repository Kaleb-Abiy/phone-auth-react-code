import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBnUzk4ijVlDmcZ-PUNofhgP8IiIb4RXUo",
    authDomain: "landing-page-728ba.firebaseapp.com",
    projectId: "landing-page-728ba",
    storageBucket: "landing-page-728ba.appspot.com",
    messagingSenderId: "652976538217",
    appId: "1:652976538217:web:74e1c0c270e1fdde6dd8f8"
  };


const app = initializeApp(firebaseConfig);
export const authenticate = getAuth(app);


