import React, { useState, useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import MultiStackedBar from "./MultiStackedBar";
import {
  IChartDataPoint,
  MultiStackedBarChart,
  IChartProps,
} from "@fluentui/react-charting";
import api from "../utils/Axios";
import fancyTimeFormat from "../utils/FormatTime";

type Props = {
  title: string;
  author: string;
  description: string;
  duration: number;
  isDone: boolean;
  id: any;
  changeMovieCallback: any;
};

const MovieComponent = (props: Props) => {
  const changeMovieCallback = props.changeMovieCallback;
  const title = props.title;
  const author = props.author;
  const description = props.description;
  const duration = props.duration;
  const isDone = props.isDone;
  const id = props.id;
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(0);

  const handleDelete = () => {
    const params = {
      title: title,
      author: author,
      description: description,
      duration: duration,
      isDone: isDone,
      id: id,
    };

    api.delete("/delete/" + id, { data: params }).then((res) => {
      axios
        .get("http://localhost:8000/movies/", { withCredentials: true })
        .then((res) => {
          const allMovies = res.data.movies;
          changeMovieCallback(allMovies);
          toast.success("Фильм удалён", {
            iconTheme: {
              primary: "#198754",
              secondary: "#fff",
            },
          });
        });
    });
  };

  function generateId(id: any): string | undefined {
    return "#" + id;
  }

  const NAME = "Катя";
  const BEFORE = start;
  const CURRENT = finish - start;
  const AFTER = duration - (CURRENT + BEFORE);

  const dynamicData: IChartDataPoint[] = [
    {
      data: BEFORE,
      color: "#999999",
      yAxisCalloutData: `${fancyTimeFormat(start)}-${fancyTimeFormat(finish)}`,
      placeHolder: true,
    },
    {
      legend: NAME,
      data: CURRENT,
      color: "red",
      yAxisCalloutData: `${fancyTimeFormat(start)}-${fancyTimeFormat(finish)}`,
    },
    {
      data: AFTER,
      color: "#999999",
      yAxisCalloutData: fancyTimeFormat(2000),
      placeHolder: true,
    },
  ];

  return (
    <>
      <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel-{{@index}}"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel-{{@index}}">
                Подтвердите удаление
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Действительно удалить фильм "{title}"?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="confirmClose btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Назад
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleDelete}
                data-bs-dismiss="modal"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <div
          className="card border-success bg-light m-3 col"
          style={{
            width: "clamp(14rem, 16rem, 20rem)",
            height: "clamp(20rem, 22rem, 25rem)",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <MultiStackedBar dynamicData={dynamicData} />

            <small>
              {description} <br /> Автор: {author}
            </small>
            <RangeSlider
              onInput={(value: number[]) => {
                setStart(value[0]);
                setFinish(value[1]);
              }}
              thumbsDisabled={[false, false]}
              id="range-slider"
              step={"any"}
              min={0}
              max={duration}
            />
            <p className="card-text">
              {fancyTimeFormat(start)} — {fancyTimeFormat(finish)}
            </p>
            <a href="#" className="btn btn-success position-relative ">
              Выбрать
            </a>
            <a
              className="btn btn-secondary m-1"
              data-bs-toggle="modal"
              data-bs-target={generateId(id)}
            >
              Удалить
            </a>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              {isDone ? <small>Done</small> : <small>Pending</small>}
            </small>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieComponent;
