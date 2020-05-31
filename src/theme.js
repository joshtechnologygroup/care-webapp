import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export const theme = createMuiTheme({
  typography: {
    spacing: 10,
    fontFamily: [
      'Lato',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Heebo',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,
  },
  palette: {
    primary: {'main': '#007aff'},
    secondary: purple,
    gray: {
      tint: '#f6f6f6',
      lighter: '#e7e7e7',
    }
  },
  status: {
    danger: 'orange',
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1.2em',
      }
    },
    MuiChip: {
      root: {
        height: 'auto',
        padding: '.7em',
        '&.pinkGrad': {
          background: 'linear-gradient(45deg, #FF464644, #FF464611)',
        },
        '&.blueGrad': {
          background: 'linear-gradient(45deg, #0095ff66, #0095ff11)',
        },
        '&.danger': {
          background: '#ff4746',
          color: '#ffffff',
        },
        '&.success': {
          background: '#3eac2d',
          color: '#ffffff',
        },
      },
      label: {
        fontSize: '1.4em',
        lineHeight: 1,
      },
    },
    MuiCard: {
      root: {
        borderRadius: '0',
        boxShadow: '0.2rem 0.2rem 0.3rem 0.2rem rgba(0, 0, 0, 0.07)',
        position: 'relative',
        marginBottom: '1.8em'
      },
    },
    MuiCardHeader: {
      root: {
        borderBottom: '.1em #eee solid',
      },
    },
  }
});

export default theme;
