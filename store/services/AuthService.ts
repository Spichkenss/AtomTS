import { userSlice } from './../reducers/UserSlice'
import { IUser } from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface UserResponse {
	user: IUser
	token: string
}

export interface LoginRequest {
	email: string
	password: string
}

export interface RegistrationRequest {
	email: string
	password: string
	username: string
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.4:5000/api/auth',
		prepareHeaders: async (headers, { getState }) => {
			const token = await AsyncStorage.getItem('token')
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: builder => ({
		signIn: builder.mutation<UserResponse, LoginRequest>({
			query: (data: LoginRequest) => ({
				url: '/login',
				method: 'POST',
				body: data,
			}),
		}),
		signUp: builder.mutation<UserResponse, RegistrationRequest>({
			query: (data: RegistrationRequest) => ({
				url: '/registration',
				method: 'POST',
				body: data,
			}),
		}),
		checkAuth: builder.mutation<UserResponse, void>({
			query: () => ({
				url: '/check',
			}),
		}),
	}),
})

export const { useSignInMutation, useSignUpMutation, useCheckAuthMutation } =
	authApi
