import React, { Component } from 'react';
import i18n from "i18next";
import Snackbars from 'Components/Snackbars'

class Profile extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Profile')}</h2>
                <Snackbars open={true} severity="error" message="Error occured!" />
            </div>
        );
    }
}

export default Profile;
