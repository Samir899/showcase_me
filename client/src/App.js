import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import { getUser, isLoggedInUserCustomer } from "./util/localStorage";
import Notification from "./components/Alert/Notification";
const ProtectedUserRoute = ({ children }) => {
    const user = getUser();
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (!isLoggedInUserCustomer()) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return children;
};
const App = () => {
    const [alert, setAlert] = useState(null);
    return (_jsxs(Router, { children: [_jsx(NavBar, {}), _jsx(Notification, { alert: alert, setAlert: setAlert }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx("div", { children: "Home Page" }) }), _jsx(Route, { path: "/about", element: _jsx("div", { children: "About Page" }) }), _jsx(Route, { path: "/contact", element: _jsx("div", { children: "Contact Page" }) }), _jsx(Route, { path: "/login", element: _jsx(Login, { setAlert: setAlert }) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedUserRoute, { children: _jsx(Dashboard, {}) }) })] })] }));
};
export default App;
