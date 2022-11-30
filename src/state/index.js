import { atom, selector, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist({
  key: "viral-spiral",
  storage: localStorage,
});

const GameStatDefault = {
  tgb: 0,
  affinity: { sock: 0, cat: 0 },
  card: undefined,
  mode: undefined,
};

const GameStat = atom({
  key: "gameStat",
  default: GameStatDefault,
});

const GameMessage = atom({
  key: "gameMessage",
  default: [],
});

/**
 * These are messages that inform user about
 * warnings, error or information. They are
 * meant to be easily understandable and not
 * to be used for debugging
 */
const GameNotification = atom({
  key: "gameNotification",
  default: [],
});

/**
 * These are hidden by default. Should only be
 * enabled in dev environment.
 */
const DebugNotification = atom({
  key: "debugNotification",
  default: [],
});

/**
 * id : a uuid returned by the server. same as the room slug in the url
 * name : human friendly name set by the creator of the room
 * password :
 * me : username of the player whose machine this game is running on
 * state : connected || disconnected || error
 */
const Room = atom({
  key: "room",
  default: {
    id: undefined,
    name: undefined,
    password: undefined,
    me: undefined,
    state: undefined,
  },
  effects_UNSTABLE: [persistAtom],
});

const GameConfig = atom({
  key: "gameConfig",
  default: {
    apiEndpoint: "http://localhost:5000/",
  },
  effects_UNSTABLE: [persistAtom],
});

export {
  GameStat,
  GameNotification,
  DebugNotification,
  Room,
  GameConfig,
  GameMessage,
  GameStatDefault,
};
