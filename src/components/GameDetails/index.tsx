import Heading from 'components/Heading'
import MediaMatch from 'components/MediaMatch'
import { Apple, Windows, Linux } from '@styled-icons/fa-brands'
import * as S from './styles'

type Platforms = 'windows' | 'linux' | 'mac'

export type GameDetailsProps = {
  platforms: Platforms[]
}

const GameDetails = ({ platforms }: GameDetailsProps) => {
  const platformIcons = {
    linux: <Linux title="Linux" size={18} />,
    mac: <Apple title="mac" size={18} />,
    windows: <Windows title="mac" size={18} />
  }

  return (
    <S.Wrapper>
      <MediaMatch greaterThan="small">
        <Heading lineLeft lineColor="secondary">
          Game Details
        </Heading>
      </MediaMatch>

      <S.Content>
        <S.Block>
          <S.Title>Developer</S.Title>
          <S.Description>Gearbox Software</S.Description>
        </S.Block>

        <S.Block>
          <S.Title>Release Date</S.Title>
          <S.Description>Nov 16, 2019</S.Description>
        </S.Block>

        <S.Block>
          <S.Title>Platforms</S.Title>
          <S.IconsWrapper>
            {platforms.map((icon: Platforms) => (
              <S.Icon key={icon}>{platformIcons[icon]}</S.Icon>
            ))}
          </S.IconsWrapper>
        </S.Block>

        <S.Block>
          <S.Title>Publisher</S.Title>
          <S.Description>2k</S.Description>
        </S.Block>

        <S.Block>
          <S.Title>Rating</S.Title>
          <S.Description>18+</S.Description>
        </S.Block>

        <S.Block>
          <S.Title>Genres</S.Title>
          <S.Description>Action / Adventure</S.Description>
        </S.Block>
      </S.Content>
    </S.Wrapper>
  )
}

export default GameDetails
