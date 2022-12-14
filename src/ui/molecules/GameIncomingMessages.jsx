import React from "react";
import { Box, Text } from "grommet";

const GameIncomingMessage = ({ message }) => {
  return (
    <Box fill>
      <Box height="2em"></Box>
      <Box flex="grow" overflow={"scroll"}>
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
