import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import GameItem from '.'

const props = {
  img: 'https://source.unsplash.com/user/willianjusten/151x70',
  title: 'Red Dead Redemption 2',
  price: 'R$ 215,00'
}

describe('<GameItem />', () => {
  it('should render the item', () => {
    renderWithTheme(<GameItem {...props} />)

    //verificar se o title foi rendererizado
    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()
    //verificar se a imagem foi renderizada
    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img
    )
    //verificar se o preço foi renderizado
    expect(screen.getByText('R$ 215,00')).toBeInTheDocument()
  })

  it('should render the item with dowload link', () => {
    const downloadLink = 'https://link'

    renderWithTheme(<GameItem {...props} downloadLink={downloadLink} />)

    //verifica se o link existe
    expect(
      screen.getByRole('link', { name: `Get ${props.title} here` })
    ).toHaveAttribute('href', downloadLink)
  })
})
