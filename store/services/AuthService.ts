import { IUser } from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API } from '../../config'

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
		baseUrl: `${API}/auth`,
		prepareHeaders: async headers => {
			const token = await AsyncStorage.getItem('token')
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['Auth'],
	endpoints: builder => ({
		signIn: builder.mutation<UserResponse, LoginRequest>({
			query: (data: LoginRequest) => ({
				url: '/login',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Auth'],
		}),
		signUp: builder.mutation<UserResponse, RegistrationRequest>({
			query: (data: RegistrationRequest) => ({
				url: '/registration',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Auth'],
		}),
		checkAuth: builder.mutation<UserResponse, void>({
			query: () => ({
				url: '/check',
			}),
			invalidatesTags: ['Auth'],
		}),
	}),
})

export const { useSignInMutation, useSignUpMutation, useCheckAuthMutation } =
	authApi
