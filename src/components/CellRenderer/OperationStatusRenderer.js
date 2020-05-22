import React from 'react';
import './styles.scss';

const OperationStatusRenderer = ({ value }) => {

    const getColorClass = () => {
        switch (value) {
            case 'yes': return 'dot-green';
            case 'no': return 'dot-grey';
            default: return;
        }
    }

    return (
        <div className="facility-container">
            <div className={`dot ${getColorClass()}`}></div>
        </div>
    );
};

export default OperationStatusRenderer;
