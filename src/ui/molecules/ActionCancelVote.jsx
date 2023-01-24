import React, { useContext, useState } from "react";
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
import { GameStat, Room } from "../../state";
import { CenteredPopupLayer } from "../atoms/CenteredPopupLayer";
import { StateGameMode } from "../../state/mode";
import { GameManagerContext } from "../../App";

export function ActionCancelVote({ onAction }) {
  const manager = useContext(GameManagerContext);
  const [room] = useRecoilState(Room);
  const [gameStat] = useRecoilState(GameStat);
  const me = room.players.filter((player) => player.name === room.me);

  const [mode] = useRecoilState(StateGameMode);

  const [vote, setVote] = useState(undefined);

  async function performVoteCancel() {
    const { payload } = mode;
    const { cancelStatusId, against } = payload;
    const roomName = room.name;
    const sender = me[0].name;
    if (vote && cancelStatusId && against && roomName && sender) {
      let actionPayload = {
        game: roomName,
        sender,
        cancelStatusId,
        vote: vote === "yes" ? true : false,
      };
      const { status } = await manager.playerAction(
        "vote_cancel",
        actionPayload
      );
      console.log({ STATUS: status });
      if (status === 200) {
        manager.gameState().mode.reset();
        manager.notification.reset();
      } else {
        manager.notification.add("Error");
      }
    }
  }

  return (
    <CenteredPopupLayer>
      <Box pad={"small"} height={"fit-content"} width={"large"}>
        <Heading level={2}>{`Vote to Cancel ${mode.payload.against}`}</Heading>
        <Box direction="row">
          <Form
            onSubmit={async ({ value }) => {
              console.log(value);
              await performVoteCancel();
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
