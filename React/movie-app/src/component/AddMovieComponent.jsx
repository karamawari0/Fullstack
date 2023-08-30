import React, { useState, useEffect } from "react";
import RangeSlider from 'react-range-slider-input';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let result = "";
    if (hrs > 0) {
        result += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    result += "" + mins + ":" + (secs < 10 ? "0" : "");
    result += "" + secs;
    return result;
}


const AddMovieComponent = ({ changeMovieCallback }) => {
    const [value, setValue] = useState(0);
    const [finish, setFinish] = useState('0:00')
    const [author, setAuthor] = useState('');
    const [data, setData] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = 'http://127.0.0.1:8000/create_movie/';
        const movie = {
            title: form.title,
            author: form.author,
            description: form.description,
            duration: value[1],
            isDone: false,
        };
        axios.post(apiUrl, movie).then((res) => {
            document.getElementById('closeModal').click();

            axios.get('http://127.0.0.1:8000/movies/').then((res) => {
                const allMovies = res.data;
                changeMovieCallback(allMovies);

                toast.success('Новый фильм добавлен!', {
                    iconTheme: {
                        primary: '#198754',
                        secondary: '#fff',
                    },
                });

            });

        });

    };


    const [form, setForm] = React.useState({
        title: '',
        author: '',
        description: '',
        duration: 0,
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };


    return (
        <div className="d-flex">
            <div className="card bg-success m-3 col text-white" style={{ width: 'clamp(14rem, 16rem, 20rem)', height: 'clamp(20rem, 22rem, 25rem);' }}>
                <div className="card-body">
                    <h5 className="card-title">ADD NEW</h5>
                    <br />
                    <a href="#" className="btn btn-success position-relative" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8rem" height="8rem" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </a>
                </div>

            </div>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add new movie here</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={handleSubmit} >
                            <div className="modal-body">

                                <div className="form-floating mb-3">
                                    <input className="form-control" id="title" placeholder="name@example.com" value={form.title} onChange={handleChange}></input>
                                    <label htmlFor="title">Название</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input className="form-control" id="author" placeholder="name@example.com" value={form.author} onChange={handleChange}></input>
                                    <label htmlFor="author">Автор</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="description" placeholder="Описание" rows='6' value={form.description} onChange={handleChange}></textarea>
                                    <label htmlFor="description">Описание</label>
                                </div>

                                <h5>Duration {finish}</h5>

                                <RangeSlider
                                    onInput={(value) => { setFinish(fancyTimeFormat(value[1])); setValue(value) }}
                                    value={form.duration}
                                    thumbsDisabled={[true, false]}
                                    tooltip="on"
                                    tooltipPlacement="top"
                                    id="range-slider"
                                    step={"any"}
                                    min={0}
                                    max={4800}
                                    rangeSlideDisabled="true"
                                />


                            </div>
                            <div className="modal-footer">
                                <button type="button" id="closeModal" className="btn btn-secondary" data-bs-dismiss="modal">Выйти</button>
                                <button type="submit" className="btn btn-success" >Создать</button>
                            </div>
                        </form>
                    </div>



                </div>
            </div>
        </div >
    );
};

export default AddMovieComponent;