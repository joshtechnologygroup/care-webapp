import React from 'react';

import './CellRenderer.scss';

const FacilityTypeRenderer = (item) => {
    const { value } = item;

    const getColorClass = () => {
        switch (value) {
            case 'PMC': return 'dot-orange';
            default: return '';
        }
    }

    return (
        <div className="renderer-container">
            <div className={`renderer-container__dot renderer-container__${getColorClass()}`}></div>
            <div>{value}</div>
        </div>
    );
};

export default FacilityTypeRenderer;
