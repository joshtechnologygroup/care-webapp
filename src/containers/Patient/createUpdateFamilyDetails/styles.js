import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tableRow: {
    transition: 'background .4s',
    background: theme.palette.gray.tint,
    borderBottom: '.5rem #fff solid',
    '&:hover': {
      background: theme.palette.gray.lighter,
      '& .MuiFab-root': {
        transform: 'translateX(0)',
      }
    },
  },
  placeholderRow: {
    '& .MuiTableCell-root': {
      padding: '2px 2px 3px !important',
    }
  },
  smallCell: {
    width: '180px',
    '& .MuiFormControl-root': {
      width: 'calc(50% - 3px)'
    },
  },
  error: {
    fontSize: '1.2rem'
  }
}));

export default useStyles;
