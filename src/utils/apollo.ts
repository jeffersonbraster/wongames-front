import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', //true
    link: new HttpLink({ uri: 'http://localhost:1337/graphql' }),
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState = {}) {
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

export function useApollo(initialState = {}) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
