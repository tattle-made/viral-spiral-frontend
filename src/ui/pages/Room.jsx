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
import { XCircle, RefreshCw } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { molecules } from "../index";
import { GameManagerContext } from "../../App";
import { useEffect } from "react";
import bgWorld1 from "../../assets/bg-world-1.png";
import vsLogo from "../../assets/vs-logo.png";
import { useNotification } from "../../state/notification";
import { ActionLayer } from "../molecules/ActionLayer";

const BASE_URL = "/";

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

      console.log("hello");
      manager.game().encyclopaedia.show();
    })();

    return () => {
      manager.teardown();
    };
  }, []);

  function actionLeaveRoom() {
    manager.leaveRoom();
    navigate(BASE_URL);
  }

  function reload() {
    try {
      console.log("reloading");
      navigate(0);
    } catch (err) {
      console.log("error");
    }
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
              background={"#ffffff"}
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
            <Box
              round={"large"}
              background={"neutral-1"}
              height={"fit-content"}
            >
              <Button
                default
                onClick={actionLeaveRoom}
                icon={<XCircle color={"#514E80"} />}
              ></Button>
            </Box>
            <Box
              round={"large"}
              background={"neutral-1"}
              height={"fit-content"}
            >
              <Button
                default
                onClick={reload}
                icon={<RefreshCw color={"#514E80"} />}
              ></Button>
            </Box>
          </Box>
        </Box>
      </Layer>

      <ActionLayer />
    </Box>
  );
}

export default Room;
