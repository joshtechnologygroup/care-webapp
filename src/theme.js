import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato',
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // '"Helvetica Neue"',
      // 'Arial',
      'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {'main': '#007aff'},
    secondary: purple,
  },
  status: {
    danger: 'orange',
  },
});
export default theme;
