import { useState } from "react";
import { Grommet, Layer, Box, Heading, Text, Paragraph } from "grommet";
import { Link } from "react-router-dom";
import PlayingArea from "./PlayingArea";

function App() {
  const [count, setCount] = useState(0);

  return (
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
      <Layer modal={false} background={{ opacity: "weak" }} position={"center"}>
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
      <Layer
        modal={false}
        background={{ opacity: "weak" }}
        position={"top-right"}
        margin={"small"}
      >
        <Box direction={"row"} gap={"small"}>
          <Link to={"/"}>
            <Text size={"small"}>home</Text>
          </Link>
          <Link to={"/room"}>
            <Text size={"small"}>room</Text>
          </Link>
        </Box>
      </Layer>
    </Box>
  );
}

export default App;
