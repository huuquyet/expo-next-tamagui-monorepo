import { Button, Paragraph, Sheet, useToastController } from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Counter } from './Counter'

export function SheetDemo() {
  const toast = useToastController()
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)

  return (
    <>
      <Paragraph ta="center">This button show the modal display zustand demo</Paragraph>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ o: 0 }} exitStyle={{ o: 0 }} />
        <Sheet.Handle bg="$gray8" />
        <Sheet.Frame ai="center" jc="center" gap="$10" bg="$color2">
          <Counter />

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
