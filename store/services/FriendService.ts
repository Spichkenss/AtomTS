import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IUser } from '../models/IUser'
import { RootState } from '../store'

export type StatusType = 'requests' | 'friends' | 'decides' | null

export interface RelationType {
	relation_id: number
	user_id: number
	friend_id: number
	status: StatusType
	user: IUser
}

export interface GetFriends {
	count: number
	rows: [RelationType]
}

export interface SendRequset {
	friend_id: number
	message: string
}

export interface AcceptRequset {
	friend_id: number
	message: string
}

export interface DeleteRequset {
	friend_id: number
	message: string
}

export interface GetRelation {
	relation_id: number
	status: StatusType
}

export const friendApi = createApi({
	reducerPath: 'friendApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.4:5000/api/friends',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).userReducer.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	refetchOnFocus: true,
	tagTypes: ['Friend', 'Suggest', 'Relation', 'Request'],
	endpoints: builder => ({
		getRelation: builder.query<GetRelation, number>({
			query: (id: number) => `/id/relation?id=${id}`,
			providesTags: result => [{ type: 'Relation', id: result?.relation_id }],
		}),
		getFriends: builder.query<GetFriends, void>({
			query: () => '/',
			providesTags: (result, error, arg) =>
				result
					? [
							...result.rows.map(({ user }) => ({
								type: 'Friend' as const,
								id: user.id,
							})),
							'Friend',
					  ]
					: ['Friend'],
		}),
		getSuggest: builder.query<IUser[], void>({
			query: () => '/suggested',
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Suggest' as const, id })),
							'Suggest',
					  ]
					: ['Suggest'],
		}),
		getRequests: builder.query<GetFriends, void>({
			query: () => '/requests',
			providesTags: (result, error, arg) =>
				result
					? [
							...result.rows.map(({ user }) => ({
								type: 'Request' as const,
								id: user.id,
							})),
							'Request',
					  ]
					: ['Request'],
		}),
		sendRequest: builder.mutation<SendRequset, number>({
			query: (id: number) => ({ url: `/id/request?id=${id}`, method: 'POST' }),
			invalidatesTags: result => [
				{ type: 'Friend', id: result?.friend_id },
				{ type: 'Request', id: result?.friend_id },
			],
		}),
		acceptRequest: builder.mutation<AcceptRequset, number>({
			query: (id: number) => ({ url: `/id/accept?id=${id}`, method: 'POST' }),
			invalidatesTags: result => [
				{ type: 'Friend', id: result?.friend_id },
				{ type: 'Request', id: result?.friend_id },
				'Suggest',
			],
		}),
		deleteFriend: builder.mutation<DeleteRequset, number>({
			query: (id: number) => ({ url: `/id/delete?id=${id}`, method: 'POST' }),
			invalidatesTags: result => [
				{ type: 'Friend', id: result?.friend_id },
				'Request',
				'Suggest',
			],
		}),
	}),
})

export const {
	useAcceptRequestMutation,
	useDeleteFriendMutation,
	useGetFriendsQuery,
	useGetSuggestQuery,
	useSendRequestMutation,
	useGetRequestsQuery,
	useGetRelationQuery,
	useLazyGetRelationQuery,
} = friendApi