import { useState } from 'react'

import { decrement, increment, incrementByAmount, selectCount } from './counterSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Button, H1, Input, Text, XStack, YStack } from '@my/ui'

export function Counter() {
  const [incrementAmount, setIncrementAmount] = useState('2')

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <YStack space="$4" p="$4" jc="center">
      <H1>Redux demo</H1>
      <XStack space="$4" jc="center" ai="center">
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
      <XStack space="$4">
        <Input
          size="$6"
          width="$6"
          value={incrementAmount}
          keyboardType="numeric"
          onChangeText={setIncrementAmount}
        />
        <Button size="$6" onPress={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
          Add Amount
        </Button>
      </XStack>
    </YStack>
  )
}
