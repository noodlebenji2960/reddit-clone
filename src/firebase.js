import { getFirestore, query, doc, getDoc, getDocs, collection } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp({
    //firebase config
});

export const db = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseAnalytics = getAnalytics(firebaseApp); 