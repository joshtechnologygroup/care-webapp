import React from 'react';
import './CellRenderer.scss';

const OperationStatusRenderer = ({ value }) => {

    const getColorClass = () => {
        switch (value) {
            case 'yes': return 'dot-green';
            case 'no': return 'dot-grey';
            default: return;
        }
    }

    return (
        <div className="renderer-container">
            <div className={`renderer-container__dot renderer-container__${getColorClass()}`}></div>
        </div>
    );
};

export default OperationStatusRenderer;
