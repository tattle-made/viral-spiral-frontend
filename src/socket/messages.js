const make = {
  createGame: (room, password, players) => ({
    name: "create_game",
    payload: {
      game: room,
      password: password,
      players: players.split(","),
      topics_filepath: "config_jsons/example1/topics.json",
      colors_filepath: "config_jsons/example1/colors.json",
      draw_fn_name: "first",
      cards_filepath: "config_jsons/example1/cards.json",
      encyclopedia_filepath: "config_jsons/example1/articles.json",
    },
  }),
  joinGame: (game, player) => ({
    name: "join_game",
    payload: {
      game,
      player,
    },
  }),
  aboutGame: (game) => ({
    name: "about_game",
    payload: {
      game,
    },
  }),
  actionPassCard: (game, sender, receiver, cardId) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "action_pass_card",
      kwargs: {
        to: receiver,
        card_instance_id: cardId,
      },
    },
  }),
  actionKeepCard: (game, sender, cardId) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "action_keep_card",
      kwargs: {
        card_instance_id: cardId,
      },
    },
  }),
  actionDiscardCard: (game, sender, cardId) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "action_discard_card",
      kwargs: {
        card_instance_id: cardId,
      },
    },
  }),
  actionFakeNews: ({ game, sender, cardId, fakeCardId }) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "fake_news",
      kwargs: {
        card_instance_id: cardId,
        fake_card_id: fakeCardId,
      },
    },
  }),

  actionMarkAsFake: ({ game, sender, cardId }) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "mark_as_fake",
      kwargs: {
        card_instance_id: cardId,
      },
    },
  }),

  actionSearchEncyclopaedia: ({ game, sender, cardId }) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "encyclopedia_search",
      kwargs: {
        keyword: cardId,
      },
    },
  }),

  actionInitiateCancelPlayer: (game, sender, otherId) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "initiate_cancel",
      kwargs: {
        against: otherId,
      },
    },
  }),
  actionVoteToCancel: (game, sender, cancelStatusId, vote) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "vote_cancel",
      kwargs: {
        cancel_status_id: cancelStatusId,
        vote,
      },
    },
  }),
  actionViralSpiral: ({ game, sender, cardId }) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "viral_spiral",
      kwargs: {
        pass_card_instance_id: cardId,
      },
    },
  }),
};

export default { make };
