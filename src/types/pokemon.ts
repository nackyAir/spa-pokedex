export interface NamedApiResource {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NamedApiResource[]
}

export interface PokemonTypeSlot {
  slot: number
  type: NamedApiResource
}

export interface PokemonStat {
  base_stat: number
  stat: NamedApiResource
}

export interface PokemonDetailResponse {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonTypeSlot[]
  stats: PokemonStat[]
}
