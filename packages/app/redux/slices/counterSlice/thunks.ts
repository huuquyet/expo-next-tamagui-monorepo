/* Instruments */
import { type ReduxThunkAction } from 'app/redux'
import { createAppAsyncThunk } from 'app/redux/createAppAsyncThunk'
import { fetchIdentityCount } from './fetchIdentityCount'
import { incrementByAmount } from './counterSlice'
import { selectCount } from './selectors'

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAppAsyncThunk(
  'counter/fetchIdentityCount',
  async (amount: number) => {
    const response = await fetchIdentityCount(amount)

    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOddAsync =
  (amount: number): ReduxThunkAction =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())

    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }
