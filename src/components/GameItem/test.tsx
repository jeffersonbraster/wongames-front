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

    //verificar se a imagem foi renderizada

    //verificar se o preço foi renderizado
  })
})
