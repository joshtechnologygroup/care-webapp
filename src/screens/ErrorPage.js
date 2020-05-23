import React from 'react';
import {
  useParams
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export const ErrorPage = ({ title, text }) => {
  const { errorCode } = useParams();
  return (
    <Grid
      className="full-height"
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <div>
        <h2 className="error-title">{title || errorCode}</h2>
        <p className="error-text">{text}</p>
      </div>
    </Grid>
  );

}

export default ErrorPage;
