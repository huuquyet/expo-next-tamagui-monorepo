import { Toast, useToastState } from '@tamagui/toast'
import { YStack } from 'tamagui'

export const NativeToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ o: 0, scale: 0.5, y: -25 }}
      exitStyle={{ o: 0, scale: 1, y: -20 }}
      y={0}
      o={1}
      scale={1}
      animation="quick"
    >
      <YStack px="$2" py="$1.5">
        <Toast.Title lh="$1">{currentToast.title}</Toast.Title>
        {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
      </YStack>
    </Toast>
  )
}
