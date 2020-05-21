import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.ag-loading-comp': {
      fontSize: theme.typography.pxToRem(12),
    },
    '.ag-cell-label-container': {
      height: 'auto',
    },
    '.ag-theme-balham': {
      height: `calc(100vh - ${theme.typography.pxToRem(120)})`,
      fontSize: theme.typography.pxToRem(10),
      marginTop: theme.typography.pxToRem(15),
      minHeight: theme.typography.pxToRem(150),
      color: theme.palette.text.secondary,
      '&.seat-map-opened': {
        height: `calc(100vh - ${theme.typography.pxToRem(120)} - ${theme.typography.pxToRem(234)})`,
      },
      '& .ag-cell-icon': {
        fontSize: theme.typography.pxToRem(16),
      },
      '& .ag-cell-status-icon': {
        fontSize: theme.typography.pxToRem(16),
        verticalAlign: 'middle',
      },
      '& .ag-cell-edit-icon': {
        fontSize: theme.typography.pxToRem(16),
        verticalAlign: 'middle',
        marginLeft: theme.typography.pxToRem(10),
        position: 'absolute',
        top: theme.typography.pxToRem(2),
        right: theme.typography.pxToRem(2),
        cursor: 'pointer',
      },
      '& .ag-cell-seprator': {
        margin: `0 ${theme.typography.pxToRem(2)}`,
      },
      '& .ag-cell-available': {
        color: theme.colors.seatAvailable,
      },
      '& .ag-cell-not-available': {
        color: theme.colors.seatNotAvailable,
      },
      '& .ag-cell-minor-available': {
        color: theme.colors.seatMinorAvailable,
      },
      '& .ag-cell-delay-cell': {
        color: theme.colors.warning,
      },
      '& .ag-cell-warning': {
        color: theme.colors.warning,
      },
      '& .ag-cell-link': {
        color: theme.palette.text.primary,
        fontWeight: 500,
      },
      '& .ag-row-date': {
        fontSize: theme.typography.pxToRem(11),
      },
      '& .ag-row-date-icon': {
        fontSize: theme.typography.pxToRem(16),
        verticalAlign: 'middle',
        margin: `0 ${theme.typography.pxToRem(12)} 0 ${theme.typography.pxToRem(5)}`,
      },
      '& .ag-cell-edit-btn': {
        position: 'relative',
        paddingRight: theme.typography.pxToRem(25),
      },
      '& .ag-row-date-text': {
        color: theme.palette.text.primary,
        fontWeight: 500,
      },
      '& .ag-row-date-title': {
        color: theme.palette.rowDateCount,
      },
      '& .ag-row-date-count': {
        color: theme.palette.rowDateCount,
      },
      '& .ag-icon-asc': {
        borderLeftWidth: theme.typography.pxToRem(3),
        borderRightWidth: theme.typography.pxToRem(3),
        borderBottomWidth: theme.typography.pxToRem(6),
      },
      '& .ag-icon-desc': {
        borderLeftWidth: theme.typography.pxToRem(3),
        borderRightWidth: theme.typography.pxToRem(3),
        borderTopWidth: theme.typography.pxToRem(6),
      },
      '& .ag-icon-checkbox-unchecked, .ag-icon-checkbox-indeterminate, .ag-icon-checkbox-checked': {
        backgroundSize: `${theme.typography.pxToRem(11)} ${theme.typography.pxToRem(11)}`,
        height: theme.typography.pxToRem(11),
        width: theme.typography.pxToRem(11),
      },
      '& .ag-selection-checkbox ~ .ag-cell-value:not(:empty)': {
        marginLeft: theme.typography.pxToRem(6),
        marginTop: theme.typography.pxToRem(2),
      },
      '& .ag-name-no-link': {
        color: theme.palette.text.primary,
        textDecoration: 'underline',
        fontWeight: 500,
      },
      '& .ag-infant-details': {
        float: 'right',
        display: 'inline-block',
        verticalAlign: 'middle',
        '& span': {
          margin: `0 ${theme.typography.pxToRem(3)}`,
          verticalAlign: 'top',
        },
      },
    },
    '.custom-material': {
      '& .ag-full-width-row': {
        paddingTop: 0,
      },
      '& .ag-header': {
        fontSize: theme.typography.pxToRem(10),
        marginBottom: 0,
        color: theme.palette.text.primary,
        backgroundColor: 'transparent',
      },
      '& .ag-theme-balham .ag-header': {
        marginBottom: theme.typography.pxToRem(8),
      },
      '& .ag-theme-balham .ag-header-row': {
        backgroundColor: theme.colors.muiRowEven,
      },
      '& .ag-header-group-cell': {
        paddingLeft: theme.typography.pxToRem(10),
      },
      '& .ag-row:not(.ag-row-first)': {
        border: 'solid rgba(70, 76, 83, 0.34)',
        borderWidth: `0 ${theme.typography.pxToRem(0.3)} ${theme.typography.pxToRem(0.3)}`,
      },
      '& .ag-row-even:not(.ag-row-first)': {
        background: theme.colors.muiRowEven,
      },
      '& .ag-icon-asc': {
        marginTop: theme.typography.pxToRem(4.8),
      },
      '& .ag-icon-desc': {
        marginTop: theme.typography.pxToRem(4.8),
      },
      '& .ag-full-width-container': {
        marginTop: theme.typography.pxToRem(0),
        '& .ag-react-container': {
          padding: `${theme.typography.pxToRem(1)} ${theme.typography.pxToRem(2)} 0`,
        },
        '& .ag-row': {
          paddingTop: theme.typography.pxToRem(8),
          borderLeftWidth: 0,
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        },
        '& .ag-row.ag-row-first': {
          paddingTop: theme.typography.pxToRem(8),
          borderWidth: `0 0 ${theme.typography.pxToRem(0.3)}`,
        },
      },
      '& .ag-theme-balham .ag-cell': {
        padding: `${theme.typography.pxToRem(6)} 0 ${theme.typography.pxToRem(6)} ${theme.typography.pxToRem(10)}`,
      },
      '& .ag-theme-balham .ag-header-cell, .ag-theme-balham .ag-header-group-cell': {
        padding: 0,
      },
      '& .ag-theme-balham .ag-header-cell-label': {
        padding: `${theme.typography.pxToRem(8)} 0 ${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(10)}`,
      },
      '& .ag-theme-balham .ag-row-selected, .ag-theme-balham .ag-row-focus': {
        border: `1px solid ${theme.palette.secondary.main}`,
      },
      '& .ag-theme-balham .ag-row-odd.ag-row-selected, .ag-theme-balham .ag-row-odd.ag-row-focus': {
        background: theme.colors.white,
      },
      '& .ag-theme-balham .ag-row-even.ag-row-selected': {
        background: theme.colors.muiRowEven,
      },
    },
    '.custom-normal': {
      '& .ag-theme-balham': {
        color: theme.palette.text.primary,
      },
      '& .ag-theme-balham .ag-header': {
        fontSize: theme.typography.pxToRem(10),
        color: theme.palette.text.primary,
        backgroundColor: theme.colors.muiRowEven,
      },
      '& .ag-row': {
        backgroundColor: theme.colors.normalRowEven,
      },
      '& .ag-row-even': {
        backgroundColor: theme.colors.white,
      },
      '& .ag-row-hover': {
        backgroundColor: 'transparent',
      },
      '& .ag-row-odd.ag-row-hover': {
        backgroundColor: theme.colors.normalRowEven,
      },
      '& .ag-icon-asc': {
        marginTop: theme.typography.pxToRem(5),
      },
      '& .ag-icon-desc': {
        marginTop: theme.typography.pxToRem(5),
      },
      '& .ag-cell-name': {
        textDecoration: 'underline',
        marginTop: theme.typography.pxToRem(9),
        fontWeight: 500,
      },
      '& .ag-cell-seat-selection': {
        borderBottom: `${theme.typography.pxToRem(2)} solid ${theme.colors.seatCellBorder}`,
      },
      '& .ag-theme-balham .ag-header-cell-label .ag-header-cell-text': {
        whiteSpace: 'normal',
      },
      '& .ag-theme-balham .ag-cell': {
        padding: `${theme.typography.pxToRem(2)} ${theme.typography.pxToRem(2)} ${theme.typography.pxToRem(2)} ${theme.typography.pxToRem(6)}`,
        fontSize: theme.typography.pxToRem(9),
      },
      '& .ag-theme-balham .ag-header-cell, .ag-theme-balham .ag-header-group-cell': {
        padding: 0,
      },
      '& .ag-cell-status-checked-in': {
        background: theme.colors.statusCellCK,
      },
      '& .ag-row-checked-in, .ag-row-checked-in:hover': {
        background: theme.colors.statusRowCK,
      },
      '& .ag-row-pre-seated, .ag-row-selected, .ag-row-pre-seated:hover, .ag-row-selected:hover, .ag-row-inline-editing, .ag-row-inline-editing:hover': {
        background: theme.colors.statusRowPreSeated,
      },
      '& .ag-row-selected .ag-cell-seat-selection, .ag-cell-seat-selection.ag-cell-inline-editing': {
        background: theme.colors.statusCellPreSeated,
        borderBottom: 'none',
      },
      '& .ag-theme-balham .ag-header-cell-label': {
        padding: `${theme.typography.pxToRem(4)} ${theme.typography.pxToRem(6)}`,
      },
      '& .ag-theme-balham .ag-cell-inline-editing': {
        height: '100%',
      },
      '& .ag-cell-edit-input': {
        height: theme.typography.pxToRem(28),
      },
      '& .ag-theme-balham .ag-cell-edit-btn': {
        position: 'relative',
        paddingRight: theme.typography.pxToRem(25),
      },
      '& .ag-cell-status-text': {
        paddingBottom: theme.typography.pxToRem(3),
        display: 'inline-block',
      },
      '& .ag-cell-status-container': {
        padding: `${theme.typography.pxToRem(2)} 0`,
      },
      '& .ag-cell-status-iwrap': {
        display: 'inline-flex',
        alignItems: 'center',
        padding: 0,
        marginRight: theme.typography.pxToRem(10),
      },
      '& .ag-header-cell-label .ag-cell-icon-absolute': {
        right: `-${theme.typography.pxToRem(6)}`,
      },
      '& .ag-has-focus .ag-cell.ag-cell-focus': {
        border: `1px solid ${theme.palette.secondary.main}`,
      },
    },
  },
}));

export default useStyles;
