import { Box, Stack, Image, Text, ResponsiveContext } from "grommet";
import BiasIndicator from "./BiasIndicator";
import avatar1Url from "../../assets/avatar-01.png";
import avatar2Url from "../../assets/avatar-02.png";
import avatar3Url from "../../assets/avatar-03.png";
import avatar4Url from "../../assets/avatar-04.png";
import avatar5Url from "../../assets/avatar-05.png";
import avatar6Url from "../../assets/avatar-06.png";
import avatar7Url from "../../assets/avatar-07.png";
import avatar8Url from "../../assets/avatar-08.png";
import affinity1 from "../../assets/affinity-01.png";
import affinity2 from "../../assets/affinity-02.png";
import affinity3 from "../../assets/affinity-03.png";
import affinity4 from "../../assets/affinity-04.png";
import affinity5 from "../../assets/affinity-05.png";
import { pallette } from "./theme";
import { isSmall } from "./size";
import { useContext } from "react";

const avatars = [
  avatar1Url,
  avatar2Url,
  avatar3Url,
  avatar4Url,
  avatar5Url,
  avatar6Url,
  avatar7Url,
  avatar8Url,
];

const affinityIcons = {
  skub: affinity1,
  cats: affinity2,
  socks: affinity3,
  high_fives: affinity4,
  houseboats: affinity5,
};

export default function PlayerScoreCardMinimal({ player, minimal }) {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      direction="row-responsive"
      wrap={true}
      gap={"small"}
      width={isSmall(size) ? "fit-content" : "fit-content"}
      height={"fit-content"}
      background={{ color: "neutral-3" }}
      pad={"xsmall"}
      overflow={"hidden"}
      round={"small"}
      flex={"grow"}
    >
      <Box direction={"row"} gap={"small"}>
        <Box>
          <Box
            width={"4em"}
            height={"4em"}
            background={pallette[player.color].dark}
            border={{ color: "neutral-2" }}
            round={"small"}
          >
            <Image fit={"cover"} src={avatars[0]} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box pad={"xxsmall"}>
          <Box>
            <Box gap={"xsmall"}>
              <Box>
                <Text weight={800}>{player.name}</Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <Text size={"small"}>{`Clout : ${player.score}`}</Text>
          </Box>
        </Box>

        <Box direction="row-responsive">
          <Box direction="row" align="center" gap={"medium"}>
            {!minimal ? <Text size={"small"}>Biases</Text> : null}
            <Box direction={"row"} gap={"xsmall"}>
              {Object.keys(player.bias).map((key, ix) =>
                player.color != key ? (
                  <Box
                    key={ix}
                    background={pallette[key].dark}
                    round={"xlarge"}
                    width={"1em"}
                    height={"1em"}
                    pad={"xsmall"}
                    justify="center"
                    alignContent="center"
                    align="center"
                  >
                    <Text size={"small"}>{player.bias[key]}</Text>
                  </Box>
                ) : null
              )}
            </Box>
          </Box>

          <Box direction="row" align="center">
            {!minimal ? <Text size={"small"}>Affinites</Text> : null}
            <Box direction={"row"}>
              {Object.keys(player.affinity).map((key, ix) => (
                <Stack anchor="top-right" key={ix}>
                  <Box width="2.4em" round={"small"}>
                    <Image src={affinityIcons[key]} />
                  </Box>
                  <Box
                    round
                    background={"accent-1"}
                    width={"1em"}
                    align={"center"}
                  >
                    <Text size={"small"}>{player.affinity[key]}</Text>
                  </Box>
                </Stack>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
