import { IUser } from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.4:5000/api/users',
	}),
	endpoints: build => ({
		getUser: build.query<IUser, number>({
			query: (id: number) => ({
				url: `/id?id=${id}`,
			}),
		}),
	}),
})

export const { useGetUserQuery } = userApi
