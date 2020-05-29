import { makeStyles, createStyles } from '@material-ui/core/styles';

const Styles = makeStyles(theme =>
  createStyles({
    edit: {
      transform: 'scale(0)',
      transition: '.2s',
      width: 0,
      boxShadow: 'none',
      alignSelf: 'center',
      marginLeft: 'auto',
    },
    action: {
      position: 'absolute',
      right: '.2em',
      top: '.2em',
    },
    doctor: {
      transition: '.4s',
      '&:hover': {
        background: theme.palette.gray.tint,
        '& .MuiFab-root': {
          marginRight: theme.typography.pxToRem(20),
          transform: 'scale(1)',
          width: '40px',
        },
      },
    },
    dateWrap: {
      zIndex: 1,
      padding: `${theme.typography.pxToRem('28')} ${theme.typography.pxToRem('11')}`,
      position: 'relative',
      '&:before': {
        content: '""',
        position: 'absolute',
        width: '2px',
        height: '100%',
        background: theme.palette.gray.lighter,
        left: '50%',
        zIndex: 0,
        top: 0,
      },
    },
    date: {
      background: theme.palette.gray.lighter,
      color: theme.palette.primary.main,
      position: 'relative',
      zIndex: 1,
      border: 0,
      fontWeight: 'bold',
      minWidth: 113,
    },
    transparentChip: {
      color: 'transparent',
      minWidth: 'auto',
    },
    placeholderForm: {
      padding: `${theme.typography.pxToRem('28')} ${theme.typography.pxToRem('48')}`
    },
    dateField: {
      margin: `0 0 ${theme.typography.pxToRem(14)}`,
      '& .MuiInputBase-root': {
        fontSize: theme.typography.pxToRem(20),
      },
    }
  })
);

export default Styles;
