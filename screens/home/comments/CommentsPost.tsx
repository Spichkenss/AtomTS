import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import PostLikeButton from '../../ui/PostLikeButton'
import { IPost } from '../../../store/models/IPost'
import { useGetPostQuery } from '../../../store/services/PostService'
import { useTheme } from '../../../hooks/useTheme'
import PostModal from '../../ui/PostModal'
import PageTitle from '../../ui/PageTitle'
import { ThemeType } from '../../../store/models/ITheme'
import { Palette } from '../../ui/Palette'
import moment from 'moment'
import CircleAvatar from '../../ui/CircleAvatar'

interface ICommentPost {
	id: number
}

const CommentsPost: FC<ICommentPost> = ({ id }) => {
	const { theme } = useTheme()
	const { data, isFetching } = useGetPostQuery(id)
	return (
		<View style={styles(theme).container}>
			<PageTitle title={'Публикация'}>
				<PostModal postData={data as IPost} />
			</PageTitle>
			<View style={styles(theme).post}>
				<View style={styles(theme).author}>
					<CircleAvatar height={50} width={50} image={'../../avatar.jpg'} />
					<View style={{ flexDirection: 'column', paddingLeft: 10 }}>
						<Text style={styles(theme).username}>{data?.user.username}</Text>
						<Text style={styles(theme).timestamp}>
							{moment(data?.createdAt)
								.add(-30, 'seconds')
								.locale('ru')
								.fromNow()}
						</Text>
					</View>
				</View>
				<Text style={styles(theme).description}>{data?.description}</Text>
				{!data?.media && (
					<Image
						source={require('../../../avatar.jpg')}
						style={styles(theme).media}
					/>
				)}
				<PostLikeButton postData={data as IPost} />
			</View>
		</View>
	)
}

export default CommentsPost

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: { flex: 1, backgroundColor: Palette[theme].background },
		post: {
			backgroundColor: Palette[theme].primary,
			paddingHorizontal: 15,
			paddingVertical: 10,
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
		author: { flexDirection: 'row', alignItems: 'center' },
		avatar: {},
		username: { color: Palette[theme].text, fontSize: 16, fontWeight: '600' },
		timestamp: { color: Palette[theme].iconInactive },
		description: {
			color: Palette[theme].text,
			paddingVertical: 10,
			fontSize: 16,
		},
		media: {
			width: '100%',
			height: undefined,
			aspectRatio: 1,
			resizeMode: 'center',
			marginBottom: 10,
		},
	})
