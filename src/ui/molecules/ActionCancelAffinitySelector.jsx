import React, { useState, useContext, useEffect } from "react";
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
  Paragraph,
} from "grommet";
import { useRecoilState } from "recoil";
import { GameStat, Room } from "../../state";
import { CenteredPopupLayer } from "../atoms/CenteredPopupLayer";
import { GameManagerContext } from "../../App";
import { Messages } from "../../socket";

export function ActionCancelAffinitySelector({ onAction }) {
  const [room] = useRecoilState(Room);
  const manager = useContext(GameManagerContext);
  const { affinities: affinities = undefined } = room;
  const roomName = room.name;

  console.log({ affinities });

  const [affinity, setAffinity] = useState(
    Object.keys(affinities).map((affinity) => {
      return { id: affinity, label: affinities[affinity], value: affinity };
    })
    // .filter((affinity) => affinity.value >= 0)
  );
  const [selection, setSelection] = useState("");

  const them = room.players.filter((player) => player.name != room.user);
  const me = room.players.filter((player) => player.name === room.user);
  const themNames = them.map((player) => {
    return { label: player.name, id: player.id, value: player.id };
  });
  const [player, setPlayer] = useState("");

  useEffect(() => {
    (async function cancelMetadata() {
      let payload = {
        game: roomName,
        sender: me[0].name,
      };
      let message = Messages.make.metadataCancel(payload);
      const metadata = await manager.client.messageWithAck(message);
      console.log(metadata);
    })();
  }, []);

  async function performInitiateCancel() {
    console.log({ me, roomName, player, selection });
    if (me[0].name && roomName && player) {
      manager.notification.add("Initiating Cancel");
      try {
        let payload = {
          game: roomName,
          sender: me[0].name,
          otherId: player,
          topicId: selection,
        };
        var message = Messages.make.actionInitiateCancelPlayer(payload);
        await manager.client.messageWithAck(message);
        manager.gameState().mode.reset();
        manager.notification.reset();
      } catch (err) {
        manager.notification.add("Error Initiating Cancel");
        setTimeout(() => {
          this.notification.reset();
        }, 1500);
      }
    }
  }

  return (
    <CenteredPopupLayer>
      <Box pad={"small"} height={"fit-content"} width={"large"}>
        <Box direction="column">
          <Heading level={2} margin={"none"}>
            Cancel Someone
          </Heading>
          <Paragraph fill={true} margin={"none"}>
            When you cancel a player, they lose a turn
          </Paragraph>
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
