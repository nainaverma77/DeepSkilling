import React from 'react';

export function ListofPlayers({ players }) {
  return (
    players.map((item, index) => {
      return (
        <div key={index}>
          <li>Mr. {item.name}<span> {item.score}</span></li>
        </div>
      );
    })
  );
}

export function Scorebelow70({ players }) {
  var players70 = [];
  players.map((item) => {
    if (item.score <= 70) {
      players70.push(item);
    }
  });

  return (
    players70.map((item, index) => {
      return (
        <div key={index}>
          <li>Mr. {item.name}<span> {item.score}</span></li>
        </div>
      );
    })
  );
}
