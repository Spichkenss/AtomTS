import {
	CommonActions,
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { IUser } from '../../store/models/IUser'
import BackArrow from './BackArrow'
import CircleAvatar from './CircleAvatar'
import { Palette } from './Palette'

interface Props {
	user: IUser
}

const DialogHeader: FC<Props> = ({ user }) => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()
	return (
		<View style={styles(theme).container}>
			<BackArrow />
			<CircleAvatar
				width={40}
				height={40}
				image={user.avatar}
				onPress={() =>
					navigation.dispatch(
						CommonActions.navigate({
							name: 'FriendProfile',
							params: { userId: user.id },
						})
					)
				}
			/>
			<Text style={styles(theme).username}>
				{user.name} {user.surname}
			</Text>
		</View>
	)
}

export default DialogHeader

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		username: {
			fontSize: 22,
			fontWeight: '600',
			color: Palette[theme].text,
			paddingLeft: 10,
		},
	})
