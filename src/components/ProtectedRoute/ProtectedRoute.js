import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (!user) {
        return _jsx(Navigate, { to: "/sign-in" });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
