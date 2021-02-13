import { ApolloClient, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import apolloCache from './apolloCache'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', //true
    link: new HttpLink({ uri: 'http://localhost:1337/graphql' }),
    cache: apolloCache
  })
}

export function initializeApollo(initialState = null) {
  //verifica se já existe uma instancia para não criar outra e utilizar o cache
  const apolloClientGlobal = apolloClient ?? createApolloClient()

  //caso já tenho estado inicial, recupera o cache
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  //sempre inicializando no ssr com cache limpo. Ex: evita que um usuário tenha acesso a outro
  if (typeof window === 'undefined') return apolloClientGlobal
  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
