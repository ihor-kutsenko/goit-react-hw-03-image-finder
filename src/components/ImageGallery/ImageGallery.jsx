import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  id: PropTypes.number,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGallery;
