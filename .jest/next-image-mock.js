import * as nextImage from 'next/image'

// eslint-disable-next-line no-import-assign
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  // eslint-disable-next-line react/display-name
  value: (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { objectFit, ...rest } = props
    return <img {...props} />
  }
})
