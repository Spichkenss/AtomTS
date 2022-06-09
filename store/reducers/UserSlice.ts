import { userApi } from './../services/UserService'
import { authApi } from './../services/AuthService'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from './../models/IUser'
import { RootState } from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { staticURL } from '../../config'

export interface UserState {
	user: IUser | null
	token: string | null
}

const initialState: UserState = {
	user: null,
	token: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<UserState>) => {
			state.token = action.payload.token
			state.user = action.payload.user
		},
		logout: (state: UserState) => {
			state.token = null
			state.user = null
			AsyncStorage.removeItem('token')
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			authApi.endpoints.signIn.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token
				state.user = payload.user
			}
		)
		builder.addMatcher(
			authApi.endpoints.signUp.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token
				state.user = payload.user
			}
		)
		builder.addMatcher(
			authApi.endpoints.checkAuth.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token
				state.user = payload.user
			}
		)
		builder.addMatcher(authApi.endpoints.checkAuth.matchRejected, state => {
			state.token = null
			state.user = null
		})
		builder.addMatcher(
			userApi.endpoints.getAvatar.matchFulfilled,
			(state, { payload }) => {
				if (state.user) {
					state.user.avatar = payload
				}
			}
		)
	},
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state: RootState) => state.userReducer.user
