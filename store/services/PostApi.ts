import { IPost } from './../models/IPost'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store'

export interface CreatePostRequest {
	description?: string
	media?: string
}

export interface LikePostResponse {
	post: IPost
}

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.23.150:5000/api/posts',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).userReducer.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['Post', 'Like'],
	endpoints: builder => ({
		getPost: builder.query<IPost, number>({
			query: (id: number) => ({
				url: `/id?id=${id}`,
			}),
			providesTags: res => ['Post'],
		}),
		getAllPosts: builder.query<IPost[], void>({
			query: data => '/',
		}),
		createPost: builder.mutation<IPost, CreatePostRequest>({
			query: data => ({
				url: '/create',
				method: 'POST',
				data,
			}),
			invalidatesTags: ['Post'],
		}),
		likePost: builder.mutation<LikePostResponse, number>({
			query: (id: number) => ({
				url: `/post/like?post=${id}`,
				method: 'POST',
			}),
		}),
	}),
})

export const {
	useCreatePostMutation,
	useGetPostQuery,
	useLikePostMutation,
	useGetAllPostsQuery,
} = postApi
