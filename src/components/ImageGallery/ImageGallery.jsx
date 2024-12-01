import s from "./imageGallery.module.css";
const ImageGallery = ({ images }) => {
  return (
    <ul className={s.list}>
      {images.map((image) => (
        <li key={image.id} className={s.list_item}>
          <img src={image.urls.small} alt="" width="320px" />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;

{
  /* <p className={s.list_name}>{result.user.name}</p>
          <p className={s.list_bio}> {result.user.bio}</p>
          <a
            className={s.list_portfolio}
            target="_blank"
            href={result.user.portfolio_url}
          >
            Link for portfolio
          </a> */
}
