'use client';
/* eslint-disable react-hooks/set-state-in-effect */
import {useState} from 'react';
import '../App.css';
import React from 'react';
import {useEffect} from 'react';
import PokemonCard from '../../components/pokemon-card';
import {styles} from '../style';
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from '../../components/navigation-bar';

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [offset, setOffset] = useState(0);

  const getPokemons = async url => {
    const response = await fetch(url || baseUrl);
    const data = await response.json();

    const details = await Promise.all(
      data.results.map(async e => {
        const res = await fetch(e.url);
        const detail = await res.json();
        return {
          ...e,
          detail,
        };
      }),
    );
    console.log(details, '<<details');

    setPokemons(details);
    setPrevious(data.previous);
    setNext(data.next);
  };

  const handleNext = () => {
    if (!next) return;
    getPokemons(next);
    setOffset(offset + 20);
  };

  const handlePrevious = () => {
    if (!previous) return;
    getPokemons(previous);
    setOffset(offset - 20);
  };

  useEffect(() => {
    getPokemons();
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
