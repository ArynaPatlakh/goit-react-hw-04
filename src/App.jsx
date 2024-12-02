import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMore from "./components/LoadMore/LoadMore";

import { gallery } from "./components/articles-api";
import Load from "./components/Load/load";
import toast, { Toaster } from "react-hot-toast";

import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [isload, setIsload] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imgForModal, setImgForModal] = useState("");

  const handleSubmit = (value) => {
    if (value.search.trim("") === "") {
      toast.error("Please input value!");
      return;
    }
    setQuery(() => value.search.trim(""));
    setPage(1);
    setTotalPage(0);
    setImages([]);
    setIsError(false);
  };

  const addPage = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (elements) => {
    setImgForModal(elements);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (totalPage > 0 && totalPage === page) {
      toast.success("You already download all images");
    }
  }, [totalPage, page]);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setIsload(true);

        const { results, total_pages } = await gallery(query, page);
        setImages((prev) => [...prev, ...results]);
        setTotalPage(total_pages);
        setIsload(false);
      } catch {
        setIsError(true);
        toast.error("Pleas enter word correctly or reload the page");
        setIsload(false);
      }
    };
    getData();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isload && <Load />}

      {images.length != 0 ? (
        <ImageGallery images={images} openModal={openModal} />
      ) : (
        <ErrorMessage />
      )}
      {isOpenModal && (
        <ImageModal
          isOpen={isOpenModal}
          onRequestClose={closeModal}
          imgForModal={imgForModal}
          images={images}
        />
      )}
      {isError && <Toaster />}
      {totalPage != 0 && totalPage != page && <LoadMore page={addPage} />}
    </>
  );
}

export default App;
