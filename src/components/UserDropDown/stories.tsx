import { Story, Meta } from '@storybook/react/types-6-0'
import UserDropDown, { UserDropDownProps } from '.'

export default {
  title: 'UserDropDown',
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  },
  component: UserDropDown
} as Meta

export const Basic: Story<UserDropDownProps> = (args) => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <UserDropDown {...args} />
  </div>
)

Basic.args = {
  username: 'Jeje'
}
