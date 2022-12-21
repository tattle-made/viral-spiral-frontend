import React from "react";
import { useRecoilState } from "recoil";
import { GameStat } from "../../state";
import { Box } from "grommet";
import { ActionCancelVote } from "./ActionCancelVote";
import { ActionEncylopedia } from "./ActionEncyclopedia";
import { ActionCancelAffinitySelector } from "./ActionCancelAffinitySelector";
import { ActionViralSpiralSelectPlayers } from "./ActionViralSpiralSelectPlayers";
import { ModeGame, StateGameMode } from "../../state/mode";

export function ActionLayer() {
  const [gameStat] = useRecoilState(GameStat);

  const [mode] = useRecoilState(StateGameMode);
  const { id } = mode;

  return (
    <Box>
      {id === ModeGame.CANCEL_VOTE ? <ActionCancelVote /> : null}
      {id === ModeGame.CANCEL_AFFINITY_SELECTOR ? (
        <ActionCancelAffinitySelector />
      ) : null}
      {id === ModeGame.ENCYCLOPEDIA_SEARCH_RESULT ? (
        <ActionEncylopedia />
      ) : null}
      {id === ModeGame.VIRALSPIRAL_PLAYER_SELECTOR ? (
        <ActionViralSpiralSelectPlayers />
      ) : null}
    </Box>
  );
}
