import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      <ToastContainer />
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
