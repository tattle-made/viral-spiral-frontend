import { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  FormField,
  Form,
  TextInput,
  Button,
} from "grommet";
import { useParams, useNavigate } from "react-router-dom";
import { GameManagerContext } from "../../App";

export function WaitingRoom({}) {
  const manager = useContext(GameManagerContext);
  const { room } = manager.useGameState();
  const params = useParams();
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);

  function joinRoom({ value }) {
    let { name, password = "temporary", user } = room;

    manager.room.setRoom({
      name: roomNameInUrl,
      password,
      user: value.userName,
    });

    navigate(`/r/:${roomNameInUrl}`);
  }

  useEffect(() => {
    let { name, password = "temporary", user } = room;
    let { id: roomNameInUrl } = params;

    // if room name and user field exist and the room name matches the one in url,
    // just redirect to /r/:id
    if (name && user && name === roomNameInUrl) {
      manager.room.setRoom({
        name,
        password,
        user,
      });
      navigate(`/r/:${roomNameInUrl}`);
    }

    // if room name and user field exist but the room name doesn't match the one in url,
    // this implies the user has played viral spiral in the past and is now trying to
    // join a new game
    // we must reset all the state data from the previous game, prompt user for a username,
    // set the room related info into state
    if (name && user && name != roomNameInUrl) {
      manager.gameState().reset();
      manager.room.setRoom({
        name: roomNameInUrl,
        password,
        user,
      });
      setShowPrompt(true);
    }

    // if room name and user field don't exist in the Local Storage, this implies this is
    // the first time the player is playing viral spiral or has cleared their local storage
    // we must simply prompt them for their username, get the room name from the url,
    // set the state and
    if (name === undefined || user === undefined) {
      manager.room.setRoom({
        name: roomNameInUrl,
        password,
      });
      setShowPrompt(true);
    }
  }, []);

  return (
    <Box fill justify={"center"}>
      {showPrompt ? (
        <Box fill justify="center" alignContent={"center"}>
          <Form onSubmit={joinRoom}>
            <Box width={"medium"}>
              <FormField>
                <TextInput
                  className="waiting-room-you"
                  name="userName"
                  placeholder={"Username"}
                ></TextInput>
              </FormField>
              <Button
                className="join-room"
                type="submit"
                label={"Join Room"}
              ></Button>
            </Box>
          </Form>
        </Box>
      ) : null}
    </Box>
  );
}
