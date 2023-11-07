import { useLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import { Moon, Sun } from '@tamagui/lucide-icons'

import { Clock } from './Clock'
import { SheetDemo } from './sheet'
import { useThemeStore } from 'app/zustand'
import { Anchor, Button, H1, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'

const icons = {
  dark: Moon,
  light: Sun,
}

export function HomeScreen() {
  const { theme, toggleTheme } = useThemeStore()
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600} jc="center">
        <Clock />
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
        <MotiLink
          href="/user/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          from={{
            scale: 0,
            rotateZ: '0deg',
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text fontFamily="$body">Moti Link</Text>
        </MotiLink>
      </XStack>

      <SheetDemo />
      <Button pos="absolute" b={30} l={20} icon={icons[theme]} onPress={toggleTheme} circular />
    </YStack>
  )
}
