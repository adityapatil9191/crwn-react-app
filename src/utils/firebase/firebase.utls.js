import {initializeApp} from 'firebase/app'
import {getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
     from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

  const googleprovider = new GoogleAuthProvider()

  googleprovider.setCustomParameters({
      prompt:"select_account"
  })

export const auth = getAuth();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch =  writeBatch(db);
    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object)
    })
    await batch.commit();
    console.log("Done")
}

export const singnInWithGooglePopup = () => signInWithPopup(auth,googleprovider)
export const signInWIthGoogleRedirect = () => signInWithRedirect(auth, googleprovider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) =>{
    if(!userAuth) return
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
                createdAt,
                ...additionalInformation
            })
        } catch(error) {
            console.log('error occured the user',error.message)
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWIthEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () =>  await signOut(auth)

export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback)

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    
    const querySnapshot =  await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})

    return categoryMap;
}