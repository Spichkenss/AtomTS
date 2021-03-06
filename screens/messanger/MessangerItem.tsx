import {
	CommonActions,
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { io } from 'socket.io-client'
import { LOCALHOST } from '../../config'
import { useTheme } from '../../hooks/useTheme'
import { ChatEvents } from '../../store/models/ChatEvents'
import { ThemeType } from '../../store/models/ITheme'
import { IDialog } from '../../store/services/ChatService'
import CircleAvatar from '../ui/CircleAvatar'
import { Palette } from '../ui/Palette'

export const socket = io(LOCALHOST)

interface Props {
	dialog: IDialog
}

const MessangerItem: FC<Props> = ({ dialog }) => {
	const { theme } = useTheme()
	const navigation = useNavigation<NavigationProp<ParamListBase>>()

	const joinRoom = () => {
		socket.emit(ChatEvents.JoinRoom, dialog.dialogName)
		navigation.dispatch(
			CommonActions.navigate('Dialog', {
				user: dialog.user,
				dialogName: dialog.dialogName,
			})
		)
	}

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={joinRoom}
			style={styles(theme).container}
		>
			<CircleAvatar
				height={50}
				width={50}
				image={dialog.user.avatar}
				onPress={() =>
					navigation.dispatch(
						CommonActions.navigate('FriendProfile', {
							userId: dialog.friendId,
							username: dialog.user.username,
						})
					)
				}
			/>
			<Text style={styles(theme).username}>
				{dialog.user.name} {dialog.user.surname}
			</Text>
		</TouchableOpacity>
	)
}

export default MessangerItem

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 15,
			paddingVertical: 10,
			backgroundColor: Palette[theme].primary,
		},
		username: {
			fontSize: 18,
			fontWeight: '600',
			paddingHorizontal: 10,
			color: Palette[theme].text,
		},
	})
