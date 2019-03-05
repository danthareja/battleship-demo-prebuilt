import React from 'react';
import PropTypes from 'prop-types';

import CardList from './CardList';

import './CommunityCards.css'

const CommunityCards = ({ cards }) => {
  return (
    <div className="CommunityCards">
      <div className="CommunityCards__flop">
        <CardList cards={cards.slice(0,3)} />
      </div>
      <div className="CommunityCards__turn">
        <CardList cards={[cards[3]]} />
      </div>
      <div className="CommunityCards__river">
        <CardList cards={[cards[4]]} />
      </div>
    </div>
  )
}

export default CommunityCards;