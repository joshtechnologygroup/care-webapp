import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  ({
    root: {
      borderRadius: 0,
      '& .MuiIconButton-label': {
        borderRadius: '0',
      },
      '& .MuiInputLabel-shrink': {
        fontSize: '1.864em',
      },
      '& .MuiInputBase-input': {
        fontSize: '1.6em',
      },
    },
  })
);

export default useStyles;
