import React, { Component } from 'react';
import i18n from "i18next";
import Loader from 'Components/Loader'
import Snackbars from 'Components/Snackbars'

class Profile extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Profile')}</h2>
                <Loader />
                <Snackbars open={true} severity="error" message="Error occured!" />
            </div>
        );
    }
}

export default Profile;
