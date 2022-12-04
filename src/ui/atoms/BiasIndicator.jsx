import { Box, Text } from "grommet";
import { pallette } from "./theme";

export default function BiasIndicator({ color, value }) {
  return (
    <Box
      background={pallette[color].dark}
      round={"xlarge"}
      width={"2em"}
      pad={"xsmall"}
      justify="center"
      alignContent="center"
      align="center"
    >
      <Text>{value}</Text>
    </Box>
  );
}
