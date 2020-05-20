import React, { Component } from 'react';
import i18n from "i18next";

class Login extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Login')}</h2>
            </div>
        );
    }
}

export default Login;