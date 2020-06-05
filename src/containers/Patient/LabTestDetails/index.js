import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  Button,
  Card,
} from '@material-ui/core';
import { connect } from 'react-redux';
import LabTestCard from 'Components/Cards/LabTestCard';
import NullState from 'Components/NullState';
import nullImage from 'Assets/images/lab-null.jpg';
import { CreateUpdateForm } from './createUpdateForm';
import { getTestingLabList } from 'Actions/PatientsAction';
import { createSampleTest, updateSampleTest } from 'Actions/TestingLabsAction'
import { useParams } from "react-router-dom";
import _ from 'underscore';
import { fetchPatient } from 'Actions/PatientsAction';
import { createToastNotification } from 'Actions/ToastAction';
import * as ToastUtils from 'Src/utils/toast';
import {SUCCESS, DANGER} from "Src/constants";

export function LabTestDetail(props) {
  let { patientId } = useParams();
  const { i18n } = useTranslation();
  const { 
    profile, saveLabDetails, getTestingLabList, testingLabs, 
    createSampleTest, updateSampleTest, fetchPatient, createToastNotification 
} = props;

  let editableId;
  const [editable, setEditable] = React.useState(editableId);

  useEffect(() => {
    getTestingLabList();
  }, []);

  const edit = (id) => {
    setEditable(id);
  };
  const add = () => {
    setEditable('new');
  };

  const handleSubmit = async (data) => {
    let initial = data;
    let response;
    initial['patient'] = patientId;
    if (editable === 'new') {
      setEditable('');
      response = await createSampleTest(initial);
      if (response.status) {
        profile.unshift(data);
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "Added", "Successfully added Lab Test", SUCCESS)
        )
      } else {
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "Error", "Some Error Occurred", DANGER)
        )
      }
    }
    else {
      profile[editable] = data;
      setEditable('');
      response = await updateSampleTest(initial, data.id);
      if (response.status) {
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "updated", "Successfully updated", SUCCESS)
        )
      } else {
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "Error", "Some Error Occurred", DANGER)
        )
      }
    }
    fetchPatient(patientId);
  };

  const cancel = () => {
    setEditable('');
  };

  return (
    <>
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Lab Tests')}</h4>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          size="medium"
          className="btn"
          onClick={add}
        >
          + {i18n.t('Add Lab test')}
        </Button>
      </div>
      <Grid container spacing={1}>
        {
          editable === 'new' &&
          <Grid item xs={12}>
            <CreateUpdateForm
              handleSubmit={handleSubmit}
              cancelCallback={cancel}
              saveLabDetails={saveLabDetails}
              editMode={false}
              details={{}}
              testingLabs={testingLabs}
            />
          </Grid>
        }
        {
          profile.map((test, index) =>
            <Grid key={index} className="mb-0" item xs={12}>
              {
                editable === index ?
                  <CreateUpdateForm
                    handleSubmit={handleSubmit}
                    saveLabDetails={saveLabDetails}
                    cancelCallback={cancel}
                    editMode={true}
                    testingLabs={testingLabs}
                    details={test}
                  />
                  :
                  <LabTestCard
                    className="mb-0"
                    details={test}
                    testingLabs={testingLabs}
                    editCallback={() => edit(index)}
                  />
              }
            </Grid>
          )
        }
        {
          !profile.length && editable !== 'new' &&
          <Grid item xs={12}>
            <Card className="mb-0">
              <NullState img={nullImage} message={i18n.t('null_messages.labtest')} />
            </Card>
          </Grid>
        }
      </Grid>
    </>
  );
}

LabTestDetail.propTypes = {
  profile: PropTypes.array.isRequired,
  testingLabs: PropTypes.array,
  getTestingLabList: PropTypes.func,
  createSampleTest: PropTypes.func,
  updateSampleTest: PropTypes.func,
};

LabTestDetail.defaultProps = {
  profile: []
};

const mapStateToProps = (state) => ({
  testingLabs: state.testingLabs.results
});


export default connect(mapStateToProps, { 
    getTestingLabList, createSampleTest, updateSampleTest, fetchPatient, createToastNotification 
 })(LabTestDetail);
