import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from './Palette'
import { FC } from 'react'
import { IPost } from '../../store/models/IPost'
import {
	LikeResponseQuery,
	useGetLikesQuery,
	useLikePostMutation,
} from '../../store/services/PostApi'

interface IPostItem {
	postData: IPost
}

const PostLikeButton: FC<IPostItem> = ({ postData }) => {
	const { theme } = useTheme()
	const [likePost] = useLikePostMutation()
	const { data } = useGetLikesQuery(postData.id)

	const likeRequest = async () => {
		await likePost(postData.id)
	}

	return (
		<TouchableOpacity
			activeOpacity={0.4}
			style={styles(theme, data).button}
			onPress={likeRequest}
		>
			<AntDesign
				name='hearto'
				size={20}
				color={data?.my_like ? Palette.red : Palette[theme].iconInactive}
			/>
			<Text style={styles(theme, data).counter}>{postData.likes}</Text>
		</TouchableOpacity>
	)
}

export default PostLikeButton

const styles = (theme: ThemeType, data: LikeResponseQuery | undefined) =>
	StyleSheet.create({
		button: {
			backgroundColor: data?.my_like ? Palette.pink : Palette[theme].postButton,
			paddingVertical: 5,
			paddingHorizontal: 10,
			borderRadius: 100,
			flexDirection: 'row',
			alignItems: 'center',
		},
		counter: {
			marginLeft: 7,
			fontSize: 16,
			color: data?.my_like ? Palette.red : Palette[theme].iconInactive,
		},
	})
