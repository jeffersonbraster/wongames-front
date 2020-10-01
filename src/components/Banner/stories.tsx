import { Story, Meta } from '@storybook/react/types-6-0'
import Banner, { BannerProps } from '.'

export default {
  title: 'Banner',
  component: Banner,
  args: {
    img:
      'https://avatars0.githubusercontent.com/u/36991175?s=460&u=00ea01fdb917ef7b17d6b1091d0d0670c4574049&v=4',
    title: 'Teste banner',
    subtitle: '<p>subtitle banner</p>',
    buttonLabel: 'Buy Now',
    buttonLink: '/games/defy-death'
  }
} as Meta

export const Default: Story<BannerProps> = (args) => <Banner {...args} />
