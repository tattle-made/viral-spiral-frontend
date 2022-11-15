import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  TextInput,
  Button,
  Form,
  FormField,
} from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { GameManagerContext } from "../../App";

// todo : remove later when we're not deploying to github pages anymore
const BASE_URL = "/viral-spiral-frontend/";

const Home = () => {
  const navigate = useNavigate();
  const manager = useContext(GameManagerContext);
  const { gameStat, room } = manager.useGameState();

  useEffect(() => {
    manager.setup();
    return () => manager.teardown();
  }, [manager]);

  async function createRoom(value) {
    try {
      await manager.createRoom(value);
      navigate(`${BASE_URL}room`);
    } catch (err) {
      console.log("error caught with create room");
    }
  }

  function joinRoom(value) {
    // console.log(value);
    navigate(`${BASE_URL}room?name=${value.game}&me=${value.me}`);
  }

  return (
    <Box fill alignContent={"center"} justify={"center"}>
      {/* <Box >
        { <Box>
          <Heading level={2}>Viral Spiral</Heading>
          <Text>{JSON.stringify(room)}</Text>
        </Box> }
      </Box> */}
      <Box
        fill
        direction={"row-responsive"}
        gap={"medium"}
        alignContent={"center"}
        justify={"center"}
      >
        <Box width={"medium"} justify="center">
          <Box gap={"small"} border round pad={"medium"}>
            <Form onSubmit={({ value }) => createRoom(value)}>
              <Box gap={"medium"}>
                <Box>
                  <FormField>
                    <TextInput
                      className="new-room-game"
                      name="game"
                      placeholder={"Room"}
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

                  <FormField>
                    <TextInput
                      className="new-room-me"
                      name="me"
                      placeholder={"Your Username"}
                    ></TextInput>
                  </FormField>

                  <FormField>
                    <TextInput
                      className="new-room-players"
                      name="players"
                      placeholder={"Players"}
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
          <Text weight={"400"}>or</Text>
        </Box>
        <Box width={"medium"} gap={"small"} justify="center">
          <Form onSubmit={({ value }) => joinRoom(value)}>
            <Box gap={"medium"}>
              <Box>
                <FormField>
                  <TextInput
                    className="join-room-game"
                    name="game"
                    placeholder={"Room"}
                  ></TextInput>
                </FormField>
                <FormField>
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
    </Box>
  );
};

export default Home;
