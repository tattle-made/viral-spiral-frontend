import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Layer,
  Heading,
  Text,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
  Stack,
  Image,
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
  const [cards, setCards] = useState(undefined);

  const them = room.players.filter((player) => player.name != room.user);
  const me = room.players.filter((player) => player.name === room.user);
  const roomName = room.name;
  const card = state.card;

  // const cardId = state.card.cardInstanceId;
  const themNames = them.map((player) => {
    return { label: player.name, id: player.id };
  });

  const [players, setPlayers] = useState([]);
  const [selectedCard, setSelectedCard] = useState(undefined);

  useEffect(() => {
    (async function getHand() {
      const me = room.players.filter((player) => player.name === room.user);
      const game = room.name;
      if (game && me[0]) {
        const hand = await manager.getHand({ game, player: me[0].id });
        setCards(hand);
      }
    })();
  }, []);

  async function performViralSpiral(to) {
    if ((to && me[0].name && roomName, selectedCard)) {
      let payload = {
        game: roomName,
        sender: me[0].name,
        cardId: selectedCard,
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
          <Heading level={2} margin={"none"}>
            Send a card to multiple players
          </Heading>
          <Box overflow={"auto"} direction="row-responsive" gap={"small"}>
            {cards &&
              cards.map((card) => (
                <Box
                  width={"6em"}
                  height={"10em"}
                  round={"small"}
                  onClick={() => {
                    console.log(card.card_instance_id);
                    setSelectedCard(card.card_instance_id);
                  }}
                >
                  <Stack anchor="bottom">
                    <Box width={"6em"} height={"10em"} round={"small"}>
                      <Image
                        fit="contain"
                        src={
                          card.image === ""
                            ? "/card_empty.png"
                            : `https://s3.ap-south-1.amazonaws.com/media.viralspiral.net/${card.image}`
                        }
                      />
                    </Box>

                    <Box
                      flex={"grow"}
                      width={"6em"}
                      height="fit-content"
                      background={"#46464688"}
                      round={"small"}
                      overflow={"hidden"}
                    >
                      <Box margin={"xsmall"}>
                        <Text size="xsmall" color="#ffffff">
                          {card.title}
                        </Text>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              ))}
          </Box>

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
