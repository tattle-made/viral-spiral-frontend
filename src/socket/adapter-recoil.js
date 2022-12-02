function aboutGameMessage(message) {
  let colors = {};
  let affinities = {};

  message.colors.map((color) => {
    colors[color.id_] = color.name;
  });
  message.topics.map((topic) => {
    affinities[topic.id_] = topic.name;
  });

  const players = message.players.map((player) => ({
    id: player.id_,
    name: player.name,
    score: player.score,
    color: player.color.name,
    bias: Object.fromEntries(
      new Map(
        Object.keys(player.biases).map((bias) => [
          colors[bias],
          player.biases[bias],
        ])
      )
    ),
    affinity: Object.fromEntries(
      new Map(
        Object.keys(player.affinities).map((bias) => [
          affinities[bias],
          player.affinities[bias],
        ])
      )
    ),
  }));

  return {
    players,
    current: {
      id: message.current_drawing_player && message.current_drawing_player.id_,
      name:
        message.current_drawing_player && message.current_drawing_player.name,
    },
    totalGlobalBias: message.total_global_bias,
  };
}

function adapt(type, message) {
  switch (type) {
    case "about_game":
      return aboutGameMessage(message);
    default:
      return {};
  }
}

export default adapt;
