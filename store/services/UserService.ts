import { IUser } from './../models/IUser'
import { RootState } from './../store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API } from '../../config'

export interface SetAvatarResponse {
	path: string
}

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API}/users`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).userReducer.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			headers.set('Accept', `application/json`)
			headers.set('Content-Type', `multipart/form-data`)
			return headers
		},
	}),
	tagTypes: ['Avatar'],
	endpoints: builder => ({
		getAvatar: builder.query<string | undefined, number>({
			query: (id: number) => `/id/get-avatar?id=${id}`,
			providesTags: () => ['Avatar'],
		}),
		getUser: builder.query<IUser, number>({
			query: (id: number) => `/id?id=${id}`,
		}),
		setAvatar: builder.mutation<SetAvatarResponse, FormData>({
			query: (data: FormData) => ({
				url: '/set-avatar',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: () => ['Avatar'],
		}),
	}),
})

export const { useSetAvatarMutation, useLazyGetUserQuery, useGetAvatarQuery } =
	userApi
