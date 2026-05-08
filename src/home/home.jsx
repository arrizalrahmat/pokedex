'use client';
import '../App.css';
import React from 'react';
import {useEffect} from 'react';
import PokemonCard from '../../components/pokemon-card';
import {styles} from '../style';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from '../../components/navigation-bar';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPokemons,
  setOffSet,
} from '../../library/store/reducers/pokemons';

export default function HomePage() {
  const dispatch = useDispatch();
  const {pokemons, previous, next, offset} = useSelector(
    state => state.pokemons,
  );

  const handleNext = () => {
    if (!next) return;
    console.log(next, '<<<next');
    dispatch(getPokemons({url: next}));
    dispatch(setOffSet(offset + 20));
  };

  const handlePrevious = () => {
    if (!previous) return;
    dispatch(getPokemons({url: previous}));
    dispatch(setOffSet(offset - 20));
  };

  useEffect(() => {
    dispatch(getPokemons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Pokemon List</h1>
      <div style={styles.cardContainer}>
        {pokemons.map((p, i) => {
          return (
            <PokemonCard
              key={p.name}
              pokemon={p}
              number={offset + i + 1}
            />
          );
        })}
      </div>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
