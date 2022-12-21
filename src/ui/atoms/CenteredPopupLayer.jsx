import React from "react";
import { Layer, Box, Stack, Button } from "grommet";
import { XCircle } from "react-feather";
import { useRecoilState } from "recoil";
import { ModeGameDefault, StateGameMode } from "../../state/mode";

export function CenteredPopupLayer({ children }) {
  const [_, setMode] = useRecoilState(StateGameMode);

  return (
    <Stack anchor={"right"}>
      <Layer
        modal={false}
        background={{ opacity: true, clip: "border-box" }}
        position={"center"}
        animation={false}
      >
        <Box fill align={"end"}>
          <Button
            icon={<XCircle size={40} />}
            onClick={() => {
              setMode(ModeGameDefault);
            }}
          />
        </Box>
        {children}
      </Layer>
    </Stack>
  );
}
