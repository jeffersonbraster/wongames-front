import { Story, Meta } from '@storybook/react/types-6-0'
import ExploreSidebar, { ExploreSidebarProps } from '.'

import items from './mock'

export default {
  title: 'ExploreSidebar',
  component: ExploreSidebar,
  args: {
    items,
    onFilter: () => console.log('filter')
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Basic: Story<ExploreSidebarProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 320 }}>
    <ExploreSidebar {...args} />
  </div>
)

export const WithInitialValues: Story<ExploreSidebarProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 320 }}>
    {' '}
    <ExploreSidebar
      {...args}
      initialValues={{ platforms: ['windows'], sort_by: 'low-to-high' }}
    />
  </div>
)
