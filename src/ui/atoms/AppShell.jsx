import { useContext } from "react";
import { Grommet, Box, Tabs, Tab, Stack } from "grommet";
import { Theme } from "./theme";
import molecules from "../molecules";
const { GameState, GameIncomingMessage } = molecules;

import { GameManagerContext } from "../../App";

export default function AppShell({ children }) {
  const manager = useContext(GameManagerContext);
  const { gameStat, room, gameMessage } = manager.useGameState();
  const env = import.meta.env.MODE;
  console.log({ env });

  return (
    <Grommet theme={Theme} full>
      <Box fill direction="row">
        <Box flex>{children}</Box>
        {env === "development" || env === undefined ? (
          <Box width={"medium"} pad={"medium"} margin={"small"} border round>
            <Tabs alignSelf="start" alignControls="start">
              <Tab className="tab-game-stat" title="state">
                <GameState gameStat={gameStat} room={room} />
              </Tab>
              <Tab title="messages">
                <Box width={"100%"} fill={"vertical"} overflow={"scroll"}>
                  <GameIncomingMessage message={gameMessage} />
                </Box>
              </Tab>
            </Tabs>
          </Box>
        ) : null}
        {env === "production" ? (
          <Box width={"medium"} pad={"medium"} margin={"small"} border round>
            <Box width={"100%"} fill={"vertical"} overflow={"scroll"}>
              <GameIncomingMessage message={gameMessage} />
            </Box>
          </Box>
        ) : null}
      </Box>
    </Grommet>
  );
}
