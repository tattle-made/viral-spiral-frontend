import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist({
  key: "viral-spiral",
  storage: localStorage,
});

/**
 * This state determines the User flow of superpowers that use
 * a popup to show its UI
 * Different superpowers will show themselves by setting the id
 * of the mode to one of the MODES
 */

const MODES = {
  DEFAULT: "default",
  ENCYCLOPEDIA_SEARCH_RESULT: "encyclopedia_search_result",
  CANCEL_AFFINITY_SELECTOR: "cancel_affinity_selector",
  CANCEL_VOTE: "cancel_vote",
  VIRALSPIRAL_PLAYER_SELECTOR: "viralspiral_select_players",
};

const ModeDefault = {
  id: MODES.DEFAULT,
  payload: {},
};

const StateGameMode = atom({
  key: "gameMode",
  default: ModeDefault,
  effects_UNSTABLE: [persistAtom],
});

export { StateGameMode, MODES as ModeGame, ModeDefault as ModeGameDefault };
