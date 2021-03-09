import { createContext, useContext } from 'react'

export type CartContextData = {}

export const CartContextDefaultValue = []

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValue
)

export type CartProviderProps = {
  children: React.ReactNode
}

const CartProvider = ({ children }: CartProviderProps) => {
  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
