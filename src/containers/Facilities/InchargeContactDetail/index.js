import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import InchargeList from './InchargeList';
import CreateUpdateForm from './CreateUpdateForm';

const useStyles = makeStyles(theme =>
  createStyles({
    action: {
      position: 'absolute',
      right: 0,
      top: 0
    },
    icon: {
      fontSize: '2.2rem',
      marginRight: '4px',
      alignSelf: 'flex-start'
    }
  })
);

export default function InchargeContactDetail(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Card elevation={4}>
        <CardHeader
          title={i18n.t('Incharge Contact Details')}
          action={
            <IconButton variant="contained" className={classes.action} aria-label="settings" onClick={handleClick} >
              <AddOutlined fontSize="large"/>
            </IconButton>
          }
        />
        <CardContent>
          <InchargeList />
        </CardContent>
      </Card>
      <CreateUpdateForm details={{name: '', email: '', phone: ''}} open={open} onClose={handleClose} />
    </React.Fragment>
  );
}

InchargeContactDetail.propTypes = {
  profile: PropTypes.array.isRequired,
  handleEdit: PropTypes.func
}

InchargeContactDetail.defaultProps = {
  profile: []
}
