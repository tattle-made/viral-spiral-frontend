import React from "react";
import { Stack, Box, Text, Image } from "grommet";

const SIZES = {
  small: {
    width: "8em",
    height: "12em",
  },
  default: {
    width: "16em",
    height: "24em",
  },
};

export default function Card({ image, text, size }) {
  size = size ? size : "default";
  const cardSize = SIZES[size];
  return (
    <Stack anchor="bottom">
      <Box width={cardSize.width} height={cardSize.height} round={"small"}>
        <Image
          fit="contain"
          src={
            image === ""
              ? "/card_empty.png"
              : `https://s3.ap-south-1.amazonaws.com/media.viralspiral.net/${image}`
          }
        />
      </Box>
      <Box
        flex={"grow"}
        width={cardSize.width}
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
            {text}
          </Text>
        </Box>
      </Box>
    </Stack>
  );
}
