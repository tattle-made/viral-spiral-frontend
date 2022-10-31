import React, { useEffect, createContext } from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { pages } from "./ui";
import GameManagerInstance from "./GameManager";
import AppShell from "./ui/atoms/AppShell";

const { Home, Room, Test } = pages;

export const GameManagerContext = createContext(null);

const App = () => {
  useEffect(() => {}, []);

  return (
    <React.StrictMode>
      <RecoilRoot>
        <GameManagerContext.Provider value={GameManagerInstance}>
          <AppShell>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room" element={<Room />} />
                <Route path="/test" element={<Test />} />
              </Routes>
            </BrowserRouter>
          </AppShell>
        </GameManagerContext.Provider>
      </RecoilRoot>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
