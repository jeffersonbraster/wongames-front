import { Story, Meta } from '@storybook/react/types-6-0'
import PaymentOptions, { PaymentOptionsProps } from '.'
import cardMock from './mock'

export default {
  title: 'PaymentOptions',
  component: PaymentOptions,
  args: {
    cards: cardMock
  },
  argTypes: {
    cards: {
      actions: 'clicked'
    }
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Basic: Story<PaymentOptionsProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 400 }}>
    <PaymentOptions {...args} />
  </div>
)
