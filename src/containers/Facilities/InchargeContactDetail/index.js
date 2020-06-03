import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import InchargeList from './InchargeList';


export default function InchargeContactDetail(props) {
  const { i18n } = useTranslation();

  return (
    <React.Fragment>
      <Card elevation={4}>
        <CardHeader
          title={i18n.t('Administrators')}
        />
        <CardContent>
          <InchargeList profile={props.profile} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

InchargeContactDetail.propTypes = {
  profile: PropTypes.array.isRequired,
  handleEdit: PropTypes.func
};

InchargeContactDetail.defaultProps = {
  profile: []
};
