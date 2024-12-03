import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
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
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imgForModal, setImgForModal] = useState("");

  const handleSubmit = (value) => {
    const trimmedQuery = value.search.trim();
    if (trimmedQuery === "") {
      toast.error("Please input value!");
      return;
    }
    setQuery(trimmedQuery);
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
      setIsloading(true);
      setIsError(false);

      try {
        setIsloading(true);

        const { results, total_pages } = await gallery(query, page);

        if (results.length === 0) {
          setIsError(true);
          toast.error("Please enter a valid word or reload the page.");
        } else {
          setImages((prev) => [...prev, ...results]);
          setTotalPage(total_pages);
        }
      } catch {
        setIsError(true);

        toast.error("An error occurred.Please reload the page");
      } finally {
        setIsloading(false);
      }
    };
    getData();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {images.length != 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isloading && <Load />}
      {isOpenModal && (
        <ImageModal
          isOpen={isOpenModal}
          onRequestClose={closeModal}
          imgForModal={imgForModal}
          images={images}
        />
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {isError && <ErrorMessage />}
      {images.length > 0 && totalPage > page && <LoadMoreBtn page={addPage} />}
    </>
  );
}

export default App;
