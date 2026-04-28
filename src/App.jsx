'use client';
/* eslint-disable react-hooks/set-state-in-effect */
import {useState} from 'react';
import './App.css';
import React from 'react';
import {useEffect} from 'react';
import PokemonCard from '../components/pokemon-card';
import {styles} from './style';
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

const App = () => {
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
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            Accordion Item #1
          </Accordion.Header>
          <Accordion.Body>
            <Carousel>
              {[1, 2, 3, 4, 5].map(e => (
                <Carousel.Item key={e}>
                  <Card>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                      <Card.Title>
                        Special title treatment
                      </Card.Title>
                      <Card.Text>
                        With supporting text below as a
                        natural lead-in to additional
                        content.
                      </Card.Text>
                      <Button variant='primary'>
                        Go somewhere
                      </Button>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
            {/* <Card style={{width: '18rem'}}>
              <Card.Img
                variant='top'
                src='holder.js/100px180'
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the
                  card title and make up the bulk of the
                  card's content.
                </Card.Text>
                <Button variant='primary'>
                  Go somewhere
                </Button>
              </Card.Body>
            </Card> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>
            Accordion Item #2
          </Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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
};

// const styles = {
//   cardContainer: {
//     display: 'grid',
//     gridTemplateColumns:
//       'repeat(auto-fill, minmax(220px, 1fr))',
//     gap: 12,
//     alignItems: 'stretch',
//   },
// };

// class RedBox extends React.Component {
//   componentWillUnmount() {
//     console.log('Adios Red Box!!');
//   }

//   render() {
//     return (
//       <div
//         style={{
//           backgroundColor: 'red',
//           width: 100,
//           height: 100,
//         }}></div>
//     );
//   }
// }

// class BlueBox extends React.Component {
//   componentWillUnmount() {
//     console.log('Adios Blue Box!!');
//   }
//   render() {
//     return (
//       <div
//         style={{
//           backgroundColor: 'blue',
//           width: 100,
//           height: 100,
//         }}></div>
//     );
//   }
// }

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       count: 0,
//       query: '',
//     };
//   }

//   componentDidMount() {
//     console.log('Selamat datang di aplikasi ini');
//   }

//   componentDidUpdate() {
//     console.log('state count berubah');
//   }

//   handleIncrement() {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   }

//   handleChangeQuery(text) {
//     this.setState({
//       query: text,
//     });
//   }

//   render() {
//     return (
//       <>
//         <h1>{this.state.count}</h1>
//         <button
//           onClick={e => {
//             e.preventDefault();
//             this.handleIncrement();
//           }}>
//           +
//         </button>

//         <input
//           type='text'
//           value={this.state.query}
//           style={{
//             borderColor: 'white',
//             borderRadius: 8,
//             borderWidth: 2,
//             width: '50%',
//           }}
//           placeholder='search user'
//           onChange={e => {
//             e.preventDefault();
//             this.handleChangeQuery(e.target.value);
//           }}></input>
//         {this.state.count % 2 === 0 ? (
//           <RedBox />
//         ) : (
//           <BlueBox />
//         )}
//       </>
//     );
//   }
// }

// const RedBox = () => {
//   // equivalent to componentWillUnmount. or well known as cleanup function
//   useEffect(() => {
//     return () => {
//       console.log('Adios Red Box!!');
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         backgroundColor: 'red',
//         width: 100,
//         height: 100,
//       }}></div>
//   );
// };

// const BlueBox = () => {
//   useEffect(() => {
//     return () => {
//       console.log('Adios Blue Box!!');
//     };
//   }, []);
//   return (
//     <div
//       style={{
//         backgroundColor: 'blue',
//         width: 100,
//         height: 100,
//       }}></div>
//   );
// };

// function App() {
//   const [count, setCount] = useState(0);
//   const [query, setQuery] = useState('');

//   const handleCount = () => {
//     setCount(count + 1);
//   };

//   const handleChangeQuery = text => {
//     setQuery(text);
//   };

//   //equivalent to componentDidMount
//   useEffect(() => {
//     console.log('Selamat datang di aplikasi ini!!');
//     // set metadata
//   }, []);

//   // equivalent to componentDidUpdate
//   useEffect(() => {
//     console.log('state count berubah!!');
//   }, [count]);

//   useEffect(() => {
//     console.log('state query berubah!!');
//   }, [query]);

//   return (
//     <>
//       <h1>{count}</h1>
//       <button
//         onClick={e => {
//           e.preventDefault();
//           handleCount();
//         }}>
//         +
//       </button>

//       <input
//         type='text'
//         value={query}
//         style={{
//           borderColor: 'white',
//           borderRadius: 8,
//           borderWidth: 2,
//           width: '50%',
//         }}
//         placeholder='search user'
//         onChange={e => {
//           e.preventDefault();
//           handleChangeQuery(e.target.value);
//         }}></input>
//       {count % 2 === 0 ? <RedBox /> : <BlueBox />}
//     </>
//   );
// }

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <nav className='navbar'>
//         <div className='navbar-left'>
//           <a>QTemu</a>
//           <a>Create Meetup</a>
//           <a>Explore</a>
//         </div>
//         <a>Login</a>
//       </nav>

//       <div className='container'>
//         {/* header */}
//         <section className='group-header'>
//           <div className='group-header-inner'>
//             <div className='group-avatar'></div>
//             <div className='group-info'>
//               <h1>Hacktiv8 meetup</h1>

//               <table className='group-details'>
//                 <tbody>
//                   <tr>
//                     <td>Location</td>
//                     <td>Jakarta, Indonesia</td>
//                   </tr>
//                   <tr>
//                     <td>Members</td>
//                     <td>1,078</td>
//                   </tr>
//                   <tr>
//                     <td>Organizers</td>
//                     <td>Arrizal Rahmat Kurniawan</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

export default App;
