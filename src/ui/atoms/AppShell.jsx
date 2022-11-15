import { useContext } from "react";
import { Grommet, Box, Tabs, Tab } from "grommet";
import { Theme } from "./theme";
import molecules from "../molecules";
const { GameState, GameIncomingMessage } = molecules;

import { GameManagerContext } from "../../App";

export default function AppShell({ children }) {
  const manager = useContext(GameManagerContext);
  const { gameStat, room, gameMessage } = manager.useGameState();

  return (
    <Grommet theme={Theme} full>
      <Box fill direction="row">
        <Box flex>{children}</Box>
        <Box width={"medium"} pad={"medium"} margin={"small"} border round>
          <Tabs alignSelf="start" alignControls="start">
            <Tab className="tab-game-stat" title="state">
              <GameState gameStat={gameStat} room={room} />
            </Tab>
            <Tab title="messages">
              <Box width={"100%"} height={"8em"} overflow={"scroll"}>
                <GameIncomingMessage message={gameMessage} />
              </Box>
            </Tab>

            <Tab title="temp">Add later</Tab>
          </Tabs>
        </Box>
      </Box>
    </Grommet>
  );
}
