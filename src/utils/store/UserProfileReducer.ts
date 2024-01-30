import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserProfileProps } from '../../models/UserProfile'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AuthConstants } from '../constants/AuthConstants'

interface ProfileState extends UserProfileProps {
  isLoading: boolean
  errorMessage: string
}

export const userProfileSlice = createSlice({
  name: 'userProfileState',
  initialState: {} as ProfileState,
  reducers: {
    resetUserProfileData: (state) => {
      state.userId = ''
      state.fullName = ''
      state.emailId = ''
      state.username = ''
      state.password = ''
      state.enabled = false
      state.authorities = []
      state.createdOn = ''
      state.updatedOn = ''
      state.errorMessage = ''
      state.isLoading = false
    },
  },
  extraReducers(builder) {
    builder.addCase(loadProfileData.fulfilled, (state, action) => {
      Object.assign(state, action.payload)
      state.errorMessage = ''
      state.isLoading = false
    }),
      builder.addCase(loadProfileData.pending, (state) => {
        state.isLoading = true
        state.errorMessage = ''
      }),
      builder.addCase(loadProfileData.rejected, (state, action) => {
        console.log('**** loadProfileData.rejected: ', action)
        state.errorMessage = action.payload as string
        state.isLoading = false
      })
  },
})

export const loadProfileData = createAsyncThunk(
  'user/loadProfile',
  async (): Promise<UserProfileProps | string> => {
    try {
      const response = await axios.get<UserProfileProps | string>(
        'http://localhost:9000/api/gws/user/me',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-code': Cookies.get(AuthConstants.HEADER_AUTH_CODE),
            'x-user-id': Cookies.get(AuthConstants.HEADER_USER_ID),
            'x-refresh-token': Cookies.get(AuthConstants.HEADER_REFRESH_TOKEN),
            'x-username': Cookies.get(AuthConstants.HEADER_USERNAME),
          },
        },
      )
      return response.data
    } catch (error) {
      return (error?.response?.data as string) || 'Something went wrong!'
    }
  },
)

export const { resetUserProfileData } = userProfileSlice.actions

export default userProfileSlice.reducer
