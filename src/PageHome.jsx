import React from "react";
import { Box, Text, TextInput, Button } from "grommet";
import { Link, useNavigate } from "react-router-dom";

const PageHome = () => {
  const navigate = useNavigate();
  return (
    <Box
      fill
      direction={"row-responsive"}
      gap={"medium"}
      alignContent={"center"}
      justify={"center"}
    >
      <Box width={"small"} justify="center">
        <Box gap={"small"}>
          <TextInput placeholder={"Room"}></TextInput>
          <TextInput placeholder={"Players"}></TextInput>
          <Button label={"Create Room"}></Button>
        </Box>
      </Box>
      <Box justify="center">
        <Text weight={400}>or</Text>
      </Box>
      <Box width={"small"} gap={"small"} justify="center">
        <TextInput placeholder={"Room"} />
        <TextInput placeholder={"Player name"} />
        <Button label={"Join Room"} onClick={() => navigate("/room")}></Button>
      </Box>
    </Box>
  );
};

export default PageHome;
