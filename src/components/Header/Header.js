import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const { user } = useAuth();
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
            navigate('/');
        })
            .catch((error) => {
            console.error('Sign-out error:', error);
        });
    };
    return (_jsx("header", { className: "font-poppins bg-gray-100", children: _jsxs("div", { className: "max-w-screen-lg mx-auto py-4 px-4 sm:px-8 flex items-center justify-between", children: [_jsx("div", { className: "logo mr-4", children: _jsx("a", { href: "/", className: "text-2xl md:text-3xl font-bold text-gray-800 hover:text-[#FF5733] transition-colors", children: "TripTailor" }) }), _jsxs("nav", { className: `${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-20 md:top-0 right-4 md:right-0 
          flex-col md:flex-row bg-gray-100 md:bg-transparent
          w-48 md:w-auto p-4 md:p-0 rounded-lg md:rounded-none
          shadow-lg md:shadow-none z-50 md:z-auto
          space-y-2 md:space-y-0 md:space-x-2`, onClick: () => setMenuOpen(false), children: [_jsx("a", { href: "/", className: "px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors", children: "Home" }), _jsx("a", { href: "/about", className: "px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors", children: "About" }), _jsx("a", { href: "/how-it-works", className: "px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors", children: "How It Works" }), _jsx("a", { href: "/contact", className: "px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors", children: "Contact" }), user && (_jsx("a", { href: "/profile", className: "px-4 py-2 text-gray-600 hover:text-[#FF5733] hover:bg-gray-200 rounded transition-colors", children: "Profile" }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { className: "md:hidden h-[38px] aspect-square flex items-center justify-center \n              bg-gray-200 text-gray-600 hover:bg-gray-300 rounded \n              transition-colors", onClick: toggleMenu, "aria-label": "Toggle menu", children: "\u2630" }), user ? (_jsx("button", { onClick: handleSignOut, className: "h-[40px] px-6 ml-4 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded\n                transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5\n                focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50 flex items-center justify-center", children: "Sign Out" })) : (_jsx(Link, { to: "/sign-in", className: "ml-4", children: _jsxs("button", { className: "h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded\n                  transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5\n                  focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50 flex items-center justify-center", children: [_jsx("span", { className: "block md:hidden", children: "Sign Up" }), _jsx("span", { className: "hidden md:block", children: "Sign In / Sign Up" })] }) }))] })] }) }));
};
export default Header;
