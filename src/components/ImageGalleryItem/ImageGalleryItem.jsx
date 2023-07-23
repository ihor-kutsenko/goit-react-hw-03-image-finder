import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryImg}
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={() => {
          onClick(largeImageURL, tags);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
