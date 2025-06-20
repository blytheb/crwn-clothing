import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import {
 getFirestore,
 doc,
 getDoc,
 setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdCBIILwVd8A6AzT2-EkDneSAL9wEXe2c",
  authDomain: "crwn-clothing-db-6e4ce.firebaseapp.com",
  projectId: "crwn-clothing-db-6e4ce",
  storageBucket: "crwn-clothing-db-6e4ce.firebasestorage.app",
  messagingSenderId: "215221735181",
  appId: "1:215221735181:web:c4d6d153dcd68d78ef6a44"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    promt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data exist -> userDocRef
  //if user data does not exist -> create/set doc with userAuth data in collection
  if (!userSnapshot.exists()){
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch(err) {
      console.log('error creating the user', err.message);
    }
  }
  return userDocRef;
}