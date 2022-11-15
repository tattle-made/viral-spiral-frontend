function aboutGameMessage(message) {
  const players = message.players.map((player) => ({
    id: player.id_,
    name: player.name,
    score: player.score,
    color: player.color.name,
    bias: player.initial_bias,
    affinity: player.initial_affinity,
  }));

  return {
    players,
    current: {
      id: message.current_drawing_player.id_,
      name: message.current_drawing_player.name,
    },
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
