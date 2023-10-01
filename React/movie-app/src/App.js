import React, { useState, useEffect, useContext } from "react";
import "range-slider-input/dist/style.css";
import "react-range-slider-input/dist/style.css";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";
import MovieComponent from "./component/MovieComponent";
import AddMovieComponent from "./component/AddMovieComponent";
import api from "./utils/Axios";
import "./static/css/App.css";

function App() {
  const [appState, setAppState] = useState();
  const [userInfo, setUserInfo] = useState();
  const changeMovieCallback = (value) => setAppState(value);

  useEffect(() => {
    api.get("/movies").then((res) => {
      const allMovies = res.data.movies;
      const user = res.data.user;
      setAppState(allMovies);
      setUserInfo(user);
    });
  }, [setAppState]);

  return (
    <div className="App">
      <br />
      <h1>СПИСОК ФИЛЬМОВ</h1>
      <h3>Привет {userInfo ? userInfo.email : null}!</h3>
      <div className="groupy">
        {appState ? (
          <AddMovieComponent changeMovieCallback={changeMovieCallback} />
        ) : null}
        {appState ? (
          appState.map((movie) => (
            <MovieComponent
              changeMovieCallback={changeMovieCallback}
              key={movie.id}
              id={movie.id}
              title={movie.title}
              author={movie.author}
              duration={movie.duration}
              description={movie.description}
              isDone={movie.isDone}
            />
          ))
        ) : (
          <ClipLoader aria-label="Loading Spinner" data-testid="loader" />
        )}
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
