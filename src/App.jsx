import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMore from "./components/LoadMore/LoadMOre";

import { gallery } from "./components/articles-api";
import Load from "./components/Load/load";
import toast from "react-hot-toast";
// import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [isload, setIsload] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (value) => {
    setQuery(() => value.search);
    setPage(1);
    setTotalPage(0);
    setImages([]);
    setIsError(false);
  };

  const addPage = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (totalPage > 0 && totalPage === page) {
      toast.success("You already download all images");
    }
  }, [totalPage, page]);
  console.log(page);
  console.log(totalPage);
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
        setIsload(false);
      }
    };
    getData();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {isload && <Load />}
      {images.length != 0 && <ImageGallery images={images} />}
      {isError && <p>Reload your page, and try again, please!</p>}

      {totalPage != 0 && totalPage != page && <LoadMore page={addPage} />}
    </>
  );
}

export default App;
