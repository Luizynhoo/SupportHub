import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDglcozV5GT2J2nfwgRC4sKB8eKRDlmO_8",
    authDomain: "tickets-2414a.firebaseapp.com",
    projectId: "tickets-2414a",
    storageBucket: "tickets-2414a.firebasestorage.app",
    messagingSenderId: "447270287637",
    appId: "1:447270287637:web:9abba69cc92397621c511c",
    measurementId: "G-1W2B83XFQR"
};

const fireBaseApp = initializeApp(firebaseConfig)


//Manipulando o banco de dados
const auth = getAuth(fireBaseApp);
const db = getFirestore(fireBaseApp);
const storage = getStorage(fireBaseApp);

export {auth, db, storage};