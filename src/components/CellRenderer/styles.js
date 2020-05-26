const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(14)} ${theme.typography.pxToRem(4)}`,
    maxWidth: theme.typography.pxToRem(240),
    minWidth: theme.typography.pxToRem(100),
    borderRadius: theme.typography.pxToRem(20),
    boxShadow: '0 1px 20px 0 rgba(133, 142, 155, 0.45)',
  },
  wrapper: {
    display: 'flex',
  },
  mainIcon: {
    fontSize: theme.typography.pxToRem(38),
  },
  formControl: {
    minWidth: 85,
  },
});

export default styles;
