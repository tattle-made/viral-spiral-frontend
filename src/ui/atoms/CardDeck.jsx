import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const scale = keyframes`
  from{
    transform: scale(1) rotateX(100deg) rotateY(10deg) rotateZ(10deg);
  }
  to{
    transform: scaleX(1.2) scaleZ(1.2) rotateX(100deg) rotateY(10deg) rotateZ(10deg);
  }
`;

const DeckCard = styled.div`
  width: 160px;
  height: 90px;
  background: aqua;
  position: absolute;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(123, 123, 255);
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 255, 0.2);
  cursor: pointer;
  &:click {
    visibility: none;
  }
  ${(props) =>
    props.shouldHover
      ? `&:hover {
        box-shadow: 2px 2px 120px 80px rgba(0, 0, 255, 0.4);
      }`
      : ""}
`;

export default function CardDeck({ onPick, x, y }) {
  const [cards, setCards] = useState(Array.from({ length: 50 }, (v, k) => k));
  console.log("2");

  function onCardPick() {
    setCards(cards.slice(0, -1));
    onPick();
  }

  useEffect(() => {}, [cards]);

  return (
    <div style={{ perspective: "30em" }}>
      {cards.map((card, ix) => (
        <DeckCard
          key={ix}
          onClick={onCardPick}
          shouldHover={ix === cards.length - 1 ? true : false}
          style={{
            left: `${x - Math.random() * 30}px`,
            top: `${y + Math.random() * 20}px`,
            transform: `rotateX(100deg) rotateY(10deg) rotateZ(150deg)`,
          }}
        />
      ))}
    </div>
  );
}
