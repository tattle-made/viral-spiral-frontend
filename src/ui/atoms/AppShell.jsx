import { useContext } from "react";
import { Grommet, Box, Tabs, Tab, Stack, Layer, Spinner, Text } from "grommet";
import { Theme } from "./theme";
import molecules from "../molecules";
const { GameState, GameIncomingMessage } = molecules;

import { GameManagerContext } from "../../App";
import { useNotification } from "../../state/notification";

export default function AppShell({ children }) {
  const manager = useContext(GameManagerContext);
  const { gameStat, room, gameMessage } = manager.useGameState();
  const env = import.meta.env.MODE;
  const { notification } = useNotification();
  // console.log({ env });

  return (
    <Grommet theme={Theme} full>
      <Box fill direction="row">
        <Box flex>{children}</Box>
        <Layer
          modal={false}
          background={{ color: "#ffffff00" }}
          position={"right"}
          margin={"small"}
          animation={false}
          full={"vertical"}
        >
          {true || env === "development" || env === undefined ? (
            <Box
              width={"medium"}
              fill={"vertical"}
              pad={"medium"}
              margin={"small"}
              round
              background={"#f3f3f3"}
              alignSelf={"right"}
            >
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
          {false && env === "production" ? (
            <Box width={"medium"} pad={"medium"} margin={"small"} border round>
              <Box width={"100%"} fill={"vertical"} overflow={"scroll"}>
                <GameIncomingMessage message={gameMessage} />
              </Box>
            </Box>
          ) : null}
        </Layer>
        {notification.length != 0 ? (
          <Layer
            modal={false}
            background={{ color: "neutral-4" }}
            position={"top"}
            margin={"small"}
            animation={false}
          >
            <Box pad={"small"}>
              {notification.map((message) => {
                if (message === "loading") {
                  return (
                    <Box direction="row" gap={"medium"} align={"center"}>
                      <Spinner />
                      <Text size={"2em"}>{message}</Text>
                    </Box>
                  );
                } else {
                  return <Text size={"2em"}>{message}</Text>;
                }
              })}
            </Box>
          </Layer>
        ) : null}
      </Box>
    </Grommet>
  );
}
