import { useState } from 'react'

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOddAsync,
  useBoundStore,
} from 'app/zustand'
import { Button, H1, Input, Text, XStack, YStack } from '@my/ui'

export function Counter() {
  const [incrementAmount, setIncrementAmount] = useState(2)
  const [count, loading] = useBoundStore((state) => [state.value, state.loading])

  return (
    <YStack space="$4" p="$4" ai="center">
      <H1>Zustand demo</H1>
      <XStack space="$6" jc="center" ai="center">
        <Button size="$6" onPress={() => increment()}>
          +
        </Button>
        <Text fontSize="$8" fontFamily="$body">
          {count}
        </Text>
        <Button size="$6" onPress={() => decrement()}>
          -
        </Button>
      </XStack>
      <XStack space="$4" ai="center">
        <Input
          size="$8"
          ta="center"
          value={`${incrementAmount}`}
          inputMode="numeric"
          onChangeText={(e) => setIncrementAmount(Number(e) || 0)}
        />
        <YStack space="$4">
          <Button size="$6" onPress={() => incrementByAmount(incrementAmount)}>
            Add Amount
          </Button>
          <Button
            size="$6"
            disabled={loading !== 'idle'}
            onPress={() => incrementAsync(incrementAmount)}
          >
            Add Async
          </Button>
          <Button size="$6" onPress={() => incrementIfOddAsync(incrementAmount)}>
            Add If Odd
          </Button>
        </YStack>
      </XStack>
    </YStack>
  )
}
