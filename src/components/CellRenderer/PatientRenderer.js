import React from 'react';
import AgProvider from 'Containers/AgProvider';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";

export const PatientRenderer = (item) => {
    const { data } = item;

    let history = useHistory();
    function handleClick() {
        history.push(`/patients/${data.id}`);
    }
    return (
        <AgProvider>
            <div aria-label="delete" onClick={handleClick}>
               {item.value}
                &nbsp;
            </div>
        </AgProvider>
    );
};

export default PatientRenderer;
