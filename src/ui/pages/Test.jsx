import { useContext, useRef, useState } from "react";
import { Box, Button, Heading, Text, Image } from "grommet";
import { useControls, button } from "leva";
import { animated, useSpring } from "@react-spring/web";
import useSize from "@react-hook/size";
import CardDeck from "../atoms/CardDeck";
import { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const AnimatedGrommetBox = animated(Box);

const AnimatedCard = ({ springs }) => (
  <AnimatedGrommetBox
    width={"168px"}
    height={"238px"}
    background="aqua"
    focusIndicator={false}
    round
    pad={"small"}
    border="rgb(123,123,255)"
    style={{
      position: "absolute",
      ...springs,
    }}
  >
    <Box>
      <Box fill>
        <Image
          fit="contain"
          src="https://i.pinimg.com/originals/fa/27/43/fa27434ef13b3cc975344388cbab8d5d.png"
        />
      </Box>
      <Text>Gang of Cats on a rampage</Text>
    </Box>
  </AnimatedGrommetBox>
);

const PlayerArea = ({ name, x, y }) => (
  <Box
    border
    round={"large"}
    width={"4em"}
    height={"4em"}
    alignContent={"center"}
    justify={"center"}
    background={"cyan"}
    style={{
      position: "absolute",
      top: y ? y : 0,
      left: x ? x : 0,
    }}
  >
    <Text alignSelf="center">{name ? name : "UND"}</Text>
  </Box>
);

const MainDeck = ({ x, y, onClick }) => (
  <Box
    onClick={onClick}
    focusIndicator={false}
    width={"120px"}
    height={"200px"}
    border
    round={"xsmall"}
    background={"orange"}
    style={{
      position: "absolute",
      top: y ? y : 0,
      left: x ? x : 0,
    }}
  >
    hi
  </Box>
);

const DiscardPile = ({ x, y }) => (
  <Box
    width={"60px"}
    height={"100px"}
    border
    round={"xsmall"}
    style={{
      position: "absolute",
      top: y ? y : 0,
      left: x ? x : 0,
    }}
  ></Box>
);

const DebugMarker = ({ x, y }) => (
  <Box
    width={"4px"}
    height={"4px"}
    border
    background="black"
    style={{
      position: "absolute",
      top: y ? y : 0,
      left: x ? x : 0,
    }}
  ></Box>
);

const asPos = {
  x: 190,
  y: 140,
  scale: 0.1,
};

const faPos = {
  x: 420,
  y: 140,
  scale: 0.1,
};

const kmPos = {
  x: 660,
  y: 140,
  scale: 0.1,
};

const springConfig = {
  mass: 0.6,
  tension: 350,
  friction: 20,
};

let dimensions = {
  playArea: {
    x: 0,
    y: 0,
  },
  players: [],
  deck: { x: 0, y: 0 },
  discardPile: { x: 0, y: 0 },
};

const Test = () => {
  const { name, aNumber } = useControls({
    name: "World",
    aNumber: 0,
    rst: button((get) => reset()),
    as: button((get) => goToAs()),
    fa: button((get) => goToFa()),
    km: button((get) => goToKm()),
  });
  const playArea = useRef(null);

  const [width, height] = useSize(playArea);

  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: 0, scale: 0 },
  }));

  const [positions, setPositions] = useState(undefined);

  const [isHovering, setIsHovering] = useState(false);

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
  }, [width, height]);

  function showCard() {
    console.log("x");
    api.start({
      from: {
        x: positions.mainDeck.x,
        y: positions.mainDeck.y,
      },
      to: {
        x: positions.mainDeck.x - 50,
        y: positions.mainDeck.y - 100,
        scale: 1.2,
      },
      config: springConfig,
    });
  }

  function goToAs() {
    console.log({ width, height });
    api.start({
      to: asPos,
      config: springConfig,
    });
  }

  function goToFa() {
    api.start({
      to: faPos,
      config: springConfig,
    });
  }

  function goToKm() {
    api.start({
      to: kmPos,
      config: springConfig,
    });
  }

  function reset() {
    console.log({ width, height });
    api.start({
      to: {
        x: 400,
        y: 400,
        scale: 1.0,
      },
      config: springConfig,
    });
  }

  function fwd() {
    console.log({ width, height });
    api.start({
      to: {
        x: 50,
        y: 120,
        scale: 0.1,
      },
      config: springConfig,
    });
  }

  function rev() {
    console.log({ width, height });
    api.start({
      to: {
        x: 400,
        y: 400,
        scale: 1.0,
      },
      config: springConfig,
    });
  }

  return (
    <Box ref={playArea} fill>
      {/* <Heading level={2}>Test Page</Heading>
      <Text>
        Hey {name}, hello! {aNumber}
      </Text>
      
      <div style={{}}>hola</div> */}
      {/* <div background={"cyan"}>
        <div>Width: {width}</div>
        <div>Height: {height}</div>
        <Text>{JSON.stringify(positions)}</Text>
      </div> */}
      {positions ? (
        <Box>
          {/* <MainDeck
            onClick={showCard}
            x={positions.mainDeck.x}
            y={positions.mainDeck.y}
          /> */}
          {/* <DiscardPile
            x={positions.discardPile.x}
            y={positions.discardPile.y}
          /> */}

          <PlayerArea name={"AS"} x={width / 4} y={height / 6} />
          <PlayerArea name={"FA"} x={width / 2} y={height / 6} />
          <PlayerArea name={"KM"} x={(3 * width) / 4} y={height / 6} />
          <PlayerArea name={"DG"} x={width / 2} y={(3 * height) / 4} />

          <DebugMarker x={width / 2} y={height / 2} />
          {/* <div>
            <div
              style={{
                width: "100px",
                height: "220px",
                background: "aqua",
                position: "absolute",
                left: `${positions.mainDeck.x}px`,
                top: `${positions.mainDeck.y}px`,
                boxShadow: "2px 2px 120px 50px  rgba(0, 0, 255, 1)",
                transform: `rotateX(75deg) rotateY(0deg) rotateZ(0deg)`,
                cursor: "pointer",
              }}
            ></div>
          </div> */}

          <CardDeck
            onPick={showCard}
            x={positions.mainDeck.x}
            y={positions.mainDeck.y}
          />
          <AnimatedCard springs={springs} />
        </Box>
      ) : null}
    </Box>
  );
};

export default Test;
