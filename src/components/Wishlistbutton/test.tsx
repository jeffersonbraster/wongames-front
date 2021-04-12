import { WishlistContextDefaultValues } from 'hooks/use-wishlist'
import { render, screen } from 'utils/test-utils'
import WishlistButton from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
const session = { jwt: '123', user: { email: 'lorem@ipsum.com' } }
useSession.mockImplementation(() => [session])

describe('<wishlistButton />', () => {
  it('should render a button to add to wishlist', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    }

    render(<WishlistButton id="1" />, { wishlistProviderProps })

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to add to wishlist', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true
    }

    render(<WishlistButton id="1" />, { wishlistProviderProps })

    expect(screen.getByLabelText(/remove to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button with add to wishlist text', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    }

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    expect(screen.getByText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button with remove from wishlist text', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    }

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    expect(screen.getByText(/remove to wishlist/i)).toBeInTheDocument()
  })

  it('should not render if not logged', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
    useSession.mockImplementationOnce(() => [null])

    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true
    }

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    expect(screen.getByText(/remove to wishlist/i)).not.toBeInTheDocument()
  })
})
