import React from "react";
import { Box, Text, Image } from "grommet";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  return (
    <DndProvider backend={HTML5Backend}>
      <Box width={"fit-content"} pad={"small"} gap={"medium"}>
        <Box direction={"row"} gap={"medium"}>
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
        </Box>
        <Box
          width={"medium"}
          height={"medium"}
          round={"xsmall"}
          border
          pad={"small"}
          align={"center"}
          alignSelf={"center"}
          alignContent={"center"}
        >
          {/* <Card /> */}
          {/* <Text>Card Deck</Text> */}
          <Box pad={"small"} height={"100%"} justify={"center"}>
            <Card />
          </Box>
        </Box>
        <Box alignSelf={"center"}>
          <Box
            width={"xsmall"}
            height={"xsmall"}
            round={"xsmall"}
            background={me.color}
            pad={"small"}
          >
            <Text>{me.name}</Text>
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default PlayingArea;
