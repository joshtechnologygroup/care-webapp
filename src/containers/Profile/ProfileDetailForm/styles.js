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
        lineHeight: 1,
      },
      '& .MuiSvgIcon-root': {
        fontSize: theme.typography.pxToRem(30),
      },
      '& .MuiFormControlLabel-root': {
        paddingTop: theme.typography.pxToRem(16),
      },
    },
  })
);

export default useStyles;
