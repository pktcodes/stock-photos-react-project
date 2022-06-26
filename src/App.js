import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_SECRET_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  const [isNewImages, setIsNewImages] = useState(false);

  const fetchImages = async () => {
    setIsLoading(true);

    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setIsNewImages(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsNewImages(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (!isNewImages) return;

    if (isLoading) return;

    setPage((oldPage) => {
      return oldPage + 1;
    });
    // eslint-disable-next-line
  }, [isNewImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setIsNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
      return;
    }
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch></FaSearch>
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            return <Photo key={index} {...image}></Photo>;
            //Using image.id caused error, so index has been used
          })}
        </div>
        {isLoading && <h2 className="loading">loading...</h2>}
      </section>
    </main>
  );
}

export default App;
