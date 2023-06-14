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
            {room && typeof room.totalGlobalBias === "number" ? (
              <Box
                pad={"small"}
                round={"small"}
                background={"accent-3"}
                direction={"row"}
                align={"center"}
                height={"fit-content"}
              >
                <Heading level={3} margin={"none"}>
                  {`Countdown to Chaos :  ${15 - room.totalGlobalBias}`}
                </Heading>
              </Box>
            ) : null}
            {room && room.name ? (
              <Box
                pad={"small"}
                round={"small"}
                background={"accent-3"}
                height={"fit-content"}
                align="center"
                direction="row-responsive"
                gap={"small"}
              >
                <Heading className={"room-name"} level={4} margin={"none"}>
                  {room.name}
                </Heading>
                <Button
                  plain
                  icon={
                    <Share2
                      size={16}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        manager
                          .gameState()
                          .notification.add(
                            "Room Url copied to clipboard. Please share with your friends to invite them"
                          );
                      }}
                    />
                  }
                />
              </Box>
            ) : null}
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
      <UsernameModal />
    </Background>
  );
}

export default Room;
