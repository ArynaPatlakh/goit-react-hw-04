import Modal from "react-modal";
import s from "./ImageModule.module.css";
Modal.setAppElement("#root");
const ImageModal = ({ isOpen, onRequestClose, imgForModal }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={s.modal}
      >
        {
          <div className={s.wrapper}>
            <img
              src={imgForModal.urls.regular}
              alt={imgForModal.alt_description}
              className={s.photo}
            />
            <div className={s.text}>
              <p className="">Description: {imgForModal.description}</p>
              <p>
                Photo by: {imgForModal.user.first_name}{" "}
                {imgForModal.user.last_name}
              </p>
              {imgForModal.user.instagram_username ? (
                <a
                  className={s.insta}
                  href={imgForModal.user.instagram_username}
                >
                  Instagram : {imgForModal.user.instagram_username}
                </a>
              ) : (
                <></>
              )}
            </div>
          </div>
        }
      </Modal>
    </div>
  );
};

export default ImageModal;
