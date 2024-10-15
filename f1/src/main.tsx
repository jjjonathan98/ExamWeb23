/*
  Entry point for the React application. This file renders the App component into the root DOM element.
  It includes global CSS and Bootstrap CSS/JS for styling and layout. The app is wrapped in React.StrictMode
  to highlight potential problems in an application and help with debugging during development.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // Global CSS file for the application.
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS for styling.
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS for interactice components.

// Render the App component into the root DOM element. With React.StrictMode for better debugging.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
