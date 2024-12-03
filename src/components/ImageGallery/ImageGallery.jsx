import ImageCard from "../ImageCard/ImageCard";
import s from "./imageGallery.module.css";
const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.list}>
      {images.map((image) => (
        <li
          key={image.id}
          className={s.list_item}
          onClick={() => openModal(image)}
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
