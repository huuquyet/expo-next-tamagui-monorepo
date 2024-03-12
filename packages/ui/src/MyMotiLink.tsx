import type { ReactNode } from 'react'
import { MotiLink } from 'solito/moti'

export const MyMotiLink = ({ children }: { children: ReactNode }) => {
  return (
    <MotiLink
      href="/user/fernando"
      animate={({ hovered, pressed }) => {
        'worklet'

        return {
          scale: pressed ? 0.95 : hovered ? 1.1 : 1,
          rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
        }
      }}
      from={{
        scale: 0,
        rotateZ: '0deg',
      }}
      transition={{
        type: 'timing',
        duration: 150,
      }}
    >
      {children}
    </MotiLink>
  )
}
