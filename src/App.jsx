import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [filmData, setFilmData] = useState([]);
  const [error, setErrorMsg] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);

  const getAllFilms = async () => {
    try {
      const response = await fetch("https://ghibliapi.vercel.app/films");
      if (!response.ok) {
        throw new Error("Something's not right...");
      }
      const data = await response.json();
      setFilmData(data);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    getAllFilms();
  }, []);

  const handleSeeMore = (film) => {
    setSelectedFilm(film);
  };

  const handleCloseModal = () => {
    setSelectedFilm(null);
  };

  return (
<div>
  <h1>Studio Ghibli Films</h1>

  <h2>{error}</h2>

  <div className="allFilms">
    {filmData.map((film, index) => {
      return (
        <div className="filmCard" key={index}>
          <img src={film.image} alt="film poster" />
          <details>
            <summary>{film.title}</summary>
            <p>{film.description.split(' ').slice(0, 20).join(' ')}... <span className="seeMore" onClick={() => handleSeeMore(film)}>See More</span></p>
          </details>
        </div>
      );
    })}
  </div>

  {selectedFilm && (
  <div className="modal" style={{ display: "block" }}>
    <div className="modal-content">
      <span className="close" onClick={handleCloseModal}>&times;</span>
      <img className="seeMoreImg" src={selectedFilm.movie_banner}/>
      <h2>{selectedFilm.original_title} ({selectedFilm.title})</h2>
      <h3>{selectedFilm.original_title_romanised}</h3>
      <p><b>Release Year: </b>{selectedFilm.release_date}</p>
      <p><b>Director: </b> {selectedFilm.director}</p>
      <p><b>Producer: </b> {selectedFilm.producer}</p>
      <p><b>Run Time: </b> {selectedFilm.running_time} minutes</p>
      <p><b>Description: </b>{selectedFilm.description}</p>
    </div>
  </div>
)}
</div>
  );
};

export default App;
