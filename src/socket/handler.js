import adapt from "./adapter-recoil";

function connectionHandler() {
  console.log("connected");
}
function disconnectHandler() {
  console.log("disconnected");
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
      const cancelStatusId = msg.data.pending_vote.id_;
      const against = msg.data.pending_vote.against.name;
      console.log({ cancelStatusId, against });
      if (!pendingIdsp.includes(cancelStatusId)) {
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
  console.log("Play Card", { playedCards, gameState });

  return (msg) => {
    console.log(msg);

    let card;

    try {
      card = adapt("play_card", msg);
      if (playedCards.includes(card.cardId)) {
        gameState.notification.add(`🎴 played card received again. Ignoring`);
      } else {
        console.log("new card");
        gameState.notification.add(`🎴 Play Card`);
        gameState.card.set(card);
        playedCards.push(card.cardId);
      }
    } catch (err) {
      console.error("error parding play_Card message");
      console.error(err);
      gameState.notification.add(`🎴 Error Receiving Play Card`);
    }
  };
}

function heartBeatHandler() {
  return (msg) => {
    console.log("received end game event");
    gameState.notification.add(`❤️ ${msg.count}`);
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
};
