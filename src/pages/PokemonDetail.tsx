import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { formatPokemonId } from '../lib/format'
import { pokemonDetailQueryOptions } from '../lib/pokeapi'
import { pokemonDetailRoute } from '../routes'

const ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATTACK',
  defense: 'DEFENSE',
  'special-attack': 'SP. ATK',
  'special-defense': 'SP. DEF',
  speed: 'SPEED',
}

export function PokemonDetail() {
  const { name } = pokemonDetailRoute.useParams()
  const pokemonQuery = useQuery(pokemonDetailQueryOptions(name))

  if (pokemonQuery.isPending) {
    return <DetailStatus message="ポケモンの記録を照合しています…" />
  }

  if (pokemonQuery.isError) {
    return <DetailStatus message="このポケモンの記録を取得できませんでした。" />
  }

  const pokemon = pokemonQuery.data

  return (
    <main className="detail-shell">
      <Link className="back-link" search={{ page: 1 }} to="/">
        ← BACK TO INDEX
      </Link>

      <article className="detail-card">
        <section className="detail-visual">
          <p className="eyebrow">SPECIMEN {formatPokemonId(pokemon.id)}</p>
          <div className="detail-artwork">
            <img
              alt={pokemon.name}
              src={`${ARTWORK_BASE_URL}/${pokemon.id}.png`}
            />
          </div>
        </section>

        <section className="detail-data">
          <p className="detail-number">{formatPokemonId(pokemon.id)}</p>
          <h1>{pokemon.name}</h1>

          <div className="type-list" aria-label="タイプ">
            {pokemon.types.map(({ type }) => (
              <span key={type.name}>{type.name}</span>
            ))}
          </div>

          <dl className="measurements">
            <div>
              <dt>HEIGHT</dt>
              <dd>{pokemon.height / 10} m</dd>
            </div>
            <div>
              <dt>WEIGHT</dt>
              <dd>{pokemon.weight / 10} kg</dd>
            </div>
          </dl>

          <div className="stats">
            <h2>BASE STATS</h2>
            {pokemon.stats.map((stat) => (
              <div className="stat-row" key={stat.stat.name}>
                <span>{STAT_LABELS[stat.stat.name] ?? stat.stat.name}</span>
                <strong>{stat.base_stat}</strong>
                <div className="stat-track">
                  <div
                    className="stat-fill"
                    style={{ width: `${Math.min(stat.base_stat / 2, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}

function DetailStatus({ message }: { message: string }) {
  return (
    <main className="status-panel">
      <div className="status-light" />
      <p className="eyebrow">POKÉDEX SYSTEM</p>
      <h1>Scanning</h1>
      <p>{message}</p>
      <Link className="back-link" search={{ page: 1 }} to="/">
        ← BACK TO INDEX
      </Link>
    </main>
  )
}
