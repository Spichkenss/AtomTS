import { IPost } from './../models/IPost'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store'

export interface CreatePostRequest {
	description?: string
	media?: string
}

export interface LikeResponseMut {
	my_like: boolean
	post: IPost
}

export interface LikeResponseQuery {
	my_like: boolean
	likers: {
		count: number
		rows: [{ postId: number; likerId: number; timestamp: string }]
	}
}
export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.4:5000/api/posts',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).userReducer.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['Post'],
	endpoints: builder => ({
		getAllPosts: builder.query<IPost[], void>({
			query: () => ({
				url: '/',
			}),
			providesTags: res => ['Post'],
		}),
		createPost: builder.mutation<IPost, CreatePostRequest>({
			query: body => ({
				url: '/create',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Post'],
		}),
		getLikes: builder.query<LikeResponseQuery, number>({
			query: (post: number) => ({
				url: `/post/likes?post=${post}`,
				method: 'GET',
			}),
			providesTags: res => ['Post'],
		}),
		likePost: builder.mutation<LikeResponseMut, number>({
			query: (postId: number) => ({
				url: `/post/like?post=${postId}`,
				method: 'POST',
			}),
			invalidatesTags: ['Post'],
		}),
	}),
})

export const {
	useCreatePostMutation,
	useGetAllPostsQuery,
	useLikePostMutation,
	useGetLikesQuery,
} = postApi
