import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Banner from '.'

const props = {
  img:
    'https://avatars0.githubusercontent.com/u/36991175?s=460&u=00ea01fdb917ef7b17d6b1091d0d0670c4574049&v=4',
  title: 'Teste banner',
  subtitle: '<p>subtitle banner</p>',
  buttonLabel: 'Buy Now',
  buttonLink: '/games/defy-death'
}

describe('<Banner />', () => {
  it('should render correctly', () => {
    const { container } = renderWithTheme(<Banner {...props} />)

    expect(
      screen.getByRole('heading', { name: /teste banner/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /subtitle/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', { name: /teste banner/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render a Ribbon', () => {
    renderWithTheme(
      <Banner
        {...props}
        ribbon="My Ribbon"
        ribbonSize="small"
        ribbonColor="secondary"
      />
    )

    const ribbon = screen.getByText(/My Ribbon/i)

    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(ribbon).toHaveStyle({
      height: '2.6rem',
      fontSize: '1.2rem'
    })
  })
})
