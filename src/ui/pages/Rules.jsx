import { Box, Text, Heading, Anchor, Paragraph } from "grommet";
export default function Rules() {
  return (
    <Box pad={"large"}>
      <Heading level={3}>Rules</Heading>
      <Paragraph>
        Welcome to VIRAL SPIRAL, a game about sharing news on the internet. In
        this game you will play a member of a closed online community — think of
        it as a group chat.
      </Paragraph>
      <Paragraph>
        In your turn, you will pick up a card reflecting a NEWS HEADLINE which
        you can then share with any of your fellow players, or keep for
        yourself. Sharing a card will earn you ONE POINT. And if someone
        reshares your card, you will receive ANOTHER POINT.
      </Paragraph>
      <Paragraph>The first player to 15 points WINS. Easy, right? </Paragraph>
      <Paragraph>
        This game is based in a fictional city called CITY. In City, there are
        various communities distinguished by the colour of their shirts. They
        are the redshirts and the blueshirts. [5P EDIT: They are the redshirts,
        blueshirts and yellowshirts.]{" "}
      </Paragraph>

      <Paragraph>
        If you share negative news against either of these communities, it will
        increase your PERSONAL BIAS and the GLOBAL BIAS.{" "}
      </Paragraph>

      <Paragraph>
        All the residents of City feel very strongly about a few topics, like
        socks or cats. Sharing positive or negative news about any of these
        topics will increase or decrease your AFFINITY for this topic.{" "}
      </Paragraph>

      <Paragraph>
        The greater your affinity, the more interesting POWERS you get to
        unlock.
      </Paragraph>

      <Paragraph>
        The greater your bias, the more INSIDIOUS/DANGEROUS/POLARISED the world
        becomes.
      </Paragraph>

      <Paragraph>
        Be careful! When GLOBAL BIAS hits 15, the game comes to an end, and
        everybody loses. And nobody wants that.{" "}
      </Paragraph>

      <Heading level={4}>WHEN FIRST AFFINITY CARD IS SHARED</Heading>
      <Paragraph>
        When your affinity for this topic reaches +/- 3, you will unlock the
        CANCELLING POWER.{" "}
      </Paragraph>

      <Paragraph>
        Cancelling blurb: Nominate a player to cancel. If player is redshirt,
        you will need a majority vote from all blueshirts. If player is a fellow
        blueshirt but anti-cat, you will need a majority vote from fellow
        pro-cat players. Cancelled player misses one turn, and cannot receive
        any cards until they are un-cancelled at the start of the next turn.{" "}
      </Paragraph>

      <Paragraph>
        When your affinity for this topic reaches +/- 7, you will unlock VIRAL
        SPIRAL.{" "}
      </Paragraph>

      <Paragraph>
        Viral Spiral blurb: Share multiple copies of the same card to ALL
        players. Get points for every share and reshare.
      </Paragraph>

      <Heading level={4}>WHEN FIRST BIAS CARD IS SHARED</Heading>
      <Paragraph>
        When your bias reaches +3, you will unlock the FAKE NEWS POWER.{" "}
      </Paragraph>

      <Paragraph>
        Fake News blurb: Edit a card before sharing it by changing its bias or
        affinity. If your card is fact-checked by another player, you lose a
        point.
      </Paragraph>

      <Paragraph>
        When your bias reaches +7, you will unlock VIRAL SPIRAL.{" "}
      </Paragraph>

      <Paragraph>
        Viral Spiral blurb: Share multiple copies of the same card to ALL
        players. Get points for every share and reshare.{" "}
      </Paragraph>

      <Paragraph></Paragraph>

      <Paragraph></Paragraph>

      <Paragraph></Paragraph>

      <Paragraph></Paragraph>
    </Box>
  );
}
