import React, { useContext, useRef } from "react";
import { Heading, Box, Text, Image, Button, Stack } from "grommet";
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
import avatar1Url from "../../assets/avatar-01.png";
import avatar2Url from "../../assets/avatar-02.png";
import avatar3Url from "../../assets/avatar-03.png";
import avatar4Url from "../../assets/avatar-04.png";
import avatar5Url from "../../assets/avatar-05.png";
import avatar6Url from "../../assets/avatar-06.png";
import avatar7Url from "../../assets/avatar-07.png";
import avatar8Url from "../../assets/avatar-08.png";

const avatars = [
  avatar1Url,
  avatar2Url,
  avatar3Url,
  avatar4Url,
  avatar5Url,
  avatar6Url,
  avatar7Url,
  avatar8Url,
];

const PlayingArea = () => {
  // game room variables
  const manager = useContext(GameManagerContext);
  const { gameStat, room } = manager.useGameState();
  const [me, setMe] = useState(undefined);
  const [them, setThem] = useState(undefined);

  // layout variables
  const playArea = useRef(null);
  const [width, height] = useSize(playArea);
  const [positions, setPositions] = useState(undefined);

  // card and player action options
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const { players } = room;
    if (players) {
      const me = players.filter((player) => player.name === room.me)[0];
      const them = players.filter((player) => player.name != room.me);

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
      //todo : sent action event to manager
    } catch (err) {}
  }

  async function actionKeepCard() {
    console.log("keeping it");
    try {
      await manager.playerAction("action_keep_card", {
        game: room.name,
        sender: room.me,
        cardId: gameStat.card.id,
      });
      manager.played_cards.push(gameStat.card.id);
      manager.updateGameState({ card: undefined });
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
        sender: room.me,
        receiver,
        cardId: gameStat.card.id,
      });
      manager.played_cards.push(gameStat.card.id);
      manager.updateGameState({ card: undefined });
    } catch (err) {
      console.error(`Error : passing card`, err);
      manager.addMessage(`Error : passing card`);
    }
  }

  function pickCard() {
    setShowCard(true);
  }

  return (
    <Box ref={playArea} fill>
      <AbsoluteBox x={width / 2 - 200} y={height / 3}>
        {them ? (
          <Box direction={"row"} gap={"xlarge"}>
            {them.map((player, ix) => {
              return (
                <Box
                  key={ix}
                  width={"xsmall"}
                  height={"xsmall"}
                  round={"xsmall"}
                  background={pallette[player.color].dark}
                >
                  <Stack>
                    <Box fill>
                      <Image src={avatars[ix + 1]} />
                    </Box>
                    <Text>{player.name}</Text>
                  </Stack>
                </Box>
              );
            })}
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
        <AbsoluteBox x={width / 2 - 100} y={(2 * height) / 3 - 200}>
          <Box
            width={"small"}
            pad={"small"}
            align={"center"}
            alignSelf={"center"}
            alignContent={"center"}
            gap={"medium"}
          >
            <Box
              pad={"small"}
              width={"100%"}
              height={"fit-content"}
              justify={"center"}
              round={"xsmall"}
              border={{ size: "medium", color: pallette.blue.dark }}
              overflow={"hidden"}
              background={"#eeeeee"}
            >
              <Heading level={3}>{gameStat.card.title}</Heading>
              <Text>{gameStat.card.description}</Text>
            </Box>
            <Box>
              {gameStat.card.recipients.length === 0 ? (
                <Box>
                  <Button onClick={actionKeepCard}>Keep</Button>
                  or <Button onClick={actionDiscardCard}>Discard</Button>
                </Box>
              ) : (
                <Box>
                  <Text>
                    Pass to{" "}
                    {gameStat.card.recipients.map((recipient, ix) => (
                      <Button
                        key={ix}
                        label={recipient}
                        onClick={() => actionPassCard(recipient)}
                      ></Button>
                    ))}{" "}
                    or <Button onClick={actionKeepCard}>Keep</Button>
                    or <Button onClick={actionDiscardCard}>Discard</Button>
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </AbsoluteBox>
      ) : (
        <Box height={"20em"} />
      )}

      <AbsoluteBox x={width / 2} y={(5 / 6) * height}>
        {me ? (
          <Box alignSelf={"center"}>
            <Box
              width={"xsmall"}
              height={"xsmall"}
              round={"xsmall"}
              background={pallette[me.color].dark}
            >
              <Stack>
                <Box fill>
                  <Image src={avatars[0]} />
                </Box>
                <Text>{me.name}</Text>
              </Stack>
            </Box>
          </Box>
        ) : null}
      </AbsoluteBox>
    </Box>
  );
};

export default PlayingArea;
