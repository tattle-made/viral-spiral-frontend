import { Box } from "grommet";

export default function AbsoluteBox({ x, y, children }) {
  return (
    <Box
      style={{
        position: "absolute",
        top: y ? y : 0,
        left: x ? x : 0,
      }}
    >
      {children}
    </Box>
  );
}
