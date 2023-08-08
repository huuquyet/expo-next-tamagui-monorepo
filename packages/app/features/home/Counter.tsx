import { useState } from 'react'

import {
  counterSlice,
  useSelector,
  useDispatch,
  selectCount,
  incrementAsync,
  incrementIfOddAsync,
} from '../store'
import { Button, H1, Input, Text, XStack, YStack } from '@my/ui'

export function Counter() {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const [incrementAmount, setIncrementAmount] = useState('2')

  return (
    <YStack space="$4" p="$4" jc="center" ai="center">
      <H1>Redux demo</H1>
      <XStack space="$4" jc="center" ai="center">
        <Button size="$6" onPress={() => dispatch(counterSlice.actions.increment())}>
          +
        </Button>
        <Text fontSize="$8" fontFamily="$body">
          {count}
        </Text>
        <Button size="$6" onPress={() => dispatch(counterSlice.actions.decrement())}>
          -
        </Button>
      </XStack>
      <XStack space="$4">
        <Input
          size="$6"
          width="$6"
          value={incrementAmount}
          keyboardType="numeric"
          onChangeText={setIncrementAmount}
        />
        <Button
          size="$6"
          onPress={() =>
            dispatch(counterSlice.actions.incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </Button>
        <Button size="$6" onPress={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>
          Add Async
        </Button>
        <Button
          size="$6"
          onPress={() => dispatch(incrementIfOddAsync(Number(incrementAmount) || 0))}
        >
          Add If Odd
        </Button>
      </XStack>
    </YStack>
  )
}
