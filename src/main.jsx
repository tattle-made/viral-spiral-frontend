import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Grommet } from "grommet";
import PageHome from "./PageHome";
import PageGameRoom from "./PageGameRoom";
import Theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Grommet theme={Theme} full>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="room" element={<App />} />
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </Grommet>
  </React.StrictMode>
);
