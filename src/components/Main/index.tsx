import * as S from './styles'

const Main = ({
  title = 'Aprendendo NEXT JS',
  description = 'TypesScript, Reactjs e Styled Components'
}) => (
  <S.Wrapper>
    <S.Logo src="/img/logo.svg" alt="Aprendendo NEXT JS" />
    <S.Title>{title}</S.Title>
    <S.Description>{description}</S.Description>
    <S.Illustration
      src="/img/hero-illustration.svg"
      alt="um desenvolvedor de frente ao pc"
    />
  </S.Wrapper>
)

export default Main
