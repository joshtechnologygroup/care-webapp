import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import {useTranslation} from "react-i18next";
import {Formik} from 'formik';
import Form from './form';
import useStyles from './styles';
import {createUpdateFacilityInfrastructure} from 'Actions/BedsListAction';
import {PropTypes} from 'prop-types';
import {FACILITY_INFRASTRUCTURE_UPDATE_URL, FACILITY_INFRASTRUCTURE_LIST_URL} from 'Src/routes';
import {connect} from 'react-redux';
import * as StringUtil from 'Src/utils/stringformatting';
import {createToastNotification} from 'Actions/ToastAction';
import {SUCCESS, DANGER} from "Src/constants";
import * as ToastUtils from 'Src/utils/toast';

export const BedsForm = (props) => {
  const classes = useStyles();
  const [isAddAnother, setIsAddAnother] = useState(false);
  const [error, setError] = useState(false);
  const {open, data, onClose} = props;
  const [errors, setErrors] = useState({total_beds: true, occupied_beds: true, available_bed: true, form: ''})
  const [updatedData, setUpdateData] = useState({
    total_bed: data.total_bed,
    occupied_bed: data.occupied_bed,
    available_bed: data.available_bed
  });
  const addAnother = (event) => {
    setIsAddAnother(event.target.checked)
  }

  const updateFacilityInfrastructure = async () => {
    const {createUpdateFacilityInfrastructure, createToastNotification} = props;
    const response = await createUpdateFacilityInfrastructure(updatedData, StringUtil.formatVarString(FACILITY_INFRASTRUCTURE_UPDATE_URL, [data.id]), 'PATCH')
    if (response.status) {
      try{
        delete response.status
        let errorMessage = '';
        Object.keys(response).forEach((key) => errorMessage += response[key].reduce((total, value, index, array) => total + value));
        props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Error", errorMessage, DANGER));
      } catch (e) {
        props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Error", "An Error Has Occurred.", DANGER));
      }
    } else {
      createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Updated", "Successfully updated ", SUCCESS))
    }
  }
  const handleChange = (name, e) => {
    switch (name) {
      case 'total_beds':
        setUpdateData({...updatedData, 'total_bed': e ? parseInt(e) : data.total_bed})
        errors.total_beds = !(e && (parseInt(e) >= 0));
        break;
      case 'occupied_beds':
        setUpdateData({...updatedData, 'occupied_bed': e ? parseInt(e) : data.occupied_bed})
        errors.occupied_beds = !(e && (parseInt(e) >= 0));
        break;
      case 'available_bed':
        setUpdateData({...updatedData, 'available_bed': e ? parseInt(e) : data.available_bed})
        errors.available_bed = !(e && (parseInt(e) >= 0));
        break;
      default:
        break;
    }
    setErrors(prevState => ({
      ...prevState,
      ...errors
    }))
  }

  const {i18n} = useTranslation();

  return (
    <CustomModal open={open} onClose={onClose} title={i18n.t('Beds')}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Formik>
            {
              props => <Form  {...props} data={data} handleChange={handleChange}/>
            }
          </Formik>
        </Grid>
        <Grid item xs={12}>
          {!data &&
          <FormControlLabel
            value="end"
            control={<Switch checked={isAddAnother} onChange={addAnother} color="primary"/>}
            label="Add Another"
            labelPlacement="end"
          />
          }
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="medium"
            onClick={updateFacilityInfrastructure}
            disabled={errors.total_beds && errors.occupied_beds && errors.available_bed}
          >
            {i18n.t('Ok')}
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
}


const mapStateToProps = (state) => ({});

BedsForm.propTypes = {
  createUpdateFacilityInfrastructure: PropTypes.func.isRequired,
  createToastNotification: PropTypes.func
};

export default connect(mapStateToProps, {createUpdateFacilityInfrastructure, createToastNotification})(BedsForm);
