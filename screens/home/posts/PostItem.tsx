import { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { IPost } from '../../../store/models/IPost'
import { ThemeType } from '../../../store/models/ITheme'
import CircleAvatar from '../../ui/CircleAvatar'
import { Palette } from '../../ui/Palette'
import moment from 'moment'
import { Entypo } from '@expo/vector-icons'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import PostLikeButton from '../../ui/PostLikeButton'

export interface IPostItem {
	postData: IPost
}

const PostItem: FC<IPostItem> = ({ postData }) => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()

	return (
		<View style={styles(theme).container}>
			<View style={styles(theme).author}>
				<CircleAvatar height={40} width={40} image={'../avatar.jpg'} />
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.navigate('Profile')}
				>
					<View style={{ flexDirection: 'column', paddingLeft: 10 }}>
						<Text style={styles(theme).name}>{postData.user.username}</Text>
						<Text style={styles(theme).timestamp}>
							{moment(postData.timestamp).fromNow()}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles(theme).dots}>
					<Entypo
						name='dots-three-vertical'
						size={16}
						color={Palette[theme].iconInactive}
					/>
				</TouchableOpacity>
			</View>
			<View>
				<Text style={styles(theme).description}>{postData.description}</Text>
				{postData.media && (
					<Image
						source={require('../../../avatar.jpg')}
						style={styles(theme).media}
					/>
				)}
			</View>
			<View style={styles(theme).buttons}>
				<PostLikeButton postData={postData} />
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
		dots: {
			position: 'absolute',
			right: 0,
			top: 15,
		},
		description: {
			color: Palette[theme].text,
			paddingVertical: 10,
		},
		media: {
			width: '100%',
			height: undefined,
			aspectRatio: 1,
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
		},
		counter: {
			marginLeft: 7,
			fontSize: 16,
			color: Palette[theme].iconInactive,
		},
	})
