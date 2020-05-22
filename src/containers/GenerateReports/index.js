import React from 'react';

import CustomModal from 'Components/CustomModal';

export const GenerateReports = (props) => {
    const { open, onClose } = props;

    return (
        <CustomModal open={open} onClose={onClose} title="Generate Reports">
            <div>header</div>
            <div>body</div>
            <div>footer</div>
        </CustomModal>
    );
}

export default GenerateReports;
