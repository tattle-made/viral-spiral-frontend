import { useContext, useState } from "react";
import {
  Grommet,
  Layer,
  Box,
  Heading,
  Text,
  Paragraph,
  Button,
  Image,
  Spinner,
} from "grommet";
import { XCircle } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { molecules } from "../index";
import { GameManagerContext } from "../../App";
import { useEffect } from "react";
import bgWorld1 from "../../assets/bg-world-1.png";
import vsLogo from "../../assets/vs-logo.png";
import { useNotification } from "../../state/notification";

const BASE_URL = "/viral-spiral-frontend/";

const { PlayingArea } = molecules;

function Room({ props }) {
  const manager = useContext(GameManagerContext);
  const { gameStat, room } = manager.useGameState();
  const location = useLocation();
  const navigate = useNavigate();
  const { notification } = useNotification();

  useEffect(() => {
    (async function joinRoom() {
      manager.setup();
      let { name, password, me } = room;
      if (name === undefined || me === undefined) {
        manager.addMessage(
          "No preexisting room in localstorage. Creating from url"
        );
        var params = new URLSearchParams(location.search);
        name = params.get("name");
        me = params.get("me");
      }

      await manager.joinGame({ room: name, username: me });
      manager.pollRoom({ room: name });
    })();

    return () => {
      manager.teardown();
    };
  }, []);

  function actionLeaveRoom() {
    manager.leaveRoom();
    navigate(BASE_URL);
  }

  function closeEncyclopaedia() {
    manager.closeEncylopaedia();
  }

  return (
    <Box fill background={`url(${bgWorld1})`}>
      <Box fill justify="center" align="center" full>
        <PlayingArea />
      </Box>
      <Layer
        modal={false}
        background={"#ffffff00"}
        position={"top-left"}
        margin={"small"}
        animation={false}
      >
        <Box width={"fit-content"}>
          <Box direction="row" gap={"small"}>
            <Box
              round={"large"}
              width={"xsmall"}
              height={"xsmall"}
              background={"#ffffffaa"}
            >
              <Image src={vsLogo} fit={"contain"} />
            </Box>
            <Box pad={"small"} round={"small"} background={"accent-3"}>
              <Heading level={3} margin={"none"}>
                Global Bias
              </Heading>
              {room && room.totalGlobalBias ? (
                <Text weight={"bold"}>{room.totalGlobalBias}</Text>
              ) : null}
            </Box>
            <Button
              default
              onClick={actionLeaveRoom}
              icon={<XCircle />}
            ></Button>
          </Box>
        </Box>
      </Layer>

      {/* <Layer
        modal={false}
        background={{ opacity: "weak" }}
        position={"bottom-right"}
        margin={"small"}
        animation={false}
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
      </Layer> */}

      {/** a layer where all special power related UI is shown  */}
      <Layer
        modal={false}
        background={{ opacity: true, clip: "border-box" }}
        position={"center"}
        margin={"small"}
        animation={false}
      >
        {gameStat.mode && gameStat.mode.id === "encyclopaedia_search_result" ? (
          <Box pad={"small"} height={"fit-content"} width={"large"}>
            <Box direction="row">
              <Heading level={2}>Encyclopaedia</Heading>
              <Box flex={"grow"}></Box>
              <Button onClick={closeEncyclopaedia}>X</Button>
            </Box>
            <Box>
              {gameStat.mode.payload.map((result, ix) => (
                <Box key={ix}>
                  <Text weight={"bold"}>{result.headline}</Text>
                  <Text>{result.content}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Layer>
    </Box>
  );
}

export default Room;
