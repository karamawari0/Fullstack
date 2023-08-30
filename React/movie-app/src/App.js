import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'range-slider-input/dist/style.css';
import 'react-range-slider-input/dist/style.css';
import MovieComponent from './component/MovieComponent';
import AddMovieComponent from './component/AddMovieComponent';
import BarLoader from "react-spinners/BarLoader";
import toast, { Toaster } from 'react-hot-toast';

import RangeSlider from 'react-bootstrap-range-slider';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const notify = () => toast('Here is your toast.');


function App() {
  const [appState, setAppState] = useState();
  const [value, setValue] = useState(0);

  function ChangeMovieInfo(e) {
    setAppState([e.target.title])
  }

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
        <h1>MOVIE LIST</h1>
        <div class="groupy">
          {appState ? <AddMovieComponent changeMovieCallback={changeMovieCallback} /> : null}
          {appState ? appState.map((movie) => (
            <MovieComponent id={movie.id} title={movie.title} duration={movie.duration} description={movie.description} isDone={movie.isDone} />
          )) :
            <div className='d-flex justify-content-center align-items-center'>
              <BarLoader
                class='m-20'
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
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
