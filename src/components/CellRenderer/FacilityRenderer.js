import React from 'react';
import AgProvider from 'Containers/AgProvider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom";

export const FacilityRenderer = (item) => {
  const { data } = item;

  let history = useHistory();
  function handleClick() {
    history.push(`/facilities/facility-details/${data.id}`);
  }
  return (
    <AgProvider>
      <IconButton aria-label="delete" onClick={handleClick}>
        <div>
          {item.value}
        </div>
        &nbsp;
        <EditIcon color="primary" fontSize="small" />
      </IconButton>
    </AgProvider>
  );
};

export default FacilityRenderer;
