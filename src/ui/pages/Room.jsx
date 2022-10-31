import { useContext, useState } from "react";
import { Grommet, Layer, Box, Heading, Text, Paragraph, Button } from "grommet";
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
    // todo  : join room if you have an active room id, if not navigate to /
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
    })();

    return () => {
      manager.teardown();
      // add code to disconnect from socket
    };
  }, []);

  function actionLeaveRoom() {
    manager.leaveRoom();
    navigate("/");
  }

  return (
    <Box fill alignContent={"center"} justify={"center"}>
      <Layer
        modal={false}
        background={{ opacity: "weak" }}
        position={"top-left"}
        margin={"small"}
        animation={false}
      >
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
        animation={false}
      >
        <PlayingArea />
      </Layer>
      <Layer
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
      </Layer>
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
