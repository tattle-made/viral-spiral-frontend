import React, { useContext } from "react";
import { useRecoilState } from "recoil";
import { GameStat } from "../../state";
import { Layer, Box, Heading, Text, Button } from "grommet";
import { ModeGame, StateGameMode } from "../../state/mode";
import { GameManagerContext } from "../../App";
import { useNavigate } from "react-router-dom";

export function EndGameSplashScreen() {
  const manager = useContext(GameManagerContext);
  const [gameStat] = useRecoilState(GameStat);
  const navigate = useNavigate();

  const [mode] = useRecoilState(StateGameMode);
  const { id } = mode;

  function ok() {
    manager.gameState().reset();
    navigate("/");
  }

  return (
    <Box>
      {id === ModeGame.FINISHED ? (
        <Layer
          modal={false}
          background={{ opacity: true, clip: "border-box" }}
          position={"center"}
          animation={false}
        >
          <Box pad={"small"} height={"fit-content"} width={"large"}>
            {id === ModeGame.FINISHED ? (
              <Box>
                {" "}
                <Heading level={3}>Game Finished</Heading>
                <Text>
                  Your Game Master will walk you through the results and how
                  your actions impacted the world
                </Text>
                <Box height="2em" />
                <Button label={"OK"} onClick={ok} fill={false} />
              </Box>
            ) : null}
          </Box>
        </Layer>
      ) : null}
    </Box>
  );
}
