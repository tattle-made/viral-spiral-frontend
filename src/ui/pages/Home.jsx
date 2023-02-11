import React, { useContext, useEffect } from "react";
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
import bgLanding from "../../assets/bg-landing-2.png";
import bgLandingCard01 from "../../assets/bg-landing-cards-01.png";
import bgLandingCard02 from "../../assets/bg-landing-cards-02.png";
import bgLandingCard03 from "../../assets/bg-landing-cards-03.png";
import bgLandingCard04 from "../../assets/bg-landing-cards-04.png";

const Home = () => {
  const navigate = useNavigate();
  const manager = useContext(GameManagerContext);
  const { gameStat, room } = manager.useGameState();

  useEffect(() => {
    manager.setup();
    return () => manager.teardown();
  }, [manager]);

  async function createRoom({ value }) {
    console.debug({ ROOM: value });
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

  return (
    <Box fill alignContent={"center"} justify={"center"}>
      <Layer full animation={false}>
        <Box fill>
          <Box direction={"row-responsive"} gap={"large"}>
            <Box width={"small"} height={"small"}>
              <Image src={vsLogo} />
            </Box>
            <Box alignSelf="center">
              <Link to={`/rules`}>
                <Text size={"large"}>Rules</Text>
              </Link>
            </Box>
          </Box>
          <Box fill align={"end"}>
            <Box
              pad={{ right: "medium" }}
              width={"large"}
              fill={"vertical"}
              alignSelf={"start"}
            >
              <Box flex={"grow"}></Box>
              <Box direction={"row-responsive"} gap={"xsmall"}>
                <Box width={"small"} height={"small"} alignSelf={"start"}>
                  <Image src={bgLanding} fit={"contain"} />
                </Box>
                <Box direction={"row-responsive"}>
                  <Box width={"8em"} height={"small"} alignSelf={"start"}>
                    <Image src={bgLandingCard01} fit={"contain"} />
                  </Box>
                  <Box width={"8em"} height={"small"} alignSelf={"start"}>
                    <Image src={bgLandingCard03} fit={"contain"} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layer>

      <Layer animation={false} background={"none"} modal={false}>
        <Box
          fill
          direction={"row-responsive"}
          gap={"medium"}
          alignContent={"center"}
          justify={"center"}
        >
          <Box width={"medium"} justify="center">
            <Box gap={"small"} border round pad={"medium"}>
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

                    <FormField>
                      <TextInput
                        className="new-room-password"
                        name="password"
                        type="password"
                        placeholder={"Password"}
                      ></TextInput>
                    </FormField>
                  </Box>
                  <Box>
                    <Button
                      className="new-room-create"
                      type="submit"
                      label={"Create Room"}
                    ></Button>
                  </Box>
                </Box>
              </Form>
            </Box>
          </Box>
          <Box justify="center">
            <Text weight={400}>or</Text>
          </Box>
          <Box width={"medium"} gap={"small"} justify="center" border round>
            <Form onSubmit={joinRoom}>
              <Box gap={"medium"} pad={"medium"} background={"white"}>
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
                    className="join-room-join"
                    type="submit"
                    label={"Join Room"}
                  ></Button>
                </Box>
              </Box>
            </Form>
          </Box>
        </Box>
      </Layer>
    </Box>
  );
};

export default Home;
