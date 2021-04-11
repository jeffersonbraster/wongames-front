import { GameCardProps } from 'components/GameCard'
import React, { createContext, useContext } from 'react'

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
  const isInWishlist = (id: string) => false

  const addToWishlist = (id: string) => {}

  const RemoveFromWishlist = (id: string) => {}

  return (
    <WishlistContext.Provider
      value={{ isInWishlist, addToWishlist, RemoveFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
