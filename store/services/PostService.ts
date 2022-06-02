import { IUser } from '../models/IUser'
import { AppStackProps } from '../../navigation/StackNavigator'
import { RouteProp } from '@react-navigation/native'
import { IPost } from '../models/IPost'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store'

export interface CreatePostRequest {
	description?: string
	media?: string
}

export interface EditPostRequest {
	route: RouteProp<AppStackProps, 'AddPostPage'>
	description?: string
	media?: string
}

export interface LikePostResponse {
	post: IPost
}

export interface PostLikesResponse {
	my_like: boolean
	likes: {
		count: number
		rows: [
			{
				id: number
				post_id: number
				liker_id: number
				timestamp: string
			}
		]
	}
}

export interface CommentRequest {
	id: number
	body: string
}

export type CommentType = {
	id: number
	body: string
	commentator_id: number
	post_id: number
	createdAt: Date
	user: IUser
}

export interface CommentResponse {
	comment: CommentType
}

export interface GetCommentsResponse {
	count: number
	rows: CommentType[]
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
	tagTypes: ['Post', 'Like', 'Comment'],
	endpoints: builder => ({
		getPost: builder.query<IPost, number>({
			query: (id: number) => `/id?id=${id}`,
			providesTags: res => ['Post'],
		}),
		getAllPosts: builder.query<IPost[], void>({
			query: () => '/',
			providesTags: res => ['Post'],
		}),
		getUserPosts: builder.query<IPost[], number>({
			query: (id: number) => `/id/posts?id=${id}`,
			providesTags: res => ['Post'],
		}),
		createPost: builder.mutation<IPost, CreatePostRequest>({
			query: (data: CreatePostRequest) => ({
				url: '/create',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Post'],
		}),
		deletePost: builder.mutation<void, number>({
			query: (id: number) => ({
				url: `/id/delete?id=${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['Post'],
		}),
		editPost: builder.mutation<void, EditPostRequest>({
			query: (body: EditPostRequest) => ({
				url: `/id/edit?id=${body.route.params?.id}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Post'],
		}),
		likePost: builder.mutation<IPost, number>({
			query: (id: number) => ({
				url: `/post/like?post=${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['Like'],
		}),
		getLikes: builder.query<PostLikesResponse, number>({
			query: (post: number) => `/post/likes?post=${post}`,
			providesTags: (result, error, arg) => ['Like'],
		}),
		addComment: builder.mutation<CommentResponse, CommentRequest>({
			query: (data: CommentRequest) => ({
				url: `/id/add?id=${data.id}`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: res => ['Comment'],
		}),
		getComments: builder.query<GetCommentsResponse, number>({
			query: (id: number) => `/id/comments?id=${id}`,
			providesTags: result =>
				result
					? [
							...result.rows.map(({ id }) => ({
								type: 'Comment' as const,
								id: id,
							})),
							'Comment',
					  ]
					: ['Comment'],
		}),
	}),
})

export const {
	useCreatePostMutation,
	useGetPostQuery,
	useLikePostMutation,
	useGetAllPostsQuery,
	useGetUserPostsQuery,
	useGetLikesQuery,
	useLazyGetLikesQuery,
	useDeletePostMutation,
	useEditPostMutation,
	useAddCommentMutation,
	useGetCommentsQuery,
	useLazyGetCommentsQuery,
	usePrefetch,
} = postApi
