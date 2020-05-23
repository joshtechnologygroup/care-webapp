import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
    padding: '8px',
    minWidth: '50px',
    fontWeight: 'bold',
    '&.Mui-selected': {
        'background-color': theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            'background-color': theme.palette.primary.main,
            color: '#fff'
        },
    },
    '&:hover': {
        'background-color': '#f5faff',
    },
  },
  label: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '1.4rem',
    opacity: '0.4',
    padding: '0.2rem',
    marginBottom: '0.5rem'
  }
}));

export default useStyles;
