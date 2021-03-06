import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CartList, { CartListProps } from 'components/CartList'
import { Session } from 'next-auth/client'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import { GameCardProps } from 'components/GameCard'
import Heading from 'components/Heading'
import { HighlightProps } from 'components/Highlight'
import PaymentForm from 'components/PaymentForm'
import ShowCase from 'components/ShowCase'
import Base from 'templates/Base'
import { ErrorWarning } from '@styled-icons/remix-line/ErrorWarning'
import * as S from './styles'

export type CartProps = {
  session: Session
  recommendedTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
} & CartListProps

const Cart = ({
  session,
  recommendedTitle,
  recommendedGames,
  recommendedHighlight
}: CartProps) => {
  const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My Cart
        </Heading>

        <S.Content>
          <CartList />

          <Elements stripe={stripe}>
            <PaymentForm session={session} />
          </Elements>
        </S.Content>

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
