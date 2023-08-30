import React, { useState } from "react";
import RangeSlider from 'react-range-slider-input';
import axios from 'axios';

function fancyTimeFormat(duration: number): string {
  // Hours, minutes and seconds
  const hrs: number = ~~(duration / 3600);
  const mins: number = ~~((duration % 3600) / 60);
  const secs: number = ~~duration % 60;
  // Output like "1:01" or "4:03:59" or "123:03:59"
  let result = "";
  if (hrs > 0) {
    result += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  result += "" + mins + ":" + (secs < 10 ? "0" : "");
  result += "" + secs;
  return result;
}

type Props = {
  title: string,
  description: string,
  duration: number,
  isDone: boolean,
  id: number
}

const MovieComponent = (props: Props) => {
  const title = props.title;
  const description = props.description;
  const duration = props.duration;
  const isDone = props.isDone;
  const id = props.id;
  const [start, setStart] = useState('0:00')
  const [finish, setFinish] = useState('0:00')

  console.log(id)

  const handleDelete = () => {
    const apiUrl = 'http://127.0.0.1:8000/delete/' + id;
    const params = { id: id };

    axios.delete(apiUrl, { data: params }).then((res) => {
      console.log('success')
    });

  }


  return (
    <div className="d-flex">
      <div className="card border-success bg-light m-3 col" style={{ width: 'clamp(14rem, 16rem, 20rem)', height: 'clamp(20rem, 22rem, 25rem);' }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <small>{description} <br /> Duration {fancyTimeFormat(duration)}</small>
          <RangeSlider
            onInput={(value: number[]) => { setStart(fancyTimeFormat(value[0])); setFinish(fancyTimeFormat(value[1])) }}
            thumbsDisabled={[false, false]}
            id="range-slider"
            step={"any"}
            min={0}
            max={duration}
          />
          <p className="card-text">{start} — {finish}</p>
          <a href="#" className="btn btn-success position-relative ">Выбрать</a>
          <a className="btn btn-secondary m-1" onClick={handleDelete}>Удалить</a>
        </div>
        <div className="card-footer">
          <small className="text-muted">{isDone ? <small>Done</small> : <small>Pending</small>}</small>
          <br />
          <small>My id: {id}</small>
        </div>
      </div>
    </div >
  );
};

export default MovieComponent;