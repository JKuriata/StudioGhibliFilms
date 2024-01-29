import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [filmData, setFilmData] = useState([]);
  const [error, setErrorMsg] = useState("");

  const getAllFilms = async () => {

    try {
      const response = await fetch("https://ghibliapi.vercel.app/films");
      console.log(response)
      if(!response.ok) {
        throw new Error("Something's not right...")
      }
      const data = await response.json();
      setFilmData(data)
    } catch(error) {
      console.log(error)
      setErrorMsg(error.message)
    }
  }

  useEffect(() => {
    getAllFilms()
  }, [])

  return (
    <div>
      <h1>Studio Ghibli Films</h1>

      <h2>{error}</h2>

      <div className="allFilms">
      {filmData.map((film, index) => {
        return (
          <div className="filmCard">
          <img key={index} src={film.image} alt="film poster" />
          <details>
            <summary key={index}>{film.title}</summary>
            <p key={index}>{film.description}</p>
          </details>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default App
