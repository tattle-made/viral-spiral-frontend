import React, { useState } from "react";
import {
  Box,
  Layer,
  Heading,
  Text,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
} from "grommet";
import { useRecoilState } from "recoil";
import { GameStat, Room } from "../../state";
import { CenteredPopupLayer } from "../atoms/CenteredPopupLayer";
import { ModeGame } from "../../state/mode";

export function ActionViralSpiralSelectPlayers({ onAction, payload }) {
  const [room] = useRecoilState(Room);

  const them = room.players.filter((player) => player.name != room.me);
  const themNames = them.map((player) => {
    return { label: player.name, id: `${Math.floor(Math.random() * 4000)}` };
  });

  const [themOptions, setThemOptions] = useState([
    { label: "hi", id: "asdf-1" },
    { label: "hello", id: "asdf-2" },
  ]);

  const [value, setValue] = useState({});

  return (
    <CenteredPopupLayer>
      <Box pad={"small"} height={"fit-content"} width={"large"}>
        <Box direction="column">
          <Heading level={2}>Viral Spiral</Heading>
          <Text>Send Card To</Text>
          <Box flex={"grow"}></Box>
          <Box direction={"row-responsive"}>
            <Form
              onSubmit={({ value }) => {
                console.log(value);
              }}
            >
              <FormField name="players">
                <CheckBoxGroup
                  name="players"
                  options={themOptions}
                  valueKey={"id"}
                />
              </FormField>
              <Button type={"submit"} label={"Send"} width="start"></Button>
            </Form>
          </Box>
        </Box>
      </Box>
    </CenteredPopupLayer>
  );
}
