import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from './Palette'
import { FC } from 'react'
import { useLikePostMutation } from '../../store/services/PostApi'
import { IPostItem } from '../home/posts/PostItem'

const PostLikeButton: FC<IPostItem> = ({ postData }) => {
	const { theme } = useTheme()
	const [likePost] = useLikePostMutation()

	const likeRequest = async () => {
		await likePost(postData.id)
	}
	return (
		<TouchableOpacity
			activeOpacity={0.4}
			style={styles(theme, post).button}
			onPress={likeRequest}
		>
			<AntDesign
				name='hearto'
				size={20}
				color={post?.my_like ? Palette.red : Palette[theme].iconInactive}
			/>
			<Text style={styles(theme, post).counter}>{post?.likers.count}</Text>
		</TouchableOpacity>
	)
}

export default PostLikeButton

const styles = (theme: ThemeType, post: LikersResponse | undefined) =>
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
			marginLeft: 7,
			fontSize: 16,
			color: post?.my_like ? Palette.red : Palette[theme].iconInactive,
		},
	})
