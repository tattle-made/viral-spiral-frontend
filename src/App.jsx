import React, { useEffect, createContext } from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { pages } from "./ui";
import GameManagerInstance from "./GameManager";
import AppShell from "./ui/atoms/AppShell";
import Rules from "./ui/pages/Rules";
import { WaitingRoom } from "./ui/pages/WaitingRoom";

const { Home, Room, Test } = pages;

export const GameManagerContext = createContext(null);

// todo : remove later when we're not deploying to github pages anymore
const BASE_URL = "/";

const App = () => {
  useEffect(() => {}, []);

  return (
    <React.StrictMode>
      <RecoilRoot>
        <GameManagerContext.Provider value={GameManagerInstance}>
          <BrowserRouter>
            <AppShell>
              <Routes>
                <Route path={`${BASE_URL}`} element={<Home />} />
                <Route path={`${BASE_URL}r/:id`} element={<Room />} />
                <Route path={`${BASE_URL}w/:id`} element={<WaitingRoom />} />
                <Route path={`${BASE_URL}rules`} element={<Rules />} />
                <Route path={`${BASE_URL}test`} element={<Test />} />
              </Routes>
            </AppShell>
          </BrowserRouter>
        </GameManagerContext.Provider>
      </RecoilRoot>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
