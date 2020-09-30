import { Story, Meta } from '@storybook/react/types-6-0'
import Menu from '.'

export default {
  title: 'Menu',
  component: Menu
} as Meta

export const Default: Story = (args) => <Menu />

Default.parameters = {
  layout: 'fullscreen',
  background: {
    default: 'dark'
  }
}
