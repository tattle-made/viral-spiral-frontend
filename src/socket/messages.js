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
};

export default { make };
