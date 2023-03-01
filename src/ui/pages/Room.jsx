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
import { Background } from "../atoms/Background";
import { EndGameSplashScreen } from "../molecules/EndGameSplashScreen";

const BASE_URL = "/";

const { PlayingArea } = molecules;

function Room({ props }) {
  const manager = useContext(GameManagerContext);
  const { room } = manager.useGameState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.debug("joining room");
    (async function joinRoom() {
      try {
        manager.setup();
        let { name, password, user } = room;
        if (name === undefined || user === undefined) {
          manager.addMessage(
            "No preexisting room in localstorage. Creating from url"
          );
          var params = new URLSearchParams(location.search);
          name = params.get("name");
          user = params.get("me");
        }

        console.debug("joining from local storage user", {
          game: name,
          username: user,
        });
        await manager.joinGame({ game: name, username: user });
        manager.pollRoom({ room: name });
      } catch (err) {
        console.error(err);
      }
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
    <Background tgb={room.totalGlobalBias}>
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
            <Box
              pad={"small"}
              round={"small"}
              background={"accent-3"}
              direction={"row"}
              align={"center"}
              height={"fit-content"}
            >
              {room && typeof room.totalGlobalBias === "number" ? (
                <Heading level={3} margin={"none"}>
                  {`Countdown to Chaos :  ${15 - room.totalGlobalBias}`}
                </Heading>
              ) : null}
            </Box>
            <Box
              pad={"small"}
              round={"small"}
              background={"accent-3"}
              height={"fit-content"}
            >
              <Heading className={"room-name"} level={4} margin={"none"}>
                {room.name}
              </Heading>
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
      <EndGameSplashScreen />
    </Background>
  );
}

export default Room;
