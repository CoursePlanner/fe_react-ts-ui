import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserProfileProps } from '../../models/UserProfile'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AuthConstants } from '../constants/AuthConstants'

export interface OrderItem {
  orderId: number
  productId: number
  productName: string
  productPrice: number
  quantity: number
  purchasedOn: string
  orderStatus: string
  paymentId: number
  userId: string
}

export interface OrderPagination {
  page: number
  size: number
  totalRecords?: number
  totalPages?: number
  direction: string
}

export interface OrderItemsList {
  orders: OrderItem[]
  pagination: OrderPagination
}

export interface OrderState {
  currentOrder: OrderItem
  allOrders: OrderItemsList
  isLoading: boolean
  errorMessage: string
}

export const userOrdersSlice = createSlice({
  name: 'orderState',
  initialState: {
    currentOrder: {
      orderId: 0,
      productId: 0,
      productName: '',
      productPrice: 0.0,
      quantity: 0,
      purchasedOn: '',
      orderStatus: '',
      paymentId: 0,
      userId: '',
    } as OrderItem,
    allOrders: {
      orders: [] as OrderItem[],
      pagination: {
        direction: 'DESC',
        page: 0,
        size: 10,
        totalPages: 0,
        totalRecords: 0
      } as OrderPagination,
    } as OrderItemsList,
    isLoading: false,
    errorMessage: '',
  } as OrderState,
  reducers: {
    setPage: (state, action) => {
      state.allOrders.pagination.page = action.payload
      state.allOrders = {...state.allOrders }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadAllOrdersHistory.fulfilled, (state, action) => {
      Object.assign(state.allOrders, action.payload)
      state.errorMessage = ''
      state.isLoading = false
    }),
      builder.addCase(loadAllOrdersHistory.pending, (state) => {
        state.isLoading = true
        state.errorMessage = ''
      }),
      builder.addCase(loadAllOrdersHistory.rejected, (state, action) => {
        console.log('**** loadProfileData.rejected: ', action)
        state.errorMessage = action.payload as string
        state.isLoading = false
      })
  },
})

export const loadAllOrdersHistory = createAsyncThunk(
  'orders/loadAllOrders',
  async (orderPagination: OrderPagination): Promise<OrderItemsList | string> => {
    try {
      const response = await axios.post<OrderItemsList | string>(
        'http://localhost:9000/api/gws/orders/all',
        JSON.stringify({
          userId: Cookies.get(AuthConstants.HEADER_USER_ID),
          pagination: orderPagination
        }),
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

// export const updateProfileData = createAsyncThunk(
//   'user/updateProfile',
//   async (profileDetails: ProfileState): Promise<UserProfileProps | string> => {
//     try {
//       const response = await axios.patch<UserProfileProps | string>(
//         'http://localhost:9000/api/gws/user/updateUser',
//         JSON.stringify(profileDetails),
//         {
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'x-auth-code': Cookies.get(AuthConstants.HEADER_AUTH_CODE),
//             'x-user-id': Cookies.get(AuthConstants.HEADER_USER_ID),
//             'x-refresh-token': Cookies.get(AuthConstants.HEADER_REFRESH_TOKEN),
//             'x-username': Cookies.get(AuthConstants.HEADER_USERNAME),
//           },
//         },
//       )
//       return response.data
//     } catch (error) {
//       return {
//         errorMessage:
//           (error?.response?.data as string) || 'Something went wrong!',
//       }
//     }
//   },
// )

export const { setPage } = userOrdersSlice.actions
export default userOrdersSlice.reducer