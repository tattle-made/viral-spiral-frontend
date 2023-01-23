const aboutGame = {
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
  oCreateGame: { status: 200, data: "Created game" },
  iJoinGame: {},
  oJoinGame: {
    status: 200,
    about: aboutGame,
  },
  oAboutGame: {
    status: 200,
    about: aboutGame,
  },
  iPlayCard: {},
  oPlayCard: {
    data: {
      recipients: ["adhiraj", "krys", "aman"],
      card_instance: {
        id_: "4d7105dafc564ce69418c599b5cc718b",
        card: {
          id_: "asdfadf",
          title: "",
          description:
            "Smug cat looks on while robbers tie up family steal cash",
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
  iKeepCard: {},
  oKeepCard: {},
  iPassCard: {},
  oPassCard: {
    status: 200,
    foo: "bar",
  },
  iDiscardCard: {},
  oDiscardCard: {},
  iTurnIntoFakeNews: {},
  oTurnIntoFakeNews: {
    status: 200,
    card: {
      fake_headline: "Sagittis eu volutpat odio facilisis mauris",
    },
  },
  iMarkAsFake: {},
  oMarkAsFake: {
    status: 200,
    card: {
      foo: "bar",
    },
  },
  iEncyclopediaSearch: {},
  oEncyclopediaSearch: {
    status: 200,
    message: {
      title: "Excess socks-baggage brings down airplane, many feared dead",
      content:
        "Breaking - At 1.07 AM today, City Air Flight 3807 crashed into the harbour. Rescue operations are underway, many are feared dead. The cause of the crash has been surmised to have been destablization caused by an extreme excess of baggage, mostly socks, that were being taken for a Socks Manufacturing convention...",
      type: "News",
      author: "None",
    },
  },
  iCancelPlayerInitiate: {},
  oCancelPlayerInitiate: {
    status: 200,
    foo: "bar",
  },
  pCancelPlayerInitiate: {
    data: {
      pending_vote: {
        id_: "abdb465693ba4841872993bf54ceac9b",
        created_at: null,
        updated_at: null,
        game: {
          id_: "ab540a031ba44214919d5d1de144e3c4",
          created_at: "2022-12-14T12:03:24Z",
          updated_at: null,
          name: "game1",
          draw_fn_name: "first",
          password: "helloworld",
          ended: false,
        },
        round: {
          id_: "ca7e53a3d353496cb7d97eecce1041dc",
          created_at: null,
          updated_at: null,
          game: {
            id_: "ab540a031ba44214919d5d1de144e3c4",
            created_at: "2022-12-14T12:03:24Z",
            updated_at: null,
            name: "game1",
            draw_fn_name: "first",
            password: "helloworld",
            ended: false,
          },
          started: true,
          full_round: {
            id_: "7925ce000cea414d853245a7d6871c4c",
            created_at: null,
            updated_at: null,
            game: {
              id_: "ab540a031ba44214919d5d1de144e3c4",
              created_at: "2022-12-14T12:03:24Z",
              updated_at: null,
              name: "game1",
              draw_fn_name: "first",
              password: "helloworld",
              ended: false,
            },
          },
        },
        against: {
          id_: "bd5740cc7a9d4cdda5a04bd9eb062cc1",
          created_at: "2022-12-14T12:03:24Z",
          updated_at: null,
          game: {
            id_: "ab540a031ba44214919d5d1de144e3c4",
            created_at: "2022-12-14T12:03:24Z",
            updated_at: null,
            name: "game1",
            draw_fn_name: "first",
            password: "helloworld",
            ended: false,
          },
          name: "rishav",
          score: 0,
          color: {
            id_: "e090de27d521472895171eac3e8b08c6",
            created_at: "2022-12-14T12:03:24Z",
            updated_at: null,
            game: {
              id_: "ab540a031ba44214919d5d1de144e3c4",
              created_at: "2022-12-14T12:03:24Z",
              updated_at: null,
              name: "game1",
              draw_fn_name: "first",
              password: "helloworld",
              ended: false,
            },
            name: "red",
          },
          initial_bias: null,
          initial_affinity: null,
          sequence: 1,
          client_id: null,
          current: false,
        },
        initiator: {
          id_: "2cda4eacd45d48529dd014c6f0812950",
          created_at: "2022-12-14T12:03:24Z",
          updated_at: null,
          game: {
            id_: "ab540a031ba44214919d5d1de144e3c4",
            created_at: "2022-12-14T12:03:24Z",
            updated_at: null,
            name: "game1",
            draw_fn_name: "first",
            password: "helloworld",
            ended: false,
          },
          name: "denny",
          score: 0,
          color: {
            id_: "0f32e9525fc141b3abd797541e5284c2",
            created_at: "2022-12-14T12:03:24Z",
            updated_at: null,
            game: {
              id_: "ab540a031ba44214919d5d1de144e3c4",
              created_at: "2022-12-14T12:03:24Z",
              updated_at: null,
              name: "game1",
              draw_fn_name: "first",
              password: "helloworld",
              ended: false,
            },
            name: "blue",
          },
          initial_bias: null,
          initial_affinity: null,
          sequence: 2,
          client_id: null,
          current: false,
        },
        topic: {
          id_: "0f5d288488804192a5e43760710399af",
          created_at: "2022-12-14T12:03:24Z",
          updated_at: null,
          game: {
            id_: "ab540a031ba44214919d5d1de144e3c4",
            created_at: "2022-12-14T12:03:24Z",
            updated_at: null,
            name: "game1",
            draw_fn_name: "first",
            password: "helloworld",
            ended: false,
          },
          name: "high_fives",
        },
      },
    },
  },
  iCancelPlayerVote: {},
  oCancelPlayerVote: {
    status: 200,
    foo: "bar",
  },
  iViralSpiral: {},
  oViralSpiral: {
    status: 200,
    foo: "bar",
  },
};

export { payloads };
