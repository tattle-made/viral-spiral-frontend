import { useContext, useEffect } from "react";
import { Grommet, Box, Tabs, Tab, Stack, Layer, Spinner, Text } from "grommet";
import { Theme } from "./theme";
import molecules from "../molecules";
const { GameState, GameIncomingMessage } = molecules;
import { GameManagerContext } from "../../App";
import { useNotification } from "../../state/notification";
import { useLocation } from "react-router-dom";

export default function AppShell({ children }) {
  const manager = useContext(GameManagerContext);
  const { gameStat, room, gameMessage } = manager.useGameState();
  const env = import.meta.env.MODE;
  const { notification } = useNotification();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  });

  // console.log({ env });

  return (
    <Grommet theme={Theme} full>
      <Box fill direction="row">
        <Box flex>{children}</Box>

        {/* add layer here */}

        {notification.length != 0 ? (
          <Layer
            modal={false}
            background={{ color: "neutral-4" }}
            position={"top"}
            margin={"small"}
            animation={false}
          >
            <Box pad={"small"}>
              {notification.map((message, ix) => {
                if (message === "loading") {
                  return (
                    <Box
                      key={ix}
                      direction="row"
                      gap={"medium"}
                      align={"center"}
                    >
                      <Spinner />
                      <Text size={"2em"}>{message}</Text>
                    </Box>
                  );
                } else {
                  return (
                    <Text key={ix} size={"2em"}>
                      {message}
                    </Text>
                  );
                }
              })}
            </Box>
          </Layer>
        ) : null}

        {true ? (
          <Layer
            modal={false}
            background={{ color: "#ffffff00" }}
            position={"right"}
            margin={"small"}
            animation={false}
            full={"vertical"}
          >
            <Box
              width={"fit-content"}
              height={"4em"}
              pad={"medium"}
              margin={"small"}
              round
              background={"#7C804ECC"}
              alignSelf={"start"}
              overflow="hidden"
            >
              {/* <Tabs alignSelf="start" alignControls="start">
              <Tab className="tab-game-stat" title="state">
                <GameState gameStat={gameStat} room={room} />
              </Tab>
              <Tab title="messages">
                <Box width={"100%"} fill={"vertical"} overflow={"scroll"}>
                  <GameIncomingMessage message={gameMessage} />
                </Box>
              </Tab>
            </Tabs> */}
              <Box width={"100%"} height={"20em"}>
                <GameIncomingMessage message={gameMessage} />
              </Box>
            </Box>
          </Layer>
        ) : null}
      </Box>
    </Grommet>
  );
}
