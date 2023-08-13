import React from "react";
import "./index.css";
import App from "./App/App.jsx";
import { createRoot } from "react-dom/client";

const appEl = document.getElementById("app");
createRoot(appEl).render(<App />);
