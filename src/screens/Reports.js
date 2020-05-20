import React, { Component } from 'react';
import i18n from "i18next";

class Reports extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Reports')}</h2>
            </div>
        );
    }
}

export default Reports;
