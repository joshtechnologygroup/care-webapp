import React from 'react';
import './styles.scss';

const FacilityTypeRenderer = (item) => {
    const { value } = item;

    const getColorClass = () => {
        switch (value) {
            case 'PMC': return 'dot-orange';
            default: return '';
        }
    }

    return (
        <div className="facility-container">
            <div className={`dot ${getColorClass()}`}></div>
            <div>{value}</div>
        </div>
    );
};

export default FacilityTypeRenderer;
