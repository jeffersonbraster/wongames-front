import { GameCardProps } from 'components/GameCard'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import { useQueryWishlist } from 'graphql/queries/wishlist'
import { useSession } from 'next-auth/client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { gamesMapper } from 'utils/mappers'

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

  const isInWishlist = (id: string) => false

  const addToWishlist = (id: string) => {}

  const RemoveFromWishlist = (id: string) => {}

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
