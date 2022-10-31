import React, { useContext } from "react";
import { Heading, Box, Text, Image, Button } from "grommet";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRecoilState } from "recoil";
import { GameStat, Room } from "../../state";
import { GameManagerContext } from "../../App";

function Card() {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "CARD",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      //   background={"red"}
      width={"36em"}
      height={"64em"}
      overflow={"hidden"}
    >
      <Box
        role="Handle"
        ref={drag}
        style={{ textAlign: "center" }}
        overflow={"hidden"}
      >
        <Image fit="cover" src="/card_1.png" />
      </Box>
    </Box>
  );
}

function Bucket() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: "CARD",
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Box
      ref={drop}
      role={"Dustbin"}
      style={{ backgroundColor: isOver ? "red" : "aqua" }}
      height={"xsmall"}
      width={"xsmall"}
      border
      round={"xsmall"}
    >
      {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
    </Box>
  );
}

const Colors = {
  RED: "#FE8689",
  BLUE: "#253165",
  YELLOW: "#FE9D02",
};

const PlayingArea = () => {
  const me = { name: "denny", color: Colors.BLUE };
  const them = [
    { name: "adhiraj", color: Colors.BLUE },
    { name: "aman", color: Colors.YELLOW },
    { name: "krys", color: Colors.BLUE },
    { name: "farah", color: Colors.RED },
  ];
  const manager = useContext(GameManagerContext);
  const { gameStat, room } = manager.useGameState();

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
  return (
    <DndProvider backend={HTML5Backend}>
      <Box width={"fit-content"} pad={"small"} gap={"medium"}>
        {/* <Box direction={"row"} gap={"medium"}>
          {them.map((player, ix) => {
            return (
              <Box
                key={ix}
                width={"xsmall"}
                height={"xsmall"}
                round={"xsmall"}
                background={player.color}
                pad={"small"}
              >
                <Text>{player.name}</Text>
              </Box>
            );
          })}
          <Bucket />
        </Box> */}
        {gameStat.card != undefined ? (
          <Box
            width={"small"}
            height={"fit-content"}
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
              border
              overflow={"hidden"}
            >
              <Heading level={3}>{gameStat.card.title}</Heading>
              <Text>{gameStat.card.description}</Text>
            </Box>
            <Box>
              {gameStat.card.recipients.length === 0 ? (
                <Box>Keep</Box>
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
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        ) : null}
        {/* <Box alignSelf={"center"}>
          <Box
            width={"xsmall"}
            height={"xsmall"}
            round={"xsmall"}
            background={me.color}
            pad={"small"}
          >
            <Text>{me.name}</Text>
          </Box>
        </Box> */}
      </Box>
    </DndProvider>
  );
};

export default PlayingArea;
