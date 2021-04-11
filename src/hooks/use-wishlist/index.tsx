import { GameCardProps } from 'components/GameCard'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import { useQueryWishlist } from 'graphql/queries/wishlist'
import { useSession } from 'next-auth/client'
import React, { createContext, useContext, useEffect, useState } from 'react'
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

  const [wishlistsData, setWishlistData] = useState<
    QueryWishlist_wishlists_games[]
  >([])

  const { data, loading } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  useEffect(() => {
    setWishlistData(data?.wishlists[0]?.games || [])
  }, [data])

  const isInWishlist = (id: string) =>
    !!wishlistItems.find((game) => game.id === id)

  const addToWishlist = (id: string) => {
    //se não existir wishlist - cria
    //senão atualiza a wishlist existente
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
