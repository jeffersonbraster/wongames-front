import Base from 'templates/Base'
import BannerSlider from 'components/BannerSlider'
import { BannerProps } from 'components/Banner'
import { Container } from 'components/Container'
import { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'
import ShowCase from 'components/ShowCase'
import * as S from './styles'

export type HomeTemplateProps = {
  banners: BannerProps[]
  newGames: GameCardProps[]
  mostPopularHighlight: HighlightProps
  mostPopularGames: GameCardProps[]
  upcommingGames: GameCardProps[]
  upcommingHighligth: HighlightProps
  freeGames: GameCardProps[]
  freeHighligth: HighlightProps
  newGamesTitle: string
  mostPopularGamesTitle: string
  upcomingGamesTitle: string
  freeGamesTitle: string
}

const Home = ({
  banners,
  newGames,
  mostPopularGames,
  mostPopularHighlight,
  freeGames,
  freeHighligth,
  upcommingGames,
  upcommingHighligth,
  newGamesTitle,
  mostPopularGamesTitle,
  upcomingGamesTitle,
  freeGamesTitle
}: HomeTemplateProps) => (
  <Base>
    <Container>
      <S.SectionBanner>
        <BannerSlider items={banners} />
      </S.SectionBanner>
    </Container>

    <S.SectionNews>
      <ShowCase title={newGamesTitle} games={newGames} color="black" />
    </S.SectionNews>

    <ShowCase
      title={mostPopularGamesTitle}
      highlight={mostPopularHighlight}
      games={mostPopularGames}
    />

    <ShowCase
      title={upcomingGamesTitle}
      games={upcommingGames}
      highlight={upcommingHighligth}
    />

    <ShowCase
      title={freeGamesTitle}
      highlight={freeHighligth}
      games={freeGames}
    />
  </Base>
)

export default Home
