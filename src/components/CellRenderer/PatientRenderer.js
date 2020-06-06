import React from 'react';
import AgProvider from 'Containers/AgProvider';
import { useHistory } from "react-router-dom";

export const PatientRenderer = (item) => {
    const { data } = item;
    let history = useHistory();
    function handleClick() {
        history.push(`/patients/${data.id}`);
    }
    return (
        <AgProvider>
            <div className="text--link-sm" onClick={handleClick}>
               {item.value}
            </div>
        </AgProvider>
    );
};

export default PatientRenderer;
