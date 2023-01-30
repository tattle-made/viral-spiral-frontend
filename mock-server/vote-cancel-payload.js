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
  oVoteCancel: {
    data: {
      pending_vote: {
        id_: "93b31cfc2eac4bcdbb5df50c4cabb2ba",
        created_at: "2023-01-25T15:39:51Z",
        updated_at: null,
        game: {
          id_: "1e2eb49cf07941a2a00fa66b7101cc14",
          created_at: "2023-01-25T15:39:00Z",
          updated_at: null,
          name: "lucky-164494",
          draw_fn_name: "first",
          password: "asdf",
          ended: false,
        },
        cancel_status: {
          id_: "715cc4b01eca46cdbc85d1ff587307fc",
          created_at: "2023-01-25T15:39:51Z",
          updated_at: null,
          game: {
            id_: "1e2eb49cf07941a2a00fa66b7101cc14",
            created_at: "2023-01-25T15:39:00Z",
            updated_at: null,
            name: "lucky-164494",
            draw_fn_name: "first",
            password: "asdf",
            ended: false,
          },
          round: {
            id_: "22f66b8fcac54392aca915bae9739ca1",
            created_at: "2023-01-25T15:39:07Z",
            updated_at: null,
            game: {
              id_: "1e2eb49cf07941a2a00fa66b7101cc14",
              created_at: "2023-01-25T15:39:00Z",
              updated_at: null,
              name: "lucky-164494",
              draw_fn_name: "first",
              password: "asdf",
              ended: false,
            },
            started: true,
            full_round: {
              id_: "69e19332740541e99d73a7a29c67ce9e",
              created_at: "2023-01-25T15:39:05Z",
              updated_at: null,
              game: {
                id_: "1e2eb49cf07941a2a00fa66b7101cc14",
                created_at: "2023-01-25T15:39:00Z",
                updated_at: null,
                name: "lucky-164494",
                draw_fn_name: "first",
                password: "asdf",
                ended: false,
              },
            },
          },
          against: {
            id_: "450adcdce95b4b4cab123bad4bebeb54",
            created_at: "2023-01-25T15:39:00Z",
            updated_at: null,
            game: {
              id_: "1e2eb49cf07941a2a00fa66b7101cc14",
              created_at: "2023-01-25T15:39:00Z",
              updated_at: null,
              name: "lucky-164494",
              draw_fn_name: "first",
              password: "asdf",
              ended: false,
            },
            name: "aman",
            score: 0,
            color: {
              id_: "3e43281cc3644bf1b65d34af1c7416de",
              created_at: "2023-01-25T15:39:00Z",
              updated_at: null,
              game: {
                id_: "1e2eb49cf07941a2a00fa66b7101cc14",
                created_at: "2023-01-25T15:39:00Z",
                updated_at: null,
                name: "lucky-164494",
                draw_fn_name: "first",
                password: "asdf",
                ended: false,
              },
              name: "red",
            },
            initial_bias: null,
            initial_affinity: null,
            sequence: 4,
            client_id: "k2DZhCmPsvHISR3qAABJ",
            current: false,
          },
          initiator: {
            id_: "6b5c74fc451a42a38dbefa84abc86044",
            created_at: "2023-01-25T15:39:00Z",
            updated_at: "2023-01-25T15:39:07Z",
            game: {
              id_: "1e2eb49cf07941a2a00fa66b7101cc14",
              created_at: "2023-01-25T15:39:00Z",
              updated_at: null,
              name: "lucky-164494",
              draw_fn_name: "first",
              password: "asdf",
              ended: false,
            },
            name: "adhiraj",
            score: 0,
            color: {
              id_: "3e43281cc3644bf1b65d34af1c7416de",
              created_at: "2023-01-25T15:39:00Z",
              updated_at: null,
              game: {
                id_: "1e2eb49cf07941a2a00fa66b7101cc14",
                created_at: "2023-01-25T15:39:00Z",
                updated_at: null,
                name: "lucky-164494",
                draw_fn_name: "first",
                password: "asdf",
                ended: false,
              },
              name: "red",
            },
            initial_bias: null,
            initial_affinity: null,
            sequence: 101,
            client_id: "zC0ZbNc11p_92GleAAA6",
            current: true,
          },
          topic: {
            id_: "c138e55026c64d00b565889e5fe196dd",
            created_at: "2023-01-25T15:39:00Z",
            updated_at: null,
            game: {
              id_: "1e2eb49cf07941a2a00fa66b7101cc14",
              created_at: "2023-01-25T15:39:00Z",
              updated_at: null,
              name: "lucky-164494",
              draw_fn_name: "first",
              password: "asdf",
              ended: false,
            },
            name: "houseboats",
          },
        },
        voter: {
          id_: "450adcdce95b4b4cab123bad4bebeb54",
          created_at: "2023-01-25T15:39:00Z",
          updated_at: null,
          game: {
            id_: "1e2eb49cf07941a2a00fa66b7101cc14",
            created_at: "2023-01-25T15:39:00Z",
            updated_at: null,
            name: "lucky-164494",
            draw_fn_name: "first",
            password: "asdf",
            ended: false,
          },
          name: "aman",
          score: 0,
          color: {
            id_: "3e43281cc3644bf1b65d34af1c7416de",
            created_at: "2023-01-25T15:39:00Z",
            updated_at: null,
            game: {
              id_: "1e2eb49cf07941a2a00fa66b7101cc14",
              created_at: "2023-01-25T15:39:00Z",
              updated_at: null,
              name: "lucky-164494",
              draw_fn_name: "first",
              password: "asdf",
              ended: false,
            },
            name: "red",
          },
          initial_bias: null,
          initial_affinity: null,
          sequence: 4,
          client_id: "k2DZhCmPsvHISR3qAABJ",
          current: false,
        },
        vote: false,
      },
    },
  },
};

export { payloads };
