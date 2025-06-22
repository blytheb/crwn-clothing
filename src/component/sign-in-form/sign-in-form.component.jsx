import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../context/user.context';

import { signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utility/firebase/firebase.utility';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetForFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };   

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            setCurrentUser(user);
            
            resetForFields();
        } catch (error) {
            switch(error.code){
                case 'auth/invalid-credential':
                    alert('incorrect email/password');
                    break;
                default:
                    console.log(error);
            }
        }

    }   

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-up-container'>
            <h2>Welcome Back</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

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

            <div className='buttons-container'>                
                <Button type="submit">Sign In</Button>
                <Button type='button' buttontype='google' onClick={signInWithGoogle}>Google sign in</Button>
            </div>
            </form>
        </div>
    );
}
export default SignInForm;