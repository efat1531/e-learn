import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import "./css/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  </Provider>
);
