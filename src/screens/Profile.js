import React, { Component } from 'react';
import i18n from "i18next";

class Profile extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Profile')}</h2>
            </div>
        );
    }
}

export default Profile;
