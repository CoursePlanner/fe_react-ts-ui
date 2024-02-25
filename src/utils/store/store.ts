import { configureStore } from '@reduxjs/toolkit'
import UserProfileReducer from './UserProfileReducer'
import UserLoginReducer from './UserLoginReducer'
import PageStateReducer from './PageStateReducer'
import UserOrdersSlice from './OrderReducer'

export const store = configureStore({
  reducer: {
    pageStateReducer: PageStateReducer,
    userProfileReducer: UserProfileReducer,
    userLoginReducer: UserLoginReducer,
    userOrdersSlice: UserOrdersSlice
  },
})

export type ReducerType = ReturnType<typeof store>
