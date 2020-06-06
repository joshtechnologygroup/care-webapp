import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Header from 'Containers/Header';
import { useTranslation } from "react-i18next";

import InventoryList from 'Containers/InventoryList';
import InventoryForm from 'Containers/InventoryForm';
import {ListAlt} from '@material-ui/icons';
import { Search } from 'Components/Inputs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
export function Inventory(props){

    const [open, setOpen] = React.useState(false);
    const [val, setVal] = React.useState("");
    const [error, setError] = React.useState(false);
    const handleSearch = (value) =>{
        setVal(value);
    }

    const onClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setError(false);
      };

    useEffect(() => {
        if(props.error){
            setError(true);
        }
     }, [props.error]);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const { i18n } = useTranslation();

    return (
        <Grid
            container
            direction="column"
            className="outer-container"
        >
            <div className="primary-bg-light">
                <Header>
                <div className="header-container__search-container">
              <Search searchPlaceholder={i18n.t('search.placeholder.inventory')} handleSearch={handleSearch} />
            </div>
                    <div className="ml-auto">
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={handleClick}
                            startIcon={<ListAlt />}
                        >
                            {i18n.t('ADD NEW INVENTORY')}
                    </Button>
                    </div>
                </Header>
                <div className="main-container">
                    <InventoryList value={val}/>
                </div>
                <InventoryForm open={open} onClose={handleClose} />
            </div>
        </Grid>
    );
}


InventoryList.defaultProps = {
    error:null,
};  

const mapStateToProps = (state) => ({
    error: state.createInventory.error,
});

Inventory.propTypes = {
    error: PropTypes.string.isRequired,
};
  
export default connect(mapStateToProps, null)(Inventory);
  