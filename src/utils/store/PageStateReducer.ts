import { createSlice } from '@reduxjs/toolkit'

export const MAX_API_ATTEMPTS = 3;

export interface PageState {
  isDataLoading: boolean
}

export const pageStateSlice = createSlice({
  name: 'pageStateSlice',
  initialState: {
    isDataLoading: false,
  } as PageState,
  reducers: {
    setDataLoadingState: (state, action): void => {
      state.isDataLoading = action.payload
    },
  },
})

export const { setDataLoadingState } = pageStateSlice.actions
export default pageStateSlice.reducer