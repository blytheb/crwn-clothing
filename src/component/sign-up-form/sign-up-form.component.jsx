import { useState } from 'react';

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

    console.log(formFields);

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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayName'
                    value={displayName}
                />
        
                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email'
                    value={email}
                />
                
                <label>Password</label>
                <input 
                    type="password"
                    required 
                    onChange={handleChange} 
                    name='password'
                    value={password}
                />
                
                <label>Confirm Password</label>
                <input 
                    type="password"
                    required 
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
            
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}
export default SignUpForm;