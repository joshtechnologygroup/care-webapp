import React, { Component } from 'react';
import i18n from "i18next";

class Inventory extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Inventory')}</h2>
            </div>
        );
    }
}

export default Inventory;
