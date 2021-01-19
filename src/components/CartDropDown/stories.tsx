import { Story, Meta } from '@storybook/react/types-6-0'
import CartDropDown, { CartDropDownProps } from '.'
import items from 'components/CartList/mock'

export default {
  title: 'CartDropDown',
  component: CartDropDown,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  },
  args: {
    items,
    total: 'R$ 300,00'
  }
} as Meta

export const Basic: Story<CartDropDownProps> = (args) => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropDown {...args} />
  </div>
)
