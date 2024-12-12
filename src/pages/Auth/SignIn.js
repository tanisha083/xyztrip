import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './SignIn.css';
const SignIn = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // const handleSignIn = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   try {
    //     await signInWithEmailAndPassword(auth, email, password);
    //     // Successful sign-in, user will be automatically redirected
    //   } catch (err) {
    //     if (err instanceof Error) {
    //       setError(err.message);
    //     } else {
    //       setError('An unexpected error occurred');
    //     }
    //   }
    // };
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        }
        catch (err) {
            console.error(err);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: "auth-container", children: [_jsx("h2", { children: "Sign In" }), _jsx("button", { onClick: handleGoogleSignIn, children: "Sign In with Google" })] }), _jsx(Footer, {})] }));
};
export default SignIn;
