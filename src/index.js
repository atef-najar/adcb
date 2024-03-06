import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UseCase2Sample from "./usecase2-aipoweredchat/sample.js";
import UseCase2Final from "./usecase2-aipoweredchat/final.js";
import UseCase3Sample from "./usecase3-emailautomation/sample.js";
import UseCase3Final from "./usecase3-emailautomation/final.js";
import UseCase5Final from "./usecase5-codeassistant/final.js";
import UseCase5Sample from "./usecase5-codeassistant/sample.js";
import Sidebar from "./components/Sidebar";
import routes from "./constants/Routes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path={routes.home.route} element={<App />} />
        <Route
          path={routes.useCase2Sample.route}
          element={<UseCase2Sample />}
        />
        <Route path={routes.useCase2Final.route} element={<UseCase2Final />} />
        <Route
          path={routes.useCase3Sample.route}
          element={<UseCase3Sample />}
        />
        <Route path={routes.useCase3Final.route} element={<UseCase3Final />} />
        <Route
          path={routes.useCase5Sample.route}
          element={<UseCase5Sample />}
        />
        <Route path={routes.useCase5Final.route} element={<UseCase5Final />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
