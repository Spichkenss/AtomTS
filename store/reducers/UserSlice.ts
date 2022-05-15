import { authApi } from './../services/AuthService'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUser } from '../actions/UserActions'
import { IUser } from './../models/IUser'
import { RootState } from '../store'

interface UserState {
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
	reducers: {},
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
	},
})

export default userSlice.reducer

export const selectCurrentUser = (state: RootState) => state.userReducer.user
