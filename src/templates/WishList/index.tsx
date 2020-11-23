import Base from 'templates/Base'
import { Container } from 'components/Container'
import Heading from 'components/Heading'
import ShowCase from 'components/ShowCase'
import GameCard, { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'
import { Grid } from 'components/Grid'
import { Divider } from 'components/Divider'
import Empty from 'components/Empty'

export type WishListTemplateProps = {
  games?: GameCardProps[]
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
}

const WishList = ({
  games = [],
  recommendedGames,
  recommendedHighlight
}: WishListTemplateProps) => (
  <Base>
    <Container>
      <Heading lineLeft lineColor="secondary">
        WishList
      </Heading>

      {games.length ? (
        <Grid>
          {games?.map((game, index) => (
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
      title="You may like these games"
      games={recommendedGames}
      highlight={recommendedHighlight}
    />
  </Base>
)

export default WishList
