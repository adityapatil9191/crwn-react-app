// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { singnInWithGooglePopup,
    createUserDocumentFromAuth,
    // signInWIthGoogleRedirect,
    // auth
 } from "../../utils/firebase/firebase.utls"


const Authentication = () => {

    //use below code for redirection 
    // useEffect(()=>{
    //     async function fetchData() {
    //         const response = await getRedirectResult(auth);
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user)
    //         }
    //     }
    //     fetchData()
    // },[])

    const logGoogleUser = async () =>{
        const response =  await singnInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
        
    }
    // use below code if we are using signup with redirection
    // const logGoogleRedirectUser = async () =>{
    //     const { user } = await signInWIthGoogleRedirect();
    //     console.log({user})
    // }

    return (
        <div>
            <h1>Sign In Page</h1>
            <SignInForm/>
            <SignUpForm/>
            {/* <button onClick={logGoogleRedirectUser}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default Authentication