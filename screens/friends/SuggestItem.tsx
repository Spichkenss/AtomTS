import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { FC } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { IUser } from '../../store/models/IUser'
import AddUserButton from '../ui/AddUserButton'
import { unknown } from '../ui/CircleAvatar'
import { Palette } from '../ui/Palette'

interface ISuggestItem {
	data: IUser
}

const SuggestItem: FC<ISuggestItem> = ({ data }) => {
	const { theme } = useTheme()
	const navigation = useNavigation<NavigationProp<ParamListBase>>()

	return (
		<View style={styles(theme).container}>
			<Pressable
				style={styles(theme).user}
				onPress={() =>
					navigation.navigate('FriendProfile', {
						userId: data.id,
						username: data.username,
					})
				}
			>
				<Image
					source={data.avatar ? { uri: data.avatar } : unknown}
					style={styles(theme).avatar}
				/>
				<View style={styles(theme).besideAvatar}>
					<Text style={styles(theme).name}>
						{data?.name} {data?.surname}
					</Text>
					<AddUserButton id={data.id as number} />
				</View>
			</Pressable>
		</View>
	)
}

export default SuggestItem

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			paddingVertical: 10,
			paddingHorizontal: 15,
			backgroundColor: Palette[theme].primary,
		},
		user: { flexDirection: 'row' },
		avatar: {
			width: 80,
			height: 80,
			borderRadius: 80 / 2,
		},
		besideAvatar: {
			alignItems: 'flex-start',
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			paddingHorizontal: 10,
		},
		name: {
			color: Palette[theme].text,
			fontSize: 20,
			fontWeight: '600',
		},
		button: {
			backgroundColor: Palette[theme].button,
			borderRadius: 8,
		},
		buttonText: {
			fontSize: 16,
			paddingVertical: 5,
			paddingHorizontal: 9,
			color: Palette[theme].buttonText,
		},
	})
