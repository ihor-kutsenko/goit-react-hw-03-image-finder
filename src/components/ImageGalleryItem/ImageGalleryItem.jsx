import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryImg}
        src={webformatURL}
        alt=""
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
};

export default ImageGalleryItem;
