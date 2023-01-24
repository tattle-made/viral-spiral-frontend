import React, { useState, useContext } from "react";
import {
  Box,
  Layer,
  Heading,
  Text,
  Form,
  FormField,
  RadioButtonGroup,
  Button,
  CheckBoxGroup,
} from "grommet";
import { useRecoilState } from "recoil";
import { GameStat, Room } from "../../state";
import { CenteredPopupLayer } from "../atoms/CenteredPopupLayer";
import { GameManagerContext } from "../../App";

export function ActionCancelAffinitySelector({ onAction }) {
  const [room] = useRecoilState(Room);
  const manager = useContext(GameManagerContext);
  const { affinities: affinities = undefined } = room;
  const roomName = room.name;

  const [affinity, setAffinity] = useState(
    Object.keys(affinities).map((affinity) => {
      return { id: affinity, label: affinities[affinity], value: affinity };
    })
  );
  const [selection, setSelection] = useState("");

  const them = room.players.filter((player) => player.name != room.me);
  const me = room.players.filter((player) => player.name === room.me);
  const themNames = them.map((player) => {
    return { label: player.name, id: player.id, value: player.id };
  });
  const [player, setPlayer] = useState("");

  async function performInitiateCancel() {
    console.log({ me, roomName, player, selection });
    if (me[0].name && roomName && player && selection) {
      let payload = {
        game: roomName,
        sender: me[0].name,
        otherId: player,
        topicId: selection,
      };
      await manager.playerAction("initiate_cancel_send_event", payload);
    }
  }

  return (
    <CenteredPopupLayer>
      <Box pad={"small"} height={"fit-content"} width={"large"}>
        <Box direction="column">
          <Heading level={2}>Action Cancel Affinity Selector</Heading>
          <Box flex={"grow"}></Box>
          {affinities ? (
            <Form
              onSubmit={async ({ value }) => {
                await performInitiateCancel();
              }}
            >
              <FormField name="affinity">
                <RadioButtonGroup
                  name="affinity"
                  options={affinity}
                  value={selection}
                  valueKey="id"
                  onChange={(event) => setSelection(event.target.value)}
                ></RadioButtonGroup>
              </FormField>
              <FormField name="player">
                <RadioButtonGroup
                  name="player"
                  options={themNames}
                  value={player}
                  valueKey="id"
                  onChange={(event) => {
                    setPlayer(event.target.value);
                  }}
                />
              </FormField>
              <Button type="submit" label={"Submit"} />
            </Form>
          ) : null}
        </Box>
      </Box>
    </CenteredPopupLayer>
  );
}
