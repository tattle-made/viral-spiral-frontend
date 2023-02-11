import React, { useState, useContext } from "react";
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
import { GameManagerContext } from "../../App";

export function ActionViralSpiralSelectPlayers({ onAction, payload }) {
  const [room] = useRecoilState(Room);
  const [state] = useRecoilState(GameStat);
  const manager = useContext(GameManagerContext);

  const them = room.players.filter((player) => player.name != room.user);
  const me = room.players.filter((player) => player.name === room.user);
  const roomName = room.name;
  const card = state.card;

  // const cardId = state.card.cardInstanceId;
  const themNames = them.map((player) => {
    return { label: player.name, id: player.id };
  });

  const [players, setPlayers] = useState([]);

  async function performViralSpiral(to) {
    if ((to && me[0].name && roomName, card.cardInstanceId)) {
      let payload = {
        game: roomName,
        sender: me[0].name,
        cardId: card.cardInstanceId,
        players,
      };
      await manager.playerAction("viral_spiral_call", payload);
      manager.gameState().mode.reset();
    }
  }

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
                performViralSpiral(value.players);
              }}
            >
              <FormField name="players">
                <CheckBoxGroup
                  name="players"
                  options={themNames}
                  value={players}
                  valueKey="id"
                  onChange={({ value, options }) => {
                    console.log(themNames);
                    setPlayers(value);
                  }}
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
