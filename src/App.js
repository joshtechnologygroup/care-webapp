import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'Screens/Home';
import Login from 'Screens/Login';
import enLang from './assets/i18n/en.json';
import hnLang from './assets/i18n/hn.json';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

require('dotenv').config()

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enLang
      },
      hn: {
         translation: hnLang
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
