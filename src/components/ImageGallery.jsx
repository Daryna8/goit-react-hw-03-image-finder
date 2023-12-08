import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onClickImage }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClickImage={onClickImage}
        />
      ))}
    </ul>
  );
};
