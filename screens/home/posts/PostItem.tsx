import { FC, useEffect, useLayoutEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { IPost } from '../../../store/models/IPost'
import { ThemeType } from '../../../store/models/ITheme'
import CircleAvatar, { unknown } from '../../ui/CircleAvatar'
import { Palette } from '../../ui/Palette'
import moment from 'moment'
import 'moment/locale/ru'
import { FontAwesome5 } from '@expo/vector-icons'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import PostLikeButton from '../../ui/PostLikeButton'
import PostModal from '../../ui/PostModal'
import { useAuth } from '../../../hooks/useAuth'
import { useLazyGetCommentsQuery } from '../../../store/services/PostService'
import { staticURL } from '../../../config'

export interface IPostItem {
	postData: IPost
}

const PostItem: FC<IPostItem> = ({ postData }) => {
	const { user } = useAuth()
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()
	const [getComments, { data: comments }] = useLazyGetCommentsQuery()

	useEffect(() => {
		const fetchComments = async (id: number) => {
			await getComments(id)
		}
		if (postData?.id) {
			fetchComments(postData?.id)
		}
	}, [comments?.count])

	return (
		<View style={styles(theme).container}>
			<View style={styles(theme).author}>
				<View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
					<CircleAvatar
						height={40}
						width={40}
						image={postData.user.avatar}
						id={postData.user.id as number}
						onPress={() => {
							user?.id === postData.user.id
								? navigation.navigate('Profile')
								: navigation.navigate('FriendProfile', {
										userId: postData.user.id,
								  })
						}}
					/>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => navigation.navigate('Profile')}
					>
						<View style={{ flexDirection: 'column', paddingLeft: 10 }}>
							<Text style={styles(theme).name}>
								{postData?.user.name} {postData.user.surname}
							</Text>
							<Text style={styles(theme).timestamp}>
								{moment(postData?.createdAt)
									.add(-1, 'minutes')
									.locale('ru')
									.fromNow()}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				{postData && postData?.user.id === user?.id && (
					<PostModal postData={postData} />
				)}
			</View>
			<View>
				<Text style={styles(theme).description}>{postData?.description}</Text>
				{postData?.media && (
					<Image
						source={{
							uri: staticURL + postData.media,
						}}
						style={styles(theme).media}
					/>
				)}
			</View>
			<View style={styles(theme).buttons}>
				<PostLikeButton postData={postData} />

				<TouchableOpacity
					activeOpacity={0.4}
					style={styles(theme).button}
					onPress={() => navigation.navigate('Comments', { id: postData.id })}
				>
					<FontAwesome5
						name='comment'
						size={20}
						color={Palette[theme].iconInactive}
					/>
					<Text style={styles(theme).counter}>{comments?.count}</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default PostItem

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			backgroundColor: Palette[theme].primary,
			paddingHorizontal: 15,
			paddingVertical: 10,
		},
		author: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		name: {
			fontSize: 16,
			fontWeight: '600',
			color: Palette[theme].text,
		},
		timestamp: {
			color: Palette[theme].iconInactive,
		},
		description: {
			color: Palette[theme].text,
			paddingVertical: 10,
			fontSize: 16,
		},
		media: {
			width: '100%',
			height: undefined,
			aspectRatio: 4 / 3,
			resizeMode: 'center',
		},
		buttons: {
			paddingTop: 10,
			flexDirection: 'row',
		},
		button: {
			backgroundColor: Palette[theme].postButton,
			paddingVertical: 5,
			paddingHorizontal: 10,
			borderRadius: 100,
			flexDirection: 'row',
			alignItems: 'center',
			marginLeft: 10,
		},
		counter: {
			marginLeft: 7,
			fontSize: 16,
			color: Palette[theme].iconInactive,
		},
	})
