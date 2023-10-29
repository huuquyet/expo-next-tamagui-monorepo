import { useCounterStore } from 'app/zustand'
import { Button, H1, Input, Text, XStack, YStack } from '@my/ui'

export function Counter() {
  const count = useCounterStore((state) => state.count)
  const amount = useCounterStore((state) => state.amount)
  const loading = useCounterStore((state) => state.loading)
  const setAmount = useCounterStore((state) => state.setAmount)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)
  const incrementByAmount = useCounterStore((state) => state.incrementByAmount)
  const incrementAsync = useCounterStore((state) => state.incrementAsync)
  const incrementIfOddAsync = useCounterStore((state) => state.incrementIfOddAsync)

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
      <Button size="$6" onPress={() => reset()}>
        Reset
      </Button>
      <XStack space="$4" ai="center">
        <Input
          size="$8"
          ta="center"
          value={`${amount}`}
          inputMode="numeric"
          onChangeText={(e) => setAmount(Number(e) || 0)}
        />
        <YStack space="$2">
          <Button size="$6" onPress={() => incrementByAmount(amount)}>
            Add Amount
          </Button>
          <Button size="$6" disabled={loading !== 'idle'} onPress={() => incrementAsync(amount)}>
            Add Async
          </Button>
          <Button size="$6" onPress={() => incrementIfOddAsync(amount)}>
            Add If Odd
          </Button>
        </YStack>
      </XStack>
    </YStack>
  )
}
