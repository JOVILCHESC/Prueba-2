// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavBar';
import { UserProvider } from './helpers/UserContext';
import { AuthorizationProvider } from './helpers/AuthorizationContext';
import RegisterForm from './components/Register';
import Home from './screens/Home';
import LoginForm from './components/Login';
import UserProfile from './screens/UserProfile';
import CheckToken from './helpers/CheckToken';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <AuthorizationProvider>
            <NavbarComponent />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/user-home" element={<UserProfile />} />
              </Routes>
            </div>
            <CheckToken />
          </AuthorizationProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
