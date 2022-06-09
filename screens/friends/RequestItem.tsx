import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { FC } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { RelationType } from '../../store/services/FriendService'
import { unknown } from '../ui/CircleAvatar'
import ManageFriendButton from '../ui/ManageFriendButton'
import { Palette } from '../ui/Palette'

interface IRequestItem {
	data: RelationType
}

const RequestItem: FC<IRequestItem> = ({ data }) => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()
	return (
		<View style={styles(theme).container}>
			<Pressable
				style={styles(theme).user}
				onPress={() =>
					navigation.navigate('FriendProfile', {
						userId: data.user.id,
						username: data.user.username,
					})
				}
			>
				<Image
					source={data.user.avatar ? { uri: data.user.avatar } : unknown}
					style={styles(theme).avatar}
				/>
				<View style={{ paddingHorizontal: 10 }}>
					<Text style={styles(theme).name}>
						{data.user.name} {data.user.surname}
					</Text>
					<Text style={{ color: Palette[theme].iconInactive }}>Онлайн</Text>
				</View>
			</Pressable>

			<ManageFriendButton id={data.user.id} status={data.status} />
		</View>
	)
}

export default RequestItem

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: Palette[theme].primary,
			paddingHorizontal: 15,
			paddingVertical: 10,
		},
		user: { flexDirection: 'row', flex: 1, alignItems: 'center' },
		avatar: {
			width: 60,
			height: 60,
			borderRadius: 60 / 2,
		},
		name: {
			fontWeight: '500',
			fontSize: 18,
			color: Palette[theme].text,
		},
	})
