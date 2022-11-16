function aboutGameMessage(message) {
  const players = message.players.map((player) => ({
    id: player.id_,
    name: player.name,
    score: player.score,
    color: player.color.name,
    bias: player.biases,
    affinity: player.affinities,
    colors,
  }));

  let colors = {};
  let affinities = {};

  player.colors.map((color) => {
    colors[color.id_] = color.name;
  });
  players.topics.map((topic) => {
    affinities[topic.id_] = topic.name;
  });

  return {
    players,
    current: {
      id: message.current_drawing_player.id_,
      name: message.current_drawing_player.name,
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
