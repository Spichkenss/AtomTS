import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API } from '../../config'
import { RootState } from '../store'

export interface IMessage {
	id?: number
	body: string
	sentAt?: Date
	userId: number
	dialogName: number
}

export const messageApi = createApi({
	reducerPath: 'messageApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API}/message`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).userReducer.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['Message'],
	endpoints: builder => ({
		getHistory: builder.query<IMessage[], number>({
			query: (dialogName: number) => `/dialogName?dialogName=${dialogName}`,
			providesTags: () => ['Message'],
		}),
	}),
})

export const { useLazyGetHistoryQuery } = messageApi
