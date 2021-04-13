import Base from 'templates/Base'
import { Container } from 'components/Container'
import Heading from 'components/Heading'
import ShowCase from 'components/ShowCase'
import GameCard, { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'
import { Grid } from 'components/Grid'
import { Divider } from 'components/Divider'
import Empty from 'components/Empty'
import { useWishlist } from 'hooks/use-wishlist'
import Loading from 'components/Loading'
import * as S from './styles'

export type WishListTemplateProps = {
  recommendedTitle?: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
}

const WishList = ({
  recommendedTitle,
  recommendedGames,
  recommendedHighlight
}: WishListTemplateProps) => {
  const { items, loading } = useWishlist()

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          WishList
        </Heading>

        {loading ? (
          <S.Loading>
            <Loading />
          </S.Loading>
        ) : items.length >= 1 ? (
          <Grid>
            {items?.map((game, index) => (
              <GameCard key={`wishlist-${index}`} {...game} />
            ))}
          </Grid>
        ) : (
          <Empty
            title="Your wishlist is empty"
            description="Games added to your wishlist will appear here."
            hasLink
          />
        )}

        <Divider />
      </Container>
      <ShowCase
        title={recommendedTitle || 'You may like these games'}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  )
}

export default WishList
