import React from 'react';
import { Close, Cached } from '@material-ui/icons';
import './styles.scss';

const OwnerRenderer = ({ value }) => {
    let icon = '';

    const getValue = () => {
        switch (value) {
            case 'Pvt': icon = null; return 'Pvt';
            case 'Govt': icon = null; return 'Govt';
            case 'PvtCross': icon = <Close className="icon" fontSize="small" />; return 'Pvt';
            case 'PvtRefresh': icon = <Cached className="icon" fontSize="small" />; return 'Pvt';
            case 'GovtCross': icon = <Close className="icon" fontSize="small" />; return 'Govt';
            case 'GovtRefresh': icon = <Cached className="icon" fontSize="small" />; return 'Govt';
            default: return '';
        }
    }

    return (
        <div className="facility-container">
            <div>{getValue()}</div>
            {icon}
        </div>
    );
};

export default OwnerRenderer;
