import { Button, H1, Input, Text, XStack, YStack } from '@my/ui'
import { useCounterStore } from 'app/zustand'

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
  } = useCounterStore()

  return (
    <YStack gap="$4" p="$4" ai="center">
      <H1>Zustand demo</H1>
      <XStack gap="$6" jc="center" ai="center">
        <Button size="$6" onPress={() => increment()}>
          +
        </Button>
        <Text fos="$8" ff="$body">
          {count}
        </Text>
        <Button size="$6" onPress={() => decrement()}>
          -
        </Button>
      </XStack>
      <Button size="$6" onPress={() => reset()}>
        Reset
      </Button>
      <XStack gap="$4" ai="center">
        <Input
          size="$8"
          ta="center"
          value={`${amount}`}
          inputMode="numeric"
          onChangeText={(e) => setAmount(Number(e) || 0)}
        />
        <YStack gap="$2">
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
