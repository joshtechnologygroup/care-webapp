import React, { useEffect, useState } from "react";
import i18n from "i18next";
import AuthUIContainer from "Containers/AuthUIContainer";
import ResetPassword from "Containers/ResetPassword";
import ErrorPage from "Screens/ErrorPage";
import { GET } from "Src/constants";
import * as HttpStatus from "http-status-codes";
import { reset_password } from "Actions/AuthAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function ResetPasswordPage(props) {
  const [user_id, setUserId] = useState(props.match.params.user_id);
  const [token, setToken] = useState(props.match.params.token);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleApi(user_id, token);
  }, []);

  const handleApi = async (user_id, token) => {
    const status = await props.reset_password(GET, user_id, token);
    // setIsValid(status === HttpStatus.OK);
    setIsValid(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return <p>Loading...</p>; // TODO: add a loader
  } else {
    const heading = isValid ? "Reset your password" : "";
    return (
      <AuthUIContainer subhead={i18n.t(heading)}>
        {isValid && <ResetPassword {...props} />}
        {!isValid && <ErrorPage title={404} text="Page Not Found!" />}
      </AuthUIContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

ResetPasswordPage.propTypes = {
  reset_password: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { reset_password })(ResetPasswordPage);
