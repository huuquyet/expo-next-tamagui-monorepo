import { useStore } from 'app/zustand'
import { Button, H1, Input, Text, XStack, YStack } from '@my/ui'

const useCounter = () => {
  return useStore((store) => ({
    count: store.count,
    amount: store.amount,
    loading: store.loading,
    setAmount: store.setAmount,
    increment: store.increment,
    decrement: store.decrement,
    reset: store.reset,
    incrementByAmount: store.incrementByAmount,
    incrementAsync: store.incrementAsync,
    incrementIfOddAsync: store.incrementIfOddAsync,
  }))
}

export function Counter() {
  const {
    count,
    amount,
    loading,
    setAmount,
    increment,
    decrement,
    reset,
    incrementByAmount,
    incrementAsync,
    incrementIfOddAsync,
  } = useCounter()

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
