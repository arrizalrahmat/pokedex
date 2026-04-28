import Carousel from 'react-bootstrap/Carousel';

const formatHeight = decimeters =>
  decimeters != null
    ? `${(decimeters / 10).toFixed(1)}m`
    : '—';

const formatWeight = hectograms =>
  hectograms != null
    ? `${(hectograms / 10).toFixed(1)}kg`
    : '—';

const PIXEL_FONT = "'Press Start 2P', monospace";
const READABLE_PIXEL_FONT =
  "'VT323', 'Press Start 2P', monospace";

const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

const PokemonCard = ({pokemon, number}) => {
  const detail = pokemon?.detail;
  const types = detail?.types ?? [];
  const abilities = detail?.abilities ?? [];
  const stats = detail?.stats ?? [];
  const paddedNumber = String(number).padStart(3, '0');
  const imageFront =
    pokemon?.detail?.sprites?.front_default;
  const imageBack = pokemon?.detail?.sprites?.back_default;

  return (
    <div
      style={{
        width: 260,
        background: '#f8f0d8',
        color: '#202020',
        margin: 12,
        padding: 0,
        border: '4px solid #202020',
        borderRadius: 6,
        boxShadow:
          '4px 4px 0 #202020, inset 0 0 0 2px #f8f0d8, inset 0 0 0 4px #b8a878',
        fontFamily: PIXEL_FONT,
        imageRendering: 'pixelated',
      }}>
      <div
        style={{
          background: '#d83018',
          color: '#f8f0d8',
          padding: '8px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '4px solid #202020',
          fontFamily: PIXEL_FONT,
          fontSize: 9,
          letterSpacing: 1,
          textShadow: '2px 2px 0 #802018',
        }}>
        <span>No.{paddedNumber}</span>
        <span style={{textTransform: 'uppercase'}}>
          {pokemon?.name}
        </span>
      </div>

      <div
        style={{
          padding: 10,
          display: 'grid',
          gap: 10,
          justifyItems: 'center',
        }}>
        <div
          style={{
            width: '100%',
            height: 150,
            background:
              'repeating-linear-gradient(0deg, #e8d8a8 0 4px, #d8c898 4px 8px)',
            border: '3px solid #202020',
            borderRadius: 4,
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}>
          {imageFront && imageBack ? (
            <Carousel
              interval={null}
              indicators={false}
              fade
              style={{width: '100%', height: '100%'}}>
              <Carousel.Item style={{height: 144}}>
                <img
                  src={imageFront}
                  alt={`${pokemon?.name} front`}
                  style={{
                    width: 128,
                    height: 128,
                    objectFit: 'contain',
                    imageRendering: 'pixelated',
                    display: 'block',
                    margin: '8px auto 0',
                  }}
                />
              </Carousel.Item>
              <Carousel.Item style={{height: 144}}>
                <img
                  src={imageBack}
                  alt={`${pokemon?.name} back`}
                  style={{
                    width: 128,
                    height: 128,
                    objectFit: 'contain',
                    imageRendering: 'pixelated',
                    display: 'block',
                    margin: '8px auto 0',
                  }}
                />
              </Carousel.Item>
            </Carousel>
          ) : (
            <span
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: 8,
                color: '#705848',
              }}>
              NO DATA
            </span>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {types.length > 0 ? (
            types.map(t => (
              <span
                key={t.type.name}
                style={{
                  fontFamily: PIXEL_FONT,
                  fontSize: 8,
                  color: '#f8f0d8',
                  backgroundColor:
                    TYPE_COLORS[t.type.name] || '#705848',
                  border: '2px solid #202020',
                  borderRadius: 3,
                  padding: '4px 6px',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  textShadow: '1px 1px 0 rgba(0,0,0,0.4)',
                }}>
                {t.type.name}
              </span>
            ))
          ) : (
            <span
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: 8,
                color: '#705848',
              }}>
              ???
            </span>
          )}
        </div>

        <div
          style={{
            width: '100%',
            background: '#fffaf0',
            border: '3px solid #202020',
            borderRadius: 4,
            padding: 8,
            display: 'grid',
            gap: 6,
            fontFamily: READABLE_PIXEL_FONT,
            color: '#202020',
          }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 4,
              fontSize: 16,
              lineHeight: 1,
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <span style={{color: '#704020'}}>HT</span>
              <span>{formatHeight(detail?.height)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <span style={{color: '#704020'}}>WT</span>
              <span>{formatWeight(detail?.weight)}</span>
            </div>
          </div>

          <div
            style={{
              borderTop: '2px dashed #b8a878',
              paddingTop: 6,
            }}>
            <div
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: 8,
                color: '#d83018',
                marginBottom: 4,
                letterSpacing: 1,
              }}>
              ABILITY
            </div>
            <div
              style={{
                display: 'grid',
                gap: 3,
                fontSize: 16,
                lineHeight: 1.1,
              }}>
              {abilities.length > 0 ? (
                abilities.map(a => (
                  <div
                    key={a.ability.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      textTransform: 'uppercase',
                      color: a.is_hidden
                        ? '#7038f8'
                        : '#202020',
                    }}>
                    <span
                      style={{
                        fontFamily: PIXEL_FONT,
                        fontSize: 8,
                        color: '#d83018',
                      }}>
                      {'>'}
                    </span>
                    <span>
                      {a.ability.name.replace(/-/g, ' ')}
                      {a.is_hidden ? '*' : ''}
                    </span>
                  </div>
                ))
              ) : (
                <span>—</span>
              )}
            </div>
          </div>

          <div
            style={{
              borderTop: '2px dashed #b8a878',
              paddingTop: 6,
            }}>
            <div
              style={{
                fontFamily: PIXEL_FONT,
                fontSize: 8,
                color: '#d83018',
                marginBottom: 6,
                letterSpacing: 1,
              }}>
              STATS
            </div>
            <div style={{display: 'grid', gap: 4}}>
              {stats.map(s => {
                const label = s.stat.name
                  .replace('special-attack', 'sp.atk')
                  .replace('special-defense', 'sp.def')
                  .replace('attack', 'atk')
                  .replace('defense', 'def')
                  .replace('speed', 'spd')
                  .toUpperCase();
                const pct = Math.min(
                  100,
                  (s.base_stat / 200) * 100,
                );
                const segments = 10;
                const filled = Math.round(
                  (pct / 100) * segments,
                );
                return (
                  <div
                    key={s.stat.name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '52px 1fr 28px',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: READABLE_PIXEL_FONT,
                      fontSize: 16,
                      lineHeight: 1,
                    }}>
                    <span style={{color: '#704020'}}>
                      {label}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        gap: 1,
                        height: 8,
                        border: '1px solid #202020',
                        background: '#e8d8a8',
                        padding: 1,
                      }}>
                      {Array.from({length: segments}).map(
                        (_, i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              background:
                                i < filled
                                  ? '#48a048'
                                  : 'transparent',
                            }}
                          />
                        ),
                      )}
                    </div>
                    <span style={{textAlign: 'right'}}>
                      {s.base_stat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
