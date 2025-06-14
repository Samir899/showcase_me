import React, {JSX, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login'
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import {getUser, isLoggedInUserCustomer} from "./util/localStorage";
import Notification from "./components/Alert/Notification";

const ProtectedUserRoute: React.FC<{children: JSX.Element}> = ({ children}) => {
    const user = getUser();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if(!isLoggedInUserCustomer()) {
        return <Navigate to="/login" replace/>
    }
    return children;
}
const App: React.FC = () => {
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    return (
      <Router>
        <NavBar/>
          <Notification alert={alert} setAlert={setAlert}/>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/login"  element={<Login setAlert={setAlert}/>}/>
          <Route path="/signup" element={<Signup />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedUserRoute>
                        <Dashboard />
                    </ProtectedUserRoute>
                }
            />
        </Routes>
      </Router>
  );
};

export default App;
