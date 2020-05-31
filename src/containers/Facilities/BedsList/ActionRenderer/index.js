import React from 'react';
import AgProvider from 'Containers/AgProvider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import BedsForm from 'Containers/BedsForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const ActionRenderer = (item) => {
  console.log(item);
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
      <BedsForm data={data} open={open} onClose={handleClose} />
    </AgProvider>
  );
};

const mapStateToProps = (state) => ({
  inventoryList:state.inventory.inventory,
  count:state.inventory.count
});

ActionRenderer.propTypes = {
  inventoryList: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, null)(ActionRenderer);

