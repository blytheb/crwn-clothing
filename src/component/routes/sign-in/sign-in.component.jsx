import { signInWithGooglePopup } from '../../../utility/firebase/firebase.utility';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }
    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}> Sign in with google pop up</button>
        </div>
    ); 
};

export default SignIn;