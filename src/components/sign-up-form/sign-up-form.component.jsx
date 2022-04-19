import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utls";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    
    // const {setCurrentUser} = useContext(UserContext)

    // console.log(val)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password does not match")
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
                );
                // setCurrentUser(user);
                await createUserDocumentFromAuth(user,{displayName});
                resetFormFields()
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user email already in use')
            } else {
                console.log('User creation encoutered error',error)
            }
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
            <h2>Don't have an account?</h2>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
    
                <FormInput
                    label="Display Name"
                    type = "text"
                    onChange={handleChange}
                    required
                    value={displayName}
                    name="displayName"
                />

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

                <FormInput
                    label="Confirm Password"
                    type = "password"
                    onChange={handleChange}
                    required
                    value={confirmPassword}
                    name="confirmPassword"
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm; 