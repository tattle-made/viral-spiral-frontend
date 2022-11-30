import { useState } from "react";
import { atom, useRecoilState } from "recoil";

const Notification = atom({
  key: "notification",
  default: [],
});

function useNotification() {
  const [notification, setNotification] = useRecoilState(Notification);
  const [pollId, setPollId] = useState(undefined);

  function add(message) {
    setNotification([...notification, message]);

    if (!pollId) {
      let id = setInterval(() => {
        setNotification(notification.slice(1));
      }, 2500);
      setPollId(id);
    }
  }

  function reset() {
    const [notification, setNotification] = useRecoilState(Notification);
    clearInterval(pollId);
    setNotification([]);
  }

  return { notification, add, reset };
}

export { useNotification };
