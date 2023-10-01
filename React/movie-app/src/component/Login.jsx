import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserProvider";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/Axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    login();
  }

  async function login() {
    const formData = new FormData();
    formData.set("username", email);
    formData.set("password", password);

    api
      .post("auth/jwt/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/movies");
      })
      .catch((error) => {
        toast.error("Неправильный пользователь или пароль");
      });
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Аутентификация {user}</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Укажите почту"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Пароль</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-success">
              Войти
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Забыли <a href="#">пароль?</a>
          </p>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;
