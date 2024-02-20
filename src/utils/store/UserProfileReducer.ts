import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserProfileProps } from '../../models/UserProfile'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AuthConstants } from '../constants/AuthConstants'

export interface ProfileState {
  userId?: string
  fullName?: string
  emailId?: string
  username?: string
  password?: string
  enabled?: boolean
  authorities?: string[]
  createdOn?: string
  updatedOn?: string
  isLoading?: boolean
  errorMessage?: string
}

export const userProfileSlice = createSlice({
  name: 'userProfileState',
  initialState: {
    userId: '',
    fullName: '',
    emailId: '',
    username: '',
    password: '',
    enabled: false,
    authorities: [],
    createdOn: '',
    updatedOn: '',
    isLoading: false,
    errorMessage: '',
  } as ProfileState,
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
    setFullName: (state, action) => {
      state.fullName = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
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

    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      Object.assign(state, action.payload)
      state.errorMessage = ''
      state.isLoading = false
    }),
      builder.addCase(updateProfileData.pending, (state) => {
        state.isLoading = true
        state.errorMessage = ''
      }),
      builder.addCase(updateProfileData.rejected, (state, action) => {
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
      return {
        errorMessage:
          (error?.response?.data as string) || 'Something went wrong!',
      }
    }
  },
)

export const updateProfileData = createAsyncThunk(
  'user/updateProfile',
  async (profileDetails: ProfileState): Promise<UserProfileProps | string> => {
    try {
      const response = await axios.patch<UserProfileProps | string>(
        'http://localhost:9000/api/gws/user/updateUser',
        JSON.stringify(profileDetails),
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
      return {
        errorMessage:
          (error?.response?.data as string) || 'Something went wrong!',
      }
    }
  },
)

export const { resetUserProfileData, setFullName, setPassword } =
  userProfileSlice.actions

export default userProfileSlice.reducer
