import { useState } from 'react';
import './sign-up-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utility/firebase/firebase.utility';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetForFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //confirm pass matches, auth with email/pass,
        if (password !== confirmPassword) {
            alert ("passwords do not match");
            return;
        }

        try {
            const { user } = createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth( user , {displayName});
            resetForFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use"){
                alert('cannot create user, email already in use')
            } else{
                console.log('user creation encountered an error', error);

            }
        }

    }   

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayName'
                    value={displayName}
                />
        
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email'
                    value={email}
                />
                
                <FormInput 
                    label="Password"
                    type="password"
                    required 
                    onChange={handleChange} 
                    name='password'
                    value={password}
                />
                
                <FormInput 
                    label="Confirm Password"
                    type="password"
                    required 
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
            
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    );
}
export default SignUpForm;