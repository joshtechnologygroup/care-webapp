import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  ({
    root: {
      '& .MuiFormLabel-root': {
        fontSize: '1.4em',

      },
      '& .MuiInputLabel-shrink': {
        fontSize: '1.864em',
      },
      '& .MuiInputBase-input': {
        fontSize: '1.6em',
      }
    }
  })
);

export default useStyles;
