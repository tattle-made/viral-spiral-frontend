import { Box } from "grommet";
import bgWorld1 from "../../assets/bg-world-1.png";
import bg00 from "../../assets/bg-01.png";
import bg01 from "../../assets/bg-02.png";
import bg02 from "../../assets/bg-03.png";
import bg03 from "../../assets/bg-04.png";

const mapTgbBg = {
  0: bg00,
  1: bg00,
  2: bg00,
  3: bg01,
  4: bg01,
  5: bg01,
  6: bg02,
  7: bg02,
  8: bg02,
  9: bg03,
  10: bg03,
  11: bg03,
  12: bg03,
  13: bg03,
  14: bg03,
};

const TGB_END_SCORE = 10;

export function Background({ children, tgb }) {
  if (tgb < 0 || tgb === undefined) {
    tgb = 0;
  }
  if (tgb > TGB_END_SCORE) {
    tgb = TGB_END_SCORE;
  }
  return (
    <Box fill background={`url(${mapTgbBg[tgb]})`}>
      {children}
    </Box>
  );
}
