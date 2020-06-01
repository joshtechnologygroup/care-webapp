import React from 'react';
import AgProvider from 'Containers/AgProvider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from "react-router-dom";

export const PatientRenderer = (item) => {
  const { data } = item;
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
   setOpen(true)
  }

  if(open === true){
    return <Redirect to={`/patients/${data.id}`} />;
  }
  
  return (
    <AgProvider>
      <div className="ag-cell-icon-wrap">
        <IconButton aria-label="delete" onClick={handleClick}>
            <div>
            {item.value}
            </div>
            &nbsp;
        <EditIcon color="primary" font-size="small"/>
        </IconButton>
      </div>
    </AgProvider>
  );
};


export default PatientRenderer;
