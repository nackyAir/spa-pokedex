import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'

import { extractIdFromUrl, formatPokemonId } from '../lib/format'
import {
  POKEMON_PER_PAGE,
  pokemonListQueryOptions,
} from '../lib/pokeapi'
import { indexRoute } from '../routes'

const ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

export function PokemonList() {
  const { page } = indexRoute.useSearch()
  const navigate = useNavigate({ from: '/' })
  const pokemonQuery = useQuery(pokemonListQueryOptions(page))

  if (pokemonQuery.isPending) {
    return <StatusPanel title="Loading" message="野生のポケモンを探しています…" />
  }

  if (pokemonQuery.isError) {
    return (
      <StatusPanel
        title="通信エラー"
        message="ポケモンを取得できませんでした。時間をおいて再度お試しください。"
      />
    )
  }

  const totalPages = Math.ceil(pokemonQuery.data.count / POKEMON_PER_PAGE)

  return (
    <main className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">KANTO RESEARCH ARCHIVE</p>
          <h1>POKÉDEX</h1>
          <p className="hero-copy">
            見つけたポケモンを、ページをめくるように調査しよう。
          </p>
        </div>
        <div className="page-stamp" aria-label={`${page}ページ目`}>
          <span>PAGE</span>
          {page.toString().padStart(2, '0')}
        </div>
      </header>

      <section className="pokemon-grid" aria-label="ポケモン一覧">
        {pokemonQuery.data.results.map((pokemon, index) => {
          const id = extractIdFromUrl(pokemon.url)

          return (
            <Link
              className="pokemon-card"
              key={pokemon.name}
              params={{ name: pokemon.name }}
              style={{ animationDelay: `${Math.min(index, 11) * 35}ms` }}
              to="/pokemon/$name"
            >
              <span className="pokemon-number">{formatPokemonId(id)}</span>
              <div className="artwork-frame">
                <img
                  alt={pokemon.name}
                  loading="lazy"
                  src={`${ARTWORK_BASE_URL}/${id}.png`}
                />
              </div>
              <h2>{pokemon.name}</h2>
              <span className="view-label">VIEW DATA →</span>
            </Link>
          )
        })}
      </section>

      <nav className="pagination" aria-label="ページ移動">
        <button
          disabled={page === 1}
          onClick={() => navigate({ search: { page: page - 1 } })}
          type="button"
        >
          ← PREV
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => navigate({ search: { page: page + 1 } })}
          type="button"
        >
          NEXT →
        </button>
      </nav>
    </main>
  )
}

function StatusPanel({ title, message }: { title: string; message: string }) {
  return (
    <main className="status-panel">
      <div className="status-light" />
      <p className="eyebrow">POKÉDEX SYSTEM</p>
      <h1>{title}</h1>
      <p>{message}</p>
    </main>
  )
}
