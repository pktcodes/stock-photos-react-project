import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_SECRET_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  let url = `${mainUrl}${clientID}`;

  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      // console.log(`inner height ${window.innerHeight}`);
      // console.log(`scrollY ${window.scrollY}`);
      // console.log(`body height ${document.body.scrollHeight}`);

      if (
        !isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        console.log("It worked");
      }
    });
    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" className="form-input" placeholder="search" />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch></FaSearch>
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image) => {
            return <Photo key={image.id} {...image}></Photo>;
          })}
        </div>
        {isLoading && <h2 className="loading">loading...</h2>}
      </section>
    </main>
  );
}

export default App;
