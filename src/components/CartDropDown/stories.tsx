import { Story, Meta } from '@storybook/react/types-6-0'
import CartDropDown from '.'
import items from 'components/CartList/mock'

export default {
  title: 'CartDropDown',
  component: CartDropDown,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Basic: Story = (args) => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropDown {...args} />
  </div>
)

Basic.args = {
  cartContextValue: {
    items,
    quantity: items.length,
    total: 'R$ 300,00'
  }
}

export const Empty: Story = () => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropDown />
  </div>
)
