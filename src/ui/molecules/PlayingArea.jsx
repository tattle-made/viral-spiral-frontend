import React, { useContext, useRef } from "react";
import { Heading, Box, Text, Image, Button, Stack, Tip } from "grommet";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRecoilState } from "recoil";
import { GameStat, Room } from "../../state";
import { GameManagerContext } from "../../App";
import { useState } from "react";
import { useEffect } from "react";
import { pallette } from "../atoms/theme";
import { animated, useSpring } from "@react-spring/web";
import useSize from "@react-hook/size";
import CardDeck from "../atoms/CardDeck";
import AbsoluteBox from "../atoms/AbsoluteBox";

import { useNotification } from "../../state/notification";
import BiasIndicator from "../atoms/BiasIndicator";
import PlayerScoreCard from "../atoms/PlayerScoreCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import PlayerScoreCardMinimal from "../atoms/PlayerScoreCardMinimal";

const PlayingArea = () => {
  // game room variables
  const manager = useContext(GameManagerContext);
  const { gameStat } = manager.useGameState();
  const [me, setMe] = useState(undefined);
  const [them, setThem] = useState(undefined);
  const { notification, add } = useNotification();
  const [room, setRoom] = useRecoilState(Room);

  // layout variables
  const [positions, setPositions] = useState(undefined);

  // card and player action options
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const { players } = room;
    if (players) {
      const me = players.filter((player) => player.name === room.user)[0];
      const them = players.filter((player) => player.name != room.user);

      setMe(me);
      setThem(them);
    } else {
      setMe(undefined);
      setThem(undefined);
    }
  }, [room]);

  async function actionDiscardCard() {
    console.log("discard card");
    try {
      await manager.playerAction("action_discard_card", {
        game: room.name,
        sender: room.user,
        cardId: gameStat.card.id,
      });
      // manager.player.player("default").start();
      manager.played_cards.push(gameStat.card.id);
      manager.gameState().card.reset();
    } catch (err) {}
  }

  async function actionKeepCard() {
    console.log("keeping it");
    try {
      await manager.playerAction("action_keep_card", {
        game: room.name,
        sender: room.user,
        cardId: gameStat.card.id,
      });
      // manager.player.player("default").start();
      manager.played_cards.push(gameStat.card.id);
      manager.gameState().card.reset();
    } catch (err) {
      console.error(`Error : keeping card`, err);
      manager.gameState().notification.add("Error Keeping Card");
    }
  }

  async function actionPassCard(receiver) {
    console.log("passing to ", receiver);
    try {
      await manager.playerAction("action_pass_card", {
        game: room.name,
        sender: room.user,
        receiver,
        cardId: gameStat.card.id,
      });
      // manager.player.player("default").start();
      manager.played_cards.push(gameStat.card.id);
      manager.gameState().card.reset();
    } catch (err) {
      console.error(`Error : passing card`, err);
      manager.gameState().notification.add("Error Passing Card");
    }
  }

  async function actionEncyclopaediaSearch() {
    const { name: game, user: sender } = room;
    const cardId = gameStat.card.cardId;
    const actionPayload = { game, sender, cardId };
    // console.debug({ actionPayload });
    await manager.playerAction("encyclopedia_search", actionPayload);
  }

  async function actionFakeNews() {
    const { name: game, user: sender } = room;
    const cardId = gameStat.card.id;
    const fakeCardId = gameStat.card.fakeCardId;

    const actionPayload = { game, sender, cardId, fakeCardId };
    await manager.playerAction("fake_news", actionPayload);
  }

  async function specialPowers(powerName) {
    const { name: game, user: sender } = room;
    const cardId = gameStat.card.id;
    switch (powerName) {
      case "mark_as_fake":
        var actionPayload = { game, sender, cardId };
        await manager.playerAction("mark_as_fake", actionPayload);
        break;
      case "viral_spiral_initiate":
        manager.gameState().viralspiral.selectPlayers();
        break;
      case "initiate_cancel":
        manager.gameState().cancelVote.showAffinitySelector();
        break;
      default:
        console.log("Unsupported Power");
    }
  }

  return (
    <Box pad={"small"}>
      <Box overflow={"scroll"} direction={"row"}>
        <Box width={"12em"} flex={"grow"}>
          {them ? (
            <Box gap={"medium"} pad={"small"} overflow={"scroll"}>
              {them.map((player, ix) => (
                <PlayerScoreCardMinimal
                  key={ix}
                  player={player}
                  minimal={true}
                />
              ))}
            </Box>
          ) : null}
        </Box>

        {gameStat.card != undefined ? (
          <Box>
            <Box width={"100%"} gap={"medium"} direction={"row"} flex={"grow"}>
              <Box flex={"grow"}>
                <Stack anchor="bottom">
                  <Box width={"16em"} height={"24em"} round={"small"}>
                    <Image
                      fit="contain"
                      src={
                        gameStat.card.image === ""
                          ? "/card_empty.png"
                          : `https://s3.ap-south-1.amazonaws.com/media.viralspiral.net/${gameStat.card.image}`
                      }
                    />
                  </Box>
                  <Box
                    flex={"grow"}
                    width={"16em"}
                    height="fit-content"
                    background={"#46464688"}
                    pad={"small"}
                    round={"small"}
                    overflow={"hidden"}
                  >
                    <Box
                      margin={{
                        top: "small",
                        bottom: "small",
                        left: "medium",
                        right: "medium",
                      }}
                    >
                      <Text size="medium" weight={700} color="#ffffff">
                        {gameStat.card.description}
                      </Text>
                    </Box>
                  </Box>
                </Stack>
              </Box>
              <Box
                background={"neutral-4"}
                pad={"large"}
                round
                flex={"grow"}
                height={"fit-content"}
              >
                {gameStat.card.recipients.length === 0 ? (
                  <Box>
                    <Box gap="medium">
                      <Button
                        plain
                        alignSelf="start"
                        label={"Keep"}
                        onClick={actionKeepCard}
                      ></Button>

                      <Button
                        plain
                        alignSelf="start"
                        label={"Discard"}
                        onClick={actionDiscardCard}
                      ></Button>
                    </Box>

                    <Box margin={{ top: "small" }}>
                      {gameStat.card.allowedActions ? (
                        <Box gap={"small"}>
                          {/* {gameStat.card.allowedActions.includes("fake_news") ? (
                          <Button
                            plain
                            onClick={actionFakeNews}
                            label={"Turn into fake news"}
                          ></Button>
                        ) : null} */}
                          {gameStat.card.allowedActions.includes(
                            "mark_as_fake"
                          ) ? (
                            <Button
                              plain
                              label={"Mark as fake"}
                              onClick={() => specialPowers("mark_as_fake")}
                            ></Button>
                          ) : null}
                          {gameStat.card.allowedActions.includes(
                            "encyclopedia_search"
                          ) ? (
                            <Button
                              plain
                              onClick={actionEncyclopaediaSearch}
                              label={"Check Source"}
                            ></Button>
                          ) : null}
                          {/* {gameStat.card.allowedActions.includes(
                          "initiate_cancel"
                        ) ? (
                          <Button
                            plain
                            label={"Cancel Player"}
                            onClick={() => specialPowers("initiate_cancel")}
                          ></Button>
                        ) : null} */}

                          {/* {gameStat.card.allowedActions.includes(
                          "viral_spiral"
                        ) ? (
                          <Button
                            plain
                            label={"Viral Spiral"}
                            onClick={() =>
                              specialPowers("viral_spiral_initiate")
                            }
                          ></Button>
                        ) : null} */}
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                ) : (
                  <Box direction="column" gap={"small"} width={"small"}>
                    <Box direction="row-responsive" align="center" gap="small">
                      <Text>
                        Pass to{" "}
                        {gameStat.card.recipients.map((recipient, ix) => (
                          <Text>
                            <Button
                              plain
                              pad="small"
                              key={ix}
                              label={recipient}
                              onClick={() => actionPassCard(recipient)}
                            ></Button>
                            {ix != gameStat.card.recipients.length - 1
                              ? `, `
                              : ""}
                          </Text>
                        ))}
                      </Text>
                    </Box>

                    <Box gap="small">
                      <Button
                        plain
                        alignSelf="start"
                        label={"Keep"}
                        onClick={actionKeepCard}
                      ></Button>

                      <Button
                        plain
                        alignSelf="start"
                        label={"Discard"}
                        onClick={actionDiscardCard}
                      ></Button>
                    </Box>

                    <Box margin={{ top: "small" }}>
                      {gameStat.card.allowedActions ? (
                        <Box gap={"small"}>
                          {/* {gameStat.card.allowedActions.includes("fake_news") ? (
                          <Button
                            plain
                            onClick={actionFakeNews}
                            label={"Turn into fake news"}
                          ></Button>
                        ) : null} */}
                          {gameStat.card.allowedActions.includes(
                            "mark_as_fake"
                          ) ? (
                            <Button
                              plain
                              label={"Mark as fake"}
                              onClick={() => specialPowers("mark_as_fake")}
                            ></Button>
                          ) : null}
                          {gameStat.card.allowedActions.includes(
                            "encyclopedia_search"
                          ) ? (
                            <Button
                              plain
                              onClick={actionEncyclopaediaSearch}
                              label={"Check Source"}
                            ></Button>
                          ) : null}
                          {gameStat.card.allowedActions.includes(
                            "initiate_cancel"
                          ) ? (
                            <Button
                              plain
                              label={"Cancel Player"}
                              onClick={() => specialPowers("initiate_cancel")}
                            ></Button>
                          ) : null}
                          {gameStat.card.allowedActions.includes(
                            "fake_news"
                          ) ? (
                            <Button
                              plain
                              label={"Turn to Fake"}
                              onClick={actionFakeNews}
                            ></Button>
                          ) : null}

                          {/* {gameStat.card.allowedActions.includes(
                          "viral_spiral"
                        ) ? (
                          <Button
                            plain
                            label={"Viral Spiral"}
                            onClick={() =>
                              specialPowers("viral_spiral_initiate")
                            }
                          ></Button>
                        ) : null} */}
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box align="end" pad={"small"} flex={"grow"}>
        {me ? <PlayerScoreCard player={me} /> : null}
      </Box>
    </Box>
  );
};

export default PlayingArea;
