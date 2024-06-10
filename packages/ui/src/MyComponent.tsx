import { YStack, styled } from 'tamagui'

export const MyComponent = styled(YStack, {
  name: 'MyComponent',
  background: 'red',

  variants: {
    blue: {
      true: {
        background: 'blue',
      },
    },
  } as const,
})
