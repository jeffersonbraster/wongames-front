import { screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { renderWithTheme } from 'utils/tests/helpers'
import filterItemsMock from 'components/ExploreSidebar/mock'

import Games from '.'
import { QUERY_GAMES } from 'graphql/queries/games'

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/ExploreSidebar', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock ExploreSidebar">{children}</div>
  }
}))

describe('<Games />', () => {
  it('should render sections', async () => {
    renderWithTheme(
      <MockedProvider
        mocks={[
          {
            request: {
              query: QUERY_GAMES,
              variables: { limit: 9 }
            },
            result: {
              data: {
                games: [
                  {
                    name: 'Soldier of Fortune II: Double Helix - Gold Edition',
                    slug: 'soldier-of-fortune-ii-double-helix-gold-edition',
                    cover: {
                      url:
                        '/uploads/soldier_of_fortune_ii_double_helix_gold_edition_6c3b8e6b4d.jpg'
                    },
                    developers: [{ name: 'Raven Software' }],
                    price: 33.69,
                    __typename: 'Game'
                  }
                ]
              }
            }
          }
        ]}
        addTypename={false}
      >
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    )

    expect(await screen.findByTestId('Mock ExploreSidebar')).toBeInTheDocument()
    expect(
      await screen.findByText(
        /Soldier of Fortune II: Double Helix - Gold Edition/i
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /show more/i })
    ).toBeInTheDocument()
  })
})
