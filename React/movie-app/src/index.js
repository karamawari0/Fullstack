import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./component/Login";
import { UserProvider } from "./utils/UserProvider";
import "./static/css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/movies" element={<App />} />
          <Route path="/auth" element={<Login />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
