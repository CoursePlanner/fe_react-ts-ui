import { configureStore } from '@reduxjs/toolkit'
import UserProfileReducer from './UserProfileReducer'
import UserLoginReducer from './UserLoginReducer'

export const store = configureStore({
  reducer: {
    userProfileReducer: UserProfileReducer,
    userLoginReducer: UserLoginReducer,
  },
})

export type ReducerType = ReturnType<typeof store>
