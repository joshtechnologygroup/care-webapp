import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  Chip
} from '@material-ui/core';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { EditOutlined, EventOutlined } from '@material-ui/icons';
import { DATE_FORMAT } from 'Src/constants';

import { labTestStatusChoices } from 'Constants/app.const';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: `${theme.typography.pxToRem(14)} ${theme.typography.pxToRem(21)}`,
      [theme.breakpoints.down('xs')]: {
        padding: theme.typography.pxToRem(21),
      },
    },
    chip: {
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        order: -1,
        textAlign: 'left',
      },
    },
    edit: {
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: theme.typography.pxToRem(6),
        right: theme.typography.pxToRem(6),
      }
    }
  })
);

export default function LabTestCard(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { details, editCallback, testingLabs } = props;

  return (
    <Card elevation={4}
      className={
        labTestStatusChoices.map(choice => {
          return choice.id === details.result ? `mb-0 bg--${choice.theme}` : ''
        }).join(' ')
      }
    >
      <CardContent className={classes.root}>
        <Grid container spacing={2} alignItems="center">
          <Grid className="py-0" item xs={12} sm={4}>
            <span className="heading--sub">{i18n.t('Laboratory')}</span>
            <h4 className="heading--md">
              <Tooltip title={i18n.t('Lab name')}>
                <span>
                  {testingLabs && testingLabs.find(lab => lab.id == details.testing_lab).name}
                </span>
              </Tooltip>
            </h4>
            <Typography variant="h6" className="d-flex">
              <Tooltip title={i18n.t('Lab code')}>
                <span>
                  #{details.code}
                </span>
              </Tooltip>
            </Typography>
          </Grid>

          <Grid item xs={6} sm={2}>
            <span className="heading--sub">{i18n.t('Sample collected on')}</span>
            <Typography variant="h6" className="d-flex">
              <EventOutlined className="mr-5" />
              <Tooltip title={i18n.t('Sample collected on')}>
                <span>
                  {moment(details.date_of_sample).format(DATE_FORMAT)}
                </span>
              </Tooltip>
            </Typography>
          </Grid>

          <Grid item xs={6} sm={2}>
            <span className="heading--sub">{i18n.t('Last Updated')}</span>
            <Typography variant="h6" className="d-flex">
              <EventOutlined className="mr-5" />
              <Tooltip title={i18n.t('Last Updated')}>
                <span>
                  {moment(details.status_updated_at).format(DATE_FORMAT)}
                </span>
              </Tooltip>
            </Typography>
          </Grid>


          <Grid className={classes.chip} item xs={12} sm={3}>
            <Tooltip title={i18n.t('Result')}>
              <Chip
                label={
                  labTestStatusChoices.map(choice => {
                    return choice.id === details.result ? choice.name : ''
                  })
                }
                className={
                  labTestStatusChoices.map(choice => {
                    return choice.id === details.result ? choice.theme : ''
                  }).join(' ')
                }
              />
            </Tooltip>
          </Grid>
          <Grid item xs={2} sm={1}>
            {
              editCallback &&
              <Tooltip title={i18n.t('Edit')}>
                <IconButton
                  aria-label="edit"
                  className={classes.edit}
                  onClick={editCallback}
                >
                  <EditOutlined fontSize="large"/>
                </IconButton>
              </Tooltip>
            }
          </Grid>
        </Grid>
      </CardContent>
      <span></span>
    </Card>
  );
}

LabTestCard.propTypes = {
  profile: PropTypes.array.isRequired,
};

LabTestCard.defaultProps = {
  profile: []
};
