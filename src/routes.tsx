import { Outlet, createRootRoute, createRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { PokemonDetail } from './pages/PokemonDetail'
import { PokemonList } from './pages/PokemonList'

function RootLayout() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export const rootRoute = createRootRoute({
  component: RootLayout,
})

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>) => ({
    page:
      typeof search.page === 'number' &&
      Number.isInteger(search.page) &&
      search.page > 0
        ? search.page
        : 1,
  }),
  component: PokemonList,
})

export const pokemonDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pokemon/$name',
  component: PokemonDetail,
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  pokemonDetailRoute,
])
