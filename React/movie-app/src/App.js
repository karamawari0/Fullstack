import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import api from './api'
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

function App() {
  const [movie, setMovie] = useState('')
  const [num, setNum] = useState(1);
  const getMovie = () => {
    
    
    axios.get('http://127.0.0.1:8000/movies/' + num)
    .then(res => {
      console.log(res.data.description)
      setMovie(res.data.title)
      setNum(num + 1)
    }).catch(err => {
      console.log(err)
      setNum(1)
    })
  }

  return (
    <div className="App">
    <br />
    <br />
    <h1>Привет пацаны</h1>
    <button type="button" class="btn btn-primary" onClick={getMovie}>Нажми</button>
    <h2>Фильмы, которые у нас есть</h2>
    {movie ? <p>{movie}</p> : null}
    <p>Но в целом, какая нафиг разница какая кнопка блин, это же просто кнопка</p>

    </div>
  );
}

export default App;
