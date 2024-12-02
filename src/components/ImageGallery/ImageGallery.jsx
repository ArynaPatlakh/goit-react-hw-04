import s from "./imageGallery.module.css";
const ImageGallery = ({ images, openModal }) => {

  return (
    <ul className={s.list}>
      {images.map((image) => (
        <li key={image.id} className={s.list_item} onClick={() =>openModal(image)} >
          <img
        
            src={image.urls.small}
            srcSet={image.urls.full}
            alt={images.alt_description}
            width="320px"
          />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;

