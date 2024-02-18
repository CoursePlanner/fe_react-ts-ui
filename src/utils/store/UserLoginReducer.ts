import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LoginCredentials } from '../../models/LoginCredentials'
import { APIErrorResponse } from '../../models/APIErrorResponse'
import { AuthConstants } from '../constants/AuthConstants'

const getDifferenceInDays = (date1: Date, date2: Date): number => {
  let Difference_In_Time = date2.getTime() - date1.getTime()
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))
  return Difference_In_Days
}

const setAuthCookies = (
  token: string,
  username: string,
  userId: string,
  refreshToken: string,
  tokenExpiry: number,
) => {
  Cookies.set(AuthConstants.HEADER_AUTH_CODE, token, { expires: tokenExpiry })
  Cookies.set(AuthConstants.HEADER_REFRESH_TOKEN, refreshToken, {
    expires: tokenExpiry,
  })
  Cookies.set(AuthConstants.HEADER_USERNAME, username, { expires: tokenExpiry })
  Cookies.set(AuthConstants.HEADER_USER_ID, userId, { expires: tokenExpiry })
}

interface LoginResponse {
  status?: string
  tokenExpiry?: number
}

export interface LoginState extends LoginCredentials, LoginResponse {
  isLoading?: boolean
  errorMessage?: string
  isLoggedIn?: boolean
}

export const userLoginSlice = createSlice({
  name: 'userProfileState',
  initialState: {
    username: '',
    password: '',
    errorMessage: '',
    isLoading: false,
    isLoggedIn: false,
  } as LoginState,
  reducers: {
    clearLoginDetails: (state) => {
      state.username = ''
      state.password = ''
      state.errorMessage = ''
      state.isLoading = false
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(performLogin.fulfilled, (state, action) => {
      if (typeof action.payload === 'string') {
        state.errorMessage = action.payload
      } else {
        Object.assign(state, action.payload)
        state.errorMessage = ''
        state.isLoading = false
      }
    }),
      builder.addCase(performLogin.pending, (state) => {
        state.isLoading = true
        state.errorMessage = ''
      }),
      builder.addCase(performLogin.rejected, (state, action) => {
        state.errorMessage = action.payload as string
        state.isLoading = false
      })
  },
})

export const performLogin = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials): Promise<LoginState> => {
    let responseData = {} as LoginState
    try {
      const response = await axios.post<string>(
        'http://localhost:9000/api/gws/auth/login',
        JSON.stringify(credentials),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      responseData = (await response.data) as unknown as LoginState
      const tokenExpiry: number = getDifferenceInDays(
        new Date(),
        new Date(
          ((await response.data) as unknown as LoginResponse)?.tokenExpiry,
        ),
      )

      setAuthCookies(
        response?.headers[AuthConstants.HEADER_AUTH_CODE],
        response?.headers[AuthConstants.HEADER_USERNAME],
        response?.headers[AuthConstants.HEADER_USER_ID],
        response?.headers[AuthConstants.HEADER_REFRESH_TOKEN],
        tokenExpiry,
      )
      responseData.isLoggedIn = true
      responseData.password = ''
      responseData.username = ''
    } catch (error) {
      const errorResponseObj = (await error?.response
        ?.data) as unknown as APIErrorResponse
      responseData.errorMessage =
        errorResponseObj?.errorMessage ||
        errorResponseObj?.status ||
        'Something went wrong!'
      //return (error?.response?.data as string) || 'Something went wrong!'
      responseData.isLoggedIn = false
    }
    return responseData
  },
)

export const { clearLoginDetails, setUsername, setPassword } =
  userLoginSlice.actions

export default userLoginSlice.reducer
