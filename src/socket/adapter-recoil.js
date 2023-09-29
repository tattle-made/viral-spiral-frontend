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
    affinities,
  };
}

function playCardMessage(message) {
  let card;
  try {
    const { data } = message;
    const cardInstanceId = data.card_instance.id_;
    const cardId = data.card_instance.card.id_;
    const fakes = data.card_instance.card.fakes;

    card = {
      id: cardInstanceId,
      cardId,
      cardInstanceId,
      title: data.card_instance.card.title,
      image: data.card_instance.card.image,
      description: data.card_instance.card.description,
      recipients: data.recipients,
      allowedActions: data.allowed_actions,
      fakeCardId: fakes.length === 0 ? "undefined-id" : fakes[0].id_,
      validTopicsForCancel: data.valid_topics_for_cancel,
      affinityTowards: data.card_instance.card.affinity_towards
        ? data.card_instance.card.affinity_towards.name
        : undefined,
      affinityCount: data.card_instance.card.affinity_count,
      biasAgainst: data.card_instance.card.bias_against
        ? data.card_instance.card.bias_against.name
        : undefined,
    };

    return card;
  } catch (err) {
    console.error("Could not parse play_card message");
    throw "Could not parse play_card message";
  }
}

function showCardMessage(message) {
  let card;
  try {
    const { data } = message;
    const cardInstanceId = data.card_instance.id_;
    const cardId = data.card_instance.card.id_;

    card = {
      id: cardInstanceId,
      cardId,
      cardInstanceId,
      title: data.card_instance.card.title,
      image: data.card_instance.card.image,
      description: data.card_instance.card.description,
      player: data.card_instance.player.name,
    };

    return card;
  } catch (err) {
    console.error("Could not parse show_card message");
    throw "Could not parse show_card message";
  }
}

function adapt(type, message) {
  switch (type) {
    case "about_game":
      return aboutGameMessage(message);
    case "play_card":
      return playCardMessage(message);
    case "show_card":
      return showCardMessage(message);
    default:
      return {};
  }
}

export default adapt;
