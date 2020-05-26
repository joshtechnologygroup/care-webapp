import React from 'react';
import AgProvider from 'Containers/AgProvider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import InventoryForm from 'Containers/InventoryForm';

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
      <InventoryForm data={data} open={open} onClose={handleClose} />
    </AgProvider>
  );
};

export default ActionRenderer;
