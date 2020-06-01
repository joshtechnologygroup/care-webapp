import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { PhoneOutlined, EditOutlined, Add } from '@material-ui/icons';

// Importing mock data
import { genderChoices } from 'Constants/app.const';

import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme =>
  createStyles({
    edit: {
      position: 'absolute',
      top: '50%',
      right: '1.4rem',
      transform: 'translateY(-50%)',
    },
  })
);

export default function FamilyMemberCard(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { details, editCallback } = props;

  return (
    <Card className="mb-0" elevation={4}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid className="pb-0" item xs={12} sm={3}>
            <h4 className="heading--md">
              <Tooltip title={i18n.t('Name')}>
                <span>
                  {details.name}
                </span>
              </Tooltip>
            </h4>
          </Grid>

          <Grid className="pb-0" item xs={12} sm={2}>
            <h4 className="heading--md text--gray">
              <Tooltip title={i18n.t('Relation')}>
                <span>
                  {details.relation}
                </span>
              </Tooltip>
            </h4>
          </Grid>

          <Grid className="pb-0" item xs={12} sm={2}>
            <Typography variant="h6" className="d-flex">
              <Tooltip title={i18n.t('Age')}>
                <span>
                  {
                    details.age_year} {details.age_year > 1 ? i18n.t('Years') : i18n.t('Year')} {
                    Boolean(details.age_month) && (details.age_month) 
                  } {
                    Boolean(details.age_month) && (details.age_month > 1 ? i18n.t('months') : i18n.t('month'))}
                </span>
              </Tooltip>
            </Typography>
          </Grid>

          <Grid className="pb-0" item xs={12} sm={2}>
            <Typography variant="h6" className="d-flex">
              <Tooltip title={i18n.t('Gender')}>
              <span>
                {
                  genderChoices.map(choice => {
                      return choice.id === details.gender ? (choice.name) : ''
                  })
                }
              </span>
              </Tooltip>
            </Typography>
          </Grid>

          <Grid className="pb-0" item xs={12} sm={3}>
            <Typography variant="h6" className="d-flex">
              <PhoneOutlined className="mr-5" />
              {details.phone_number}
            </Typography>
          </Grid>

        </Grid>
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
      </CardContent>
    </Card>
  );
}

FamilyMemberCard.propTypes = {
  profile: PropTypes.array.isRequired,
  editCallback: PropTypes.func,
};

FamilyMemberCard.defaultProps = {
  profile: []
};
