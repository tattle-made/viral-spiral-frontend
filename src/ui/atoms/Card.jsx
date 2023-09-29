import React from "react";
import { Stack, Box, Text, Image } from "grommet";

export default function Card({ image, text }) {
  return (
    <Stack anchor="bottom">
      <Box width={"16em"} height={"24em"} round={"small"}>
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
            {text}
          </Text>
        </Box>
      </Box>
    </Stack>
  );
}
