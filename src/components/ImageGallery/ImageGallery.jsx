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
