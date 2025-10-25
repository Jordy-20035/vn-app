import React from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./App.jsx"; // теперь загружаем обёртку, не просто App
import "./index.css";

createRoot(document.getElementById("root")).render(<AppWrapper />);
