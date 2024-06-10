import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./hooks/useUser.jsx";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
        <Toaster />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
