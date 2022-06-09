import { IUser } from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API } from '../../config'
import { RootState } from '../store'

export interface IMessage {
	id: number
	sender: IUser
	body: string
	timestamp: Date
}

export interface SendMessage {
	userId: number
	body: string
	dialogId: number
}

export interface IDialog {
	id: number
	friendId: number
	userId: number
	user: IUser
}

export const chatApi = createApi({
	reducerPath: 'chatApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API}/dialogs`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).userReducer.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: builder => ({
		createDialog: builder.mutation<IDialog, number>({
			query: (friendId: number) => ({
				url: '/create',
				method: 'POST',
				body: friendId,
			}),
		}),
		getHistory: builder.query<IMessage[], number>({
			query: (dialogId: number) => `/id?id=${dialogId}`,
		}),
		getDialogs: builder.query<IDialog[], void>({
			query: () => `/`,
		}),
	}),
})

export const {
	useCreateDialogMutation,
	useGetDialogsQuery,
	useLazyGetHistoryQuery,
} = chatApi
