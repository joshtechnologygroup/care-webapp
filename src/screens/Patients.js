import React, { useEffect, useState } from 'react';
import i18n from "i18next";
import { Grid } from '@material-ui/core';
import Header from 'Containers/Header';
import PatientsList from 'Containers/PatientsList';
import { Search } from 'Components/Inputs';
import { getPatientList } from 'Actions/PatientsAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Patients(props){
    const [ isLoading, setIsLoading ] = useState(true);
    const [ data, setData ] = useState({patients: []})
    useEffect(() => {
        handleApiCall();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ]);

    const handleApiCall = async () => {
        const data = await props.getPatientList(1);
        setData({...data});
        setIsLoading(false);
    }
    return (
        <Grid
            container
            direction="column"
            className="outer-container"
        >
            <div className="primary-bg-light">
                <Header>
                    <div className="header-container__search-container">
                        <Search searchPlaceholder={i18n.t('search.placeholder.patients')} />
                    </div>
                </Header>
                <div className="table-container">
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && <PatientsList data={data}/>}
                </div>
            </div>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
});

PatientsList.propTypes = {
  getPatientList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPatientList })(Patients);
