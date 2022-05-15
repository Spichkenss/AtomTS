import { IUser } from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store'

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
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.4:5000/api',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).userReducer.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: builder => ({
		signIn: builder.mutation<UserResponse, LoginRequest>({
			query: (data: LoginRequest) => ({
				url: '/auth/login',
				method: 'POST',
				body: data,
			}),
		}),
		signUp: builder.mutation<UserResponse, RegistrationRequest>({
			query: (data: RegistrationRequest) => ({
				url: '/auth/registration',
				method: 'POST',
				body: data,
			}),
		}),
	}),
})

export const { useSignInMutation, useSignUpMutation } = authApi
