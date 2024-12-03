import s from "./ImageCard.module.css";

const ImageCard = ({ image }) => {
  return (
    <img
      className={s.img}
      src={image.urls.small}
      srcSet={image.urls.full}
      alt={image.alt_description}
      width="320px"
    />
  );
};

export default ImageCard;
