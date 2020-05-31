import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Form from './form';
import './style.scss';

export default function ChangePassword(props) {
  const { i18n } = useTranslation();

  return (
    <React.Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">{i18n.t('Change Password')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Form />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
}
