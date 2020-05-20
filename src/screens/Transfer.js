import React, { Component } from 'react';
import i18n from "i18next";

class Transfer extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Transfer')}</h2>
            </div>
        );
    }
}

export default Transfer;
