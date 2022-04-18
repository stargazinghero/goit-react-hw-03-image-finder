import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImg, tags, openLargeImage, id }) => {
  return (
    <GalleryItem onClick={() => openLargeImage(id)}>
      <GalleryItemImage src={smallImg} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  openLargeImage: PropTypes.func.isRequired,
};
