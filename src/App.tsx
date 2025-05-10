import { useState } from "react";
import ReactConfetti from "react-confetti";
import NewGameBtn from "./components/controls/NewGameBtn";
import Deck from "./components/Deck";
import Discovery from "./components/Discovery";
import Foundation from "./components/Foundation";
import SortingColumn from "./components/SortingColumn";
import Constants from "./Constants";
import Suit from "./enums/Suit";
import ZoneHelper from "./helper/ZoneHelper";
import CardService from "./services/CardService";
import TableT from "./types/TableT";

function App() {
  const [table, setTable] = useState<TableT>({});

  const zones = {
    deck: table[Constants.ZONE.DECK] ?? [],
    foundations: {
      clubs: table[ZoneHelper.GetFoundationId(Suit.Clubs)] ?? [],
      diamonds: table[ZoneHelper.GetFoundationId(Suit.Diamonds)] ?? [],
      hearts: table[ZoneHelper.GetFoundationId(Suit.Hearts)] ?? [],
      spades: table[ZoneHelper.GetFoundationId(Suit.Spades)] ?? [],
    },
  };

  const moveCard = (cardId: string, from: string, to: string) => {
    setTable((prevTable) => ({
      ...prevTable,
      [from]: prevTable[from].filter((c) => c.id !== cardId),
      [to]: [...prevTable[to], CardService.GetCard(cardId)],
    }));
  };

  const initialiseNewGame = () => {
    setTable(CardService.CreateInitialisedTable());
  };

  const handleDeckDrop = (cardId: string, origin: string) => {
    const droppedStack = ZoneHelper.GetStack(cardId, table[origin]);
    if (zones.deck.length === 0 && droppedStack.length === 1)
      moveCard(cardId, origin, Constants.ZONE.DECK);
  };

  const handleSortingColumnDrop = (
    cardId: string,
    origin: string,
    target: string
  ) => {
    if (origin === target) return;

    const droppedStack = ZoneHelper.GetStack(cardId, table[origin]);

    const targetCard = ZoneHelper.GetTopCard(table[target]);
    if (
      targetCard === undefined ||
      CardService.IsDraggable([targetCard, ...droppedStack])
    ) {
      droppedStack.forEach((droppedCard) => {
        moveCard(droppedCard.id, origin, target);
      });
    }
  };

  const handleFoundationDrop = (
    cardId: string,
    origin: string,
    targetFoundationSuit: Suit
  ) => {
    const foundationColumnKey =
      ZoneHelper.GetFoundationId(targetFoundationSuit);
    const droppedCard = CardService.GetCard(cardId);
    const foundationTopValue =
      ZoneHelper.GetTopCard(table[foundationColumnKey])?.value ?? 0;

    const isSingleCard =
      ZoneHelper.GetStack(cardId, table[origin]).length === 1;

    const matchesStack =
      droppedCard.suit === targetFoundationSuit &&
      droppedCard.value === foundationTopValue + 1;

    if (isSingleCard && matchesStack) {
      moveCard(cardId, origin, foundationColumnKey);
    }
  };

  const handleDiscover = () => {
    const card = ZoneHelper.GetTopCard(zones.deck);
    if (card) {
      moveCard(card.id, Constants.ZONE.DECK, Constants.ZONE.DISCOVERY);
    }
  };

  const columnElements = ZoneHelper.GetSortingColumnKeys().map((zoneId) => (
    <SortingColumn
      key={zoneId}
      zoneId={zoneId}
      cards={table[zoneId]}
      onCardDrop={handleSortingColumnDrop}
    />
  ));

  const foundationElements = Object.values(Suit).map((suit) => (
    <Foundation
      key={ZoneHelper.GetFoundationId(suit)}
      suit={suit}
      cards={table[ZoneHelper.GetFoundationId(suit)]}
      onCardDrop={handleFoundationDrop}
    />
  ));

  const gameWon = () => {
    return (
      zones.foundations.clubs.length == 13 &&
      zones.foundations.diamonds.length == 13 &&
      zones.foundations.hearts.length == 13 &&
      zones.foundations.spades.length == 13
    );
  };

  return (
    <div className="app">
      {gameWon() && <ReactConfetti />}
      <div className="game">
        <div className="top-bar">
          <NewGameBtn onClick={initialiseNewGame} />
        </div>
        <div className="table">
          <div className="foundation-container">{foundationElements}</div>
          <div className="main-container">
            <div className="discovery-container">
              <Deck
                cards={zones.deck}
                onClick={handleDiscover}
                onCardDrop={handleDeckDrop}
              />
              <Discovery cards={table[Constants.ZONE.DISCOVERY]} />
            </div>
            <div className="pile-row">{columnElements}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
