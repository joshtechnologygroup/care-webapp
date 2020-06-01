import React from 'react';
import AgProvider from 'Containers/AgProvider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TransferUpdateForm from 'Containers/TransferUpdateForm';

export const ActionRenderer = (item) => {
  const { data } = item;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <AgProvider>
      <div className="ag-cell-icon-wrap">
        <IconButton aria-label="delete" onClick={handleClick}>
          <EditIcon color="primary" />
        </IconButton>
      </div>
      <TransferUpdateForm rowData={data} open={open} index={item.rowIndex} onClose={handleClose} />
    </AgProvider>
  );
};

export default ActionRenderer;

