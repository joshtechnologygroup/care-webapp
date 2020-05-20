import React, { Component } from 'react';
import i18n from "i18next";

class Fecilities extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Fecilities')}</h2>
            </div>
        );
    }
}

export default Fecilities;
