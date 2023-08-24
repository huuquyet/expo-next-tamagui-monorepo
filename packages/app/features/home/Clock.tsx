import { useStore, useInterval } from 'app/zustand'
import { H2 } from '@my/ui'

const useClock = () => {
  return useStore((store) => ({
    lastUpdate: store.lastUpdate,
    tick: store.tick,
  }))
}

const formatTime = (time: number) => {
  // cut off except hh:mm:ss
  return new Date(time).toJSON().slice(11, 19)
}

export function Clock() {
  const { lastUpdate, tick } = useClock()

  // Tick the time every second
  useInterval(() => {
    tick(Date.now())
  }, 1000)

  return <H2 ta="center">{formatTime(lastUpdate)}</H2>
}
