import React from 'react';

export const ImageGalleryItem = ({ image, onClickImage }) => {
  const { webformatURL, tags } = image;
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={() => onClickImage(image)}
      />
    </li>
  );
};
