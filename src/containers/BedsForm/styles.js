import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    minWidth: '10rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    float: 'right',
  },
  label: {
    marginBottom: '5px',
    display: 'inline-block',
  },
  error: {
    fontSize: '1.2rem'
  },
  field: {
    '& input': {
      padding: '12px',
    },
  },
}));

export default useStyles;
