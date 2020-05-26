import React from 'react';
import { ButtonBase } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import useStyles from './styles';

export default function ProfileImageInput(props) {
  const classes = useStyles();
  const { imageSrc, defaultImage, altText, handleChange } = props;
  const [source, setSource] = React.useState(imageSrc);

  const change = (img) => {
    if (img) {
      console.log(img)
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setSource(reader.result);
        handleChange(img, reader.result);
      };
    }
  };

  return (
    <>
      <input
        accept="image/*"
        className={classes.imgInput}
        id="profile-image"
        type="file"
        name="image"
        onChange={(event) => change(event.target.files[0])}
      />
      <label htmlFor="profile-image" className={classes.imageWrap}>
        <ButtonBase component="span" className={classes.image}>
          {
            (source) &&
            <img className={classes.img}
              src={source} alt={altText}
            />
          }
          {
            !source &&
            <img className={`${classes.img} + ${classes.imgNull} }`} src={defaultImage} alt={altText} />
          }
          {
            Boolean(altText) &&
            <span className={classes.imgText}>{altText}</span>
          }
        </ButtonBase>
      </label>
    </>
  );
}

ProfileImageInput.propTypes = {
  imageSrc: PropTypes.string,
  defaultImage: PropTypes.string.isRequired,
  altText: PropTypes.string,
  handleEdit: PropTypes.func
}

ProfileImageInput.defaultProps = {
  imageSrc: '',
  defaultImage: '',
  altText: '',
  handleEdit: PropTypes.func
}
