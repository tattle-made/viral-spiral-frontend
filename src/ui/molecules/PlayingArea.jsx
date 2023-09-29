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
import { Stage, Layer, Rect, Circle, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import affinity1 from "../../assets/affinity-01.png";
import affinity2 from "../../assets/affinity-02.png";
import affinity3 from "../../assets/affinity-03.png";
import affinity4 from "../../assets/affinity-04.png";
import affinity5 from "../../assets/affinity-05.png";
import Card from "../atoms/Card";

const affinityIcons = {
  skub: affinity1,
  cats: affinity2,
  socks: affinity3,
  high_fives: affinity4,
  houseboats: affinity5,
};

const IconWithScore = ({ icon, score }) => (
  <Stack anchor="top-right">
    <Box width="2.4em" round={"small"}>
      <Image src={icon} />
    </Box>
    {/* <Box round background={"accent-1"} width={"1em"} align={"center"}>
      <Text size={"small"}>{score}</Text>
    </Box> */}
  </Stack>
);

const PlayingArea = () => {
  // game room variables
  const manager = useContext(GameManagerContext);
  const { gameStat } = manager.useGameState();
  const [me, setMe] = useState(undefined);
  const [them, setThem] = useState(undefined);
  const { notification, add } = useNotification();
  const [room, setRoom] = useRecoilState(Room);

  const [image, setImage] = useState(new window.Image());

  useEffect(() => {
    const img = new window.Image();
    img.src =
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
    setImage(img);
  }, []);

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
    <Box flex={"grow"} pad={"small"}>
      <Box overflow={"auto"} direction={"row"} flex={"grow"}>
        <Box width={"12em"} flex={"grow"}>
          {them ? (
            <Box gap={"medium"} pad={"small"} overflow={"auto"}>
              {them.map((player, ix) => (
                <Box direction={"row"}>
                  <Box width={"medium"}>
                    <PlayerScoreCardMinimal
                      key={ix}
                      player={player}
                      minimal={true}
                    />
                  </Box>
                  {/* {gameStat &&
                  gameStat.showCard &&
                  gameStat.showCard.player == player.name ? (
                    <Text>show here</Text>
                  ) : null} */}
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
        {gameStat.card != undefined ? (
          <Box>
            <Box width={"100%"} gap={"medium"} direction={"row"} flex={"grow"}>
              <Box flex={"grow"}>
                <Stack anchor={"top-left"}>
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
                  <Box
                    pad={"xsmall"}
                    round={"xsmall"}
                    direction="row"
                    gap={"small"}
                    background={"#FFF8DD"}
                    margin={"xsmall"}
                  >
                    {gameStat.card.affinityTowards ? (
                      <IconWithScore
                        key={0}
                        icon={affinityIcons[gameStat.card.affinityTowards]}
                        score={gameStat.card.affinityCount}
                      />
                    ) : null}
                    {gameStat.card.biasAgainst ? (
                      <BiasIndicator
                        key={1}
                        color={gameStat.card.biasAgainst}
                        value={"*"}
                      />
                    ) : null}
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
                <Box direction="column" gap={"small"} width={"small"}>
                  {gameStat.card.recipients.length != 0 ? (
                    <Box direction="row-responsive" align="center" gap="small">
                      <Text>
                        Pass to{" "}
                        {gameStat.card.recipients.map((recipient, ix) => (
                          <Text>
                            <Button
                              plain
                              pad="small"
                              key={ix}
                              onClick={() => actionPassCard(recipient)}
                            >
                              <Text style={{ textDecoration: "underline" }}>
                                {recipient}
                              </Text>
                            </Button>
                            {ix != gameStat.card.recipients.length - 1
                              ? `, `
                              : ""}
                          </Text>
                        ))}
                      </Text>
                    </Box>
                  ) : null}

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

                  <Box margin={{ top: "large" }}>
                    {gameStat.card.allowedActions ? (
                      <Box gap={"small"}>
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

                        {gameStat.card.allowedActions.includes("fake_news") &&
                        gameStat.card.fakeCardId != "undefined-id" ? (
                          <Button
                            plain
                            label={"Turn to Fake"}
                            onClick={actionFakeNews}
                          ></Button>
                        ) : null}
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            {gameStat.showCard ? (
              <Box background={"neutral-4"} pad={"small"} round>
                <Text>{`${gameStat.showCard.player} is holding`}</Text>
                <Box height={"0.2em"} />
                <Card
                  image={gameStat.showCard.image}
                  text={gameStat.showCard.description}
                />
              </Box>
            ) : null}
          </Box>
        )}
      </Box>

      <Box align="end">
        {/* <Box flex={"grow"}></Box> */}
        {/* <Stage width={500} height={200}>
          <Layer>
            <Circle x={200} y={200} stroke="black" radius={50} />
            <Circle x={0} y={0} stroke="black" radius={2} />
            <Circle x={500} y={0} stroke="black" radius={2} />
            <Circle x={0} y={200} stroke="black" radius={2} />
            <Circle x={500} y={200} stroke="black" radius={2} />
            <Image x={0} y={0} image={image} />
          </Layer>
        </Stage> */}
        {me ? (
          <Box gap={"small"} direction="row-responsive">
            <Box gap={"medium"}>
              {gameStat.card != undefined ? (
                <Box gap={"small"}>
                  {gameStat.card.allowedActions.includes("initiate_cancel") ? (
                    <Box background={"neutral-4"} pad={"small"} round="small">
                      <Button
                        plain
                        label={"Cancel Player"}
                        onClick={() => specialPowers("initiate_cancel")}
                      ></Button>
                    </Box>
                  ) : null}
                  {gameStat.card.allowedActions.includes("viral_spiral") ? (
                    <Box background={"neutral-4"} pad={"small"} round="small">
                      <Button
                        plain
                        label={"Viral Spiral"}
                        onClick={() => specialPowers("viral_spiral_initiate")}
                      ></Button>
                    </Box>
                  ) : null}
                </Box>
              ) : null}
            </Box>
            <PlayerScoreCard player={me} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default PlayingArea;
