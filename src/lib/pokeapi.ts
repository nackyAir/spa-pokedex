import { queryOptions } from '@tanstack/react-query'

import type {
  PokemonDetailResponse,
  PokemonListResponse,
} from '../types/pokemon'

const API_BASE_URL = 'https://pokeapi.co/api/v2'
export const POKEMON_PER_PAGE = 24

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`PokeAPI request failed: ${response.status}`)
  }

  return response.json()
}

export function fetchPokemonList(page: number): Promise<PokemonListResponse> {
  const offset = (page - 1) * POKEMON_PER_PAGE
  return fetchJson(
    `${API_BASE_URL}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`,
  )
}

export function fetchPokemon(name: string): Promise<PokemonDetailResponse> {
  return fetchJson(`${API_BASE_URL}/pokemon/${encodeURIComponent(name)}`)
}

export const pokemonListQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ['pokemon', 'list', page],
    queryFn: () => fetchPokemonList(page),
  })

export const pokemonDetailQueryOptions = (name: string) =>
  queryOptions({
    queryKey: ['pokemon', 'detail', name],
    queryFn: () => fetchPokemon(name),
  })
