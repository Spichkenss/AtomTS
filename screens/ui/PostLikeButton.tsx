import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { Feather } from '@expo/vector-icons'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from './Palette'
import { FC, useEffect } from 'react'
import {
	PostLikesResponse,
	useGetLikesQuery,
	useLazyGetLikesQuery,
	useLikePostMutation,
} from '../../store/services/PostService'
import { IPostItem } from '../home/posts/PostItem'

const PostLikeButton: FC<IPostItem> = ({ postData }) => {
	const { theme } = useTheme()
	const [getLikes, { data: post }] = useLazyGetLikesQuery()
	const [likePost, { data, isSuccess }] = useLikePostMutation()

	useEffect(() => {
		const fetchLikes = async (id: number) => {
			await getLikes(id)
		}
		if (postData?.id) {
			fetchLikes(postData?.id)
		}
	}, [postData?.id])

	return (
		<TouchableOpacity
			activeOpacity={0.4}
			style={styles(theme, post).button}
			onPress={() => likePost(postData.id)}
		>
			<Feather
				name='heart'
				size={20}
				color={post?.my_like ? Palette.red : Palette[theme].iconInactive}
			/>

			<Text style={styles(theme, post).counter}>{post?.likes.count}</Text>
		</TouchableOpacity>
	)
}

export default PostLikeButton

const styles = (theme: ThemeType, post: PostLikesResponse | undefined) =>
	StyleSheet.create({
		button: {
			backgroundColor: post?.my_like ? Palette.pink : Palette[theme].postButton,
			paddingVertical: 5,
			paddingHorizontal: 10,
			borderRadius: 100,
			flexDirection: 'row',
			alignItems: 'center',
		},
		counter: {
			marginLeft: 4,
			fontSize: 16,
			color: post?.my_like ? Palette.red : Palette[theme].iconInactive,
		},
	})
