import { useContext } from "react";
import { Grommet, Box, Tabs, Tab, Stack, Layer, Spinner, Text } from "grommet";
import { Theme } from "./theme";
import molecules from "../molecules";
const { GameState, GameIncomingMessage } = molecules;

import { GameManagerContext } from "../../App";
import { useNotification } from "../../state/notification";

export default function AppShell({ children }) {
  const manager = useContext(GameManagerContext);
  const env = import.meta.env.MODE;
  const { notification } = useNotification();
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
      </Box>
    </Grommet>
  );
}
