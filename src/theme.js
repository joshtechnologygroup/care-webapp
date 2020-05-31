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
        '&.selected': {
          color: '#ffffff',
          background: '#007aff',
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
    MuiFormControl: {
      root: {
        '&.field': {
          minHeight: '6.6rem',
          '& .MuiInputBase-root': {
            background: '#FFFFFF',
            borderRadius: 0,
          },
          '& .MuiInputBase-input': {
            fontSize: '1.6rem',
            lineHeight: '2rem',
            padding: '1.6rem 1.6rem 1.2rem',
          },
          '& .MuiSvgIcon-root': {
            fontSize: '2.4rem',
          },
          '& .MuiInputLabel-outlined': {
            fontSize: '1.8rem',
            transform: 'translate(1.4rem, 1.6rem) scale(1)'
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(1.4rem, -.6rem) scale(.75)'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            fontSize: '1.8rem'
          },
          '& .MuiFormHelperText-root': {
            margin: '0',
            fontSize: '1.2rem',
          },
          '& .MuiOutlinedInput-multiline': {
            padding: '0',
          },
        },
      },
    },
  }
});

export default theme;
