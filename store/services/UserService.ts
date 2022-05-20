import { IUser } from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.4:5000/api' }),
	endpoints: build => ({
		getUser: build.query<IUser, number>({
			query: (id: number) => ({
				url: '/user/id?id=1',
			}),
		}),
	}),
})

export const { useGetUserQuery } = userApi
