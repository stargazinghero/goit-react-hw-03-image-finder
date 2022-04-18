import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ gallery, openLargeImage }) => {
  return (
    <Gallery>
      {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            smallImg={webformatURL}
            largeImg={largeImageURL}
            tags={tags}
            openLargeImage={openLargeImage}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  openLargeImage: PropTypes.func.isRequired,
};
