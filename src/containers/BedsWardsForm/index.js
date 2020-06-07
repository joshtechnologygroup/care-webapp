import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import {useTranslation} from "react-i18next";
import {FACILITY_INFRASTRUCTURE_CREATE_URL} from 'Src/routes';
import {POST} from 'Src/constants'
import {createUpdateFacilityInfrastructure} from 'Actions/BedsListAction'
import {Formik} from 'formik';
import Form from './form';
import useStyles from './styles';
import * as Constants from 'Src/constants'
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createToastNotification} from 'Actions/ToastAction';
import {SUCCESS, DANGER} from "Src/constants";
import * as ToastUtils from 'Src/utils/toast';

export const BedsWardsForm = (props) => {
  const classes = useStyles();
  const [inventoryData, setInventoryData] = useState({});
  const [facilityOptions, setFacilityOptions] = useState([])
  const [roomOptions, setRoomOptions] = useState([])
  const [bedOptions, setBedOptions] = useState([])
  const [isAddAnother, setIsAddAnother] = useState(false);
  const [error, setError] = useState({status: false})
  const {open, data, onClose} = props;
  const [errors, setErrors] = useState({
    facility: true,
    room_type: true,
    bed_type: true,
    total_bed: true,
    occupied_bed: true,
    available_bed: true
  });
  const [selectedData, setSelectedData] = useState({
    facility: null,
    room_type: null,
    bed_type: null,
    total_bed: "",
    occupied_bed: "",
    available_bed: ""
  });


  const addAnother = (event) => {
    setIsAddAnother(event.target.checked)
  }

  useEffect(() => {
    const {facilities, roomTypes, bedTypes, userType, associatedFacilities} = props
    if (facilities && roomTypes && bedTypes && userType && associatedFacilities && userType) {
      let update_facility = [];
      if (userType === Constants.FACILITY_MANAGER && associatedFacilities) {
        update_facility = associatedFacilities.map((id) => {
          const facility = facilities.find((value, index, array) => value.id === id);
          return {'value': facility.id, 'label': facility.name}
        });
      } else {
        facilities.forEach((row) => {
          update_facility.push({'value': row.id, 'label': row.name});
        });
      }
      let update_roomtype = [];
      roomTypes.forEach((row) => {
        update_roomtype.push({'value': row.id, 'label': row.name});
      });
      let update_bedtype = [];
      bedTypes.forEach((row) => {
        update_bedtype.push({'value': row.id, 'label': row.name});
      });
      setSelectedData({
        ...selectedData,
        facility: update_facility[0].value,
        room_type: update_bedtype[0].value,
        bed_type: update_roomtype[0].value,
        total_bed: "",
        occupied_bed: "",
        available_bed: ""
      })
      setErrors({...errors, facility: false, room_type: false, bed_type: false});
      setFacilityOptions(update_facility);
      setBedOptions(update_bedtype);
      setRoomOptions(update_roomtype);
    }
  }, [
    props.facilities,
    props.bedTypes,
    props.roomTypes,
    props.associatedFacilities,
    props.userType
  ]);

  const handleChange = (name, e) => {
    if ((typeof e) === 'object') {
      selectedData[name] = e.value;
    } else {
      selectedData[name] = e;
      errors[name] = !(e && parseInt(e) >= 0);
    }
    setSelectedData(prevState => ({
      ...prevState, ...selectedData
    }));
    setErrors(prevState => ({
      ...prevState,
      ...errors
    }))
  }

  const {i18n} = useTranslation();

  const handleSubmit = async () => {
    const response = await props.createUpdateFacilityInfrastructure(selectedData, FACILITY_INFRASTRUCTURE_CREATE_URL, POST);
    if (!response.status) {
      setError({...response});
      props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Error", "Some Error Occurs ", DANGER));
    } else {
      props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Created", "Successfully Added ", SUCCESS));
      if (!isAddAnother) {
        onClose();
      }
      setSelectedData(prevState => ({...prevState, total_bed: "", occupied_bed: "", available_bed: ""}));
      setErrors(prevState => ({...prevState, total_bed: true, occupied_bed: true, available_bed: true}));
    }
  };

  return (
    <CustomModal open={open} onClose={onClose} title={i18n.t('Add new Beds/Wards')}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Formik>
            {
              props =>
                <Form
                  data={selectedData}
                  {...props}
                  handleChange={handleChange}
                  facilityOptions={facilityOptions}
                  roomOptions={roomOptions}
                  bedOptions={bedOptions}/>
            }
          </Formik>
        </Grid>
        <Grid item xs={12}>
          {
            error.status &&
            <FormControl component="fieldset" error={true}>
              <FormHelperText className={classes.error}>{error.detail}</FormHelperText>
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
            onClick={handleSubmit}
            disabled={
              errors.facility ||
              errors.room_type ||
              errors.available_bed ||
              errors.total_bed ||
              errors.occupied_bed ||
              errors.available_bed
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
  facilities: state.shortFacilities.results,
  roomTypes: state.roomType.results,
  bedTypes: state.bedType.results,
  userType: state.profile.user_type,
  associatedFacilities: state.profile.associated_facilities,
});

BedsWardsForm.propTypes = {
  userType: PropTypes.number,
  associatedFacilities: PropTypes.array,
  facilities: PropTypes.array,
  roomTypes: PropTypes.array,
  bedTypes: PropTypes.array,
  createUpdateFacilityInfrastructure: PropTypes.func,
  createToastNotification: PropTypes.func
};

export default connect(mapStateToProps, {createUpdateFacilityInfrastructure, createToastNotification})(BedsWardsForm);
