import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
);
