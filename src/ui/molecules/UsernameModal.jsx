import { Box, Text, Heading, TextInput, Layer, Button } from "grommet";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Room, RoomDefault } from "../../state";
import { useLocation } from "react-router-dom";
import { GameManagerContext } from "../../App";

export function UsernameModal() {
  const manager = useContext(GameManagerContext);
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useRecoilState(Room);
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // console.log("==room==");
    // console.log(room);
    let isUrlValid = location.pathname.search("/r/") === 0;
    let roomNameInUrl = "";
    if (isUrlValid) {
      roomNameInUrl = location.pathname.split("/")[2];
      setRoomName(roomNameInUrl);
    }
    let { name, password, user } = room;

    // If there is no existing room in localstorage
    if (name === undefined || user === undefined) {
      setShow(true);
    }

    // if the existing room in localstorage matches the url
    // we proceed as is
    if (name === roomNameInUrl) {
      setShow(false);
    }

    // if the existing room in localstorage is different from the url
    // in this case, the room in URL is given preference.
    // local storage room is cleared and new room is set
    if (name != roomNameInUrl) {
      manager.room.setRoom(RoomDefault);
      setShow(true);
    }
  }, [room]);

  async function clickSelect() {
    setShow(false);
    manager.room.setRoom({
      name: roomName,
      user: username,
    });
    await manager.joinGame({ game: roomName, username });
  }

  return (
    <Box>
      {show ? (
        <Layer
          modal={false}
          background={{ opacity: true, clip: "border-box" }}
          position={"center"}
          animation={false}
        >
          <Box gap={"small"} pad={"large"}>
            <Text>
              Join room
              <Text weight={700}>{` ${roomName}`}</Text>
            </Text>
            <TextInput
              className="username"
              placeholder={"Choose your username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              className={"join-room-btn"}
              label={"Select"}
              onClick={clickSelect}
            />
          </Box>
        </Layer>
      ) : null}
    </Box>
  );
}
