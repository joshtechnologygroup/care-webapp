import React from "react";
import AgProvider from "Containers/AgProvider";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TransferUpdateForm from "Containers/TransferUpdateForm";
import * as ToastUtils from 'Src/utils/toast';
import { createToastNotification } from 'Actions/ToastAction';
import { SUCCESS } from "Src/constants";
import { connect } from 'react-redux';

export const ActionRenderer = item => {
    const { data, addToastNotification } = item;
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showSuccessToast = () => {
        addToastNotification(ToastUtils.toastDict(1, "Updated", "Status Successfully updated ", SUCCESS)) 
    };

    return (
        <React.Fragment>
            <AgProvider>
                <div className="ag-cell-icon-wrap">
                    <IconButton aria-label="delete" onClick={handleClick}>
                        <EditIcon color="primary" />
                    </IconButton>
                </div>
                <TransferUpdateForm
                    rowData={data}
                    open={open}
                    index={item.rowIndex}
                    onClose={handleClose}
                    showSuccessToast={showSuccessToast}
                />
            </AgProvider>
        </React.Fragment>
    );
};


const mapDispatchToProps = dispatch => {
    return {
        addToastNotification: (data) => { dispatch(createToastNotification(data)) }
    };
};

export default connect(null, mapDispatchToProps)(ActionRenderer);
