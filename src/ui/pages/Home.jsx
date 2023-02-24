import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  TextInput,
  Button,
  Form,
  FormField,
  Layer,
  Image,
} from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { GameManagerContext } from "../../App";
import vsLogo from "../../assets/vs-logo.png";
import bgLanding1 from "../../assets/bg-landing-01.png";
import bgLanding2 from "../../assets/bg-landing-02.png";
import bgLandingCard01 from "../../assets/bg-landing-cards-01.png";
import bgLandingCard02 from "../../assets/bg-landing-cards-02.png";
import bgLandingCard03 from "../../assets/bg-landing-cards-03.png";
import bgLandingCard04 from "../../assets/bg-landing-cards-04.png";
import bg00 from "../../assets/bg-gray.jpg";

const Home = () => {
  const navigate = useNavigate();
  const manager = useContext(GameManagerContext);
  const { gameStat, room } = manager.useGameState();

  /**
   * keeps track of which form to show the user - create room
   * or join room.
   * possible values : NONE,CREATE_ROOM, JOIN_ROOM
   */
  const [panel, setPanel] = useState("NONE");

  useEffect(() => {
    manager.setup();
    return () => manager.teardown();
  }, [manager]);

  async function createRoom({ value }) {
    // console.debug({ ROOM: value });
    value.password = "asdf"; // todo : remove hardcoded value later
    const { game } = await manager.createRoom(value);
    if (game) {
      navigate(`/r/${game.name}`);
    }
  }

  /**
   *
   * @param {object} value
   *  must have a field called `game` and `me`
   */
  function joinRoom({ value }) {
    const { game, me } = value;
    console.log({ game, me });
    manager.room.setRoom({
      name: game,
      user: me,
    });
    navigate(`/r/${game}`);
  }

  function createRoomPanel() {
    var newValue;
    if (panel === "CREATE_ROOM") {
      newValue = "NONE";
    } else {
      newValue = "CREATE_ROOM";
    }
    setPanel(newValue);
  }

  function joinRoomPanel() {
    var newValue;
    if (panel === "JOIN_ROOM") {
      newValue = "NONE";
    } else {
      newValue = "JOIN_ROOM";
    }
    setPanel(newValue);
  }

  return (
    <Box flex={"grow"} overflow={scroll}>
      <Box height={"100vh"} width={"100vw"} background={`url(${bg00})`}>
        <Box>
          <Box width={"100%"} height="20em">
            <Image src={vsLogo} fit="contain" />
          </Box>
          <Box width={"100%"} align="center" margin={{ bottom: "large" }}>
            <Text size="xlarge">
              A multiplayer card game where you earn clout by sharing posts
            </Text>
          </Box>
          <Box
            direction="row-responsive"
            width={"fit-content"}
            alignSelf="center"
            gap={"large"}
          >
            <Box
              name="create-room"
              height="medium"
              width="medium"
              border={{ color: "#3e6ff2", size: "medium" }}
              round={"small"}
              background={
                panel === "CREATE_ROOM" ? "none" : `url(${bgLanding1})`
              }
            >
              <Button
                plain
                hoverIndicator={true}
                focusIndicator={false}
                onClick={createRoomPanel}
              >
                <Box pad={"medium"}>
                  <Heading level={3} color={"#3e6ff2"}>
                    Create Room
                  </Heading>
                </Box>
              </Button>
              {panel === "CREATE_ROOM" ? (
                <Box pad={"medium"}>
                  <Form onSubmit={createRoom}>
                    <Box gap={"medium"}>
                      <Box>
                        <FormField>
                          <TextInput
                            className="new-room-you"
                            name="userName"
                            placeholder={"Username"}
                          ></TextInput>
                        </FormField>
                        <FormField>
                          <TextInput
                            className="new-room-player-count"
                            name="playerCount"
                            type="number"
                            placeholder={"Number of Players"}
                          ></TextInput>
                        </FormField>
                      </Box>
                      <Box>
                        <Button
                          primary
                          color="#589891"
                          className="new-room-create"
                          type="submit"
                          label={"Create"}
                        ></Button>
                      </Box>
                    </Box>
                  </Form>
                </Box>
              ) : null}
            </Box>
            <Box
              name="join-room"
              height="medium"
              width="medium"
              border={{ color: "#3e6ff2", size: "medium" }}
              round={"small"}
              background={panel === "JOIN_ROOM" ? "none" : `url(${bgLanding2})`}
            >
              <Button
                plain
                hoverIndicator={true}
                focusIndicator={false}
                onClick={joinRoomPanel}
              >
                <Box pad={"medium"}>
                  <Heading level={3} color={"#3e6ff2"}>
                    Join Room
                  </Heading>
                </Box>
              </Button>

              {panel === "JOIN_ROOM" ? (
                <Box pad="medium">
                  <Form onSubmit={joinRoom}>
                    <Box gap={"medium"}>
                      <Box>
                        <FormField name="game">
                          <TextInput
                            className="join-room-game"
                            name="game"
                            placeholder={"Room"}
                          ></TextInput>
                        </FormField>
                        <FormField name="me">
                          <TextInput
                            className="join-room-me"
                            name="me"
                            placeholder={"Username"}
                          ></TextInput>
                        </FormField>
                      </Box>
                      <Box>
                        <Button
                          primary
                          color="#589891"
                          className="join-room-join"
                          type="submit"
                          label={"Join"}
                        ></Button>
                      </Box>
                    </Box>
                  </Form>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box height="10em" background="aqua"></Box>
    </Box>
  );
};

export default Home;
