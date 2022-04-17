import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, singnInWithGooglePopup,createUserDocumentFromAuth, signInAuthUserWIthEmailAndPassword } from "../../utils/firebase/firebase.utls";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";
const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        try{
            const response = await signInAuthUserWIthEmailAndPassword(email,password);
            console.log(response)
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
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm; 