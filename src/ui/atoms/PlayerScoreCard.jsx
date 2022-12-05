import { Box, Stack, Image, Text } from "grommet";
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

const IconWithScore = ({ icon, score }) => (
  <Stack anchor="top-right">
    <Box width="2.4em" round={"small"}>
      <Image src={icon} />
    </Box>
    <Box round background={"accent-1"} width={"1em"} align={"center"}>
      <Text size={"small"}>{score}</Text>
    </Box>
  </Stack>
);

export default function PlayerScoreCard({ player }) {
  return (
    <Box
      direction="row"
      gap={"small"}
      background={{ color: "neutral-3" }}
      round={"small"}
      overflow={"hidden"}
    >
      <Box>
        <Box direction={"row"} gap={"small"}>
          <Stack>
            <Box
              width="xsmall"
              fill={"vertical"}
              background={pallette[player.color].dark}
              border={{ color: "neutral-2" }}
              round={"small"}
            >
              <Image src={avatars[0]} />
            </Box>
            <Box pad={"xxsmall"}>
              <Text>{player.name}</Text>
            </Box>
          </Stack>
          <Box pad={{ right: "xsmall", bottom: "xsmall" }}>
            <Box gap={"xsmall"}>
              <Text weight={"bold"}>Biases</Text>
              <Box direction={"row"} gap={"xsmall"}>
                {Object.keys(player.bias).map((key, ix) => (
                  <BiasIndicator
                    key={ix}
                    color={key}
                    value={player.bias[key]}
                  />
                ))}
              </Box>

              <Box gap={"xsmall"}>
                <Text weight={"bold"}>Affinites</Text>
                <Box direction={"row"}>
                  {Object.keys(player.affinity).map((key, ix) => (
                    <IconWithScore
                      icon={affinityIcons[key]}
                      score={player.affinity[key]}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
