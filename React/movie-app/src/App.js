import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'range-slider-input/dist/style.css';
import 'react-range-slider-input/dist/style.css';
import MovieComponent from './component/MovieComponent';
import AddMovieComponent from './component/AddMovieComponent';
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from 'react-hot-toast';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


function App() {
  const [appState, setAppState] = useState();
  const changeMovieCallback = (value) => setAppState(value);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/movies/';
    axios.get(apiUrl).then((res) => {
      const allMovies = res.data;
      setAppState(allMovies);
    });
  }, [setAppState]);

  console.log(appState)

  return (
    <div className="App">
      <>
        <br />
        <h1>СПИСОК ФИЛЬМОВ</h1>

        <div className="groupy">
          {appState ? <AddMovieComponent changeMovieCallback={changeMovieCallback} /> : null}
          {appState ? appState.map((movie) => (
            <MovieComponent changeMovieCallback={changeMovieCallback} key={movie.id} id={movie.id} title={movie.title} author={movie.author} duration={movie.duration} description={movie.description} isDone={movie.isDone} />
          )) :

            <ClipLoader
              aria-label="Loading Spinner"
              data-testid="loader"
            />

          }
        </div>

        <div>

          <Toaster />
        </div>
      </>
    </div>
  );
}

export default App;
