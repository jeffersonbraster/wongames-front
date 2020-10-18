import { Story, Meta } from '@storybook/react/types-6-0'
import Checkbox, { CheckboxProps } from '.'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    onCheck: { action: 'checked' }
  }
} as Meta

export const Basic: Story<CheckboxProps> = (args) => (
  <>
    <div style={{ padding: 10 }}>
      <Checkbox name="teste 1" isChecked {...args} />
    </div>

    <div style={{ padding: 10 }}>
      <Checkbox name="teste 2" {...args} />
    </div>

    <div style={{ padding: 10 }}>
      <Checkbox name="teste 3" {...args} />
    </div>
  </>
)
