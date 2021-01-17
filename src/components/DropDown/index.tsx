import * as S from './styles'

export type DropDownProps = {
  title: React.ReactNode
  children: React.ReactNode
}

const DropDown = ({ title, children }: DropDownProps) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>

    <S.Content>{children}</S.Content>
  </S.Wrapper>
)

export default DropDown
