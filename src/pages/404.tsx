import { Container } from 'components/Container'
import Empty from 'components/Empty'
import Base from 'templates/Base'

export default function Page404() {
  return (
    <Base>
      <Container>
        <Empty
          title="404: Página não encontrado"
          description="Não achei essa pagina, volte no menu e aproveite os melhores jogos do momento"
          hasLink
        />
      </Container>
    </Base>
  )
}
