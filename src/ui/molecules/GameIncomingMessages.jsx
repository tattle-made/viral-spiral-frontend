import React from "react";
import { Box, Text } from "grommet";

const GameIncomingMessage = ({ message }) => {
  return (
    <Box>
      <Box height="2em"></Box>
      <Box flex="grow" overflow={"hidden"}>
        {message.map((item, ix) => (
          <Box key={ix} margin={{ bottom: "1em" }}>
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GameIncomingMessage;
