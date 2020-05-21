import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import "./Snackbar.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbars({open, severity, message}) {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(open);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity || "success"}>
          <span className="error-toast-msg">{message}</span>
        </Alert>
      </Snackbar>
    </div>
  );
}