import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { useSendRequestMutation } from '../../store/services/FriendService'
import { Palette } from './Palette'

interface IAddUserButton {
	id: number
}

const AddUserButton: FC<IAddUserButton> = ({ id }) => {
	const { theme } = useTheme()
	const [sendRequest, { data }] = useSendRequestMutation()

	const sendFriendRequest = async () => {
		await sendRequest(id)
	}

	return (
		<TouchableOpacity style={styles(theme).button} onPress={sendFriendRequest}>
			<Text style={styles(theme).buttonText}>Добавить</Text>
		</TouchableOpacity>
	)
}

export default AddUserButton

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		button: {
			backgroundColor: Palette[theme].button,
			borderRadius: 8,
		},
		buttonText: {
			fontSize: 16,
			paddingVertical: 8,
			paddingHorizontal: 12,
			color: Palette[theme].buttonText,
		},
	})
