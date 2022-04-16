import { singnInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utls"

const SignIn = () => {
    const logGoogleUser = async () =>{
        const response =  await singnInWithGooglePopup();
        createUserDocumentFromAuth(response.user)
        
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn