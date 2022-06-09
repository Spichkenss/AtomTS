import { IUser } from './../models/IUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API } from '../../config'
import { RootState } from '../store'

export interface CreateDialog {
	dialog: {
		id: number
		dialogName: number
		friendId: number
		userId: number
	}
	user: IUser
}

export interface IDialog {
	id: number
	dialogName: number
	userId: number
	friendId: number
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
		createDialog: builder.mutation<CreateDialog, number>({
			query: (friendId: number) => ({
				url: '/create',
				method: 'POST',
				body: { friendId },
			}),
		}),
		getDialogs: builder.query<IDialog[], void>({
			query: () => `/`,
		}),
	}),
})

export const { useCreateDialogMutation, useGetDialogsQuery } = chatApi
