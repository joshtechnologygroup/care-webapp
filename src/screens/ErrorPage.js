import React, { Component } from 'react';
import i18n from "i18next";

class ErrorPage extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Error Page')} - {this.props.type}</h2>
            </div>
        );
    }
}

export default ErrorPage;
