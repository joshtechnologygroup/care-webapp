import React, { Component } from 'react';
import i18n from "i18next";

class Settings extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Settings')}</h2>
            </div>
        );
    }
}

export default Settings;
