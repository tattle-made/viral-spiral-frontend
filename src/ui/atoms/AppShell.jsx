import { useContext, useEffect } from "react";
import {
  Grommet,
  Box,
  Tabs,
  Tab,
  Stack,
  Layer,
  Spinner,
  Text,
  ResponsiveContext,
} from "grommet";
import { Theme } from "./theme";
import molecules from "../molecules";
const { GameState, GameIncomingMessage } = molecules;
import { GameManagerContext } from "../../App";
import { useNotification } from "../../state/notification";
import { useLocation } from "react-router-dom";

function GameMessages({ gameMessage }) {
  const size = useContext(ResponsiveContext);
  return gameMessage.length != 0 ? (
    <Layer
      modal={false}
      background={{ color: "#ffffff00" }}
      position={"left"}
      animation={false}
      full={true}
    >
      <Box
        width={size == "small" || size == "xsmall" ? "100%" : "fit-content"}
        height={"fit-content"}
        pad={"medium"}
        margin={"small"}
        round
        background={"#7C804E"}
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

        <GameIncomingMessage message={gameMessage} />
      </Box>
    </Layer>
  ) : null;
}

export default function AppShell({ children }) {
  const manager = useContext(GameManagerContext);
  const { gameStat, room, gameMessage } = manager.useGameState();
  const env = import.meta.env.MODE;
  const { notification } = useNotification();
  const location = useLocation();

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
        <GameMessages gameMessage={gameMessage} />
      </Box>
    </Grommet>
  );
}
