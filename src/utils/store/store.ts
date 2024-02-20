import { configureStore } from '@reduxjs/toolkit'
import UserProfileReducer from './UserProfileReducer'
import UserLoginReducer from './UserLoginReducer'
import PageStateReducer from './PageStateReducer'

export const store = configureStore({
  reducer: {
    pageStateReducer: PageStateReducer,
    userProfileReducer: UserProfileReducer,
    userLoginReducer: UserLoginReducer,
  },
})

export type ReducerType = ReturnType<typeof store>
