import {initializeApp} from 'firebase/app'
import {getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider
}
     from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDgYp9M-LR8Mf8V9OTvxOhDxPzxMCde4hM",
    authDomain: "crwn-clothing-db-70171.firebaseapp.com",
    projectId: "crwn-clothing-db-70171",
    storageBucket: "crwn-clothing-db-70171.appspot.com",
    messagingSenderId: "394432866208",
    appId: "1:394432866208:web:614ef4e7316fec3c1226c5"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
      prompt:"select_account"
  })

export const auth = getAuth();

export const singnInWithGooglePopup = () => signInWithPopup(auth,provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db,'users',userAuth.uid)
    console.log(userDocRef)

    const userSnapShot = await getDoc(userDocRef)

    console.log(userSnapShot)

    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date()
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log('error occured the user',error.message)
        }
    }
    return userDocRef;
}