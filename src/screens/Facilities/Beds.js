import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from 'Containers/Header';
import BedsList from 'Containers/Facilities/BedsList';
// import {Search} from 'Components/Inputs';
import BedsWardsForm from 'Containers/BedsWardsForm';
import Button from "@material-ui/core/Button";
import {ListAlt} from "@material-ui/icons";
import {useTranslation} from "react-i18next";

export const Beds = () => {
  const [open, setOpen] = React.useState(false);
  const {i18n} = useTranslation();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Grid
      container
      direction="column"
      className="outer-container"
    >
      <div className="primary-bg-light">
        <Header>
          {/*<div className="header-container__search-container">*/}
          {/*  <Search searchPlaceholder={i18n.t('search.placeholder.inventory')} handleSearch={handleSearch}/>*/}
          {/*</div>*/}
          <div className="ml-auto">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleClick}
              startIcon={<ListAlt/>}
            >
              {i18n.t('ADD NEW BEDS/WARDS')}
            </Button>
          </div>
        </Header>
        <div className="main-container">
          <BedsList/>
        </div>
        <BedsWardsForm open={open} onClose={handleClose}/>
      </div>
    </Grid>
  );
}

export default Beds;

