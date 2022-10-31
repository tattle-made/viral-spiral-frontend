import { useContext } from "react";
import { Box, Button } from "grommet";
import { GameManagerContext } from "../../App";

const Test = () => {
  const manager = useContext(GameManagerContext);
  const { gameStat } = manager.useGameStat();

  return (
    <Box direction={"column"} gap={"medium"} width={"small"}>
      <Button
        onClick={() => {
          console.log("connecting to server");
          manager.setup();
        }}
        label="connect"
      />
      <Button
        onClick={() => {
          console.log("creating room");
        }}
        label="create"
      />
      <Button
        onClick={() => {
          console.log("joining room");
        }}
        label="join"
      />
      <Button
        onClick={() => {
          console.log("playing card ");
        }}
        label="play card"
      />
    </Box>
  );
};

export default Test;
