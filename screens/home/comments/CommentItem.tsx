import { StyleSheet, Text, View } from 'react-native'
import { FC } from 'react'
import { CommentType } from '../../../store/services/PostService'
import { useTheme } from '../../../hooks/useTheme'
import { ThemeType } from '../../../store/models/ITheme'
import CircleAvatar from '../../ui/CircleAvatar'
import { Palette } from '../../ui/Palette'
import moment from 'moment'

interface CommentItem {
	commentData: CommentType
}

const CommentItem: FC<CommentItem> = ({ commentData }) => {
	const { theme } = useTheme()
	return (
		<View style={styles(theme).container}>
			<CircleAvatar
				width={40}
				height={40}
				image={commentData.user.avatar}
				id={commentData.user.id as number}
			/>
			<View style={styles(theme).author}>
				<Text style={styles(theme).username}>{commentData.user.username}</Text>
				<Text style={styles(theme).body}>{commentData.body}</Text>
			</View>
			<Text style={styles(theme).timestamp}>
				{moment(commentData.createdAt)
					.add(-30, 'seconds')
					.locale('ru')
					.fromNow()}
			</Text>
		</View>
	)
}

export default CommentItem

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 10,
			paddingHorizontal: 15,
			backgroundColor: Palette[theme].primary,
		},
		author: {
			flex: 1,
			flexDirection: 'column',
			paddingLeft: 10,
		},
		username: {
			fontSize: 13,
			color: Palette[theme].text,
		},
		body: { fontSize: 15, color: Palette[theme].text },
		timestamp: { fontSize: 13, color: Palette[theme].iconInactive },
	})
