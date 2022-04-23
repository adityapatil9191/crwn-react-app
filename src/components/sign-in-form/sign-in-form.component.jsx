import { useState, useContext } from "react";
import {  singnInWithGooglePopup,createUserDocumentFromAuth, signInAuthUserWIthEmailAndPassword } from "../../utils/firebase/firebase.utls";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";

//import { UserContext } from "../../contexts/user.context";
const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    //const {setCurrentUser} = useContext(UserContext)
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        try{
            const {user} = await signInAuthUserWIthEmailAndPassword(email,password);
            // console.log(response)
            //setCurrentUser(user);
            resetFormFields()
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                alert('incorrect password for email');
                break
                case 'auth/user-not-found':
                alert('no user associated with this email');
                break
                default:
                    console.log(error)
            }
        }
    }
    const signInWithGoogle = async () =>{
        const {user} =  await singnInWithGooglePopup();
        //setCurrentUser(user)
        await createUserDocumentFromAuth(user);
        
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value})
    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <h1>Sign in with your email and password</h1>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type = "email"
                    onChange={handleChange}
                    required
                    value={email}
                    name="email"
                />

                <FormInput
                    label="Password"
                    type = "password"
                    onChange={handleChange}
                    required
                    value={password}
                    name="password"
                />
                <div className="buttons-container">
                <Button type='submit' onClick={handleSubmit}>Sign In</Button>
                <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm; 