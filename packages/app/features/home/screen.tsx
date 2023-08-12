import { useLink } from 'solito/link'

import { SheetDemo } from './sheet'
import { Anchor, Button, H1, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center" fontFamily="$silkscreen">
          Welcome to Tamagui.
        </H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>

        <Separator />
        <Paragraph ta="center">
          Made by{' '}
          <Anchor color="$color12" href="https://twitter.com/natebirdman" target="_blank">
            @natebirdman
          </Anchor>
          ,{' '}
          <Anchor
            color="$color12"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </Paragraph>
      </YStack>

      <XStack space="$4" ai="center">
        <Button {...linkProps}>Link to user</Button>
      </XStack>

      <SheetDemo />
    </YStack>
  )
}
