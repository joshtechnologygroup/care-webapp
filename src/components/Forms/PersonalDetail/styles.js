import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
    ({
        root: {
            borderRadius: '0',
            boxShadow: '0.2rem 0.2rem 0.3rem 0.2rem rgba(0, 0, 0, 0.07)',
            position: 'relative',
            marginBottom: theme.typography.pxToRem(16),
            '.MuiFormLabel-root': {
                fontSize: '1.4em',

            },
            '.MuiInputLabel-shrink': {
                fontSize: '1.864em',
            },
            '.MuiInputBase-input': {
                fontSize: '1.6em',
            }
        }
    })
);

export default useStyles;
