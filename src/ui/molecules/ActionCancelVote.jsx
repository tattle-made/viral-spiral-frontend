import React, { useState } from "react";
import {
  Box,
  Layer,
  Heading,
  Form,
  FormField,
  RadioButtonGroup,
  Button,
} from "grommet";
import { useRecoilState } from "recoil";
import { GameStat } from "../../state";
import { CenteredPopupLayer } from "../atoms/CenteredPopupLayer";
import { StateGameMode } from "../../state/mode";

export function ActionCancelVote({ onAction }) {
  const [gameStat] = useRecoilState(GameStat);

  const [mode] = useRecoilState(StateGameMode);

  const [vote, setVote] = useState(undefined);

  return (
    <CenteredPopupLayer>
      <Box pad={"small"} height={"fit-content"} width={"large"}>
        <Heading level={2}>{`Vote to Cancel ${mode.payload.against}`}</Heading>
        <Box direction="row">
          <Form
            onSubmit={({ value }) => {
              console.log(value);
            }}
          >
            <FormField name="vote">
              <RadioButtonGroup
                name="vote"
                options={["yes", "no"]}
                onChange={(event) => {
                  setVote(event.target.value);
                }}
              ></RadioButtonGroup>
            </FormField>
            <Button
              disabled={vote === undefined}
              type="submit"
              label={"Vote"}
            />
          </Form>
        </Box>
      </Box>
    </CenteredPopupLayer>
  );
}
