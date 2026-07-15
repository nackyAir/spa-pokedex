export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`
}

export function extractIdFromUrl(resourceUrl: string): number {
  const pathParts = resourceUrl.split('/').filter(Boolean)
  const id = Number(pathParts.at(-1))

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`Invalid Pokemon resource URL: ${resourceUrl}`)
  }

  return id
}
