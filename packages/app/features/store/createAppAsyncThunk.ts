/* Core */
import { createAsyncThunk } from '@reduxjs/toolkit'

/* Instruments */
import type { ReduxState, ReduxDispatch } from './initializeStore'

/**
 * ? A utility function to create a typed Async Thunk Actions.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: ReduxState
  dispatch: ReduxDispatch
  rejectValue: string
}>()
