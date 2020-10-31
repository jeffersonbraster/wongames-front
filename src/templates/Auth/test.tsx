import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Auth from '.'

describe('<Auth />', () => {
  it('should render all components and children', () => {
    renderWithTheme(
      <Auth title="Auth title">
        <input type="text" />
      </Auth>
    )

    //verifica se tem 2 logos
    expect(screen.getAllByRole('img', { name: /won games/i })).toHaveLength(2)

    //verifica se tem o heading principal do banner
    expect(
      screen.getByRole('heading', {
        name: /All your favorite games in one place./i
      })
    ).toBeInTheDocument()

    //verifica se tem o subtittle
    expect(
      screen.getByRole('heading', {
        name: /WON is the best and most complete gaming platform./i
      })
    ).toBeInTheDocument()

    //verifica se tem o title do content
    expect(
      screen.getByRole('heading', { name: /auth title/i })
    ).toBeInTheDocument()

    //verifica se o children está sendo renderizado no componente
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
