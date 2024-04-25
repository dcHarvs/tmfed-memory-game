import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { randomizer } from '../lib/utils';
import Card from './Card';

const PlaceholderCard = () => {
  return <div className="placeholder-card"></div>;
};

const generateCards = (layout) => {
  return randomizer(
    new Array((layout * layout) / 2)
      .fill(0)
      .map((_, index) => index + 1)
      .concat(
        new Array((layout * layout) / 2).fill(0).map((_, index) => index + 1)
      )
  ).map((value, index) => ({
    value,
    index,
    shown: false,
    hidden: false,
  }));
};

export default function Cards({ layout, handleRestart }) {
  const [cards, setCards] = useState(generateCards(layout));
  const [loading, setLoading] = useState(false);

  const handleFlip = useCallback((_, index) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.index === index) {
          card.shown = true;
        }

        return card;
      });
    });
  }, []);

  const closeAll = useCallback(
    () => setCards(cards.map((card) => Object.assign(card, { shown: false }))),
    [cards]
  );

  const resetAll = useCallback(() => setCards(generateCards(layout)), [layout]);

  const isFinished = useMemo(
    () => !cards.some((card) => !card.hidden),
    [cards]
  );

  useEffect(() => {
    const shownCards = cards.filter((card) => card.shown && !card.hidden);

    if (shownCards.length === 2) {
      setLoading(true);

      setTimeout(() => {
        if (shownCards[0].value === shownCards[1].value) {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (
                card.index === shownCards[0].index ||
                card.index === shownCards[1].index
              ) {
                card.hidden = true;
              }

              return card;
            });
          });
        } else {
          closeAll();
        }

        setLoading(false);
      }, 1000);
    }
  }, [cards, closeAll]);

  return !isFinished ? (
    <>
      <div className="cards" style={{ width: layout * 64 + (layout - 1) * 5 }}>
        {cards.map(({ hidden, ...props }) => {
          return hidden ? (
            <PlaceholderCard key={props.index} />
          ) : (
            <Card
              {...props}
              key={props.index}
              loading={loading}
              onFlip={handleFlip}
            />
          );
        })}
      </div>
      <button
        className="app-button"
        onClick={() => {
          const value = confirm('Reset all cards? Your progress will be lost.');

          if (value) {
            resetAll();
          }
        }}
      >
        Reset Cards
      </button>
    </>
  ) : (
    <button
      className="app-button"
      onClick={() => {
        handleRestart?.();
      }}
    >
      Play again
    </button>
  );
}
