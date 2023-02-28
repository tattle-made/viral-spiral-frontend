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

const PlayingArea = () => {
  // game room variables
  const manager = useContext(GameManagerContext);
  const { gameStat, room } = manager.useGameState();
  const [me, setMe] = useState(undefined);
  const [them, setThem] = useState(undefined);
  const { notification, add } = useNotification();

  // layout variables
  const playArea = useRef(null);
  const [width, height] = useSize(playArea);
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
    }
  }, [room]);

  useEffect(() => {
    const mainDeckDimension = {
      w: 120,
      h: 200,
    };
    let mainDeckPosition = {
      x: width / 2 - mainDeckDimension.w / 2,
      y: height / 2 - mainDeckDimension.h / 2,
    };

    const discardPileDimension = {
      w: 60,
      h: 100,
    };
    let discardPilePosition = {
      x: width / 2 - 140 - discardPileDimension.w / 2,
      y: height / 2 - discardPileDimension.h / 2,
    };

    setPositions({
      mainDeck: mainDeckPosition,
      discardPile: discardPilePosition,
    });
    // manager.addMessage(JSON.stringify({ width, height }));
  }, [width, height]);

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
      manager.addMessage(`Error : keeping card`);
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
      manager.addMessage(`Error : passing card`);
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
    <Box ref={playArea} fill>
      <AbsoluteBox x={100} y={200}>
        {them ? (
          <Box direction={"row-responsive"} gap={"xlarge"}>
            {them.map((player, ix) => (
              <PlayerScoreCard key={ix} player={player} />
            ))}
          </Box>
        ) : null}
      </AbsoluteBox>
      {/* {positions ? (
        <CardDeck
          onPick={pickCard}
          x={positions.mainDeck.x}
          y={positions.mainDeck.y}
        />
      ) : null} */}
      {gameStat.card != undefined ? (
        <AbsoluteBox x={250} y={height / 4}>
          <Box
            width={"100%"}
            pad={"small"}
            align={"center"}
            alignSelf={"center"}
            alignContent={"center"}
            gap={"medium"}
            direction={"row"}
          >
            <Box gap={"large"} alignContent={"center"}>
              <Box
                pad={"small"}
                width={"16em"}
                height={"24em"}
                justify={"end"}
                round={"small"}
                border={{ size: "xsmall", color: "neutral-1" }}
                background="url(/card_empty.png)"
              >
                <Box
                  className = "card-text"
                  height="fit-content"
                  // background={"#7F7AB033"}
                  // overflow={"scroll"}
                  pad={"medium"}
                >
                  <Text size="medium" weight={700} color="#589891">
                    {gameStat.card.description}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box background={"#EDC9C4"} pad={"large"} round>
              {gameStat.card.recipients.length === 0 ? (
                <Box>
                  <Button secondary onClick={actionKeepCard}>
                    {"Keep "}
                  </Button>
                  {"or "}
                  <Button secondary onClick={actionDiscardCard}>
                    Discard
                  </Button>
                </Box>
              ) : (
                <Box direction="column" gap={"small"}>
                  <Box direction="row-responsive" align="center" gap="small">
                    <Text>Pass to{"  "}</Text>
                    {gameStat.card.recipients.map((recipient, ix) => (
                      <Button
                        key={ix}
                        label={recipient}
                        onClick={() => actionPassCard(recipient)}
                      ></Button>
                    ))}{" "}
                  </Box>

                  <Box direction="row-responsive" gap="medium">
                    <Button
                      primary
                      alignSelf="start"
                      label={"Keep"}
                      onClick={actionKeepCard}
                    ></Button>

                    <Button
                      primary
                      alignSelf="start"
                      label={"Discard"}
                      onClick={actionDiscardCard}
                    ></Button>
                  </Box>

                  <Box margin={{ top: "small" }}>
                    <Heading level={3} margin={"none"}>
                      Special Powers
                    </Heading>
                    {gameStat.card.allowedActions ? (
                      <Box
                        direction={"row-responsive"}
                        gap={"small"}
                        wrap={true}
                      >
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
                            label={"Search"}
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

                        {gameStat.card.allowedActions.includes(
                          "viral_spiral"
                        ) ? (
                          <Button
                            plain
                            label={"Viral Spiral"}
                            onClick={() =>
                              specialPowers("viral_spiral_initiate")
                            }
                          ></Button>
                        ) : null}
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </AbsoluteBox>
      ) : (
        <Box height={"20em"} />
      )}

      <AbsoluteBox x={100} y={(5 / 6) * height}>
        {me ? <PlayerScoreCard player={me} /> : null}
      </AbsoluteBox>
    </Box>
  );
};

export default PlayingArea;
