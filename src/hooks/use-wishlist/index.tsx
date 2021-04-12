import { useMutation } from '@apollo/client'
import { GameCardProps } from 'components/GameCard'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import {
  MUTATION_CREATE_WISHLIST,
  MUTATION_UPDATE_WISHLIST
} from 'graphql/mutations/wishlist'
import { useQueryWishlist } from 'graphql/queries/wishlist'
import { useSession } from 'next-auth/client'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { gamesMapper } from 'utils/mappers'
import { wishlistItems } from './mock'

export type WishlistContextData = {
  items: GameCardProps[]
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => void
  RemoveFromWishlist: (id: string) => void
  loading: boolean
}

export const WishlistContextDefaultValues = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  RemoveFromWishlist: () => null,
  loading: false
}

export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues
)

export type WishlistProvviderProps = {
  children: React.ReactNode
}

const WishlistProvider = ({ children }: WishlistProvviderProps) => {
  const [session] = useSession()

  const [wishlistId, setWishlistId] = useState<string | null>()
  const [wishlistsData, setWishlistData] = useState<
    QueryWishlist_wishlists_games[]
  >([])

  const [createList, { loading: loadingCreate }] = useMutation(
    MUTATION_CREATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistData(data?.createWishlist?.wishlist?.games || []),
          setWishlistId(data?.createWishList?.wishlist?.id)
      }
    }
  )

  const [updateList, { loading: loadingUpdate }] = useMutation(
    MUTATION_UPDATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistData(data?.updateWishlist?.wishlist?.games || []),
          setWishlistId(data?.createWishlist?.wishlist?.id)
      }
    }
  )

  const { data, loading } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  useEffect(() => {
    setWishlistData(data?.wishlists[0]?.games || [])
    setWishlistId(data?.wishlists[0]?.id)
  }, [data])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wishlistIds = useMemo(() => wishlistItems.map((game) => game.id), [
    wishlistItems
  ])

  const isInWishlist = (id: string) =>
    !!wishlistItems.find((game) => game.id === id)

  const addToWishlist = (id: string) => {
    //se não existir wishlist - cria
    if (!wishlistId) {
      return createList({
        variables: { input: { data: { games: [...wishlistIds, id] } } }
      })
    }
    //senão atualiza a wishlist existente
    return updateList({
      variables: {
        input: {
          where: { id: wishlistId },
          data: { games: [...wishlistIds, id] }
        }
      }
    })
  }

  const RemoveFromWishlist = (id: string) => {}

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistsData),
        loading,
        isInWishlist,
        addToWishlist,
        RemoveFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
