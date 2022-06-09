import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from '../ui/Palette'
import {
	GetRelation,
	StatusType,
	useAcceptRequestMutation,
	useDeleteFriendMutation,
	useLazyGetRelationQuery,
	useSendRequestMutation,
} from '../../store/services/FriendService'

interface Props {
	userId: number | undefined
}

const defineType = (status: StatusType) => {
	switch (status) {
		case 'decides':
			return 'Принять заявку'
		case 'friends':
			return 'Удалить из друзей'
		case 'requests':
			return 'Ожидание'
		default:
			return 'Добавить в друзья'
	}
}

const FriendButtons: FC<Props> = ({ userId }) => {
	const { theme } = useTheme()
	const [getRelation, { data: relation }] = useLazyGetRelationQuery()
	const [deleteFriend] = useDeleteFriendMutation()
	const [sendRequest] = useSendRequestMutation()
	const [acceptRequest] = useAcceptRequestMutation()

	useEffect(() => {
		const getRelationByUserId = async (id: number) => {
			await getRelation(id)
		}
		if (userId) {
			getRelationByUserId(userId)
		}
	}, [relation?.status])

	console.log(relation?.status)

	const changeRelationHandler = async () => {
		switch (relation?.status) {
			case 'decides':
				await acceptRequest(userId as number)
				break
			case 'friends':
				await deleteFriend(userId as number)
				break
			case 'requests':
				await deleteFriend(userId as number)
				break
			default:
				await sendRequest(userId as number)
				break
		}
	}

	return (
		<View style={styles(theme, relation).container}>
			<TouchableOpacity style={styles(theme).button}>
				<Text style={styles(theme).text}>Сообщение</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles(theme, relation).button}
				onPress={changeRelationHandler}
			>
				<Text style={styles(theme, relation).text}>
					{defineType(relation?.status as StatusType)}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default FriendButtons

const styles = (theme: ThemeType, relation?: GetRelation | undefined) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			backgroundColor: Palette[theme].primary,
			paddingVertical: 10,
		},
		button: {
			flex: 1,
			backgroundColor:
				relation?.status !== 'friends' && relation?.status !== 'requests'
					? Palette[theme].button
					: Palette[theme].iconInactive,
			paddingVertical: 10,
			marginHorizontal: 15,
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 10,
		},
		text: {
			color:
				relation?.status === 'friends'
					? Palette[theme].text
					: Palette[theme].buttonText,
			fontSize: 16,
		},
	})
