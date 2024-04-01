import { Anchor, Button, H1, MyMotiLink, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useThemeStore } from 'app/zustand'
import { useLink } from 'solito/link'
import { Clock } from './Clock'
import { SheetDemo } from './sheet'

const icons = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

export function HomeScreen() {
  const { scheme, toggleScheme } = useThemeStore()
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap>
      <YStack gap="$4" bc="$background" jc="center">
        <Clock />
        <H1 ta="center" ff="$silkscreen">
          Welcome to Tamagui.
        </H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>

        <Separator />
        <Paragraph ta="center">
          Made by{' '}
          <Anchor col="$color12" href="https://twitter.com/natebirdman" target="_blank">
            @natebirdman
          </Anchor>
          ,{' '}
          <Anchor
            col="$color12"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </Paragraph>
      </YStack>

      <XStack gap="$4" ai="center">
        <Button {...linkProps}>Link to user</Button>
        <MyMotiLink>
          <Text ff="$body">Moti Link</Text>
        </MyMotiLink>
      </XStack>

      <SheetDemo />
      <Button pos="absolute" b={30} l={20} icon={icons[scheme]} onPress={toggleScheme} circular />
    </YStack>
  )
}
