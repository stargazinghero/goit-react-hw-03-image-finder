import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  smallImg,
  largeImg,
  tags,
  openLargeImage,
  id,
}) => {
  return (
    <GalleryItem onClick={() => openLargeImage(id)}>
      <GalleryItemImage src={smallImg} alt={tags} />
    </GalleryItem>
  );
};
