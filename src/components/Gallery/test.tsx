import 'match-media-mock'
import { fireEvent, screen } from '@testing-library/react'
import Gallery from '.'
import { renderWithTheme } from 'utils/tests/helpers'

import mockItems from './mock'

describe('<Gallery />', () => {
  it('should render thumbnails as buttons', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)

    expect(
      screen.getByRole('button', { name: /thumb - gallery image 1/i })
    ).toHaveAttribute('src', mockItems[0].src)

    expect(
      screen.getByRole('button', { name: /thumb - gallery image 2/i })
    ).toHaveAttribute('src', mockItems[1].src)
  })

  it('should handle open modal', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)

    //selecionar modal
    const modal = screen.getByLabelText('modal')

    //verificar se esta escondido
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })

    //clicar no botao abrir modal e ver se abriu
    fireEvent.click(
      screen.getByRole('button', { name: /thumb - gallery image 1/i })
    )
    expect(modal.getAttribute('aria-hidden')).toBe('false')
    expect(modal).toHaveStyle({ opacity: 1 })
  })

  it('should handle close modal when overlay or button clicked', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)

    //selecionar modal
    const modal = screen.getByLabelText('modal')

    //clicar no botao abrir modal e ver se abriu
    fireEvent.click(
      screen.getByRole('button', { name: /thumb - gallery image 1/i })
    )

    //clicar no botao fechar o modal
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }))

    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })

  it('should handle close modal when key ESC', () => {
    const { container } = renderWithTheme(
      <Gallery items={mockItems.slice(0, 2)} />
    )

    //selecionar modal
    const modal = screen.getByLabelText('modal')

    //clicar no botao abrir modal e ver se abriu
    fireEvent.click(
      screen.getByRole('button', { name: /thumb - gallery image 1/i })
    )

    //clicar no botao fechar o modal
    fireEvent.keyUp(container, { key: 'Escape' })

    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })

  it('should handle open modal with selected image', async () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)

    //clicar na thumbnail
    fireEvent.click(
      screen.getByRole('button', { name: /thumb - gallery image 2/i })
    )

    //esperar que a mesma imagem que foi clicado seja aberto.
    const img = await screen.findByRole('img', { name: /gallery image 2/i })

    expect(img.parentElement?.parentElement).toHaveClass('slick-active')
  })
})
