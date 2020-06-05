import React, {Component} from 'react';
import {useTranslation, withTranslation} from 'react-i18next';
import Header from 'Containers/Header';
import Grid from "@material-ui/core/Grid";
import DoctorAttendantList from 'Containers/Facilities/DoctorAttendantList';
import DoctorAttendantForm from 'Containers/Facilities/DoctorAttendantList/DoctorAttendantForm';
import Button from "@material-ui/core/Button";
import {ListAlt} from "@material-ui/icons";

export const DoctorAttendant = () => {

    const [open, setOpen] = React.useState(false);
    const {i18n} = useTranslation();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      direction="column"
      className="outer-container"
    >
      <div className="primary-bg-light">
        <Header>
          <h2>{i18n.t('Doctor / Attendant')}</h2>
          <div className="ml-auto">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => handleClick()}
              startIcon={<ListAlt/>}
            >
              {i18n.t('ADD NEW DOCTORS/ATTENDANT')}
            </Button>
          </div>
        </Header>
        <div className="main-container">
          <DoctorAttendantList/>
        </div>
          <DoctorAttendantForm open={open} onClose={handleClose} updateOperation={false} />
      </div>
    </Grid>
  );
}

export default withTranslation()(DoctorAttendant);
