import { getFirestore, query, doc, getDoc, getDocs, collection } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

const db = getFirestore(firebaseApp);

const firebaseApp = initializeApp({
    //firebase config
});