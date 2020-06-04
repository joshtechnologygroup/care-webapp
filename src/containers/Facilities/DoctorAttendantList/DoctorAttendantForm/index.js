import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {PATCH, POST} from 'Src/constants'
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import {useTranslation} from "react-i18next";
import {regex} from 'Constants/app.const';
import {Formik} from 'formik';
import Form from './form';
import useStyles from './styles';
import {updateCreateStaffList} from 'Actions/FacilityStaffAction';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {FACILITY_STAFF_UPDATE_URL, FACILITY_STAFF_CREATE_URL} from 'Src/routes';
import * as StringUtils from 'Src/utils/stringformatting';

export const DoctorAttendantForm = (props) => {
  const classes = useStyles();
  const [isAddAnother, setIsAddAnother] = useState(false);
  const [error, setError] = useState(false)
  const {open, data, onClose, updateOperation} = props;
  const [errors, setErrors] = useState({
    name: true,
    phone_number: true,
    email: true,
    form: ''
  });
  const [errorString, setErrorString] = useState({name: [""], phone_number: [""], email: [""], detail: ""});
  const [updatedData, setUpdateData] = useState({
    name: (updateOperation) ? data.name : null,
    phone_number: (updateOperation) ? data.phone_number : null,
    email: (updateOperation) ? data.email : null
  });
  const [designation, setDesignation] = useState([]);
  const [facility, setFacility] = useState([]);
  const addAnother = (event) => {
    setIsAddAnother(event.target.checked)
  };

  useEffect(() => {
    const {designationList, facilityList} = props
    let update_designation_list = [], update_facility_list = [];
    if (updateOperation && designationList) {
      update_facility_list.push({label: data.facility});
      designationList.forEach((row) => update_designation_list.push({value: row.id, label: row.name}))
      setUpdateData((prevState) => ({
        ...prevState,
        designation: update_designation_list[0].value,
      }));
      setErrors(prevState => ({
        ...prevState,
        name: false,
        phone_number: false,
        email: false,
      }))
    } else if (designationList && facilityList) {
      facilityList.forEach((row) => update_facility_list.push({value: row.id, label: row.name}))
      designationList.forEach((row) => update_designation_list.push({value: row.id, label: row.name}))
      setUpdateData((prevState) => ({
        ...prevState,
        facility: update_facility_list[0].value,
        designation: update_designation_list[0].value,
      }));
    }
    setDesignation(update_designation_list);
    setFacility(update_facility_list);
  }, [props.designationList, props.facilityList])

  const updateFacilityStaff = async () => {
    let url = updateOperation ? StringUtils.formatVarString(FACILITY_STAFF_UPDATE_URL, [data.id]) : FACILITY_STAFF_CREATE_URL;
    const response = await props.updateCreateStaffList(url, updatedData, (updateOperation) ? PATCH : POST);
    if (response.status) {
      if (!isAddAnother) {
        onClose();
      }
    } else {
      setError(true);
      delete response['status'];
      setErrorString(prevState => ({...prevState, ...response}));
    }
  };

  const handleChange = (name, e) => {
    updatedData[name] = e;
    if (typeof e !== 'object') {
      switch (name) {
        case 'email':
          errors[name] = !(regex.email).test(e);
          break;
        case 'phone_number':
          errors[name] = !(regex.phone_number).test(e);
          break;
        default:
          errors[name] = !Boolean(e);
      }
    }

    setUpdateData(prevState => ({
      ...prevState,
      ...updatedData
    }));
    setErrors(prevState => ({
      ...prevState,
      ...errors
    }))
  };

  const {i18n} = useTranslation();

  return (
    <CustomModal open={open} onClose={onClose} title={i18n.t('Doctor/Attendant')}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Formik>
            {
              props => <Form
                {...props}
                data={data}
                handleChange={handleChange}
                updateOperation={updateOperation}
                designation={designation}
                facility={facility}
                errorString={errorString}/>
            }
          </Formik>
        </Grid>
        <Grid item xs={12}>
          { error &&
            <FormControl component="fieldset" error={true}>
              <FormHelperText className={classes.error}>{errors.detail}</FormHelperText>
            </FormControl>
          }
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
            onClick={updateFacilityStaff}
            disabled={
              errors.name ||
              errors.phone_number ||
              errors.email
            }
          >
            {i18n.t('Ok')}
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
}


const mapStateToProps = (state) => ({
  designationList: state.staffDesignation.results,
  facilityList: state.shortFacilities.results
});

DoctorAttendantForm.propTypes = {
  updateCreateStaffList: PropTypes.func,
  facilityList: PropTypes.array,
  designationList: PropTypes.array
};

export default connect(mapStateToProps, {updateCreateStaffList})(DoctorAttendantForm);
