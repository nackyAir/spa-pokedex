import { describe, expect, it } from 'vitest'

import { extractIdFromUrl, formatPokemonId } from './format'

describe('formatPokemonId', () => {
  it('3桁の図鑑番号に整形する', () => {
    expect(formatPokemonId(1)).toBe('#001')
    expect(formatPokemonId(25)).toBe('#025')
    expect(formatPokemonId(1000)).toBe('#1000')
  })
})

describe('extractIdFromUrl', () => {
  it('PokeAPI のリソース URL から ID を取り出す', () => {
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
  })
})
