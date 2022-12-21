import React from "react";
import { Box, Text } from "grommet";
import ReactJson from "react-json-view";
import { useRecoilState } from "recoil";
import { StateGameMode } from "../../state/mode";

const GameState = ({ gameStat, room }) => {
  const [mode] = useRecoilState(StateGameMode);

  return (
    <Box>
      <Box height={"0.8em"} />

      <ReactJson
        src={{
          state: gameStat,
          mode,
          room,
        }}
        collapsed={false}
      />
    </Box>
  );
};

export default GameState;
