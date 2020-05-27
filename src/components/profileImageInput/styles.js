import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  ({
    imgInput: {
      display: 'none',
    },
    imageWrap: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      textAlign: 'center',
    },
    image: {
      padding: 0,
      width: '100%',
      maxWidth: theme.typography.pxToRem(210),
      minHeight: theme.typography.pxToRem(210),
      position: 'relative',
    },
    img: {
      width: '100%',
    },
    imgNull: {
      opacity: .5,
      width: '70%',
    },
    imgText: {
      position: 'absolute',
      background: 'rgba(255, 255, 255, .5)',
      padding: `0  ${theme.typography.pxToRem(4)}`,
      fontSize: theme.typography.pxToRem(16),
      bottom: theme.typography.pxToRem(6),
      left: 0,
      width: '100%',
    }
  })
);

export default useStyles;
