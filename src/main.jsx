import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FoodProvider } from "./context/FoodDelivery";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FoodProvider>
      <App />
    </FoodProvider>
  </BrowserRouter>
);