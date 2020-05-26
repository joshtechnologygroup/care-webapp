import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'Screens/Home';
import LoginPage from 'Screens/LoginPage';
import ContactPage from 'Screens/ContactPage';
import ForgotPasswordPage from 'Screens/ForgotPasswordPage';
import ResetPasswordPage from 'Screens/ResetPasswordPage';
import ProtectedRoute from 'Components/ProtectedRoute'

require('dotenv').config()

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/reset-password/:user_id/:token" component={ResetPasswordPage} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
