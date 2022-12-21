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
  actionPassCard: ({ game, sender, receiver, cardId }) => ({
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
  actionKeepCard: ({ game, sender, cardId }) => ({
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
  actionDiscardCard: ({ game, sender, cardId }) => ({
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
      action: "action_fake_news",
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
      action: "action_mark_as_fake",
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
      action: "action_encyclopedia_search",
      kwargs: {
        card_id: cardId,
      },
    },
  }),

  /**
   *
   * @param {object} {
   *  game
   *  sender
   *  otherId : id of the player whose turn you wish to cancel
   *  topicId :
   * }
   * @returns
   */
  actionInitiateCancelPlayer: ({ game, sender, otherId, topicId }) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "action_initiate_cancel",
      kwargs: {
        against: otherId,
        topic_id: topicId,
      },
    },
  }),
  actionVoteToCancel: ({ game, sender, cancelStatusId, vote }) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "action_vote_cancel",
      kwargs: {
        cancel_status_id: cancelStatusId,
        vote,
      },
    },
  }),
  actionViralSpiral: ({ game, sender, cardId, players }) => ({
    name: "player_action",
    payload: {
      game,
      player: sender,
      action: "action_viral_spiral",
      kwargs: {
        pass_card_instance_id: cardId,
        players, // fix : unsure of the key
      },
    },
  }),
};

export default { make };
