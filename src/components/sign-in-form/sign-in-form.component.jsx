import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utls";
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
            
        }catch(error){
            
        }
    }

    const handleChange = (event) => {
        console.log(event)
        const {name, value} = event.target;
        console.log({...formFields,[name]:value})
        setFormFields({...formFields,[name]:value})
    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <h1>Sign up with you email and password</h1>
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
                <Button type='submit'>Sign In</Button>
            </form>
        </div>
    )
}

export default SignInForm; 