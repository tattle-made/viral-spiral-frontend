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
  List,
  Paragraph,
  Anchor,
} from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { GameManagerContext } from "../../App";
import vsLogo from "../../assets/vs-logo.png";
import bgLanding1 from "../../assets/bg-landing-01.png";
import bgLanding2 from "../../assets/bg-landing-02.png";
import playerCard from "../../assets/player-card.png";
import bg00 from "../../assets/bg-gray.jpg";
import Footer from "../atoms/Footer";

let rules = [
  "On each turn, a player draws a card. This card represents a news article found somewhere on the internet - this could be either FACTUAL news, a strong OPINION about a harmless topic, or a misinformation expressing PREJUDICE against one of the in-game communities the players are randomly sorted into.",
  "On their turn, a player can choose to check the source of their card, then either pass it to another player, discard it, or keep it in their hand for later. For every new player a card is passed to, the original sharer gets 1 CLOUT point.",
  "Sharing OPINION or PREJUDICE cards add to a player’s OPINION or PREJUDICE counters - this means that in subsequent turns, they’ll need to compulsorily share cards that align with that opinion, or lose 1 clout as a penalty for going against their confirmation bias.",
  "Sharing prejudice cards also counts towards the global CHAOS counter. Counting down from 9, once it reaches 0, the game ends and every player loses instantly.",
  "Crossing certain thresholds in your opinion or prejudice counters unlock certain powers - having +3 or -3 opinion lets you CANCEL other players, if you can get players with the same opinion as you to vote it into play. +/-3 prejudice lets you MANUFACTURE fake news, by adding prejudice to any card you might have in your hand.",
  "Crossing +/-5 on any opinion or prejudice unlocks the VIRAL SPIRAL power - that lets you share 1 unique card from your hand to every player in the same turn - often a game-changing, game-ending move.",
  "The first player to reach 9 CLOUT without letting CHAOS hit 0, wins!",
];

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
              a multiplayer game about sharing cards on the internet
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

      <Box width="xlarge" alignSelf="center">
        <Heading level={2}> Rules</Heading>
        <Box direction={"row-responsive"} gap={"small"}>
          <Box width="large">
            <Box gap={"small"}>
              {rules.map((rule, ix) => (
                <Box direction="row-responsive" gap="medium" align="center">
                  <Text size="large">{ix + 1}</Text>
                  <Text> {rule}</Text>
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Box width={"medium"} alignSelf={"center"}>
              <Image src={playerCard}></Image>
            </Box>
            <Box width={"medium"} alignSelf={"center"}>
              <Text size={"small"}>
                A sample score card. They belong to the red community (A), have
                a clout point (B) of 5 and an anti blue bias (C) of 3. They have
                an affinity of -2 for socks (D) and +4 for houseboats (E)
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width="large" alignSelf="center">
        <Box>
          <Heading level={2}> Walkthrough</Heading>
        </Box>
        <Box>
          <Heading level={2}> Get Involved</Heading>
          <Heading level={4} margin={{ bottom: "none", top: "small" }}>
            Sign up for playtests
          </Heading>
          <Text>
            We're hosting game nights to walk new players through the game and
            get feedback. Sign up{" "}
            <Anchor
              href="https://docs.google.com/forms/d/e/1FAIpQLSeqA61r5WQLz0G0XQGO58AnkRqLfBOB6liSDBaD6r-u_h74Kg/viewform"
              target="_blank"
            >
              here
            </Anchor>{" "}
            to get an invite
          </Text>
          <Heading level={4} margin={{ bottom: "none" }}>
            Monthly open call
          </Heading>
          <Text>
            Join us for our monthly open call where we share project updates and
            facilitate playtest sessions. Next one is on March 1st, 2023 6PM
            IST. Details{" "}
            <Anchor
              href="https://twitter.com/tattlemade/status/1628384594079932421"
              taget="_blank"
            >
              here
            </Anchor>
          </Text>

          <Heading level={4} margin={{ bottom: "none" }}>
            Building in public
          </Heading>
          <Text>
            Track the project's progress as we build this in public{" "}
            <Anchor
              href="https://github.com/orgs/tattle-made/projects/26"
              taget="_blank"
            >
              here
            </Anchor>
          </Text>

          <Heading level={4} margin={{ bottom: "none" }}>
            Sponsor the project
          </Heading>
          <Text>
            You can support the development of the project by becoming a sponsor{" "}
            <Anchor
              href="https://github.com/sponsors/tattle-made"
              taget="_blank"
            >
              here
            </Anchor>
          </Text>
        </Box>
        <Box>
          <Heading level={2}> Team</Heading>
          <List
            primaryKey="name"
            secondaryKey="designation"
            data={[
              { name: "Adhiraj Singh", designation: "Game Designer" },
              {
                name: "Tattle Civic Technologies",
                designation: "Game Developer",
              },
              { name: "Aman Jotwani", designation: "Senior Game Writer" },
              { name: "Farah Ahmad", designation: "Art Director" },
              {
                name: "Rishav Thaker",
                designation: "Senior Fullstack Engineer",
              },
              {
                name: "Tarunima Prabhakar",
                designation: "Researcher",
              },
              { name: "Denny George", designation: "Product Engineer" },
              { name: "Krys Martis", designation: "Game Writer" },
              { name: "Mitali Panganti", designation: "Illustrator" },
            ]}
          />

          <Text></Text>
        </Box>
        <Box margin={{ top: "large" }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
