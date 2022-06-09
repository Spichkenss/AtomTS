const unknown = require('../../../assets/unknown.png')
import {
	CommonActions,
	NavigationProp,
	ParamListBase,
	useNavigation,
	useRoute,
} from '@react-navigation/native'
import { FC } from 'react'
import { Image, Pressable, StyleSheet, Text } from 'react-native'
import { staticURL } from '../../../config'
import { useAuth } from '../../../hooks/useAuth'
import { useTheme } from '../../../hooks/useTheme'
import { ThemeType } from '../../../store/models/ITheme'
import { RelationType } from '../../../store/services/FriendService'
import { Palette } from '../../ui/Palette'

interface Props {
	data: RelationType
}

const FriendItem: FC<Props> = ({ data }) => {
	const { user } = useAuth()
	const route = useRoute()
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()

	return (
		<Pressable
			style={styles(theme).item}
			onPress={() =>
				navigation.dispatch(
					data.user.id !== user?.id
						? CommonActions.navigate({
								name: 'FriendProfile',
								params: { userId: data.user.id, username: data.user.username },
						  })
						: CommonActions.navigate({
								name: 'Profile',
						  })
				)
			}
		>
			<Image
				source={
					data.user.avatar ? { uri: staticURL + data.user.avatar } : unknown
				}
				style={styles(theme).avatar}
			/>
			<Text style={styles(theme).text}>{data.user.name}</Text>
			<Text style={styles(theme).text}>{data.user.surname}</Text>
		</Pressable>
	)
}

export default FriendItem

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		item: { flexDirection: 'column', alignItems: 'center' },
		avatar: { width: 60, height: 60, borderRadius: 60 / 2 },
		text: { fontSize: 14, fontWeight: '500', color: Palette[theme].text },
	})
