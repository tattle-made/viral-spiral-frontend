import React, { useEffect } from "react";
import { Box, Layer, Heading } from "grommet";
import { useRecoilState } from "recoil";
import { GameStat } from "../../state";
import { CenteredPopupLayer } from "../atoms/CenteredPopupLayer";
import { Messages } from "../../socket";
import { StateGameMode } from "../../state/mode";

export function ActionEncylopedia({ onAction }) {
  const [gameStat] = useRecoilState(GameStat);
  const [mode] = useRecoilState(StateGameMode);
  const { id, payload } = mode;

  return (
    <CenteredPopupLayer>
      <Box pad={"small"} height={"fit-content"} width={"large"}>
        <Box direction="row">
          <Heading level={2}>Encyclopaedia</Heading>
          <Box flex={"grow"}></Box>
          {/* <Button onClick={closeEncyclopaedia}>X</Button> */}
        </Box>
        <Box>
          {payload ? (
            <Box>
              <Text weight={"bold"}>{payload.title}</Text>
              <Text>{payload.content}</Text>
            </Box>
          ) : null}
        </Box>
      </Box>
    </CenteredPopupLayer>
  );
}
