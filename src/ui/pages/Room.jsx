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
} from "grommet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { molecules } from "../index";
import { GameManagerContext } from "../../App";
import { useEffect } from "react";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const { PlayingArea } = molecules;

function Room({ props }) {
  const manager = useContext(GameManagerContext);
  const { gameStat, room } = manager.useGameState();
  const location = useLocation();
  const navigate = useNavigate();

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
    navigate("/");
  }

  return (
    <Box fill background={"url(/bg-world-1.jpg)"}>
      <Box fill justify="center" align="center" full>
        <PlayingArea />
      </Box>
      <Layer
        modal={false}
        background={"#ffffffcc"}
        position={"top-left"}
        margin={"small"}
        animation={false}
      >
        <Box width={"fit-content"}>
          <Box direction="row">
            <Box width={"xsmall"} height={"xsmall"}>
              <Image src={"/vs-logo.png"} fit={"contain"} />
            </Box>
            <Box>
              <Heading level={3} margin={"none"}>
                Score
              </Heading>
              <Text>Anti Blue : 12</Text>
              <Text>Anti Red : 8</Text>
            </Box>
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
      <Layer
        modal={false}
        background={{ opacity: "weak" }}
        position={"top-right"}
        margin={"small"}
        animation={false}
      >
        <Box direction={"row"} gap={"small"} background={"light-2"} pad="small">
          <Button default onClick={actionLeaveRoom}>
            <Text size={"small"}>leave room</Text>
          </Button>
        </Box>
      </Layer>
    </Box>
  );
}

export default Room;
