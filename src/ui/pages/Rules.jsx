import { Box, Text, Heading, Anchor, Paragraph, Image } from "grommet";
import vsLogo from "../../assets/vs-logo-badge.png";
import bgLandingCard01 from "../../assets/bg-landing-cards-01.png";
import bgLandingCard02 from "../../assets/bg-landing-cards-02.png";
import bgLandingCard03 from "../../assets/bg-landing-cards-03.png";
import bgLandingCard04 from "../../assets/bg-landing-cards-04.png";
import bgLanding from "../../assets/bg-landing-2.png";
import sc1 from "../../assets/rule-sc-01.png";
import sc2 from "../../assets/rule-sc-02.png";
import sc3 from "../../assets/rule-sc-03.png";
import playerCard from "../../assets/player-card.png";

const Section = ({ children, width, color }) => (
  <Box width={width} background={color}>
    {children}
  </Box>
);

const SectionFullWidth = ({ children }) => (
  <Section width={"100%"} background="red">
    {children}
  </Section>
);

const SectionLarge = ({ children }) => (
  <Section width={"large"} background="aqua">
    {children}
  </Section>
);

const SectionXLarge = ({ children }) => (
  <Section width={"xlarge"} background="aqua">
    {children}
  </Section>
);

const SectionNarrow = ({ children }) => (
  <Section width={"medium"} background="yellow">
    {children}
  </Section>
);

export default function Rules() {
  return (
    <Box flex={"grow"} overflow={scroll} responsive>
      <SectionLarge>
        <Box width={"8em"} height="8em" pad={"medium"} align="start">
          <Image src={vsLogo} fit="contain" />
        </Box>
        <Box pad={"large"}>
          <Heading level={1} margin={"none"}>
            Rulebook
          </Heading>
          <Paragraph size={"large"} fill>
            Welcome to{" "}
            <Text weight={"bold"} size={"large"}>
              Viral Spiral
            </Text>
            , a game about sharing news on the internet. In this game you will
            play a member of a closed online community — think of it as a group
            chat.
          </Paragraph>
          <Paragraph size={"large"} fill>
            In your turn, you will pick up a card reflecting a{" "}
            <Text weight={"bold"} size={"large"}>
              News Headline
            </Text>
            which you can then share with any of your fellow players, or keep
            for yourself. Sharing a card will earn you{" "}
            <Text weight={"bold"} size={"large"}>
              One Point
            </Text>
            . And if someone reshares your card, you will receive{" "}
            <Text weight={"bold"} size={"large"}>
              Another Point
            </Text>
            .
          </Paragraph>
          <Paragraph size={"large"} fill>
            The first player to 15 points{" "}
            <Text weight={"bold"} size={"large"}>
              Wins
            </Text>
            . Easy, right?
          </Paragraph>
          <Paragraph size={"large"} fill>
            This game is based in a fictional city called{" "}
            <Text weight={"bold"} size={"large"}>
              City
            </Text>
            . In City, there are various communities distinguished by the colour
            of their shirts. They are the redshirts and the blueshirts. They are
            the redshirts, blueshirts and yellowshirts.{" "}
          </Paragraph>
          <Paragraph size={"large"} fill>
            If you share negative news against either of these communities, it
            will increase your
            <Text weight={"bold"} size={"large"}>
              {" "}
              Personal Bias
            </Text>{" "}
            and the{" "}
            <Text weight={"bold"} size={"large"}>
              Global Bias
            </Text>{" "}
            - but you still get a point.{" "}
          </Paragraph>{" "}
          <Paragraph size={"large"} fill>
            All the residents of City feel very strongly about a few topics,
            like socks or cats. Sharing positive or negative news about any of
            these topics will increase or decrease your{" "}
            <Text weight={"bold"} size={"large"}>
              Affinity
            </Text>{" "}
            for this topic.
          </Paragraph>
          <Paragraph size={"large"} fill>
            The greater your affinity, the more interesting POWERS you get to
            unlock.
          </Paragraph>
          <Paragraph size={"large"} fill>
            The greater your bias, the more{" "}
            <Text weight={"bold"} size={"large"}>
              Insidious/Dangerous/Polarized
            </Text>{" "}
            the world becomes.
          </Paragraph>
          <Paragraph size={"large"} fill>
            Be careful! When{" "}
            <Text weight={"bold"} size={"large"}>
              Global Bias
            </Text>{" "}
            hits 15, the game comes to an end, and everybody loses. And nobody
            wants that.
          </Paragraph>
        </Box>
      </SectionLarge>

      <SectionFullWidth>
        <Box pad={"large"} gap={"small"}>
          <Heading level={4} margin={"none"} size={"large"}>
            Screenshot of a room with 4 players
          </Heading>
          <Image src={sc1}></Image>
        </Box>
      </SectionFullWidth>
      <SectionFullWidth>
        <Box pad={"large"} gap={"small"}>
          <Heading level={4} margin={"none"} size={"large"}>
            Screenshot of a room with a new card
          </Heading>
          <Image src={sc2}></Image>
        </Box>
      </SectionFullWidth>

      <SectionLarge>
        <Box pad={"large"} gap={"small"}>
          <Heading level={4} margin={"none"} size={"large"}>
            A player's scorecard
          </Heading>
          <Image src={playerCard}></Image>
          <Box width={"large"}>
            <Text>
              A sample score card from the game. They belong to the red
              community (A), have a clout point (B) of 5 and an anti blue bias
              (C) of 3. They have an affinity of -2 for socks (D) and +4 for
              houseboats (E)
            </Text>
          </Box>
        </Box>
      </SectionLarge>

      <SectionFullWidth>
        <Box pad={"large"} gap={"small"}>
          <Heading level={4} margin={"none"} size={"large"}>
            Screenshot of the "Check Source" in action
          </Heading>
          <Image src={sc3}></Image>
        </Box>
      </SectionFullWidth>

      <SectionLarge>
        <Box pad={"large"}>
          <Heading level={2}>Special Powers</Heading>
          <Heading level={3} margin={"none"}>
            Affinity based powers
          </Heading>
          <Heading level={4} margin={{ top: "medium", bottom: "xsmall" }}>
            1. Cancel Player
          </Heading>
          <Paragraph
            size={"large"}
            fill
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            When your affinity for a topic reaches +/- 3, you will unlock the
            power to
            <Text size={"large"} weight={"bold"}>
              {" "}
              Cancel{" "}
            </Text>
            a player.
          </Paragraph>{" "}
          <Paragraph
            size={"large"}
            fill
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            Nominate a player to cancel. If player is redshirt, you will need a
            majority vote from all blueshirts. If player is a fellow blueshirt
            but anti-cat, you will need a majority vote from fellow pro-cat
            players. Cancelled player misses one turn, and cannot receive any
            cards until they are un-cancelled at the start of the next turn.{" "}
          </Paragraph>{" "}
          <Heading level={4} margin={{ top: "medium", bottom: "xsmall" }}>
            2. Viral Spiral
          </Heading>
          <Paragraph
            size={"large"}
            fill
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            When your affinity for this topic reaches +/- 7, you will unlock
            <Text size="large" weight={"bold"}>
              Viral Spiral.{" "}
            </Text>
          </Paragraph>{" "}
          <Paragraph
            size={"large"}
            fill
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            Share multiple copies of the same card to ALL players. Get points
            for every share and reshare.{" "}
          </Paragraph>
          <Heading level={3} margin={{ top: "large", bottom: "xsmall" }}>
            Bias based powers
          </Heading>
          <Heading level={4} margin={{ top: "medium", bottom: "xsmall" }}>
            1. Fake News
          </Heading>
          <Paragraph
            size={"large"}
            fill
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            When your bias reaches +3, you will unlock the{" "}
            <Text size={"large"} weight={"bold"}></Text> Fake News power.
          </Paragraph>{" "}
          <Paragraph
            size={"large"}
            fill
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            Edit a card before sharing it by changing its bias or affinity. If
            your card is fact-checked by another player, you lose a point.
          </Paragraph>{" "}
          <Heading level={4} margin={{ top: "medium", bottom: "xsmall" }}>
            2. Viral Spiral
          </Heading>
          <Paragraph
            size={"large"}
            fill
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            When your bias reaches +7, you will unlock{" "}
            <Text weight={"bold"} size="large">
              Viral Spiral
            </Text>
            .
          </Paragraph>
          <Paragraph
            size={"large"}
            fill
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            Share multiple copies of the same card to ALL players. Get points
            for every share and reshare.
          </Paragraph>
        </Box>
      </SectionLarge>
    </Box>
  );
}
