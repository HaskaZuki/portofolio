import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(new URL('./service-worker.js', import.meta.url))
      .then(() => {})
      .catch(() => {});
  });
}
