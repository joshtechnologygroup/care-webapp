import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { PropTypes } from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import store from 'Src/app/store';
import i18n from 'Src/i18n';

import THEME from 'Src/theme';

const theme = createMuiTheme(THEME);

const AgProvider = ({ children }) => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </I18nextProvider>
  </Provider>
);

AgProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AgProvider;
