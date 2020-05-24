import React, { Component } from 'react';
import i18n from 'i18next';
import AuthUIContainer from 'Containers/AuthUIContainer';
import ResetPassword from 'Containers/ResetPassword';
import ErrorPage from 'Screens/ErrorPage';
import { GET } from "Src/constants";
import * as HttpStatus from 'http-status-codes'
import { reset_password } from 'Actions/AuthAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ResetPasswordPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user_id: this.props.match.params.user_id,
      token: this.props.match.params.token,
      isValid: false,
      isLoading: true
    };
    this.handleApi = this.handleApi.bind(this);
  }

  componentDidMount() {
    const { user_id, token } = this.state
    this.handleApi(user_id, token);
  }

  async handleApi(user_id, token){
    const status = await this.props.reset_password(GET, user_id, token);
    this.setState({isValid: (status === HttpStatus.OK), isLoading: false});
  }

  render() {
    const { isLoading, isValid } = this.state
    if(isLoading){
      return <p>Loading</p> // TODO: add a loader
    } else {
      const heading = (isValid)? 'Reset your password': '';
      return (
        <AuthUIContainer subhead={i18n.t(heading)}>
          { isValid && <ResetPassword { ...this.props }/> }
          { !isValid && <ErrorPage title={ 404 } text="Page Not Found!" /> }
        </AuthUIContainer>
      );
    }
  }
}

const mapStateToProps = (state) => ({
});

ResetPasswordPage.propTypes = {
  reset_password: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { reset_password })(ResetPasswordPage);
