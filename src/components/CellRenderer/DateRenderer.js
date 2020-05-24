import React from 'react';
import moment from 'moment';
import './CellRenderer.scss';

const DateRenderer = ({ value }) => {
    return (
        <div className="renderer-container">
            {moment.unix(value).format('HH:MM')} | {moment.unix(value).format('DD-MMM-YYYY')}
        </div>
    );
};

export default DateRenderer;
