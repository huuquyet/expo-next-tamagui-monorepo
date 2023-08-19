import { useState } from 'react'

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOddAsync,
  selectCount,
  selectLoading,
  useDispatch,
  useSelector,
} from 'app/redux'
import { Button, H1, Input, Text, XStack, YStack } from '@my/ui'

export function Counter() {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const loading = useSelector(selectLoading)
  const [incrementAmount, setIncrementAmount] = useState('2')

  return (
    <YStack space="$4" p="$4" ai="center">
      <H1>Redux demo</H1>
      <XStack space="$6" jc="center" ai="center">
        <Button size="$6" onPress={() => dispatch(increment())}>
          +
        </Button>
        <Text fontSize="$8" fontFamily="$body">
          {count}
        </Text>
        <Button size="$6" onPress={() => dispatch(decrement())}>
          -
        </Button>
      </XStack>
      <XStack space="$4" ai="center">
        <Input
          size="$8"
          ta="center"
          value={incrementAmount}
          inputMode="numeric"
          onChangeText={setIncrementAmount}
        />
        <YStack space="$4">
          <Button
            size="$6"
            onPress={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
          >
            Add Amount
          </Button>
          <Button
            size="$6"
            disabled={loading !== 'idle'}
            onPress={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
          >
            Add Async
          </Button>
          <Button
            size="$6"
            onPress={() => dispatch(incrementIfOddAsync(Number(incrementAmount) || 0))}
          >
            Add If Odd
          </Button>
        </YStack>
      </XStack>
    </YStack>
  )
}
