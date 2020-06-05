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

export function LabTestDetail(props) {
  let { patientId } = useParams();
  const { i18n } = useTranslation();
  const { profile, saveLabDetails, getTestingLabList, testingLabs, createSampleTest, updateSampleTest } = props;

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
        alert('created patient sample test successfully');
      } else {
        alert(response.error);
      }
    }
    else {
      profile[editable] = data;
      setEditable('');
      response = await updateSampleTest(initial, data.id);
      if (response.status) {
        alert('updated patient sample test successfully');
      } else {
        alert(response.error);
      }
    }
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


export default connect(mapStateToProps, { getTestingLabList, createSampleTest, updateSampleTest })(LabTestDetail);
