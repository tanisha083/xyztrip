import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './SignUp.css';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // Email and password sign-up handler
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Successful sign-up, user will be automatically redirected
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An unexpected error occurred');
            }
        }
    };
    // Google sign-up handler
    const handleGoogleSignUp = async () => {
        try {
            await signInWithPopup(auth, provider);
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An unexpected error occurred');
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: "auth-container", children: [_jsx("h2", { children: "Sign Up" }), _jsxs("form", { onSubmit: handleSignUp, children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password" }), _jsx("button", { type: "submit", children: "Sign Up" }), error && _jsx("p", { className: "error-message", children: error })] }), _jsx("button", { onClick: handleGoogleSignUp, children: "Sign Up with Google" })] }), _jsx(Footer, {})] }));
};
export default SignUp;
