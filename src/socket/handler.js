import adapt from "./adapter-recoil";

function connectionHandler() {
  console.log("connected");
}
function disconnectHandler() {
  return (msg) => {
    console.log("disconnected");
  };
}

function errorHandler(gameState) {
  return (msg) => {
    console.error("error", msg);
    console.log("received end game event");
    gameState.notification.add(`error`);
  };
}

function textResponseMessageHandler() {
  console.log("message");
}

function endGame(gameState) {
  return (msg) => {
    console.log("received end game event");
    gameState.notification.add(`🎴 Game has ended`);
  };
}

// todo : replace this global state
let pendingIds = [];
function voteCancel(stateGame) {
  return (msg) => {
    try {
      console.log("vote cancel");
      console.log(msg);
      const cancelStatusId = msg.data.pending_vote.id_;
      const against = msg.data.pending_vote.cancel_status.against.name;
      if (!pendingIds.includes(cancelStatusId)) {
        console.log("showing");
        pendingIds.push(cancelStatusId);
        stateGame.cancelVote.showVoting(cancelStatusId, against);
      }
    } catch (err) {
      console.error("Could not handle incoming vote cancel message");
      console.error(err);
    }
  };
}

function playCard(playedCards, gameState) {
  return (msg) => {
    let card;

    try {
      card = adapt("play_card", msg);
      if (playedCards.includes(card.cardId)) {
        // gameState.notification.add(`🎴 Play Card received again. Ignoring`);
      } else {
        console.log("new card");
        gameState.notification.add(`🎴 New Card Received`);
        gameState.card.set(card);
        playedCards.push(card.cardId);
      }
    } catch (err) {
      console.error("error parding play_Card message");
      console.error(err);
      gameState.notification.add(`🎴 Error Receiving New Card`);
    }
  };
}

function heartBeatHandler() {
  return (msg) => {
    console.log("received end game event");
    gameState.notification.add(`❤️ ${msg.count}`);
  };
}

function actionPerformedHandler(gameState) {
  return (msg) => {
    const { data } = msg;
    const { action } = data;
    if (action) {
      switch (action) {
        case "action_pass_card":
          var { player } = data;
          gameState.notification.add(`🎴 ${player.name} has passed the card`);
          break;
        case "action_keep_card":
          var { player } = data;
          gameState.notification.add(`🎴 ${player.name} has kept the card`);
          break;
        case "action_discard_card":
          var { player } = data;
          gameState.notification.add(
            `🎴 ${player.name} has discarded the card`
          );
          break;
        default:
          break;
      }
    }
    console.debug("===ACTION_PERFORMED===");
    console.debug(msg);
    // gameState.notification.add(`${player} has passed card`);
  };
}

export default {
  connectionHandler,
  disconnectHandler,
  errorHandler,
  textResponseMessageHandler,
  endGame,
  playCard,
  heartBeatHandler,
  voteCancel,
  actionPerformedHandler,
};
