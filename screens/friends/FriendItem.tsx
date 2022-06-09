import { FC, useEffect } from 'react'
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { RelationType } from '../../store/services/FriendService'
import { Palette } from '../ui/Palette'
import { Entypo } from '@expo/vector-icons'
import ManageFriendButton from '../ui/ManageFriendButton'
import { unknown } from '../ui/CircleAvatar'
import { staticURL } from '../../config'
import {
	CommonActions,
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { useCreateDialogMutation } from '../../store/services/ChatService'

interface IFriendItem {
	data: RelationType
}

const FriendItem: FC<IFriendItem> = ({ data }) => {
	const [createDialog, { data: newDialog }] = useCreateDialogMutation()
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()

	useEffect(() => {
		if (newDialog?.dialog.id) {
			navigation.dispatch(
				CommonActions.navigate('Dialog', {
					user: data.user,
					dialogName: newDialog.dialog.dialogName,
				})
			)
		}
	}, [newDialog?.dialog.dialogName])

	const createDialogHandler = async () => {
		await createDialog(data.friend_id)
	}

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
					source={
						data.user.avatar
							? {
									uri: staticURL + data.user.avatar,
							  }
							: unknown
					}
					style={styles(theme).avatar}
				/>
				<View style={{ paddingHorizontal: 10 }}>
					<Text style={styles(theme).name}>
						{data.user.name} {data.user.surname}
					</Text>
					<Text style={{ color: Palette[theme].iconInactive }}>Онлайн</Text>
				</View>
			</Pressable>
			<TouchableOpacity onPress={createDialogHandler}>
				<Entypo name='message' size={28} color={Palette[theme].secondary} />
			</TouchableOpacity>
			<ManageFriendButton status={data.status} id={data.user.id} />
		</View>
	)
}

export default FriendItem

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
