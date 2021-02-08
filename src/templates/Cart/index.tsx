import CartList, { CartListProps } from 'components/CartList'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import Empty from 'components/Empty'
import { GameCardProps } from 'components/GameCard'
import Heading from 'components/Heading'
import { HighlightProps } from 'components/Highlight'
import PaymentOptions, { PaymentOptionsProps } from 'components/PaymentOptions'
import ShowCase from 'components/ShowCase'
import Base from 'templates/Base'
import { ErrorWarning } from '@styled-icons/remix-line/ErrorWarning'
import * as S from './styles'

export type CartProps = {
  recommendedTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
} & CartListProps &
  Pick<PaymentOptionsProps, 'cards'>

const Cart = ({
  recommendedTitle,
  recommendedGames,
  recommendedHighlight,
  items,
  total,
  cards
}: CartProps) => {
  const handlePayment = () => ({})

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My Cart
        </Heading>

        {items?.length ? (
          <S.Content>
            <CartList items={items} total={total} />

            <PaymentOptions cards={cards} handlePayment={handlePayment} />
          </S.Content>
        ) : (
          <Empty
            title="Ypu cart is empty"
            description="Go back to the store and explore great games in offers"
            hasLink
          />
        )}
        <S.Obs>
          <ErrorWarning size={18} /> Your purchase is protected by a secure
          connection from the WON platform. By purchasing from our store you
          agree and agree to our <span>terms of use.</span> After making the
          purchase you are entitled to a refund within a maximum of 30 days,
          without any additional cost, as long as the download of the purchased
          game has not occurred after your purchase.
        </S.Obs>

        <Divider />
      </Container>
      <ShowCase
        title={recommendedTitle || 'You may like this games'}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  )
}

export default Cart
