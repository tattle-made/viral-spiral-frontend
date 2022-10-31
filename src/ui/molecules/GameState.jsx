import React from "react";
import { Box, Text } from "grommet";

const GameState = ({ gameStat, room }) => {
  return (
    <Box>
      <Box height="2em"></Box>
      <Text weight="500">Game Stat</Text>
      <Box>{JSON.stringify(gameStat, null, 2)}</Box>
      <Text weight="500">Room</Text>
      <Box>{JSON.stringify(room, null, 2)}</Box>
    </Box>
  );
};

export default GameState;
