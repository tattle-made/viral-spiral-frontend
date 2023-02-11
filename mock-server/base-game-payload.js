const aboutGame = {
  room: {
    id: "abcdef",
    password: "pw-abcd",
  },
  total_global_bias: 10,
  current_drawing_player: {
    id_: "player1",
    name: "adhiraj",
  },
  colors: [
    {
      id_: "color1",
      name: "red",
    },
    {
      id_: "color2",
      name: "yellow",
    },
    {
      id_: "color3",
      name: "blue",
    },
  ],
  topics: [
    {
      id_: "affin1",
      name: "cats",
    },
    {
      id_: "affin2",
      name: "skub",
    },
    {
      id_: "affin3",
      name: "socks",
    },
    {
      id_: "affin4",
      name: "high_fives",
    },
    {
      id_: "affin5",
      name: "houseboats",
    },
  ],
  players: [
    {
      id_: "player1",
      name: "adhiraj",
      me: true,
      score: 10,
      color: {
        name: "red",
      },
      biases: {
        color1: 10,
        color2: 2,
        color3: 0,
      },
      affinities: {
        affin1: 0,
        affin2: 2,
        affin3: 3,
        affin4: 2,
        affin5: 9,
      },
    },
    {
      id_: "player2",
      name: "aman",
      score: 10,
      color: {
        name: "yellow",
      },
      biases: {
        color1: 10,
        color2: 2,
        color3: 0,
      },
      affinities: {
        affin1: 0,
        affin2: 2,
        affin3: 3,
        affin4: 0,
        affin5: 2,
      },
    },
    {
      id_: "player3",
      name: "krys",
      score: 10,
      color: {
        name: "yellow",
      },
      biases: {
        color1: 10,
        color2: 2,
        color3: 0,
      },
      affinities: {
        affin1: 0,
        affin2: 2,
        affin3: 3,
        affin4: 4,
        affin5: 5,
      },
    },
    {
      id_: "player4",
      name: "farah",
      score: 10,
      color: {
        name: "blue",
      },
      biases: {
        color1: 10,
        color2: 2,
        color3: 0,
      },
      affinities: {
        affin1: 0,
        affin2: 2,
        affin3: 3,
        affin4: 0,
        affin5: 2,
      },
    },
  ],
};

/**
 * the prefix i and o stand for incoming and outgoing respectively.
 * the directionality is from the reference of the server, so incoming
 * refers to messages coming into the server.
 * p stands for polling, something that the server sends to the client continuosly
 */
const payloads = {
  iCreateGame: {},
  oCreateGame: {
    status: 200,
    game: {
      name: "abcdef",
    },
  },
  iJoinGame: {},
  oJoinGame: {
    status: 200,
    about: aboutGame,
  },
  oAboutGame: {
    status: 200,
    about: aboutGame,
  },
  oPlayCard: {
    data: {
      recipients: ["adhiraj", "krys", "aman"],
      card_instance: {
        id_: "4d7105dafc564ce69418c599b5cc718b",
        card: {
          id_: "asdfadf",
          title: "",
          description:
            "Smug cat looks on while robbers tie up family steal cash.",
          fakes: [{ id_: "asdfads" }],
        },
      },
      allowed_actions: [
        "keep_card",
        "discard_card",
        "mark_as_fake",
        "encyclopedia_search",
        "pass_card",
        "viral_spiral",
        "initiate_cancel",
        "vote_cancel",
        "fake_news",
      ],
      valid_topics_for_cancel: [
        {
          id_: "affin1",
          name: "cats",
        },
        {
          id_: "affin2",
          name: "skubs",
        },
      ],
    },
  },
};

export { payloads };
