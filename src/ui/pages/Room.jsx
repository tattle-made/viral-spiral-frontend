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
  ResponsiveContext,
} from "grommet";
import { XCircle, RefreshCw, Share2 } from "react-feather";
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
import { UsernameModal } from "../molecules/UsernameModal";
import { isSmall } from "../atoms/size";

const BASE_URL = "/";

const { PlayingArea } = molecules;

function Room({ props }) {
  const manager = useContext(GameManagerContext);
  const { room } = manager.useGameState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async function joinRoom() {
      try {
        manager.setup();
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
      <Box fill gap={"large"}>
        <Box direction={"row-responsive"} pad={"small"}>
          <Box
            flex={"grow"}
            overflow={"hidden"}
            direction={"row"}
            gap={"medium"}
            align="center"
          >
            <Box
              round={"large"}
              width={"4em"}
              height={"4em"}
              background={"#ffffff"}
            >
              <Image src={vsLogo} fit={"contain"} />
            </Box>
            {room && room.name ? (
              <Button
                plain
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  manager
                    .gameState()
                    .notification.add(
                      "Room Url copied to clipboard. Please share with your friends to invite them"
                    );
                }}
              >
                <Box
                  pad={"small"}
                  round={"small"}
                  background={"accent-4"}
                  height={"fit-content"}
                  width={"fit-content"}
                  align="center"
                  direction="row"
                  gap={"small"}
                >
                  <Heading className={"room-name"} level={4} margin={"none"}>
                    {room.name}
                  </Heading>

                  <Share2 size={16} />
                </Box>
              </Button>
            ) : null}
            <Box direction={"row"} gap={"medium"} align="center">
              <Box
                round={"large"}
                background={"neutral-1"}
                height={"fit-content"}
                width={"fit-content"}
                pad="small"
              >
                <Button
                  plain
                  onClick={actionLeaveRoom}
                  icon={<XCircle size={"2em"} color={"#514E80"} />}
                ></Button>
              </Box>
              <Box
                round={"large"}
                background={"neutral-1"}
                height={"fit-content"}
                width={"fit-content"}
                pad="small"
              >
                <Button
                  plain
                  onClick={reload}
                  icon={<RefreshCw size={"2em"} color={"#514E80"} />}
                ></Button>
              </Box>
            </Box>
          </Box>
          <Box flex={"grow"}></Box>
          <Box gap={"small"}>
            {room && typeof room.totalGlobalBias === "number" ? (
              <Box
                pad={"medium"}
                round={"small"}
                background={"status-error"}
                direction={"row"}
                align={"center"}
                height={"fit-content"}
                width={"fit-content"}
              >
                <Heading level={3} margin={"none"}>
                  {`Chaos Countdown :  ${10 - room.totalGlobalBias}`}
                </Heading>
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box fill={true}>
          <PlayingArea />
        </Box>
      </Box>

      <ActionLayer />
      <EndGameSplashScreen />
      <UsernameModal />
    </Background>
  );
}

export default Room;
