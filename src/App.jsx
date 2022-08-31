import { useState } from "react";
import { Grommet, Layer, Box, Heading, Text, Paragraph } from "grommet";

const PlayingArea = () => {
  const me = { name: "denny", color: "blue" };
  const them = [
    { name: "adhiraj", color: "red" },
    { name: "aman", color: "yellow" },
    { name: "krys", color: "yellow" },
    { name: "farah", color: "blue" },
  ];
  return (
    <Box width={"fit-content"} pad={"small"} gap={"medium"}>
      <Box class={"them"} direction={"row"} gap={"medium"}>
        {them.map((player) => {
          return (
            <Box
              width={"xsmall"}
              height={"xsmall"}
              border
              round={"xsmall"}
              background={player.color}
              pad={"small"}
            >
              <Text>{player.name}</Text>
            </Box>
          );
        })}
      </Box>
      <Box
        width={"medium"}
        height={"medium"}
        round={"xsmall"}
        border
        pad={"small"}
        align={"center"}
        alignSelf={"center"}
      >
        Card Deck
      </Box>
      <Box alignSelf={"center"}>
        <Box
          width={"xsmall"}
          height={"xsmall"}
          border
          round={"xsmall"}
          background={me.color}
          pad={"small"}
        >
          <Text>{me.name}</Text>
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grommet full>
      <Box fill>
        <Layer full modal={false} margin={"small"}>
          <Box width={"fit-content"} border round={"small"} pad={"small"}>
            <Box>
              <Heading level={3} margin={"none"}>
                Score
              </Heading>
              <Text>Anti Blue : 12</Text>
              <Text>Anti Red : 8</Text>
            </Box>
          </Box>
        </Layer>
        <Layer
          modal={false}
          background={{ opacity: "weak" }}
          position={"center"}
        >
          <PlayingArea />
        </Layer>
        <Layer
          modal={false}
          background={{ opacity: "weak" }}
          position={"bottom-right"}
          margin={"small"}
        >
          <Box width={"fit-content"} border round={"small"} pad={"small"}>
            <Box>
              <Heading level={3} margin={"none"}>
                Bias and Affinities
              </Heading>
              <Text>Socks : 4</Text>
              <Text>Cats : 3</Text>
            </Box>
          </Box>
        </Layer>
      </Box>
    </Grommet>
  );
}

export default App;
